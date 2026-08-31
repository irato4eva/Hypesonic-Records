'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { cn } from '@/lib/utils'

const FAQS = [
  {
    q: 'What is your typical turnaround time?',
    a: 'Mixing runs 3–5 business days per track and mastering 1–2 days, from the moment we receive your final stems. Rush delivery is available on request for an added fee.',
  },
  {
    q: 'What is your revision policy?',
    a: 'Every mix and master includes up to three revision rounds within the agreed scope. Additional rounds or new creative directions are billed at our hourly rate, always quoted upfront.',
  },
  {
    q: 'Which file formats do you accept and deliver?',
    a: 'Send stems as 24-bit WAV or AIFF at the session sample rate, with about 6 dB of headroom and no master-bus limiting. We deliver streaming-ready WAV plus MP3, and DDP for physical release on request.',
  },
  {
    q: 'How do payments and refunds work?',
    a: 'We take a 50% deposit to lock your slot, with the balance due before final files are released. Deposits cover reserved studio time and are non-refundable, but unused prepaid sessions can be rescheduled.',
  },
  {
    q: 'Do you offer remote sessions or in-person only?',
    a: 'Both. Our Benin City room is open for in-person recording and attended mixing, and we work with artists worldwide remotely through the Studio Booth for uploads, quotes, revisions, and delivery.',
  },
]

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="glass overflow-hidden rounded-2xl">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
      >
        <span className="font-display text-base font-semibold">{q}</span>
        <Plus
          className={cn(
            'size-5 shrink-0 text-primary transition-transform duration-300',
            open && 'rotate-45',
          )}
        />
      </button>
      <div
        className={cn(
          'grid transition-all duration-300 ease-out',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
            {a}
          </p>
        </div>
      </div>
    </div>
  )
}

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl scroll-mt-24 px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="FAQ"
        title="Before you book"
        description="Quick answers to the questions we hear most."
      />

      <div className="mt-12 grid gap-3">
        {FAQS.map((f, i) => (
          <Reveal key={f.q} delay={i * 60}>
            <Item q={f.q} a={f.a} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
