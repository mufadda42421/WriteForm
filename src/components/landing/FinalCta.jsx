import { ArrowRight } from 'lucide-react'

export default function FinalCta() {
  return (
    <section className="border-b border-ink/10 bg-paper px-4 py-14 sm:px-6 sm:py-16">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-ink/15 bg-ink px-6 py-16 text-center text-cream sm:px-10 sm:py-20">
        <div aria-hidden="true" className="hatch absolute bottom-0 left-0 right-0 h-2 opacity-80" />
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-amber">Free forever</p>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-bold leading-[1.0] tracking-tight sm:text-6xl">
          Your next form is one Enter key away.
        </h2>
        <a href="#/builder" className="sheen group mt-8 inline-flex items-center gap-2 rounded-2xl bg-coral px-9 py-4 text-lg font-bold text-white transition-transform hover:scale-[1.04]">
          Create your form <ArrowRight size={19} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </a>
        <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.3em] text-cream/40">No signup · No limits · Your data stays here</p>
      </div>
    </section>
  )
}
