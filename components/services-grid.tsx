import {
  Mic2,
  SlidersHorizontal,
  Gauge,
  Megaphone,
  AudioWaveform,
  Wand2,
  ArrowUpRight,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'

type Service = {
  icon: LucideIcon
  title: string
  description: string
  price: string
}

const SERVICES: Service[] = [
  {
    icon: Mic2,
    title: 'Recording',
    description:
      'Tracking vocals and live instruments in a treated booth with pristine signal chains and zero-latency monitoring.',
    price: '₦25,000 / session',
  },
  {
    icon: SlidersHorizontal,
    title: 'Mixing',
    description:
      'Analog-modeled mixing with detailed stem processing, automation, and depth that translates on every system.',
    price: '₦40,000 / track',
  },
  {
    icon: Gauge,
    title: 'Mastering',
    description:
      'Streaming-optimized mastering tuned for Spotify, Apple Music, and YouTube loudness targets.',
    price: '₦18,000 / track',
  },
  {
    icon: Megaphone,
    title: 'Jingles & Sound Branding',
    description:
      'Memorable audio logos, radio jingles, and sonic identities crafted for brands and campaigns.',
    price: 'from ₦60,000',
  },
  {
    icon: AudioWaveform,
    title: 'Audio Content Enhancement',
    description:
      'Noise reduction, clarity, and loudness for podcasts, audiobooks, and voiceover content.',
    price: 'from ₦15,000',
  },
  {
    icon: Wand2,
    title: 'Vocal Tuning & Editing',
    description:
      'Transparent pitch correction, timing alignment, comping, and detailed vocal editing.',
    price: '₦12,000 / track',
  },
]

export function ServicesGrid() {
  return (
    <section id="services" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="What we do"
        title="Services engineered for the release"
        description="A full production pipeline under one roof — from the first take to the final master."
      />

      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service, i) => (
          <Reveal key={service.title} delay={i * 70} as="article">
            <div className="group glass glow-hover flex h-full flex-col rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-xl border border-border bg-muted/40 text-primary transition-colors group-hover:border-primary/40">
                  <service.icon className="size-6" />
                </span>
                <ArrowUpRight className="size-5 text-muted-foreground transition-colors group-hover:text-primary" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">
                {service.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                <span className="text-sm font-semibold text-foreground">
                  {service.price}
                </span>
                <a
                  href="#studio-booth"
                  className="text-sm font-medium text-primary transition-opacity hover:opacity-80"
                >
                  Get Started
                </a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
