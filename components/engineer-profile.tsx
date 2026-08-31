import Image from 'next/image'
import { Headphones, Award, Music4, Sparkles } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'

const STATS = [
  { icon: Award, value: '9+ yrs', label: 'Production experience' },
  { icon: Music4, value: '400+', label: 'Tracks mixed & mastered' },
  { icon: Headphones, value: 'Afro · Hip-Hop · Pop', label: 'Specialty genres' },
]

export function EngineerProfile() {
  return (
    <section id="team" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Behind the board"
        title="The ears behind the sound"
        description="Every master leaves the room signed off by an engineer who lives and breathes the craft."
      />

      <div className="mt-14 mx-auto max-w-4xl">
        {/* Lead engineer — Irato Oremi Onuwaje AKA Ratty Bone */}
        <Reveal as="article">
          <div className="glass relative h-full overflow-hidden rounded-3xl">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-primary/20"
              style={{
                boxShadow:
                  'inset 0 0 60px -20px color-mix(in oklab, var(--cyan) 45%, transparent)',
              }}
            />
            <div className="grid gap-0 sm:grid-cols-[minmax(0,280px)_1fr]">
              <div className="relative aspect-square sm:aspect-auto">
                <Image
                  src="/team/irato-onuwaje.jpg"
                  alt="Portrait of lead engineer Irato Oremi Onuwaje, known as Ratty Bone"
                  fill
                  sizes="(max-width: 640px) 100vw, 280px"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-panel via-transparent to-transparent sm:bg-gradient-to-r"
                />
              </div>

              <div className="flex flex-col p-7">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  <Sparkles className="size-3.5" />
                  Lead Producer & Engineer
                </span>
                <h3 className="mt-4 font-display text-3xl font-bold">
                  Irato Oremi Onuwaje
                </h3>
                <p className="text-sm font-medium text-primary/80">
                  AKA Ratty Bone
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Over 9 years shaping records across production, mixing, and
                  mastering. An FL Studio power user with a Yamaha HS8 monitoring
                  chain, Ratty Bone is known for punchy low-end, vocals that sit
                  perfectly, and masters that hold up on every system.
                </p>

                <dl className="mt-6 grid grid-cols-1 gap-3 border-t border-border pt-6 sm:grid-cols-3">
                  {STATS.map((s) => (
                    <div key={s.label} className="flex flex-col gap-1">
                      <s.icon className="size-4 text-primary" />
                      <dt className="font-display text-base font-semibold text-foreground">
                        {s.value}
                      </dt>
                      <dd className="text-xs text-muted-foreground">{s.label}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

