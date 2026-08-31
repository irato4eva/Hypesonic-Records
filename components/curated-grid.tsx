'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Play, Pause } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { cn } from '@/lib/utils'

type Cut = {
  id: string
  title: string
  artist: string
  genre: 'Afrobeats'
  duration: number
  seed: number
  src: string
  cover: string
}

// Real work — a curated slice of the full catalog in the Audio Portfolio
// section above, picked to show range (features, a solo cut, and the track
// where Ratty Bone appears as a credited artist, not just the engineer).
const CUTS: Cut[] = [
  { id: 'toxic', title: 'Toxic', artist: 'Reminisce, Adekunle Gold', genre: 'Afrobeats', duration: 172, seed: 51, src: '/audio/toxic.mp3', cover: '/covers/toxic.jpg' },
  { id: 'you-got-to-get-up', title: 'You Got to Get Up', artist: 'Rhoda Onuwaje, Ratty Bone', genre: 'Afrobeats', duration: 224, seed: 36, src: '/audio/you-got-to-get-up.mp3', cover: '/covers/you-got-to-get-up.jpg' },
  { id: 'badder', title: 'Badder', artist: 'Beatsbykarma', genre: 'Afrobeats', duration: 162, seed: 74, src: '/audio/badder.mp3', cover: '/covers/badder.jpg' },
  { id: 'pump-action', title: 'Pump Action', artist: 'Cyrus Tha Virus', genre: 'Afrobeats', duration: 226, seed: 87, src: '/audio/pump-action.mp3', cover: '/covers/pump-action.jpg' },
  { id: 'imade', title: 'Imade', artist: 'Qwin Tyler', genre: 'Afrobeats', duration: 180, seed: 141, src: '/audio/imade.mp3', cover: '/covers/imade.jpg' },
  { id: 'gaddafi', title: 'Gaddafi', artist: 'Golden 6ix', genre: 'Afrobeats', duration: 161, seed: 54, src: '/audio/gaddafi.mp3', cover: '/covers/gaddafi.jpg' },
]

const GENRE_STYLES: Record<Cut['genre'], string> = {
  Afrobeats: 'border-primary/40 bg-primary/10 text-primary',
}

function makeBars(seed: number, count = 40) {
  const bars: number[] = []
  let x = seed * 9973
  for (let i = 0; i < count; i++) {
    x = (x * 1103515245 + 12345) % 2147483648
    const base = (x / 2147483648) * 0.8 + 0.2
    const env = 0.5 + 0.5 * Math.sin((i / count) * Math.PI)
    bars.push(Math.min(1, base * env))
  }
  return bars
}

function Card({ cut }: { cut: Cut }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const bars = useMemo(() => makeBars(cut.seed), [cut.seed])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onTime = () => {
      if (audio.duration) setProgress(audio.currentTime / audio.duration)
    }
    const onEnd = () => {
      setPlaying(false)
      setProgress(0)
    }
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('ended', onEnd)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('ended', onEnd)
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
    } else {
      document.querySelectorAll('audio').forEach((el) => {
        if (el !== audio) el.pause()
      })
      audio.play()
    }
    setPlaying((p) => !p)
  }

  return (
    <div className="group glass glow-hover flex flex-col rounded-2xl p-5">
      <audio ref={audioRef} src={cut.src} preload="none" />
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative size-11 shrink-0 overflow-hidden rounded-lg">
            <Image src={cut.cover} alt={`${cut.title} cover art`} fill sizes="44px" className="object-cover" />
          </div>
          <div className="min-w-0">
            <h3 className="truncate font-display text-lg font-semibold">{cut.title}</h3>
            <p className="truncate text-sm text-muted-foreground">{cut.artist}</p>
          </div>
        </div>
        <span
          className={cn(
            'shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-medium',
            GENRE_STYLES[cut.genre],
          )}
        >
          {cut.genre}
        </span>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <button
          type="button"
          onClick={toggle}
          className="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground transition-transform hover:scale-105"
          aria-label={playing ? `Pause ${cut.title}` : `Play ${cut.title}`}
        >
          {playing ? <Pause className="size-5" /> : <Play className="size-5 translate-x-0.5" />}
        </button>

        <div className="flex h-10 flex-1 items-center gap-[2px]" aria-hidden>
          {bars.map((h, i) => {
            const played = i / bars.length <= progress
            return (
              <span
                key={i}
                className={cn(
                  'w-full rounded-full transition-colors',
                  played ? 'bg-primary' : 'bg-muted-foreground/25',
                )}
                style={{ height: `${Math.max(10, h * 100)}%` }}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function CuratedGrid() {
  return (
    <section id="showcase" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Curated cuts"
        title="Selected releases"
        description="Press play to preview real, released work from the studio."
      />

      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CUTS.map((cut, i) => (
          <Reveal key={cut.id} delay={i * 60}>
            <Card cut={cut} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
