import { Quote } from 'lucide-react'
import { TESTIMONIALS } from '../../data/content'

export default function Testimonials() {
  return (
    <section aria-label="What teams say" className="cv-auto border-b border-ink/10 bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-coral">Field notes</p>
        <h2 className="mt-3 font-display text-4xl font-bold leading-[1.02] tracking-tight text-ink sm:text-5xl">Answers,<br />not abandons.</h2>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="flex flex-col rounded-3xl border border-ink/12 bg-cream p-6">
              <Quote size={26} className="text-coral" aria-hidden="true" />
              <blockquote className="mt-4 leading-relaxed text-ink/80">“{t.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-ink/10 pt-4">
                <span className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${t.tint} font-display text-sm font-bold text-white`} aria-hidden="true">
                  {t.name.split(' ').map((p) => p[0]).slice(0, 2).join('')}
                </span>
                <span>
                  <span className="block text-sm font-bold text-ink">{t.name}</span>
                  <span className="block text-xs text-ink/55">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
