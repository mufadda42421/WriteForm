import {
  MessageSquareHeart, CalendarCheck, Briefcase, Gauge, Rocket, ListChecks, ArrowRight,
} from 'lucide-react'
import { TEMPLATES } from '../../data/content'

const ICONS = { MessageSquareHeart, CalendarCheck, Briefcase, Gauge, Rocket, ListChecks }

export default function Templates() {
  return (
    <section id="templates" className="border-b border-ink/10 bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-coral">Templates</p>
            <h2 className="mt-3 font-display text-4xl font-bold leading-[1.02] tracking-tight text-ink sm:text-5xl">Start from a<br />good question.</h2>
          </div>
          <a href="#/builder" className="group inline-flex items-center gap-2 rounded-2xl border border-ink/20 px-5 py-3 text-sm font-bold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream">
            Or start blank <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TEMPLATES.map((t) => {
            const Icon = ICONS[t.icon] ?? MessageSquareHeart
            const count = t.build().length
            return (
              <a
                key={t.key}
                href={`#/builder?template=${t.key}`}
                className="group flex flex-col rounded-3xl border border-ink/12 bg-cream p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ink/30 hover:shadow-lift"
              >
                <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border ${t.tint}`}>
                  <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-ink">{t.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/65">{t.blurb}</p>
                <span className="mt-auto flex items-center justify-between pt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45">
                  {count} questions
                  <span className="inline-flex items-center gap-1.5 font-sans text-xs font-bold normal-case tracking-normal text-coral transition-transform group-hover:translate-x-1">
                    Use template <ArrowRight size={13} aria-hidden="true" />
                  </span>
                </span>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
