'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { cn } from '@/lib/utils'

const FAQS = [
  {
    q: 'What is your typical turnaround time?',
    a: 'Turnaround depends on your package: 5–7 days for Essential Mix, 3–5 days for Signature Mix, and 48–72 hours for Flagship Mix + Master, counted from the moment payment is confirmed and your final stems are uploaded.',
  },
  {
    q: 'What is your revision policy?',
    a: 'Revisions depend on your package: 1 round for Essential Mix, 3 rounds for Signature Mix, and unlimited revisions for Flagship Mix + Master. Extra rounds or new creative directions on Essential and Signature are quoted upfront.',
  },
  {
    q: 'Which file formats do you accept and deliver?',
    a: 'Send stems as 24-bit WAV or AIFF at the session sample rate, with about 6 dB of headroom and no master-bus limiting. We deliver streaming-ready WAV plus MP3, and DDP for physical release on request.',
  },
  {
    q: 'How do payments and refunds work?',
    a: 'Payment is taken in full upfront to lock your slot and start work. Once a project has begun, payments are non-refundable, but unused prepaid sessions can be rescheduled.',
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
