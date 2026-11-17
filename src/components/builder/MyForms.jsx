import { useState } from 'react'
import { ArrowLeft, Plus, BarChart3, Play, Share2, Trash2, Inbox, FileText } from 'lucide-react'
import Logo from '../Logo'
import ShareModal from '../ShareModal'
import { useToast } from '../../lib/toast-context'
import { loadForms, loadResponses, deleteForm, effectiveQuestions } from '../../lib/store'
import { THEMES } from '../../lib/themes'

export default function MyForms() {
  const { showToast } = useToast()
  const [forms, setForms] = useState(() => loadForms())
  const [shareForm, setShareForm] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const refresh = () => setForms(loadForms())

  const handleDelete = (form) => {
    deleteForm(form.id)
    setConfirmDelete(null)
    refresh()
    showToast(`“${form.title || 'Untitled form'}” deleted from this browser`)
  }

  return (
    <div className="min-h-screen bg-sand/50">
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <a href="#/" className="group inline-flex items-center gap-3 text-sm font-semibold text-ink/60 hover:text-ink">
            <ArrowLeft size={17} className="transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
            <Logo onDark={false} className="hidden scale-90 sm:inline-flex" />
            <span className="font-display font-bold text-ink sm:hidden">writeform</span>
          </a>
          <a href="#/builder" className="sheen inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-sm font-bold text-cream transition-transform hover:scale-[1.03]">
            <Plus size={16} aria-hidden="true" /> New form
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-coral">Workspace</p>
            <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">My forms</h1>
            <p className="mt-2 max-w-md text-ink/65">Everything you build lives in this browser. Open a form to build, share it, or read its responses.</p>
          </div>
        </div>

        {forms.length === 0 ? (
          <div className="mt-14 flex flex-col items-center rounded-3xl border border-dashed border-ink/25 bg-cream/60 px-6 py-16 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sand"><Inbox size={28} className="text-ink/40" aria-hidden="true" /></span>
            <h2 className="mt-5 font-display text-2xl font-bold text-ink">Nothing built yet</h2>
            <p className="mt-1.5 max-w-sm text-ink/60">Create your first form — it takes about a minute, or less with a template.</p>
            <a href="#/builder" className="sheen mt-6 inline-flex items-center gap-2 rounded-2xl bg-coral px-6 py-3.5 font-bold text-white transition-transform hover:scale-[1.04]"><Plus size={17} aria-hidden="true" /> Create your first form</a>
          </div>
        ) : (
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {forms.map((form) => {
              const count = loadResponses(form.id).length
              const accent = THEMES[form.theme]?.accent ?? THEMES.coral.accent
              return (
                <li key={form.id} className="group flex flex-col overflow-hidden rounded-3xl border border-ink/12 bg-cream transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <div className="h-2.5 w-full" style={{ background: accent }} aria-hidden="true" />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h2 className="truncate font-display text-xl font-bold tracking-tight text-ink" title={form.title}>{form.title || 'Untitled form'}</h2>
                        <p className="mt-0.5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-ink/45">
                          <FileText size={11} aria-hidden="true" /> {effectiveQuestions(form).length} questions · {count} response{count === 1 ? '' : 's'}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      <a href={`#/results/${form.id}`} className="inline-flex items-center gap-1.5 rounded-xl bg-ink px-3.5 py-2.5 text-xs font-bold text-cream transition-colors hover:bg-ink-2">
                        <BarChart3 size={14} aria-hidden="true" /> Results
                      </a>
                      <a href={`#/builder?id=${form.id}`} className="inline-flex items-center gap-1.5 rounded-xl border border-ink/20 px-3.5 py-2.5 text-xs font-bold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream">
                        <Play size={13} aria-hidden="true" /> Edit
                      </a>
                      <button type="button" onClick={() => setShareForm(form)} className="inline-flex items-center gap-1.5 rounded-xl border border-ink/20 px-3.5 py-2.5 text-xs font-bold text-ink transition-colors hover:border-coral hover:text-coral">
                        <Share2 size={13} aria-hidden="true" /> Share
                      </button>
                      {confirmDelete === form.id ? (
                        <span className="inline-flex items-center gap-1.5 rounded-xl border border-rose/40 bg-rose-soft px-3 py-2">
                          <span className="text-[11px] font-bold text-rose">Sure?</span>
                          <button type="button" onClick={() => handleDelete(form)} className="rounded-lg bg-rose px-2 py-1 text-[10px] font-bold text-white">Delete</button>
                          <button type="button" onClick={() => setConfirmDelete(null)} className="rounded-lg px-2 py-1 text-[10px] font-bold text-rose">Keep</button>
                        </span>
                      ) : (
                        <button type="button" onClick={() => setConfirmDelete(form.id)} aria-label="Delete form" className="ml-auto rounded-xl p-2.5 text-ink/40 transition-colors hover:bg-rose-soft hover:text-rose">
                          <Trash2 size={16} aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </main>

      <ShareModal open={!!shareForm} onClose={() => setShareForm(null)} form={shareForm} />
    </div>
  )
}
