import { useMemo, useState } from 'react'
import { ArrowLeft, Share2, Download, Trash2, Inbox, Star, ExternalLink, AlertCircle } from 'lucide-react'
import Logo from '../Logo'
import ShareModal from '../ShareModal'
import { useToast } from '../../lib/toast-context'
import { getForm, getCachedForm, loadResponses, clearResponses, saveResponses, formToCSV, downloadFile, shareUrl, effectiveQuestions } from '../../lib/store'

export default function Results({ formId }) {
  const { showToast } = useToast()
  const [form] = useState(() => getForm(formId) ?? getCachedForm(formId) ?? null)
  const [responses, setResponses] = useState(() => loadResponses(formId))
  const [shareOpen, setShareOpen] = useState(false)
  const [confirmClear, setConfirmClear] = useState(false)

  const effective = useMemo(() => (form ? effectiveQuestions(form) : []), [form])
  const summaries = useMemo(() => (form ? effective.map((q) => buildSummary(q, responses)) : []), [form, effective, responses])

  if (!form) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-sand/50 px-6 text-center">
        <AlertCircle size={36} className="text-ink/35" aria-hidden="true" />
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink">This form isn’t on this device</h1>
        <p className="mt-2 max-w-md text-ink/65">Results resolve against forms stored in this browser. Build one, share the link, and collect responses here to see them.</p>
        <a href="#/builder" className="sheen mt-6 rounded-2xl bg-ink px-6 py-3.5 font-bold text-cream">Open the builder</a>
      </div>
    )
  }

  const exportCSV = () => {
    if (responses.length === 0) { showToast('No responses to export yet'); return }
    const slug = (form.title || 'writeform').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'writeform'
    downloadFile(`${slug}-responses.csv`, formToCSV(form, responses), 'text/csv')
    showToast(`Exported ${responses.length} response${responses.length === 1 ? '' : 's'} as CSV`)
  }

  const handleClear = () => {
    clearResponses(form.id)
    setResponses([])
    setConfirmClear(false)
    showToast('All responses cleared from this browser')
  }

  const deleteOne = (responseId) => {
    const next = responses.filter((r) => r.id !== responseId)
    saveResponses(formId, next)
    setResponses(next)
  }

  const sorted = [...responses].sort((a, b) => b.submittedAt - a.submittedAt)

  return (
    <div className="min-h-screen bg-sand/50">
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <a href="#/forms" className="group inline-flex items-center gap-3 text-sm font-semibold text-ink/60 hover:text-ink">
            <ArrowLeft size={17} className="transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
            <Logo onDark={false} className="hidden scale-90 sm:inline-flex" />
            <span className="font-display font-bold text-ink sm:hidden">writeform</span>
          </a>
          <div className="flex items-center gap-2">
            <button type="button" onClick={exportCSV} className="inline-flex items-center gap-1.5 rounded-xl border border-ink/20 px-3 py-2 text-xs font-bold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream sm:text-sm">
              <Download size={14} aria-hidden="true" /> CSV
            </button>
            <button type="button" onClick={() => setShareOpen(true)} className="sheen inline-flex items-center gap-1.5 rounded-xl bg-coral px-3 py-2 text-xs font-bold text-white sm:text-sm">
              <Share2 size={14} aria-hidden="true" /> Share
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-coral">Responses — this device only</p>
            <h1 className="mt-2 truncate font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl" title={form.title}>{form.title || 'Untitled form'}</h1>
            <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45">{responses.length} response{responses.length === 1 ? '' : 's'} · stored locally</p>
          </div>
          {responses.length > 0 && (confirmClear ? (
            <span className="inline-flex items-center gap-2 rounded-xl border border-rose/40 bg-rose-soft px-3 py-2">
              <span className="text-[11px] font-bold text-rose">Erase all?</span>
              <button type="button" onClick={handleClear} className="rounded-lg bg-rose px-2.5 py-1.5 text-[10px] font-bold text-white">Erase</button>
              <button type="button" onClick={() => setConfirmClear(false)} className="rounded-lg px-2.5 py-1.5 text-[10px] font-bold text-rose">Keep</button>
            </span>
          ) : (
            <button type="button" onClick={() => setConfirmClear(true)} className="inline-flex items-center gap-1.5 rounded-xl border border-ink/15 px-3.5 py-2.5 text-xs font-bold text-ink/60 transition-colors hover:border-rose hover:text-rose">
              <Trash2 size={14} aria-hidden="true" /> Clear all
            </button>
          ))}
        </div>

        {responses.length === 0 ? (
          <div className="mt-12 flex flex-col items-center rounded-3xl border border-dashed border-ink/25 bg-cream/60 px-6 py-16 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sand"><Inbox size={28} className="text-ink/40" aria-hidden="true" /></span>
            <h2 className="mt-5 font-display text-2xl font-bold text-ink">Waiting for the first answer</h2>
            <p className="mt-1.5 max-w-sm text-ink/60">Share the form and responses will appear here, stored safely in this browser.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <a href={`#/f/${shareUrl(form).split('#/f/')[1]}`} className="inline-flex items-center gap-2 rounded-2xl bg-ink px-5 py-3 text-sm font-bold text-cream"><ExternalLink size={15} aria-hidden="true" /> Open the form</a>
              <button type="button" onClick={() => setShareOpen(true)} className="sheen inline-flex items-center gap-2 rounded-2xl bg-coral px-5 py-3 text-sm font-bold text-white"><Share2 size={15} aria-hidden="true" /> Share the link</button>
            </div>
          </div>
        ) : (
          <>
            {/* per-question summaries */}
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {summaries.map((s) => <SummaryCard key={s.id} summary={s} />)}
            </div>

            {/* raw table */}
            <section className="mt-8 overflow-hidden rounded-3xl border border-ink/12 bg-cream" aria-label="All responses">
              <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
                <h2 className="font-display font-bold text-ink">Every response</h2>
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-ink/40">Newest first</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-ink/10 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/50">
                      <th scope="col" className="px-4 py-3">When</th>
                      {effective.map((q) => <th key={q.id} scope="col" className="max-w-[220px] truncate px-4 py-3" title={q.label}>{q.label || '(untitled)'}</th>)}
                      <th scope="col" className="px-4 py-3 text-right">Del</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sorted.map((r) => (
                      <tr key={r.id} className="border-b border-ink/5 align-top last:border-0 hover:bg-paper">
                        <td className="whitespace-nowrap px-4 py-3 font-mono text-[10px] text-ink/55">{new Date(r.submittedAt).toLocaleString()}</td>
                        {effective.map((q) => (
                          <td key={q.id} className="max-w-[220px] px-4 py-3 text-ink/80"><span className="line-clamp-2 break-words">{formatAnswer(r.answers?.[q.id])}</span></td>
                        ))}
                        <td className="px-4 py-3 text-right">
                          <button type="button" onClick={() => deleteOne(r.id)} aria-label="Delete this response" className="rounded-lg p-2 text-ink/40 transition-colors hover:bg-rose-soft hover:text-rose"><Trash2 size={14} aria-hidden="true" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </main>

      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} form={form} />
    </div>
  )
}

function formatAnswer(value) {
  if (value === undefined || value === null || value === '') return '—'
  if (typeof value === 'boolean') return value ? 'Yes' : 'No'
  if (typeof value === 'number') return String(value)
  return String(value)
}

function buildSummary(question, responses) {
  const values = responses.map((r) => r.answers?.[question.id]).filter((v) => v !== undefined && v !== '' && v !== null)
  const base = { id: question.id, type: question.type, label: question.label || '(untitled)', values }

  if (question.type === 'rating') {
    const nums = values.map(Number).filter(Number.isFinite)
    const avg = nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0
    const dist = [1, 2, 3, 4, 5].map((star) => ({ star, count: nums.filter((n) => n === star).length }))
    return { ...base, avg, dist, answered: nums.length }
  }
  if (question.type === 'choice') {
    const options = question.options ?? []
    const counts = options.map((opt) => ({ label: opt, count: values.filter((v) => v === opt).length }))
    return { ...base, counts, answered: values.length }
  }
  if (question.type === 'yesno') {
    const yes = values.filter((v) => v === true).length
    const no = values.filter((v) => v === false).length
    return { ...base, yes, no, answered: yes + no }
  }
  if (question.type === 'number') {
    const nums = values.map(Number).filter(Number.isFinite)
    const avg = nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0
    return { ...base, avg, min: nums.length ? Math.min(...nums) : 0, max: nums.length ? Math.max(...nums) : 0, answered: nums.length }
  }
  return { ...base, answered: values.length }
}

function SummaryCard({ summary }) {
  return (
    <section className="rounded-3xl border border-ink/12 bg-cream p-5" aria-label={`Summary — ${summary.label}`}>
      <h3 className="line-clamp-2 min-h-[2.5rem] font-display text-base font-bold leading-snug tracking-tight text-ink" title={summary.label}>{summary.label}</h3>
      <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.25em] text-ink/45">{summary.answered} answered</p>

      {summary.type === 'rating' && (
        <div className="mt-4">
          <div className="flex items-end gap-3">
            <p className="font-display text-5xl font-bold tracking-tight text-ink">{summary.avg.toFixed(1)}</p>
            <div className="mb-1.5 flex gap-0.5" aria-hidden="true">
              {[1, 2, 3, 4, 5].map((n) => <Star key={n} size={16} className={summary.avg >= n - 0.25 ? 'fill-amber text-amber' : 'text-ink/20'} />)}
            </div>
          </div>
          <div className="mt-3 space-y-1.5">
            {summary.dist.map(({ star, count }) => {
              const pct = summary.answered ? (count / summary.answered) * 100 : 0
              return (
                <div key={star} className="flex items-center gap-2 text-xs">
                  <span className="w-3 font-mono font-bold text-ink/50">{star}</span>
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-ink/8"><div className="grow-bar h-full rounded-full bg-amber" style={{ width: `${pct}%` }} /></div>
                  <span className="w-6 text-right font-mono text-[10px] text-ink/55">{count}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {summary.type === 'choice' && (
        <div className="mt-4 space-y-2">
          {summary.counts.map(({ label, count }) => {
            const pct = summary.answered ? (count / summary.answered) * 100 : 0
            return (
              <div key={label}>
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="truncate text-ink/75" title={label}>{label}</span>
                  <span className="shrink-0 font-mono text-[10px] text-ink/55">{count} · {Math.round(pct)}%</span>
                </div>
                <div className="mt-1 h-2.5 overflow-hidden rounded-full bg-ink/8"><div className="grow-bar h-full rounded-full bg-sage" style={{ width: `${pct}%` }} /></div>
              </div>
            )
          })}
          {summary.counts.length === 0 && <p className="text-sm text-ink/50">No options defined.</p>}
        </div>
      )}

      {summary.type === 'yesno' && (
        <div className="mt-4">
          <div className="flex h-9 w-full overflow-hidden rounded-xl border border-ink/10 font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
            <div className="flex items-center justify-center bg-sage text-cream transition-all" style={{ width: `${summary.answered ? (summary.yes / summary.answered) * 100 : 50}%` }}>Yes {summary.yes}</div>
            <div className="flex flex-1 items-center justify-center bg-rose text-cream">No {summary.no}</div>
          </div>
        </div>
      )}

      {summary.type === 'number' && (
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          {[['Avg', summary.avg.toFixed(1)], ['Min', summary.min], ['Max', summary.max]].map(([k, v]) => (
            <div key={k} className="rounded-2xl border border-ink/10 bg-paper p-3">
              <p className="font-display text-2xl font-bold text-ink">{v}</p>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/45">{k}</p>
            </div>
          ))}
        </div>
      )}

      {['short', 'long', 'email'].includes(summary.type) && (
        <ul className="mt-3 max-h-40 space-y-1.5 overflow-y-auto pr-1">
          {summary.values.slice(-6).reverse().map((v, i) => (
            <li key={i} className="rounded-xl border border-ink/8 bg-paper px-3 py-2 text-sm leading-snug text-ink/80">{String(v)}</li>
          ))}
          {summary.values.length === 0 && <li className="text-sm text-ink/50">No answers yet.</li>}
          {summary.values.length > 6 && <li className="px-1 font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40">+ {summary.values.length - 6} earlier answers</li>}
        </ul>
      )}
    </section>
  )
}
