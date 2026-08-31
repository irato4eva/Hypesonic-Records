'use client'

import { useState } from 'react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { WaveformPlayer, type Track } from '@/components/waveform-player'
import { cn } from '@/lib/utils'

// Real work — actual mixed/mastered/produced tracks with embedded cover art.
const TRACKS: Track[] = [
  { id: 'amina', title: 'Amina', artist: 'G.T', genre: 'Afrobeats', duration: 214, seed: 86, src: '/audio/amina.mp3', cover: '/covers/amina.jpg' },
  { id: 'badder', title: 'Badder', artist: 'Beatsbykarma', genre: 'Afrobeats', duration: 162, seed: 74, src: '/audio/badder.mp3', cover: '/covers/badder.jpg' },
  { id: 'expert', title: 'Expert', artist: 'Efaro', genre: 'Afrobeats', duration: 235, seed: 197, src: '/audio/expert.mp3', cover: '/covers/expert.jpg' },
  { id: 'eyez-on-the-medal', title: 'Eyez on the Medal', artist: 'Osi Perri', genre: 'Afrobeats', duration: 209, seed: 18, src: '/audio/eyez-on-the-medal.mp3', cover: '/covers/eyez-on-the-medal.jpg' },
  { id: 'gaddafi', title: 'Gaddafi', artist: 'Golden 6ix', genre: 'Afrobeats', duration: 161, seed: 54, src: '/audio/gaddafi.mp3', cover: '/covers/gaddafi.jpg' },
  { id: 'ggl', title: 'GGL', artist: 'Daas', genre: 'Afrobeats', duration: 161, seed: 187, src: '/audio/ggl.mp3', cover: '/covers/ggl.jpg' },
  { id: 'hello-e', title: 'Hello Ẹ', artist: 'Reminisce, Westsyde', genre: 'Afrobeats', duration: 99, seed: 136, src: '/audio/hello-e.mp3', cover: '/covers/hello-e.jpg' },
  { id: 'imade', title: 'Imade', artist: 'Qwin Tyler', genre: 'Afrobeats', duration: 180, seed: 141, src: '/audio/imade.mp3', cover: '/covers/imade.jpg' },
  { id: 'jembe', title: 'Jembe', artist: 'Casper Dollz', genre: 'Afrobeats', duration: 157, seed: 42, src: '/audio/jembe.mp3', cover: '/covers/jembe.jpg' },
  { id: 'jeje', title: 'Jeje', artist: 'Leon Brown', genre: 'Afrobeats', duration: 224, seed: 198, src: '/audio/jeje.mp3', cover: '/covers/jeje.jpg' },
  { id: 'jowu', title: 'Jowu', artist: 'Cyrus Tha Virus', genre: 'Afrobeats', duration: 170, seed: 114, src: '/audio/jowu.mp3', cover: '/covers/jowu.jpg' },
  { id: 'kokoti', title: 'Kokoti', artist: 'Cyrus Tha Virus', genre: 'Afrobeats', duration: 261, seed: 43, src: '/audio/kokoti.mp3', cover: '/covers/kokoti.jpg' },
  { id: 'masturbate', title: 'Masturbate', artist: 'Blessd Maxy', genre: 'Afrobeats', duration: 174, seed: 41, src: '/audio/masturbate.mp3', cover: '/covers/masturbate.jpg' },
  { id: 'pump-action', title: 'Pump Action', artist: 'Cyrus Tha Virus', genre: 'Afrobeats', duration: 226, seed: 87, src: '/audio/pump-action.mp3', cover: '/covers/pump-action.jpg' },
  { id: 'sango', title: 'Sango', artist: 'Shawn', genre: 'Afrobeats', duration: 209, seed: 22, src: '/audio/sango.mp3', cover: '/covers/sango.jpg' },
  { id: 'take-i-go-pay', title: 'Take I Go Pay', artist: 'Sunshine', genre: 'Afrobeats', duration: 211, seed: 139, src: '/audio/take-i-go-pay.mp3', cover: '/covers/take-i-go-pay.jpg' },
  { id: 'time', title: 'Time', artist: 'Shawn', genre: 'Afrobeats', duration: 252, seed: 55, src: '/audio/time.mp3', cover: '/covers/time.jpg' },
  { id: 'toxic', title: 'Toxic', artist: 'Reminisce, Adekunle Gold', genre: 'Afrobeats', duration: 172, seed: 51, src: '/audio/toxic.mp3', cover: '/covers/toxic.jpg' },
  { id: 'you-got-to-get-up', title: 'You Got to Get Up', artist: 'Rhoda Onuwaje, Ratty Bone', genre: 'Afrobeats', duration: 224, seed: 36, src: '/audio/you-got-to-get-up.mp3', cover: '/covers/you-got-to-get-up.jpg' },
  { id: 'your-type', title: 'Your Type', artist: 'Mihkey', genre: 'Afrobeats', duration: 227, seed: 88, src: '/audio/your-type.mp3', cover: '/covers/your-type.jpg' },
]

const FILTERS = ['All', 'Afrobeats'] as const

export function Portfolio() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All')
  const [expanded, setExpanded] = useState(false)

  const filtered =
    filter === 'All' ? TRACKS : TRACKS.filter((t) => t.genre === filter)
  const tracks = expanded ? filtered : filtered.slice(0, 6)

  return (
    <section id="portfolio" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Audio Portfolio"
          title="Hear the difference"
          description="Real, released work — recorded, mixed, mastered and produced by Ratty Bone."
        />

        {/* filter tags */}
        <Reveal className="mt-10 flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                filter === f
                  ? 'border-primary/50 bg-primary/10 text-primary'
                  : 'border-border text-muted-foreground hover:text-foreground',
              )}
              aria-pressed={filter === f}
            >
              {f}
            </button>
          ))}
        </Reveal>

        <div className="mt-8 grid gap-4">
          {tracks.map((track, i) => (
            <Reveal key={track.id} delay={i * 60}>
              <WaveformPlayer track={track} />
            </Reveal>
          ))}
        </div>

        {filtered.length > 6 && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((e) => !e)}
              className="rounded-full border border-border px-6 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              {expanded ? 'Show fewer tracks' : `Show all ${filtered.length} tracks`}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
