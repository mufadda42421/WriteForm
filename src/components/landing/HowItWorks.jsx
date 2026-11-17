import { PencilRuler, Share2, Inbox, ArrowRight } from 'lucide-react'

const STEPS = [
  {
    n: '1',
    icon: PencilRuler,
    title: 'Build',
    body: 'Start blank or from a template. Add questions of any of seven types, flip required switches, reorder with a tap.',
    chip: 'bg-sage-soft text-sage border-sage/25',
  },
  {
    n: '2',
    icon: Share2,
    title: 'Share',
    body: 'One click copies a link that contains the entire form. Paste it in email, Slack, social — or embed it as an iframe.',
    chip: 'bg-amber/15 text-amber-800 border-amber/40',
  },
  {
    n: '3',
    icon: Inbox,
    title: 'Read',
    body: 'Responses land locally and summarize themselves. Review them on this device and export clean CSV whenever you need.',
    chip: 'bg-sky-soft text-sky border-sky/25',
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="border-b border-ink/10 bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-coral">How it works</p>
            <h2 className="mt-3 font-display text-4xl font-bold leading-[1.02] tracking-tight text-ink sm:text-5xl">Build. Share.<br />Read.</h2>
          </div>
          <a href="#/builder" className="group inline-flex items-center gap-2 rounded-2xl border border-ink/20 px-5 py-3 text-sm font-bold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream">
            Open the builder <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </div>

        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {STEPS.map((step) => (
            <li key={step.n} className="group relative overflow-hidden rounded-3xl border border-ink/12 bg-cream p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-7">
              <span aria-hidden="true" className="pointer-events-none absolute -right-3 -top-6 font-display text-[7rem] font-bold leading-none text-ink/[0.06] transition-colors group-hover:text-coral/15">{step.n}</span>
              <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border ${step.chip}`}>
                <step.icon size={22} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-ink">{step.title}</h3>
              <p className="mt-2 max-w-xs leading-relaxed text-ink/70">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
