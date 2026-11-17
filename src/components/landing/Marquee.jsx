import { WORDMARKS } from '../../data/content'

export default function Marquee() {
  const row = [...WORDMARKS, ...WORDMARKS]
  return (
    <section aria-label="Teams using WriteForm" className="overflow-hidden border-b border-ink/10 bg-cream py-5 marquee-paused">
      <div className="flex items-center gap-10">
        <p className="hidden shrink-0 pl-6 font-mono text-[9px] font-medium uppercase leading-relaxed tracking-[0.25em] text-ink/45 md:block">
          Intake desks at<br />40,000+ teams
        </p>
        <div className="relative flex-1 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div className="marquee flex items-center gap-12 whitespace-nowrap">
            {row.map((name, i) => (
              <span key={`${name}-${i}`} aria-hidden={i >= WORDMARKS.length} className="font-display text-lg font-bold tracking-tight text-ink/30 transition-colors hover:text-ink/60">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
