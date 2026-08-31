'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Play, Pause } from 'lucide-react'
import { cn } from '@/lib/utils'

/** Deterministic pseudo-random bar heights so SSR and client match. */
function makeBars(seed: number, count = 56) {
  const bars: number[] = []
  let x = seed * 9973
  for (let i = 0; i < count; i++) {
    x = (x * 1103515245 + 12345) % 2147483648
    const base = (x / 2147483648) * 0.8 + 0.2
    // gentle envelope so the middle is louder, like a real track
    const env = 0.55 + 0.45 * Math.sin((i / count) * Math.PI)
    bars.push(Math.min(1, base * env))
  }
  return bars
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export type Track = {
  id: string
  title: string
  artist: string
  genre: string
  duration: number // seconds, from the real file — used as a fallback until metadata loads
  seed: number
  src: string // real audio file, e.g. '/audio/toxic.mp3'
  cover?: string // real cover art, e.g. '/covers/toxic.jpg'
}

export function WaveformPlayer({ track }: { track: Track }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0) // 0..1
  const [duration, setDuration] = useState(track.duration)

  const bars = useMemo(() => makeBars(track.seed), [track.seed])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onTime = () => {
      if (audio.duration) setProgress(audio.currentTime / audio.duration)
    }
    const onLoaded = () => setDuration(audio.duration || track.duration)
    const onEnd = () => {
      setPlaying(false)
      setProgress(0)
    }

    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onLoaded)
    audio.addEventListener('ended', onEnd)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onLoaded)
      audio.removeEventListener('ended', onEnd)
    }
  }, [track.duration])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
    } else {
      // pause any other track currently playing on the page
      document.querySelectorAll('audio').forEach((el) => {
        if (el !== audio) el.pause()
      })
      audio.play()
    }
    setPlaying((p) => !p)
  }

  const seek = (index: number, count: number) => {
    const audio = audioRef.current
    if (!audio || !duration) return
    const t = (index / count) * duration
    audio.currentTime = t
    setProgress(index / count)
  }

  const current = progress * duration

  return (
    <div className="glass rounded-2xl p-5">
      <audio ref={audioRef} src={track.src} preload="none" />
      <div className="flex items-center gap-4">
        {track.cover ? (
          <div className="relative hidden size-12 shrink-0 overflow-hidden rounded-xl sm:block">
            <Image src={track.cover} alt={`${track.title} cover art`} fill sizes="48px" className="object-cover" />
          </div>
        ) : null}

        <button
          type="button"
          onClick={toggle}
          className="glow-hover grid size-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground"
          aria-label={playing ? `Pause ${track.title}` : `Play ${track.title}`}
        >
          {playing ? (
            <Pause className="size-5" />
          ) : (
            <Play className="size-5 translate-x-0.5" />
          )}
        </button>

        <div className="min-w-0 flex-1">
          <div className="min-w-0">
            <p className="truncate font-display font-semibold">{track.title}</p>
            <p className="truncate text-xs text-muted-foreground">
              {track.artist} · {track.genre}
            </p>
          </div>

          {/* waveform */}
          <div
            className="mt-3 flex h-14 items-center gap-[3px]"
            role="slider"
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
            tabIndex={0}
            onKeyDown={(e) => {
              const audio = audioRef.current
              if (!audio || !duration) return
              if (e.key === 'ArrowRight') audio.currentTime = Math.min(duration, audio.currentTime + duration * 0.05)
              if (e.key === 'ArrowLeft') audio.currentTime = Math.max(0, audio.currentTime - duration * 0.05)
            }}
          >
            {bars.map((h, i) => {
              const played = i / bars.length <= progress
              return (
                <button
                  key={i}
                  type="button"
                  tabIndex={-1}
                  onClick={() => seek(i, bars.length)}
                  className="group flex h-full flex-1 items-center"
                  aria-label={`Seek to ${Math.round((i / bars.length) * 100)}%`}
                >
                  <span
                    className={cn(
                      'w-full rounded-full transition-colors',
                      played
                        ? 'bg-primary'
                        : 'bg-muted-foreground/25 group-hover:bg-muted-foreground/40',
                    )}
                    style={{ height: `${Math.max(8, h * 100)}%` }}
                  />
                </button>
              )
            })}
          </div>

          <div className="mt-2 flex justify-between font-mono text-[11px] text-muted-foreground">
            <span>{formatTime(current)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
