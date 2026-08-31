'use client'

import { useState } from 'react'
import { Check, Zap } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { cn } from '@/lib/utils'
import { formatUSD, formatNGN, usdToNgn } from '@/lib/currency'
import { PaymentModal } from '@/components/payment-modal'

type Tier = {
  name: string
  tagline: string
  perTrackUsd: number
  packageUsd: number
  packageQty: string
  turnaround: string
  features: string[]
  featured?: boolean
}

// Positioned as a boutique studio: entry tier stays accessible for
// first releases, flagship tier reaches toward premium US/UK boutique
// rates ($500/track) for clients who want white-glove, no-compromise work.
// TODO: adjust once you've settled on final rates.
const TIERS: Tier[] = [
  {
    name: 'Essential Mix',
    tagline: 'A clean, professional foundation for your first release.',
    perTrackUsd: 50,
    packageUsd: 225,
    packageQty: '5 tracks',
    turnaround: '5–7 days',
    features: [
      'Up to 24 stems',
      'Analog-modeled mix',
      '1 revision round',
      'Streaming-ready bounce',
    ],
  },
  {
    name: 'Signature Mix',
    tagline: 'For artists ready to compete with major-label polish.',
    perTrackUsd: 180,
    packageUsd: 780,
    packageQty: '5 tracks',
    turnaround: '3–5 days',
    featured: true,
    features: [
      'Unlimited stems',
      'Analog-modeled mix + bus processing',
      '3 revision rounds',
      'Vocal tuning included',
      'Reference matching',
      'Priority queue',
    ],
  },
  {
    name: 'Flagship Mix + Master',
    tagline: 'White-glove, end-to-end production for flagship releases.',
    perTrackUsd: 500,
    packageUsd: 2200,
    packageQty: '5 tracks',
    turnaround: '48–72 hrs',
    features: [
      'Everything in Signature Mix',
      'Unlimited revisions',
      'Analog summing & mastering chain',
      'Stem masters, instrumental & Dolby Atmos option',
      'Direct line to lead engineer',
      'White-glove priority scheduling',
    ],
  },
]

export function Pricing() {
  const [mode, setMode] = useState<'track' | 'package'>('track')
  const [currency, setCurrency] = useState<'usd' | 'ngn'>('usd')

  const priceFor = (tier: Tier) => {
    const usd = mode === 'track' ? tier.perTrackUsd : tier.packageUsd
    return currency === 'usd' ? formatUSD(usd) : formatNGN(usdToNgn(usd))
  }

  const [checkoutTier, setCheckoutTier] = useState<Tier | null>(null)

  return (
    <section id="pricing" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Pricing"
        title="Transparent rates, no surprises"
        description="Pay per track or save with a project package. Every tier includes a treated booth session on request."
      />

      {/* toggles */}
      <Reveal className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <div className="inline-flex items-center rounded-full border border-border bg-muted/40 p-1">
          {(['track', 'package'] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={cn(
                'rounded-full px-5 py-2 text-sm font-medium transition-colors',
                mode === m
                  ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {m === 'track' ? 'Per track' : 'Package'}
            </button>
          ))}
        </div>

        <div className="inline-flex items-center rounded-full border border-border bg-muted/40 p-1">
          {(['usd', 'ngn'] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCurrency(c)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                currency === c
                  ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {c.toUpperCase()}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {TIERS.map((tier, i) => (
          <Reveal key={tier.name} delay={i * 80} as="article">
            <div
              className={cn(
                'relative flex h-full flex-col rounded-2xl p-6',
                tier.featured
                  ? 'border border-primary/40 bg-gradient-to-b from-primary/[0.07] to-transparent shadow-[0_0_50px_-20px_var(--color-primary)]'
                  : 'glass',
              )}
            >
              {tier.featured ? (
                <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-gradient-to-r from-primary to-secondary px-3 py-1 text-[11px] font-semibold tracking-wide text-primary-foreground uppercase">
                  <Zap className="size-3" />
                  Most popular
                </span>
              ) : null}

              <h3 className="font-display text-xl font-semibold">{tier.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{tier.tagline}</p>

              <div className="mt-6 flex items-end gap-1.5">
                <span className="font-display text-4xl font-bold tracking-tight">
                  {priceFor(tier)}
                </span>
                <span className="mb-1 text-sm text-muted-foreground">
                  {mode === 'track' ? '/ track' : `/ ${tier.packageQty}`}
                </span>
              </div>
              <p className="mt-2 text-xs tracking-wide text-primary uppercase">
                {tier.turnaround} turnaround
              </p>

              <ul className="mt-6 flex-1 space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => setCheckoutTier(tier)}
                className={cn(
                  'mt-7 rounded-xl py-3 text-center text-sm font-semibold transition-all',
                  tier.featured
                    ? 'glow-hover bg-gradient-to-r from-primary to-secondary text-primary-foreground'
                    : 'border border-input bg-muted/30 text-foreground hover:bg-muted',
                )}
              >
                Choose {tier.name}
              </button>
            </div>
          </Reveal>
        ))}
      </div>

      <PaymentModal
        open={checkoutTier !== null}
        onClose={() => setCheckoutTier(null)}
        tierName={checkoutTier?.name ?? ''}
        amountLabel={checkoutTier ? priceFor(checkoutTier) : ''}
      />
    </section>
  )
}
