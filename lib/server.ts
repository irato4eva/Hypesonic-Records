import { createClient } from '@supabase/supabase-js'
export const ADMIN = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'irato4eva@gmail.com'
export const PRICES: Record<string, number> = {
  'Essential Mix': 50, 'Signature Mix': 180, 'Flagship Mix + Master': 500,
  'Essential Mix (5 tracks)': 225, 'Signature Mix (5 tracks)': 780, 'Flagship Mix + Master (5 tracks)': 2200,
}
export const admin = () =>
  createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
export async function userFrom(req: Request) {
  const t = (req.headers.get('authorization') || '').replace('Bearer ', '')
  const { data } = await admin().auth.getUser(t)
  return data.user
}
export async function sendEmail(to: string, subject: string, text: string) {
  if (!process.env.RESEND_API_KEY) return
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: process.env.EMAIL_FROM || 'Hypesonic Records <onboarding@resend.dev>', to, subject, text }),
  })
}
