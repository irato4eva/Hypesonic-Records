'use client'

import { useEffect, useMemo, useRef, useState, type DragEvent } from 'react'
import { supabase } from '@/lib/supabase'
import { formatNGN, usdToNgn } from '@/lib/currency'
import {
  ChevronLeft,
  ChevronRight,
  UploadCloud,
  FileAudio,
  X,
  Check,
  MessageSquare,
  CalendarClock,
} from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { cn } from '@/lib/utils'

const TIME_SLOTS = ['10:00', '12:30', '15:00', '17:30', '20:00']

const STEPS = ['Received', 'In Progress', 'Mix Review', 'Mastering', 'Delivered']

type Comment = {
  id: string
  pos: number // 0..1 along the waveform
  author: string
  text: string
  time: string
}

const SERVICES = [['Essential Mix', 50], ['Signature Mix', 180], ['Flagship Mix + Master', 500]] as const

/* ---------------- Booking Calendar ---------------- */

function BookingCalendar() {
  const today = useMemo(() => new Date(), [])
  const [view, setView] = useState({ y: today.getFullYear(), m: today.getMonth() })
  const [selected, setSelected] = useState<number | null>(null)
  const [slot, setSlot] = useState<string | null>(null)
  const [service, setService] = useState<string>('Essential Mix')
  const [taken, setTaken] = useState<string[]>([])
  const [msg, setMsg] = useState('')
  const dateStr = selected
    ? `${view.y}-${String(view.m + 1).padStart(2, '0')}-${String(selected).padStart(2, '0')}`
    : ''
  useEffect(() => {
    if (!dateStr) return
    supabase.rpc('taken_slots', { d: dateStr }).then(({ data }) => setTaken((data as string[]) || []))
  }, [dateStr])
  const pay = async () => {
    const { data } = await supabase.auth.getSession()
    if (!data.session) return setMsg('Please log in first (login box above).')
    setMsg('Starting secure payment…')
    const r = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + data.session.access_token },
      body: JSON.stringify({ service, date: dateStr, time: slot }),
    })
    const j = await r.json()
    if (j.url) location.href = j.url
    else setMsg(j.error || 'Something went wrong')
  }

  const firstDay = new Date(view.y, view.m, 1).getDay()
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate()
  const monthLabel = new Date(view.y, view.m, 1).toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  const isPast = (day: number) => {
    const d = new Date(view.y, view.m, day)
    const t = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    return d < t
  }

  const changeMonth = (dir: 1 | -1) => {
    setSelected(null)
    setSlot(null)
    setView((v) => {
      const m = v.m + dir
      if (m < 0) return { y: v.y - 1, m: 11 }
      if (m > 11) return { y: v.y + 1, m: 0 }
      return { ...v, m }
    })
  }

  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <CalendarClock className="size-4 text-primary" />
        Book a session
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => changeMonth(-1)}
          className="grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Previous month"
        >
          <ChevronLeft className="size-4" />
        </button>
        <span className="font-display text-sm font-semibold">{monthLabel}</span>
        <button
          type="button"
          onClick={() => changeMonth(1)}
          className="grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Next month"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[11px] tracking-wide text-muted-foreground uppercase">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <span key={i} className="py-1">
            {d}
          </span>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {Array.from({ length: firstDay }).map((_, i) => (
          <span key={`e${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1
          const past = isPast(day)
          const active = selected === day
          return (
            <button
              key={day}
              type="button"
              disabled={past}
              onClick={() => {
                setSelected(day)
                setSlot(null)
              }}
              className={cn(
                'aspect-square rounded-lg text-sm transition-colors',
                past && 'cursor-not-allowed text-muted-foreground/30',
                !past && !active && 'text-foreground hover:bg-muted',
                active &&
                  'bg-gradient-to-br from-primary to-secondary font-semibold text-primary-foreground',
              )}
            >
              {day}
            </button>
          )
        })}
      </div>

      {/* time slots */}
      <div className="mt-5">
        <p className="mb-2 text-xs tracking-wide text-muted-foreground uppercase">
          Available slots
        </p>
        <div className="flex flex-wrap gap-2">
          {TIME_SLOTS.map((t) => (
            <button
              key={t}
              type="button"
              disabled={!selected || taken.includes(t)}
              onClick={() => setSlot(t)}
              className={cn(
                'rounded-lg border px-3 py-1.5 text-sm transition-colors',
                !selected && 'cursor-not-allowed border-border text-muted-foreground/40',
                selected && slot !== t && 'border-border text-foreground hover:border-primary/40',
                slot === t && 'border-primary/60 bg-primary/10 text-primary',
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <select
        value={service}
        onChange={(e) => setService(e.target.value)}
        className="mt-5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
      >
        {SERVICES.map(([n, usd]) => (
          <option key={n} value={n}>
            {n} — ${usd} (~{formatNGN(usdToNgn(usd))}) · paid in full
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={pay}
        disabled={!selected || !slot}
        className="glow-hover mt-5 w-full rounded-xl bg-gradient-to-r from-primary to-secondary py-3 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
      >
        {selected && slot
          ? `Pay & book ${monthLabel.split(' ')[0]} ${selected} · ${slot}`
          : 'Select a date & time'}
      </button>
      {msg ? <p className="mt-3 text-xs text-muted-foreground">{msg}</p> : null}
    </div>
  )
}

/* ---------------- File Upload ---------------- */

type UploadItem = { id: string; name: string; size: string }

function FileUpload({ bookingId }: { bookingId?: string }) {
  const [dragging, setDragging] = useState(false)
  const [files, setFiles] = useState<UploadItem[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const addFiles = (list: FileList | null) => {
    if (!list || !bookingId) return
    Array.from(list).forEach(async (f) => {
      const { error } = await supabase.storage.from('stems').upload(`${bookingId}/${f.name}`, f, { upsert: true })
      if (!error)
        setFiles((p) => [...p, { id: `${bookingId}-${f.name}`, name: f.name, size: `${(f.size / 1024 / 1024).toFixed(1)} MB` }])
    })
  }
  useEffect(() => {
    if (!bookingId) return
    supabase.storage.from('stems').list(bookingId).then(({ data }) =>
      setFiles((data || []).map((f: any) => ({ id: f.id, name: f.name, size: `${((f.metadata?.size || 0) / 1024 / 1024).toFixed(1)} MB` }))))
  }, [bookingId])

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(false)
    addFiles(e.dataTransfer.files)
  }

  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <UploadCloud className="size-4 text-primary" />
        Upload stems & references
      </div>

      {!bookingId ? <p className="mt-3 text-xs text-muted-foreground">Book and pay for a session to unlock uploads.</p> : null}
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={cn(
          'mt-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors',
          dragging
            ? 'border-primary bg-primary/5'
            : 'border-border hover:border-primary/40',
        )}
      >
        <UploadCloud
          className={cn(
            'size-8 transition-colors',
            dragging ? 'text-primary' : 'text-muted-foreground',
          )}
        />
        <p className="mt-3 text-sm font-medium">
          Drag & drop files, or{' '}
          <span className="text-primary">browse</span>
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          WAV, AIFF, MP3, ZIP · up to 2GB per file
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {files.length > 0 ? (
        <ul className="mt-4 space-y-2">
          {files.map((f) => (
            <li
              key={f.id}
              className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 px-3 py-2.5"
            >
              <FileAudio className="size-4 shrink-0 text-primary" />
              <span className="min-w-0 flex-1 truncate text-sm">{f.name}</span>
              <span className="shrink-0 text-xs text-muted-foreground">
                {f.size}
              </span>
              <button
                type="button"
                onClick={() =>
                  setFiles((prev) => prev.filter((x) => x.id !== f.id))
                }
                className="grid size-6 shrink-0 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label={`Remove ${f.name}`}
              >
                <X className="size-3.5" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

/* ---------------- Status Tracker ---------------- */

function StatusTracker({ status }: { status?: string }) {
  const current = Math.max(0, STEPS.indexOf(status || 'Received'))

  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">Project status</span>
        <span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-primary uppercase">
          {STEPS[current]}
        </span>
      </div>

      <ol className="mt-6 space-y-0">
        {STEPS.map((step, i) => {
          const done = i < current
          const active = i === current
          return (
            <li key={step} className="relative flex gap-4 pb-6 last:pb-0">
              {i < STEPS.length - 1 ? (
                <span
                  className={cn(
                    'absolute top-7 left-[13px] h-full w-0.5',
                    done ? 'bg-primary' : 'bg-border',
                  )}
                />
              ) : null}
              <span
                className={cn(
                  'relative z-10 grid size-7 shrink-0 place-items-center rounded-full border text-xs transition-colors',
                  done && 'border-primary bg-primary text-primary-foreground',
                  active &&
                    'border-primary bg-primary/15 text-primary shadow-[0_0_16px_-2px_var(--color-primary)]',
                  !done && !active && 'border-border text-muted-foreground',
                )}
              >
                {done ? <Check className="size-3.5" /> : i + 1}
              </span>
              <div className="pt-0.5">
                <p
                  className={cn(
                    'text-sm font-medium',
                    active ? 'text-foreground' : done ? 'text-foreground' : 'text-muted-foreground',
                  )}
                >
                  {step}
                </p>
                {active ? (
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Current stage.
                  </p>
                ) : null}
              </div>
            </li>
          )
        })}
      </ol>

          </div>
  )
}

/* ---------------- Revision Comments on Waveform ---------------- */

function makeStaticBars(count = 72) {
  const bars: number[] = []
  let x = 424242
  for (let i = 0; i < count; i++) {
    x = (x * 1103515245 + 12345) % 2147483648
    const env = 0.5 + 0.5 * Math.sin((i / count) * Math.PI)
    bars.push(((x / 2147483648) * 0.75 + 0.25) * env)
  }
  return bars
}

function RevisionComments({ bookingId }: { bookingId?: string }) {
  const bars = useMemo(() => makeStaticBars(), [])
  const [comments, setComments] = useState<Comment[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [txt, setTxt] = useState('')
  const load = async () => {
    if (!bookingId) return
    const { data } = await supabase.from('comments').select('*').eq('booking_id', bookingId).order('created_at')
    const c = (data || []).map((r: any) => ({ id: r.id, pos: r.pos, author: r.author, text: r.body, time: r.time_label }))
    setComments(c)
    setActiveId((a) => a || c[0]?.id || '')
  }
  useEffect(() => { load() }, [bookingId])
  const post = async () => {
    if (!bookingId || !txt.trim()) return
    const m = txt.match(/^(\d+):(\d{2})\s+(.*)$/)
    const secs = m ? +m[1] * 60 + +m[2] : 0
    await supabase.from('comments').insert({
      booking_id: bookingId, author: 'Client', pos: Math.min(1, secs / 240),
      time_label: m ? `${m[1]}:${m[2]}` : '0:00', body: m ? m[3] : txt,
    })
    setTxt('')
    load()
  }
  const active = comments.find((c) => c.id === activeId)

  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <MessageSquare className="size-4 text-primary" />
        Revision comments
      </div>

      {/* waveform with anchored comment pins */}
      <div className="relative mt-5">
        <div className="flex h-24 items-center gap-[2px]">
          {bars.map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-full bg-muted-foreground/25"
              style={{ height: `${Math.max(6, h * 100)}%` }}
            />
          ))}
        </div>
        {comments.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setActiveId(c.id)}
            style={{ left: `${c.pos * 100}%` }}
            className="absolute top-0 -translate-x-1/2"
            aria-label={`Comment at ${c.time} by ${c.author}`}
          >
            <span
              className={cn(
                'block h-24 w-0.5 transition-colors',
                activeId === c.id ? 'bg-primary' : 'bg-secondary/60',
              )}
            />
            <span
              className={cn(
                'absolute -top-1 left-1/2 grid size-5 -translate-x-1/2 place-items-center rounded-full border text-[10px] font-semibold transition-colors',
                activeId === c.id
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-secondary/60 bg-popover text-secondary-foreground',
              )}
            >
              {comments.indexOf(c) + 1}
            </span>
          </button>
        ))}
      </div>

      {/* active comment + list */}
      {active ? (
        <div className="mt-5 rounded-xl border border-border bg-muted/30 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">{active.author}</span>
            <span className="font-mono text-xs text-primary">@ {active.time}</span>
          </div>
          <p className="mt-1.5 text-sm text-muted-foreground">{active.text}</p>
        </div>
      ) : null}

      
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          placeholder="Add a note — start with a time like 1:23 to pin it"
          value={txt}
          onChange={(e) => setTxt(e.target.value)}
          className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/50"
        />
        <button
          type="button"
          onClick={post}
          disabled={!bookingId}
          className="rounded-lg bg-gradient-to-r from-primary to-secondary px-4 text-sm font-semibold text-primary-foreground disabled:opacity-40"
        >
          Post
        </button>
      </div>
    </div>
  )
}

/* ---------------- Section ---------------- */

export function StudioBooth() {
  const [email, setEmail] = useState('')
  const [user, setUser] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const [booking, setBooking] = useState<any>(null)

  const loadBooking = async () => {
    const { data: u } = await supabase.auth.getUser()
    if (!u.user) return
    const { data } = await supabase.from('bookings').select('*').eq('user_id', u.user.id).eq('paid', true)
      .order('created_at', { ascending: false }).limit(1)
    setBooking(data?.[0] || null)
  }
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user.email || null)
      if (data.session) loadBooking()
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setUser(s?.user.email || null)
      if (s) loadBooking()
      else setBooking(null)
    })
    return () => sub.subscription.unsubscribe()
  }, [])
  const login = async () => {
    if (!email) return
    await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: location.origin + '/#studio-booth' } })
    setSent(true)
  }

  return (
    <section id="studio-booth" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Studio Booth"
          title="Your client portal"
          description="Book time, send stems, track progress, and leave time-stamped notes — all in one place."
        />

        <div className="glass mt-10 rounded-2xl p-5 text-sm">
          {user ? (
            <div className="flex items-center justify-between gap-3">
              <span>Signed in as {user}</span>
              <button type="button" onClick={() => supabase.auth.signOut()} className="text-primary underline">Log out</button>
            </div>
          ) : sent ? (
            <p>Check your email for your login link.</p>
          ) : (
            <div className="flex flex-col gap-2 sm:flex-row">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email to log in or sign up"
                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary/50" />
              <button type="button" onClick={login} className="rounded-lg bg-gradient-to-r from-primary to-secondary px-4 py-2 font-semibold text-primary-foreground">Email me a login link</button>
            </div>
          )}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <div className="flex flex-col gap-4">
            <BookingCalendar />
          </div>
          <div className="flex flex-col gap-4">
            <FileUpload bookingId={booking?.id} />
            <StatusTracker status={booking?.status} />
          </div>
          <div className="flex flex-col gap-4 lg:col-span-1">
            <RevisionComments bookingId={booking?.id} />
          </div>
        </div>
      </div>
    </section>
  )
}
