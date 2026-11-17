import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft, Save, Share2, Eye, Pencil, Plus, Trash2, Copy, ArrowUp, ArrowDown,
  Type, AlignLeft, ListChecks, CircleDot, Star, Mail, Hash, FileText, X,
} from 'lucide-react'
import Logo from '../Logo'
import Responder from '../Responder'
import { THEMES } from '../../lib/themes'
import ShareModal from '../ShareModal'
import { useToast } from '../../lib/toast-context'
import { QUESTION_TYPES, emptyForm, getForm, upsertForm, uid } from '../../lib/store'
import { TEMPLATES } from '../../data/content'

const TYPE_ICONS = {
  short: Type,
  long: AlignLeft,
  choice: ListChecks,
  yesno: CircleDot,
  rating: Star,
  email: Mail,
  number: Hash,
}

function initFromParams(params) {
  const templateKey = params?.get('template')
  const id = params?.get('id')
  if (id) {
    const saved = getForm(id)
    if (saved) return { ...saved, questions: saved.questions.map((q) => ({ ...q, options: [...(q.options ?? [])] })) }
  }
  if (templateKey) {
    const tpl = TEMPLATES.find((t) => t.key === templateKey)
    if (tpl) {
      const base = emptyForm()
      return { ...base, id: uid(), title: tpl.name, description: tpl.blurb, questions: tpl.build() }
    }
  }
  return emptyForm()
}

