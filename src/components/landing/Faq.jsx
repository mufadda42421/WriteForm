import { useState } from 'react'
import { Plus } from 'lucide-react'
import { FAQS } from '../../data/content'

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="cv-auto border-b border-ink/10 bg-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-coral">FAQ</p>
          <h2 className="mt-3 font-display text-4xl font-bold leading-[1.02] tracking-tight text-ink sm:text-5xl">Honest<br />answers.</h2>
          <p className="mt-4 max-w-xs leading-relaxed text-ink/65">Everything about the local-first model — because that’s the part that’s different here.</p>
        </div>

        <div className="divide-y divide-ink/10 border-y border-ink/10">
          {FAQS.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-display text-lg font-bold tracking-tight text-ink">{item.q}</span>
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${isOpen ? 'rotate-45 border-coral bg-coral text-white' : 'border-ink/20 text-ink/60'}`}>
                    <Plus size={16} aria-hidden="true" />
                  </span>
                </button>
                {isOpen && (
                  <div id={`faq-panel-${i}`} role="region" className="menu-in pb-5">
                    <p className="max-w-2xl leading-relaxed text-ink/75">{item.a}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
