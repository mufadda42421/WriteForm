import { FEATURES } from '../../data/content'

export default function Features() {
  return (
    <section id="features" className="border-b border-ink/10 bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-amber">What’s inside</p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl">Small tool.<br />Complete loop.</h2>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <article key={f.tag} className="group rounded-3xl border border-cream/10 bg-cream/[0.045] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cream/20 hover:bg-cream/[0.07]">
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-amber/80">{f.tag}</span>
              <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-cream">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/65">{f.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
