import crypto from 'crypto'
import { admin, sendEmail, ADMIN } from '@/lib/server'
import { USD_TO_NGN } from '@/lib/currency'

export async function POST(req: Request) {
  const raw = await req.text()
  const sig = crypto.createHmac('sha512', process.env.PAYSTACK_SECRET_KEY!).update(raw).digest('hex')
  if (sig !== req.headers.get('x-paystack-signature')) return new Response('bad signature', { status: 401 })
  const ev = JSON.parse(raw)
  if (ev.event === 'charge.success') {
    const db = admin()
    const { data: b } = await db.from('bookings').select('*').eq('id', ev.data.reference).single()
    if (b && !b.paid && ev.data.amount >= Math.round(b.amount_usd * USD_TO_NGN * 100)) {
      await db.from('bookings').update({ paid: true }).eq('id', b.id)
      const when = `${b.slot_date} at ${b.slot_time}`
      await sendEmail(b.email, 'Booking confirmed - Hypesonic Records', `Payment received for ${b.service} on ${when}. Log in at the Studio Booth to upload your stems.`)
      await sendEmail(ADMIN, 'New paid booking', `${b.email} booked ${b.service} on ${when}.`)
    }
  }
  return new Response('ok')
}
