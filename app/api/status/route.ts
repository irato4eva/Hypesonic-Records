import { NextResponse } from 'next/server'
import { admin, userFrom, sendEmail, ADMIN } from '@/lib/server'
import { STEPS } from '@/lib/supabase'

export async function POST(req: Request) {
  const u = await userFrom(req)
  if (u?.email !== ADMIN) return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  const { id, status } = await req.json()
  if (!STEPS.includes(status)) return NextResponse.json({ error: 'bad status' }, { status: 400 })
  const { data: b } = await admin().from('bookings').update({ status }).eq('id', id).select().single()
  if (b) await sendEmail(b.email, `Project update: ${status}`, `Your ${b.service} project is now at: ${status}. Log in to the Studio Booth to see details and leave notes.`)
  return NextResponse.json({ ok: true })
}
