import { Reveal } from '@/components/reveal'

// TODO: add real client testimonials here once you have them — removed the
// placeholder quotes (fake names, fake company) rather than leave fabricated
// reviews live on the site.

// Only stats we can actually stand behind right now. TODO: add back
// 'Avg turnaround' and 'Artists served' once you have real figures —
// removed rather than show made-up numbers.
const STATS: [string, string][] = [
  ['9', 'Years active'],
  ['20+', 'Tracks in portfolio'],
]

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      {/* stats strip */}
      <Reveal className="glass grid grid-cols-2 gap-6 rounded-3xl px-6 py-10 sm:px-10">
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
    </section>
  )
}
