'use client'

import { useEffect, useState } from 'react'
import { Menu, X, Radio } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Audio Portfolio', href: '#portfolio' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Studio Booth', href: '#studio-booth' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          'mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-300 sm:px-6',
          scrolled
            ? 'my-2 h-14 glass rounded-2xl'
            : 'my-3 h-16 border border-transparent',
        )}
      >
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-primary-foreground">
            <Radio className="size-5" aria-hidden />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            Hypesonic
            <span className="text-muted-foreground"> Records</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#studio-booth"
            className="glow-hover hidden rounded-xl bg-gradient-to-r from-primary to-secondary px-5 py-2.5 text-sm font-semibold text-primary-foreground sm:inline-flex"
          >
            Book Session
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="grid size-10 place-items-center rounded-xl text-foreground lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-6" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          'fixed inset-0 z-50 lg:hidden',
          open ? 'pointer-events-auto' : 'pointer-events-none',
        )}
        aria-hidden={!open}
      >
        <div
          className={cn(
            'absolute inset-0 bg-background/70 backdrop-blur-sm transition-opacity duration-300',
            open ? 'opacity-100' : 'opacity-0',
          )}
          onClick={() => setOpen(false)}
        />
        <aside
          className={cn(
            'absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col gap-2 border-l border-border bg-popover p-6 transition-transform duration-300 ease-out',
            open ? 'translate-x-0' : 'translate-x-full',
          )}
          role="dialog"
          aria-label="Mobile menu"
        >
          <div className="mb-6 flex items-center justify-between">
            <span className="font-display text-lg font-bold">Menu</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid size-10 place-items-center rounded-xl text-foreground"
              aria-label="Close menu"
            >
              <X className="size-6" />
            </button>
          </div>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-lg font-medium text-foreground transition-colors hover:bg-muted"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#studio-booth"
            onClick={() => setOpen(false)}
            className="mt-4 rounded-xl bg-gradient-to-r from-primary to-secondary px-5 py-3.5 text-center text-base font-semibold text-primary-foreground"
          >
            Book Session
          </a>
        </aside>
      </div>
    </header>
  )
}