export default function Builder({ params }) {
  const { showToast } = useToast()
  const [draft, setDraft] = useState(() => initFromParams(params))
  const [shareOpen, setShareOpen] = useState(false)
  const [dirty, setDirty] = useState(false)
  const [tab, setTab] = useState('edit') // mobile: 'edit' | 'preview'

  const paramKey = params?.toString() ?? ''
  useEffect(() => {
    setDraft(initFromParams(new URLSearchParams(paramKey)))
    setDirty(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramKey])

  useEffect(() => {
    const handler = (e) => { if (dirty) { e.preventDefault(); e.returnValue = '' } }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [dirty])

  const update = (patch) => { setDraft((d) => ({ ...d, ...patch })); setDirty(true) }
  const updateQuestion = (qid, patch) => {
    setDraft((d) => ({ ...d, questions: d.questions.map((q) => (q.id === qid ? { ...q, ...patch } : q)) }))
    setDirty(true)
  }
  const moveQuestion = (index, dir) => {
    setDraft((d) => {
      const target = index + dir
      if (target < 0 || target >= d.questions.length) return d
      const questions = [...d.questions]
      const [item] = questions.splice(index, 1)
      questions.splice(target, 0, item)
      return { ...d, questions }
    })
    setDirty(true)
  }
  const removeQuestion = (qid) => { setDraft((d) => ({ ...d, questions: d.questions.filter((q) => q.id !== qid) })); setDirty(true) }
  const duplicateQuestion = (qid) => {
    setDraft((d) => {
      const i = d.questions.findIndex((q) => q.id === qid)
      if (i < 0) return d
      const clone = { ...d.questions[i], id: uid(), options: [...d.questions[i].options] }
      const questions = [...d.questions.slice(0, i + 1), clone, ...d.questions.slice(i + 1)]
      return { ...d, questions }
    })
    setDirty(true)
  }
  const addQuestion = (type) => {
    setDraft((d) => ({
      ...d,
      questions: [...d.questions, { id: uid(), type, label: type === 'choice' ? 'Pick one…' : '', required: true, options: type === 'choice' ? ['Option 1', 'Option 2'] : [] }],
    }))
    setDirty(true)
  }

  const save = () => {
    upsertForm(draft)
    setDirty(false)
    showToast('Form saved in this browser — find it under My forms')
  }

  const stats = useMemo(() => {
    const ownRequired = draft.questions.filter((q) => q.required).length
    return {
      n: draft.questions.length + (draft.askName === false ? 0 : 1),
      required: ownRequired + (draft.askName === false ? 0 : 1),
    }
  }, [draft.questions, draft.askName])

  const themeKeys = Object.keys(THEMES)

  return (
    <div className="min-h-screen bg-sand/50">
      {/* ---- builder chrome ---- */}
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[100rem] items-center justify-between gap-3 px-4 sm:px-6">
          <a href="#/" className="group inline-flex shrink-0 items-center gap-3 text-sm font-semibold text-ink/60 transition-colors hover:text-ink">
            <ArrowLeft size={17} className="transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
            <Logo onDark={false} className="pointer-events-none hidden sm:inline-flex scale-90" />
            <span className="sm:hidden font-display font-bold text-ink">writeform</span>
          </a>

          <p className="hidden min-w-0 truncate text-center font-mono text-[10px] uppercase tracking-[0.25em] text-ink/45 lg:block">
            {dirty ? '● Unsaved changes' : 'All changes saved'}
          </p>

          <div className="flex shrink-0 items-center gap-2">
            <button type="button" onClick={save} className="inline-flex items-center gap-1.5 rounded-xl border border-ink/20 px-3.5 py-2 text-xs font-bold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream sm:text-sm">
              <Save size={15} aria-hidden="true" /> <span className="hidden xs:inline">Save</span>
            </button>
            <button type="button" onClick={() => setShareOpen(true)} className="sheen inline-flex items-center gap-1.5 rounded-xl bg-coral px-3.5 py-2 text-xs font-bold text-white transition-transform hover:scale-[1.04] sm:text-sm">
              <Share2 size={15} aria-hidden="true" /> Share
            </button>
          </div>
        </div>

        {/* mobile edit/preview tabs */}
        <div className="flex border-t border-ink/10 xl:hidden">
          {[['edit', Pencil, 'Edit'], ['preview', Eye, 'Preview']].map(([key, Icon, label]) => (
            <button key={key} type="button" onClick={() => setTab(key)} aria-pressed={tab === key} className={`flex flex-1 items-center justify-center gap-2 py-2.5 text-sm font-bold transition-colors ${tab === key ? 'bg-ink text-cream' : 'text-ink/60'}`}>
              <Icon size={15} aria-hidden="true" /> {label}
            </button>
          ))}
        </div>
      </header>

      <div className="mx-auto grid max-w-[100rem] gap-6 px-4 py-6 sm:px-6 xl:grid-cols-[1fr_480px]">
        {/* ============ EDITOR ============ */}
        <div className={`${tab === 'edit' ? 'block' : 'hidden'} xl:block`}>
          {/* form settings */}
          <section className="rounded-3xl border border-ink/12 bg-cream p-5 shadow-sm sm:p-6" aria-label="Form settings">
            <label htmlFor="form-title" className="font-mono text-[9px] font-medium uppercase tracking-[0.3em] text-ink/45">Form title</label>
            <input
              id="form-title"
              value={draft.title}
              onChange={(e) => update({ title: e.target.value })}
              placeholder="Untitled form"
              className="mt-1.5 w-full border-b-2 border-transparent bg-transparent font-display text-2xl font-bold tracking-tight text-ink outline-none transition-colors placeholder-ink/25 focus:border-coral sm:text-3xl"
            />
            <label htmlFor="form-desc" className="mt-4 block font-mono text-[9px] font-medium uppercase tracking-[0.3em] text-ink/45">Description (optional)</label>
            <input
              id="form-desc"
              value={draft.description}
              onChange={(e) => update({ description: e.target.value })}
              placeholder="A short line respondents see before they start…"
              className="mt-1.5 w-full border-b-2 border-transparent bg-transparent text-ink/80 outline-none transition-colors placeholder-ink/30 focus:border-coral"
            />

            <div className="mt-5 flex flex-wrap items-start justify-between gap-6 border-t border-ink/10 pt-5">
              <label className="flex max-w-sm cursor-pointer items-start gap-3">
                <button
                  type="button"
                  role="switch"
                  aria-checked={draft.askName !== false}
                  aria-label="Ask for the respondent’s name first"
                  onClick={() => update({ askName: draft.askName === false })}
                  className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors ${draft.askName === false ? 'bg-ink/15' : 'bg-sage'}`}
                >
                  <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${draft.askName === false ? 'left-0.5' : 'left-[22px]'}`} />
                </button>
                <span>
                  <span className="block text-sm font-bold text-ink">Ask for a name first</span>
                  <span className="mt-0.5 block text-xs leading-snug text-ink/55">Every response opens with “Your name?” so you always know who answered. Toggle it off for anonymous forms.</span>
                </span>
              </label>
              <div>
                <p className="font-mono text-[9px] font-medium uppercase tracking-[0.3em] text-ink/45">Accent</p>
                <div className="mt-2 flex gap-2" role="radiogroup" aria-label="Form accent color">
                  {themeKeys.map((key) => (
                    <button
                      key={key}
                      type="button"
                      role="radio"
                      aria-checked={draft.theme === key}
                      aria-label={`Accent ${key}`}
                      onClick={() => update({ theme: key })}
                      className={`h-8 w-8 rounded-full transition-transform hover:scale-110 ${draft.theme === key ? 'scale-110 ring-2 ring-ink ring-offset-2 ring-offset-cream' : ''}`}
                      style={{ background: THEMES[key].accent }}
                    />
                  ))}
                </div>
                <p className="mt-3 font-mono text-[9px] uppercase leading-relaxed tracking-[0.2em] text-ink/40">{stats.n} question{stats.n === 1 ? '' : 's'} · {stats.required} required</p>
              </div>
            </div>
          </section>

          {/* question list */}
          <section className="mt-5 space-y-3" aria-label="Questions">
            {draft.questions.map((q, i) => {
              const Icon = TYPE_ICONS[q.type] ?? Type
              return (
                <article key={q.id} className="group rounded-3xl border border-ink/12 bg-cream p-4 shadow-sm transition-shadow focus-within:shadow-lift sm:p-5">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink font-mono text-[10px] font-bold text-amber">Q{i + 1}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-ink/15 bg-paper px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-ink/60">
                          <Icon size={11} aria-hidden="true" />
                          <select
                            value={q.type}
                            onChange={(e) => updateQuestion(q.id, { type: e.target.value, options: e.target.value === 'choice' && q.options.length === 0 ? ['Option 1', 'Option 2'] : q.options })}
                            className="bg-transparent font-mono text-[9px] font-semibold uppercase tracking-[0.18em] outline-none"
                            aria-label="Question type"
                          >
                            {QUESTION_TYPES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
                          </select>
                        </span>
                        <label className="ml-auto inline-flex cursor-pointer items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/55">
                          Required
                          <button
                            type="button"
                            role="switch"
                            aria-checked={q.required}
                            aria-label="Toggle required"
                            onClick={() => updateQuestion(q.id, { required: !q.required })}
                            className={`relative h-6 w-11 rounded-full transition-colors ${q.required ? 'bg-sage' : 'bg-ink/15'}`}
                          >
                            <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${q.required ? 'left-[22px]' : 'left-0.5'}`} />
                          </button>
                        </label>
                      </div>

                      <input
                        value={q.label}
                        onChange={(e) => updateQuestion(q.id, { label: e.target.value })}
                        placeholder="Ask something memorable…"
                        aria-label={`Question ${i + 1} label`}
                        className="mt-2 w-full rounded-xl border border-transparent bg-transparent px-2 py-2 font-display text-lg font-semibold leading-snug text-ink outline-none transition-all placeholder-ink/25 hover:border-ink/10 focus:border-coral focus:bg-paper"
                      />

                      {/* options editor for choice questions */}
                      {q.type === 'choice' && (
                        <div className="mt-2 space-y-2">
                          {q.options.map((option, oi) => (
                            <div key={oi} className="flex items-center gap-2">
                              <span className="w-5 text-center font-mono text-[10px] font-bold text-ink/40">{String.fromCharCode(65 + oi)}</span>
                              <input
                                value={option}
                                onChange={(e) => updateQuestion(q.id, { options: q.options.map((o, j) => (j === oi ? e.target.value : o)) })}
                                aria-label={`Option ${oi + 1}`}
                                className="min-w-0 flex-1 rounded-lg border border-ink/12 bg-paper px-3 py-2 text-sm outline-none focus:border-coral"
                              />
                              <button type="button" onClick={() => updateQuestion(q.id, { options: q.options.filter((_, j) => j !== oi) })} aria-label={`Remove option ${oi + 1}`} className="rounded-lg p-2 text-ink/40 transition-colors hover:bg-rose-soft hover:text-rose">
                                <X size={14} aria-hidden="true" />
                              </button>
                            </div>
                          ))}
                          {q.options.length < 12 && (
                            <button type="button" onClick={() => updateQuestion(q.id, { options: [...q.options, `Option ${q.options.length + 1}`] })} className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-ink/25 px-3 py-2 text-xs font-semibold text-ink/60 transition-colors hover:border-coral hover:text-coral">
                              <Plus size={13} aria-hidden="true" /> Add option
                            </button>
                          )}
                        </div>
                      )}

                      {/* row actions */}
                      <div className="mt-3 flex items-center gap-1 border-t border-ink/8 pt-3">
                        <button type="button" onClick={() => moveQuestion(i, -1)} disabled={i === 0} aria-label="Move question up" className="rounded-lg p-2 text-ink/45 transition-colors hover:bg-ink/5 hover:text-ink disabled:opacity-25"><ArrowUp size={15} aria-hidden="true" /></button>
                        <button type="button" onClick={() => moveQuestion(i, 1)} disabled={i === draft.questions.length - 1} aria-label="Move question down" className="rounded-lg p-2 text-ink/45 transition-colors hover:bg-ink/5 hover:text-ink disabled:opacity-25"><ArrowDown size={15} aria-hidden="true" /></button>
                        <button type="button" onClick={() => duplicateQuestion(q.id)} aria-label="Duplicate question" className="rounded-lg p-2 text-ink/45 transition-colors hover:bg-ink/5 hover:text-ink"><Copy size={15} aria-hidden="true" /></button>
                        <button type="button" onClick={() => removeQuestion(q.id)} aria-label="Delete question" className="ml-auto rounded-lg p-2 text-ink/45 transition-colors hover:bg-rose-soft hover:text-rose"><Trash2 size={15} aria-hidden="true" /></button>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}

            {draft.questions.length === 0 && (
              <div className="rounded-3xl border border-dashed border-ink/25 p-10 text-center">
                <FileText size={30} className="mx-auto text-ink/30" aria-hidden="true" />
                <p className="mt-3 font-display font-bold text-ink">No questions yet</p>
                <p className="mt-1 text-sm text-ink/55">Add your first question below — you’ll see it appear in the preview instantly.</p>
              </div>
            )}
          </section>

          {/* add question bar */}
          <section className="mt-5 rounded-3xl border border-ink/12 bg-cream p-4 sm:p-5" aria-label="Add a question">
            <p className="font-mono text-[9px] font-medium uppercase tracking-[0.3em] text-ink/45">Add a question</p>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-7">
              {QUESTION_TYPES.map((t) => {
                const Icon = TYPE_ICONS[t.id]
                return (
                  <button key={t.id} type="button" onClick={() => addQuestion(t.id)} title={t.hint} className="group flex flex-col items-center gap-1.5 rounded-2xl border border-ink/12 bg-paper px-2 py-3 text-[10px] font-semibold text-ink/65 transition-all hover:-translate-y-0.5 hover:border-coral hover:text-coral hover:shadow-lift">
                    <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                    <span className="leading-tight text-center">{t.label}</span>
                  </button>
                )
              })}
            </div>
          </section>
        </div>

        {/* ============ LIVE PREVIEW ============ */}
        <div className={`${tab === 'preview' ? 'block' : 'hidden'} xl:block`}>
          <div className="xl:sticky xl:top-24">
            <div className="mb-2 flex items-center justify-between px-1">
              <p className="inline-flex items-center gap-2 font-mono text-[9px] font-medium uppercase tracking-[0.3em] text-ink/50">
                <span className="h-2 w-2 animate-pulse rounded-full bg-sage" aria-hidden="true" /> Live preview — exactly what people see
              </p>
              <button type="button" onClick={() => setShareOpen(true)} className="text-[10px] font-bold uppercase tracking-[0.2em] text-coral hover:text-coral-deep">Get the link →</button>
            </div>
            <div className="h-[34rem] sm:h-[38rem]">
              <Responder form={draft} storage={false} compact />
            </div>
          </div>
        </div>
      </div>

      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} form={draft} />
    </div>
  )
}
