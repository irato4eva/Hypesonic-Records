'use client'
import { useEffect, useState } from 'react'
import { supabase, ADMIN_EMAIL, STEPS } from '@/lib/supabase'

export default function Admin() {
  const [ok, setOk] = useState<boolean | null>(null)
  const [rows, setRows] = useState<any[]>([])
  const [links, setLinks] = useState<Record<string, { name: string; url: string }[]>>({})
  const [notes, setNotes] = useState<Record<string, any[]>>({})
  const [reply, setReply] = useState<Record<string, string>>({})

  const load = async () => {
    const { data } = await supabase.from('bookings').select('*').eq('paid', true).order('slot_date')
    setRows(data || [])
  }
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const a = data.session?.user.email === ADMIN_EMAIL
      setOk(a)
      if (a) load()
    })
  }, [])

  const setStatus = async (id: string, status: string) => {
    const { data } = await supabase.auth.getSession()
    await fetch('/api/status', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + data.session!.access_token }, body: JSON.stringify({ id, status }) })
    load()
  }
  const showFiles = async (id: string) => {
    const { data: list } = await supabase.storage.from('stems').list(id)
    const out: { name: string; url: string }[] = []
    for (const f of list || []) {
      const { data } = await supabase.storage.from('stems').createSignedUrl(`${id}/${f.name}`, 3600)
      if (data) out.push({ name: f.name, url: data.signedUrl })
    }
    setLinks((l) => ({ ...l, [id]: out }))
    const { data: c } = await supabase.from('comments').select('*').eq('booking_id', id).order('created_at')
    setNotes((n) => ({ ...n, [id]: c || [] }))
  }
  const send = async (id: string) => {
    if (!reply[id]) return
    await supabase.from('comments').insert({ booking_id: id, author: 'Engineer', pos: 0, time_label: '0:00', body: reply[id] })
    setReply((r) => ({ ...r, [id]: '' }))
    showFiles(id)
  }

  if (ok === null) return <p className="p-8">Loading…</p>
  if (!ok) return <p className="p-8">Admin only. Log in with the studio email on the main site first.</p>
  return (
    <main className="mx-auto max-w-4xl space-y-4 p-6">
      <h1 className="font-display text-2xl font-bold">Studio admin — paid bookings</h1>
      {rows.length === 0 && <p className="text-muted-foreground">No paid bookings yet.</p>}
      {rows.map((b) => (
        <div key={b.id} className="glass space-y-3 rounded-2xl p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-semibold">{b.service} · {b.email}</p>
              <p className="text-sm text-muted-foreground">{b.slot_date} at {b.slot_time} · ${b.amount_usd}</p>
            </div>
            <select value={b.status} onChange={(e) => setStatus(b.id, e.target.value)} className="rounded-lg border border-border bg-background px-3 py-2 text-sm">
              {STEPS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <button onClick={() => showFiles(b.id)} className="text-sm text-primary underline">Load files & notes</button>
          {links[b.id]?.map((f) => <a key={f.name} href={f.url} className="block text-sm underline" target="_blank">{f.name}</a>)}
          {notes[b.id]?.map((c) => <p key={c.id} className="text-sm"><b>{c.author}</b> @ {c.time_label}: {c.body}</p>)}
          {notes[b.id] && (
            <div className="flex gap-2">
              <input value={reply[b.id] || ''} onChange={(e) => setReply((r) => ({ ...r, [b.id]: e.target.value }))} placeholder="Reply to client…" className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm" />
              <button onClick={() => send(b.id)} className="rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground">Send</button>
            </div>
          )}
        </div>
      ))}
    </main>
  )
}
