import { Reveal } from '@/components/reveal'
import { cn } from '@/lib/utils'

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
}: {
  eyebrow: string
  title: string
  description?: string
  align?: 'center' | 'left'
}) {
  return (
    <Reveal
      className={cn(
        'flex max-w-2xl flex-col',
        align === 'center' ? 'mx-auto items-center text-center' : 'items-start text-left',
      )}
    >
      <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
        <span className="h-px w-6 bg-primary/60" />
        {eyebrow}
      </span>
      <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base text-pretty text-muted-foreground">
          {description}
        </p>
      ) : null}
    </Reveal>
  )
}
