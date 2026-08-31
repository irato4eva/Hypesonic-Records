'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'

type Gear = {
  name: string
  category: string
  image: string
  specs: string[]
}

const GEAR: Gear[] = [
  {
    name: 'Aurora C-87 Condenser',
    category: 'Microphone',
    image: '/gear/microphone.png',
    specs: ['Large-diaphragm', 'Cardioid / Omni / Fig-8', '20Hz – 20kHz', 'Class-A preamp'],
  },
  {
    name: 'Hypesonic 32-Channel Console',
    category: 'Mixing Console',
    image: '/gear/console.png',
    specs: ['32 analog channels', 'Discrete EQ per strip', 'Full recall', 'Summing bus'],
  },
  {
    name: 'Reference Monitors MK-III',
    category: 'Studio Monitors',
    image: '/gear/monitors.png',
    specs: ['3-way active', '8" woofer', 'Room correction', 'Flat response'],
  },
  {
    name: 'Outboard Rack Suite',
    category: 'Processing',
    image: '/gear/outboard.png',
    specs: ['Opto compressor', 'Tube EQ', 'Analog tape', 'Bus glue'],
  },
]

export function GearShowcase() {
  const scroller = useRef<HTMLDivElement>(null)

  const scrollBy = (dir: 1 | -1) => {
    scroller.current?.scrollBy({ left: dir * 360, behavior: 'smooth' })
  }

  return (
    <section id="gear" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-end justify-between gap-6">
          <SectionHeading
            align="left"
            eyebrow="Gear Showcase"
            title="Tools that earn their place"
            description="A curated hybrid rig — analog warmth meets digital precision."
          />
          <div className="hidden shrink-0 gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              className="grid size-11 place-items-center rounded-xl border border-border bg-muted/40 text-foreground transition-colors hover:border-primary/40 hover:text-primary"
              aria-label="Scroll gear left"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              className="grid size-11 place-items-center rounded-xl border border-border bg-muted/40 text-foreground transition-colors hover:border-primary/40 hover:text-primary"
              aria-label="Scroll gear right"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scroller}
        className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {/* leading spacer to align first card with max-w container on wide screens */}
        <div className="hidden shrink-0 xl:block xl:w-[max(0px,calc((100vw-80rem)/2))]" />
        {GEAR.map((gear) => (
          <article
            key={gear.name}
            className="group relative w-[300px] shrink-0 snap-start overflow-hidden rounded-2xl border border-border bg-card sm:w-[340px]"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={gear.image || '/placeholder.svg'}
                alt={gear.name}
                fill
                sizes="340px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

              {/* hover tooltip: specs */}
              <div className="absolute inset-x-3 bottom-3 translate-y-3 rounded-xl border border-border bg-popover/90 p-3 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <ul className="grid grid-cols-2 gap-1.5">
                  {gear.specs.map((spec) => (
                    <li
                      key={spec}
                      className="flex items-center gap-1.5 text-[11px] text-muted-foreground"
                    >
                      <span className="size-1 rounded-full bg-primary" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex items-center justify-between p-4">
              <div>
                <h3 className="font-display font-semibold">{gear.name}</h3>
                <p className="text-xs tracking-wide text-muted-foreground uppercase">
                  {gear.category}
                </p>
              </div>
              <span className="rounded-full border border-border px-2 py-0.5 text-[10px] tracking-wide text-muted-foreground uppercase">
                Hover
              </span>
            </div>
          </article>
        ))}
        <div className="w-2 shrink-0" />
      </div>
    </section>
  )
}
