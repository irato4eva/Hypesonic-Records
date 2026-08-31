import { UploadCloud, ReceiptText, SlidersHorizontal, Download } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'

type Step = {
  icon: LucideIcon
  step: string
  title: string
  description: string
}

const STEPS: Step[] = [
  {
    icon: UploadCloud,
    step: '01',
    title: 'Upload Your Stems',
    description: 'Send raw tracks, references, and notes through the Studio Booth.',
  },
  {
    icon: ReceiptText,
    step: '02',
    title: 'Engineer Review & Quote',
    description: 'We assess the material and return a clear scope and fixed quote.',
  },
  {
    icon: SlidersHorizontal,
    step: '03',
    title: 'Mix / Master + Revisions',
    description: 'Detailed processing with revision rounds until it translates.',
  },
  {
    icon: Download,
    step: '04',
    title: 'Download Final Masters',
    description: 'Grab streaming-ready files and distribution formats, delivered.',
  },
]

export function ProcessStrip() {
  return (
    <section id="process" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="How it works"
        title="From stems to streaming in four steps"
        description="A transparent pipeline that turns booking into a simple, low-friction process."
      />

      <div className="relative mt-16">
        {/* glowing progress line (desktop) */}
        <div
          aria-hidden
          className="absolute top-7 right-[12.5%] left-[12.5%] hidden h-px lg:block"
          style={{
            background:
              'linear-gradient(90deg, transparent, color-mix(in oklab, var(--cyan) 60%, transparent), color-mix(in oklab, var(--violet) 60%, transparent), transparent)',
            boxShadow: '0 0 18px color-mix(in oklab, var(--cyan) 45%, transparent)',
          }}
        />

        <ol className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {STEPS.map((s, i) => (
            <Reveal key={s.step} delay={i * 90} as="li">
              <div className="flex flex-col items-center text-center">
                <span className="relative grid size-14 place-items-center rounded-full border border-primary/40 bg-background text-primary">
                  <s.icon className="size-6" />
                  <span className="absolute -top-1.5 -right-1.5 grid size-6 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary font-mono text-[10px] font-bold text-primary-foreground">
                    {s.step}
                  </span>
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 max-w-[15rem] text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
