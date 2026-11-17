import { useState } from 'react'
import {
  PenLine, Share2, BarChart3, Check, Star, Copy, Link2, Code2, FileDown, Keyboard, ListPlus, Eye, MoveVertical,
} from 'lucide-react'

const TABS = [
  { id: 'builder', label: 'Build', icon: PenLine },
  { id: 'share', label: 'Share & embed', icon: Share2 },
  { id: 'results', label: 'Results', icon: BarChart3 },
]

export default function AppTour() {
  const [tab, setTab] = useState('builder')

  return (
    <section id="tour" className="border-b border-ink/10 bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-coral">The platform, end to end</p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold leading-[1.02] tracking-tight text-ink sm:text-5xl">Everything is one click apart.</h2>

        {/* tab rail */}
        <div className="mt-8 inline-flex flex-wrap gap-2 rounded-2xl border border-ink/12 bg-cream p-2" role="tablist" aria-label="Tour the platform">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${tab === t.id ? 'bg-ink text-cream shadow-pop' : 'text-ink/60 hover:text-ink'}`}
            >
              <t.icon size={15} aria-hidden="true" /> {t.label}
            </button>
          ))}
        </div>

        {/* panels */}
        <div key={tab} className="menu-in mt-8 grid items-center gap-8 rounded-3xl border border-ink/12 bg-cream p-6 sm:p-8 lg:grid-cols-2">
          {tab === 'builder' && (
            <>
              <ul className="space-y-4">
                {[
                  { icon: ListPlus, text: 'Seven question types — short, long, choice, yes/no, rating, number and validated email' },
                  { icon: Keyboard, text: 'Keyboard-first editor flow: Tab through cards, reorder, duplicate, delete' },
                  { icon: MoveVertical, text: 'Drag-free reordering, duplicate and per-question required switches' },
                  { icon: Eye, text: 'A live preview renders the respondent experience as you type — pixel for pixel' },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sage-soft text-sage"><Icon size={16} aria-hidden="true" /></span>
                    <span className="leading-snug text-ink/80">{text}</span>
                  </li>
                ))}
              </ul>
              {/* mock: question card editor */}
              <div aria-hidden="true" className="rounded-2xl border border-ink/12 bg-paper p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="rounded-lg border border-ink/15 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-ink/55">Multiple choice</span>
                  <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.2em] text-ink/45">Required <i className="block h-4 w-7 rounded-full bg-sage p-0.5"><i className="block h-3 w-3 translate-x-3 rounded-full bg-white" /></i></span>
                </div>
                <p className="mt-3 border-b-2 border-coral/60 pb-2 font-display text-base font-bold text-ink">What stood out most?</p>
                {['Product quality', 'Delivery speed', 'Support', 'Price'].map((o, i) => (
                  <div key={o} className="mt-2 flex items-center gap-2 rounded-xl border border-ink/10 bg-cream px-3 py-2">
                    <span className="font-mono text-[9px] font-bold text-ink/40">{String.fromCharCode(65 + i)}</span>
                    <p className="text-xs text-ink/80">{o}</p>
                    <Check size={12} className="ml-auto text-sage" strokeWidth={3} />
                  </div>
                ))}
                <div className="mt-2 flex items-center justify-center gap-1 rounded-xl border border-dashed border-ink/25 py-1.5 text-[9px] font-bold uppercase tracking-wider text-ink/45">+ Add option</div>
              </div>
            </>
          )}

          {tab === 'share' && (
            <>
              <ul className="space-y-4">
                {[
                  { icon: Link2, text: 'One link is the whole publishing pipeline — the form travels inside the URL itself' },
                  { icon: Code2, text: 'A ready-made iframe snippet embeds your form on any website' },
                  { icon: Copy, text: 'One-click copy for the link, embed code or social posts' },
                  { icon: FileDown, text: 'Export the form definition as JSON — archive it or move it elsewhere' },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber/20 text-amber-800"><Icon size={16} aria-hidden="true" /></span>
                    <span className="leading-snug text-ink/80">{text}</span>
                  </li>
                ))}
              </ul>
              {/* mock: share sheet */}
              <div aria-hidden="true" className="rounded-2xl border border-ink/12 bg-paper p-4 shadow-sm">
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.25em] text-ink/45">Form link</p>
                <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-ink/12 bg-cream px-3 py-2.5">
                  <p className="min-w-0 flex-1 truncate font-mono text-[9px] text-ink/60">writeform.app#/f/eyJpZCI6Im…</p>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-ink text-cream"><Copy size={12} /></span>
                </div>
                <p className="mt-3 font-mono text-[9px] font-semibold uppercase tracking-[0.25em] text-ink/45">Embed</p>
                <pre className="mt-1.5 overflow-hidden rounded-xl border border-ink/12 bg-ink p-3 font-mono text-[8px] leading-relaxed text-amber/90">&lt;iframe src="…#/f/eyJpZCI6Im…"{'\n'}  width="100%" height="640"&gt;&lt;/iframe&gt;</pre>
                <div className="mt-3 flex gap-1.5">
                  {['X', 'in', 'WA', '@'].map((s) => (
                    <span key={s} className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink/15 bg-cream font-mono text-[9px] font-bold text-ink/60">{s}</span>
                  ))}
                  <span className="flex h-8 items-center justify-center gap-1 rounded-lg border border-ink/15 bg-cream px-2.5 font-mono text-[9px] font-bold text-ink/60"><FileDown size={10} /> JSON</span>
                </div>
              </div>
            </>
          )}

          {tab === 'results' && (
            <>
              <ul className="space-y-4">
                {[
                  { icon: BarChart3, text: 'Per-question rollups — star averages, choice bars, yes/no splits, number ranges' },
                  { icon: ListPlus, text: 'A raw table of every response, searchable and printable' },
                  { icon: FileDown, text: 'One-click CSV export — open in Numbers, Excel, Sheets or pandas' },
                  { icon: Check, text: 'Delete individual responses or wipe the set — your call, your device' },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-soft text-sky"><Icon size={16} aria-hidden="true" /></span>
                    <span className="leading-snug text-ink/80">{text}</span>
                  </li>
                ))}
              </ul>
              {/* mock: results dashboard */}
              <div aria-hidden="true" className="rounded-2xl border border-ink/12 bg-paper p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="font-display text-[13px] font-bold text-ink">Customer feedback</p>
                  <span className="rounded-lg bg-ink px-2.5 py-1 font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-amber">CSV</span>
                </div>
                <div className="mt-3 flex items-end gap-3 rounded-xl border border-ink/10 bg-cream p-3">
                  <p className="font-display text-4xl font-bold tracking-tight text-ink">4.6</p>
                  <div className="mb-1 flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((n) => <Star key={n} size={12} className={n <= 4 ? 'fill-amber text-amber' : 'text-ink/20'} />)}
                  </div>
                  <p className="ml-auto font-mono text-[8px] uppercase tracking-[0.2em] text-ink/45">24 answers</p>
                </div>
                {[['Delivery speed', 58], ['Product quality', 30], ['Support', 12]].map(([label, pct]) => (
                  <div key={label} className="mt-2">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-ink/70">{label}</span><span className="font-mono text-[9px] text-ink/50">{pct}%</span>
                    </div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-ink/8">
                      <div className="h-full rounded-full bg-sage" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
