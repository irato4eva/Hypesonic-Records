'use client'

import { ArrowRight, Play, Sparkles } from 'lucide-react'

/** Animated EQ / spectrum bars used as an atmospheric hero backdrop. */
function SpectrumField() {
  const bars = Array.from({ length: 64 })
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 flex h-1/2 items-end justify-center gap-1.5 px-4 opacity-40 sm:gap-2"
    >
      {bars.map((_, i) => {
        const height = 20 + ((i * 37) % 80)
        const duration = 0.9 + ((i * 13) % 12) / 10
        const delay = ((i * 7) % 20) / 10
        return (
          <span
            key={i}
            className="animate-eq w-1 rounded-full bg-gradient-to-t from-primary/10 via-primary/60 to-secondary sm:w-1.5"
            style={{
              height: `${height}%`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          />
        )
      })}
    </div>
  )
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[92vh] items-center overflow-hidden pt-28 pb-20"
    >
      {/* glow orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-secondary/20 blur-[120px]"
      />
      <SpectrumField />

      <div className="relative mx-auto w-full max-w-4xl px-4 text-center sm:px-6">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-xs font-medium tracking-widest text-muted-foreground uppercase">
          <Sparkles className="size-3.5 text-primary" />
          Benin City, Nigeria
        </div>

        <h1 className="font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl">
          World-Class Audio Production,{' '}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Mixing &amp; Mastering
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base text-pretty text-muted-foreground sm:text-lg">
          Precision stem processing, analog-modeled mixing, and
          streaming-optimized mastering. We shape records that translate on every
          system — from studio monitors to earbuds.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#studio-booth"
            className="glow-hover inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-7 py-3.5 text-sm font-semibold text-primary-foreground sm:w-auto"
            style={{ animation: 'glow-pulse 3.2s ease-in-out infinite' }}
          >
            Book Studio Time
            <ArrowRight className="size-4" />
          </a>
          <a
            href="#portfolio"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-input bg-muted/30 px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted sm:w-auto"
          >
            <Play className="size-4 text-primary" />
            Listen to Portfolio
          </a>
        </div>

        {/* mini trust row */}
        <dl className="mx-auto mt-14 grid max-w-lg grid-cols-3 gap-4">
          {[
            ['20+', 'Tracks in Portfolio'],
            ['9 yrs', 'In the Booth'],
          ].map(([value, label]) => (
            <div key={label} className="glass rounded-2xl px-3 py-4">
              <dt className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                {value}
              </dt>
              <dd className="mt-1 text-xs tracking-wide text-muted-foreground uppercase">
                {label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
