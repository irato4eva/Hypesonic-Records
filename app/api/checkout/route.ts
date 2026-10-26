import { NextResponse } from 'next/server'
import { admin, userFrom, PRICES } from '@/lib/server'
import { USD_TO_NGN } from '@/lib/currency'

export async function POST(req: Request) {
  const user = await userFrom(req)
  if (!user) return NextResponse.json({ error: 'Please log in first' }, { status: 401 })
  const { service, date, time } = await req.json()
  const usd = PRICES[service]
  if (!usd || !date || !time) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  const db = admin()
  await db.from('bookings').delete().eq('paid', false).lt('created_at', new Date(Date.now() - 30 * 60000).toISOString())
  const { data: b, error } = await db.from('bookings')
    .insert({ user_id: user.id, email: user.email, service, amount_usd: usd, slot_date: date, slot_time: time })
    .select().single()
  if (error) return NextResponse.json({ error: 'That slot was just taken. Pick another.' }, { status: 409 })
  const r = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: user.email, amount: Math.round(usd * USD_TO_NGN * 100), reference: b.id,
      callback_url: new URL('/?paid=1#studio-booth', req.url).toString(),
    }),
  })
  const j = await r.json()
  if (!j.status) return NextResponse.json({ error: 'Payment could not start' }, { status: 502 })
  return NextResponse.json({ url: j.data.authorization_url })
}
