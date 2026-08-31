import { Quote } from 'lucide-react'
import { Reveal } from '@/components/reveal'

type Testimonial = {
  quote: string
  name: string
  role: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'They took my rough vocals and turned them into a record that slaps on every speaker. The low end finally translates.',
    name: 'Zara B.',
    role: 'Afrobeats artist',
  },
  {
    quote:
      'Fastest turnaround I have had in Benin City without cutting corners. The master hit exactly the loudness Spotify wanted.',
    name: 'K-Rime',
    role: 'Hip-Hop artist',
  },
  {
    quote:
      'Our brand jingle came back cleaner than the brief. Sound branding here is genuinely next level.',
    name: 'Amara E.',
    role: 'Creative Director, Brand Spot',
  },
]

const STATS: [string, string][] = [
  ['1,200+', 'Tracks mastered'],
  ['9', 'Years active'],
  ['48 hr', 'Avg turnaround'],
  ['320+', 'Artists served'],
]

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      {/* stats strip */}
      <Reveal className="glass grid grid-cols-2 gap-6 rounded-3xl px-6 py-10 sm:grid-cols-4 sm:px-10">
        {STATS.map(([value, label]) => (
          <div key={label} className="text-center">
            <p className="font-display text-3xl font-bold tracking-tight text-glow-cyan sm:text-4xl">
              {value}
            </p>
            <p className="mt-1.5 text-xs tracking-wide text-muted-foreground uppercase">
              {label}
            </p>
          </div>
        ))}
      </Reveal>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={i * 80} as="article">
            <figure className="glass flex h-full flex-col rounded-2xl p-6">
              <Quote className="size-7 text-primary/70" />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-bold text-primary-foreground">
                  {t.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-semibold">{t.name}</span>
                  <span className="block text-xs text-muted-foreground">
                    {t.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
