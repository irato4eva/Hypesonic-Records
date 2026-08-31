import Image from 'next/image'

const PLATFORMS = [
  { name: 'Spotify', src: '/platforms/spotify.svg' },
  { name: 'Apple Music', src: '/platforms/apple-music.svg' },
  { name: 'YouTube Music', src: '/platforms/youtube-music.svg' },
  { name: 'Audiomack', src: '/platforms/audiomack.svg' },
]

function Logo({ name, src }: { name: string; src: string }) {
  return (
    <div className="flex shrink-0 items-center gap-3 px-8">
      <Image
        src={src || '/placeholder.svg'}
        alt={`${name} logo`}
        width={28}
        height={28}
        className="size-7 opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
      />
      <span className="font-display text-sm font-medium tracking-wide text-muted-foreground">
        {name}
      </span>
    </div>
  )
}

export function DistributionStrip() {
  // duplicated once so the -50% translate loops seamlessly
  const loop = [...PLATFORMS, ...PLATFORMS]

  return (
    <section
      aria-label="Where our work is distributed"
      className="border-y border-border/60 py-10"
    >
      <p className="mb-6 text-center text-xs font-semibold tracking-[0.25em] text-muted-foreground uppercase">
        Where Our Work Lives
      </p>
      <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused]">
          {loop.map((p, i) => (
            <Logo key={`${p.name}-${i}`} name={p.name} src={p.src} />
          ))}
        </div>
      </div>
    </section>
  )
}
