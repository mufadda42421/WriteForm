import { ArrowRight, MapPin, Hammer, Check, Plus, Star, Share2, HardDrive, MousePointer2 } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-ink/10 bg-paper">
      <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-60" />
      <div aria-hidden="true" className="absolute -left-24 top-24 h-72 w-72 rounded-full border-[22px] border-amber/40" />
      <div aria-hidden="true" className="absolute -right-28 bottom-10 h-80 w-80 rounded-full border border-dashed border-ink/20" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-[1.02fr_1fr] lg:gap-14">
        {/* Left column — pitch */}
        <div className="max-w-xl">
          <span className="fade-up inline-flex items-center gap-2 rounded-full border border-ink/15 bg-cream px-4 py-2 font-mono text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.28em] text-ink/70 shadow-pop">
            <span className="h-2 w-2 rounded-full bg-coral" aria-hidden="true" /> The free form platform
          </span>

          <h1 className="fade-up fade-up-1 mt-6 font-display text-[2.7rem] font-bold leading-[0.98] tracking-tight text-ink sm:text-6xl xl:text-[4.3rem]">
            Make the form.<br />
            Share the link.<br />
            <span className="relative inline-block text-coral">
              Keep the answers.
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 320 14" fill="none" aria-hidden="true">
                <path d="M4 10c90-6 200-6 312 0" stroke="#FFB423" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="fade-up fade-up-2 mt-6 max-w-md text-lg leading-relaxed text-ink/75">
            WriteForm is a complete platform for building, sharing and answering forms —
            free forever, entirely inside your browser. No accounts, no servers, no fuss.
          </p>

          <div className="fade-up fade-up-3 mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#/builder" className="sheen inline-flex items-center justify-center gap-2 rounded-2xl bg-ink px-7 py-4 font-bold text-cream transition-transform hover:scale-[1.03]">
              Create your form — free <ArrowRight size={17} aria-hidden="true" />
            </a>
            <button type="button" onClick={() => document.getElementById('tour')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-ink/20 px-7 py-4 font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream">
              See everything inside
            </button>
          </div>

          <p className="fade-up fade-up-4 mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/45">
            <MapPin size={12} aria-hidden="true" /> No signup <span aria-hidden="true">·</span> <Hammer size={12} aria-hidden="true" /> Works offline <span aria-hidden="true">·</span> No paywalls
          </p>
        </div>

        {/* Right column — the platform at a glance (pure CSS) */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="bob relative">
            {/* floating chips */}
            <div aria-hidden="true" className="absolute -left-3 -top-4 z-10 flex rotate-[-3deg] items-center gap-1.5 rounded-xl border border-ink/12 bg-cream px-3 py-2 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-ink/75 shadow-pop">
              <Share2 size={11} className="text-coral" /> Link copied
            </div>
            <div aria-hidden="true" className="absolute -right-3 top-1/3 z-10 flex rotate-[2.5deg] items-center gap-1.5 rounded-xl border border-ink/12 bg-ink px-3 py-2 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-amber shadow-pop">
              <HardDrive size={11} /> Saved locally
            </div>

            {/* app window mock */}
            <div aria-hidden="true" className="overflow-hidden rounded-3xl border border-ink/15 bg-cream shadow-card">
              <div className="flex items-center gap-3 border-b border-ink/10 bg-paper px-4 py-2.5">
                <span className="flex gap-1.5">
                  <i className="h-2.5 w-2.5 rounded-full bg-coral/80" /><i className="h-2.5 w-2.5 rounded-full bg-amber" /><i className="h-2.5 w-2.5 rounded-full bg-sage" />
                </span>
                <p className="mx-auto font-mono text-[9px] uppercase tracking-[0.25em] text-ink/40">writeform · builder</p>
              </div>
              <div className="grid grid-cols-[1fr_1.1fr] gap-0">
                {/* editor pane */}
                <div className="border-r border-ink/10 p-4">
                  <p className="font-display text-[13px] font-bold text-ink">Customer feedback</p>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2 rounded-xl border border-sage/40 bg-sage-soft/60 px-2.5 py-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded bg-sage text-[10px] font-bold text-white"><Check size={11} strokeWidth={3.5} /></span>
                      <p className="truncate text-[10px] font-semibold text-ink/80">Your name?</p>
                    </div>
                    <div className="flex items-center gap-2 rounded-xl border border-ink/15 bg-paper px-2.5 py-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded bg-ink font-mono text-[8px] font-bold text-amber">Q2</span>
                      <p className="truncate text-[10px] font-semibold text-ink/80">How did your last order feel?</p>
                    </div>
                    <div className="flex items-center gap-2 rounded-xl border border-ink/15 bg-paper px-2.5 py-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded bg-ink font-mono text-[8px] font-bold text-amber">Q3</span>
                      <p className="truncate text-[10px] font-semibold text-ink/80">What stood out most?</p>
                    </div>
                    <div className="flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-ink/25 px-2.5 py-2 text-[9px] font-bold uppercase tracking-wider text-ink/45">
                      <Plus size={11} /> Add question
                    </div>
                  </div>
                </div>
                {/* live preview pane */}
                <div className="flex flex-col bg-ink p-4">
                  <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-2/3 rounded-full bg-amber" style={{ animation: 'grow-bar 1.6s ease both' }} />
                  </div>
                  <p className="mt-4 font-mono text-[8px] uppercase tracking-[0.28em] text-amber">Live preview</p>
                  <p className="mt-1.5 font-display text-[13px] font-bold leading-snug text-cream">How did your last order feel?</p>
                  <div className="mt-2.5 flex gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star key={n} size={15} className={n <= 4 ? 'fill-amber text-amber' : 'text-cream/25'} />
                    ))}
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <span className="font-mono text-[8px] uppercase tracking-[0.28em] text-cream/40">2 / 5</span>
                    <span className="rounded-md bg-coral px-2.5 py-1.5 text-[9px] font-bold text-white">OK →</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-4 flex items-center justify-center gap-2 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-ink/45">
              <MousePointer2 size={12} aria-hidden="true" /> Real app · click anything
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
