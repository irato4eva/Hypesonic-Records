'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

// TODO: Replace these with your real Paystack / Flutterwave payment links
// (generated from each dashboard) or, for a fuller integration, swap this
// for a server-side checkout session created via each provider's API.
const PROVIDERS = [
  {
    id: 'paystack',
    name: 'Paystack',
    blurb: 'Card, bank transfer & USSD — best for Nigerian clients.',
    href: '#', // TODO: paste your Paystack payment link here
  },
  {
    id: 'flutterwave',
    name: 'Flutterwave',
    blurb: 'Card, transfer & mobile money — Nigeria + international cards.',
    href: '#', // TODO: paste your Flutterwave payment link here
  },
  {
    id: 'paypal',
    name: 'PayPal',
    blurb: 'For clients in the US, UK, Canada, EU & beyond.',
    href: '#', // TODO: paste your PayPal.Me / invoice link here
  },
] as const

export function PaymentModal({
  open,
  onClose,
  tierName,
  amountLabel,
}: {
  open: boolean
  onClose: () => void
  tierName: string
  amountLabel: string
}) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="glass w-full max-w-md rounded-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-lg font-semibold">{tierName}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{amountLabel}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid size-8 shrink-0 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        <p className="mt-5 text-xs tracking-wide text-muted-foreground uppercase">
          Choose how you'd like to pay
        </p>
        <div className="mt-3 flex flex-col gap-2.5">
          {PROVIDERS.map((p) => (
            <a
              key={p.id}
              href={p.href}
              className={cn(
                'glow-hover flex items-center justify-between rounded-xl border border-border bg-muted/30 px-4 py-3.5 transition-colors hover:border-primary/40',
              )}
            >
              <span>
                <span className="block text-sm font-semibold">{p.name}</span>
                <span className="block text-xs text-muted-foreground">
                  {p.blurb}
                </span>
              </span>
            </a>
          ))}
        </div>

        <p className="mt-5 text-xs text-muted-foreground">
          You'll be redirected to complete payment securely. A confirmation
          and next steps are sent to your email right after.
        </p>
      </div>
    </div>
  )
}
