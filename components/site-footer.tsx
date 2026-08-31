'use client'

import { useState } from 'react'
import {
  Radio,
  MapPin,
  Phone,
  Mail,
  Music2,
  Play,
  AtSign,
  ArrowRight,
  Check,
} from 'lucide-react'

const NAV = [
  { label: 'Services', href: '#services' },
  { label: 'Audio Portfolio', href: '#portfolio' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Studio Booth', href: '#studio-booth' },
]

const HOURS: [string, string][] = [
  ['Mon – Fri', '10:00 – 22:00'],
  ['Saturday', '12:00 – 20:00'],
  ['Sunday', 'By appointment'],
]

const SOCIALS = [
  { icon: Music2, label: 'Instagram', href: '#' },
  { icon: Play, label: 'YouTube', href: '#' },
  { icon: AtSign, label: 'X (Twitter)', href: '#' },
]

export function SiteFooter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  return (
    <footer className="border-t border-border pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 pb-14 md:grid-cols-2 lg:grid-cols-4">
          {/* brand + contact */}
          <div className="lg:col-span-1">
            <a href="#top" className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                <Radio className="size-5" aria-hidden />
              </span>
              <span className="font-display text-lg font-bold tracking-tight">
                Hypesonic Records
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Premium recording, mixing, and mastering. Built for records that
              travel.
            </p>
            <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-center gap-2.5">
                <MapPin className="size-4 shrink-0 text-primary" />
                63 Omofomwan Street, by end of Friendship Street, off Okhoro Road, Benin City, Edo State, Nigeria
              </li>
              <li className="flex items-center gap-2.5 text-xs text-primary/80">
                Remote sessions & consultations available globally
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-primary" />
                +234 706 243 2017
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-primary" />
                irato4eva@gmail.com
              </li>
            </ul>
          </div>

          {/* nav */}
          <nav aria-label="Footer">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              Explore
            </h3>
            <ul className="mt-4 space-y-3">
              {NAV.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* hours */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              Studio hours
            </h3>
            <ul className="mt-4 space-y-3">
              {HOURS.map(([day, time]) => (
                <li
                  key={day}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <span className="text-muted-foreground">{day}</span>
                  <span className="text-foreground">{time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* newsletter */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              Newsletter
            </h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Session slots, gear drops, and mixing tips. No spam.
            </p>
            {/* TODO: connect newsletter signup to email provider / backend */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (email) setSubscribed(true)
              }}
              className="mt-4"
            >
              <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/30 p-1.5 focus-within:border-primary/50">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="min-w-0 flex-1 bg-transparent px-2.5 py-1.5 text-sm outline-none placeholder:text-muted-foreground"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  className="grid size-9 shrink-0 place-items-center rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground"
                  aria-label="Subscribe"
                >
                  {subscribed ? (
                    <Check className="size-4" />
                  ) : (
                    <ArrowRight className="size-4" />
                  )}
                </button>
              </div>
              {subscribed ? (
                <p className="mt-2 text-xs text-primary">
                  You&apos;re on the list. Talk soon.
                </p>
              ) : null}
            </form>

            <div className="mt-6 flex gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grid size-10 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <s.icon className="size-4.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Hypesonic Records. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Licensing
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
