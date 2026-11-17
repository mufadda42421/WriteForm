import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, ArrowLeft, RotateCcw, Star, CheckCircle2 } from 'lucide-react'
import { addResponse, effectiveQuestions } from '../lib/store'
import { THEMES } from '../lib/themes'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const CONFETTI_COLORS = ['#FF4B1F', '#FFB423', '#2E5B47', '#2D6A8F', '#C2483D', '#F4D8A8']

export default function Responder({ form, storage = true, compact = false, onSubmit }) {
  const theme = THEMES[form?.theme] ?? THEMES.coral
  const questions = effectiveQuestions(form)
  const [step, setStep] = useState(0) // 0 welcome · 1..n questions · n+1 end
  const [answers, setAnswers] = useState({})
  const [error, setError] = useState('')
  const inputRef = useRef(null)
  const rootRef = useRef(null)

  const current = questions[step - 1] ?? null
  const total = questions.length
  const hasOwnTextInput = current ? ['short', 'long', 'email', 'number'].includes(current.type) : false

  useEffect(() => {
    setError('')
    if (hasOwnTextInput) inputRef.current?.focus({ preventScroll: true })
    else rootRef.current?.focus({ preventScroll: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])
  const progress = step === 0 ? 0 : step > total ? 100 : (step / (total + 1)) * 100

  const value = current ? answers[current.id] : undefined

  const valid = (() => {
    if (!current) return true
    if (!current.required) return true
    switch (current.type) {
      case 'short':
      case 'long': return String(value ?? '').trim().length > 0
      case 'email': return EMAIL_RE.test(String(value ?? '').trim())
      case 'number': return value !== undefined && value !== '' && Number.isFinite(Number(value))
      case 'choice': return value !== undefined
      case 'yesno': return typeof value === 'boolean'
      case 'rating': return Number(value) > 0
      default: return true
    }
  })()

  const advance = () => setStep((s) => Math.min(s + 1, total + 1))

  const next = () => {
    if (step === 0) { setStep(1); return }
    if (current && !valid) {
      setError(current.type === 'email' ? 'Enter a valid email, e.g. you@company.com' : 'Please answer to continue (or make it optional in the builder)')
      return
    }
    if (step === total) {
      if (storage) addResponse(form, answers)
      onSubmit?.(answers)
      setStep(total + 1)
      return
    }
    advance()
  }

  const back = () => setStep((s) => Math.max(0, s - 1))

  const pick = (key, answer) => {
    setAnswers((a) => ({ ...a, [key]: answer }))
    setError('')
    window.setTimeout(() => setStep((s) => Math.min(s + 1, total + 1)), 240)
  }

  const reset = () => { setStep(0); setAnswers({}); setError('') }

  const onKeyDown = (e) => {
    if (e.key === 'Escape') return
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); next(); return }
    if (!current) return
    if (current.type === 'choice') {
      const idx = 'abcdefghijklmnopqrstuvwxyz'.indexOf(e.key.toLowerCase())
      if (idx >= 0 && idx < (current.options?.length ?? 0)) pick(current.id, current.options[idx])
      else if (/^[1-9]$/.test(e.key)) { const i = Number(e.key) - 1; if (current.options?.[i]) pick(current.id, current.options[i]) }
    }
    if (current.type === 'rating' && /^[1-5]$/.test(e.key)) pick(current.id, Number(e.key))
    if (current.type === 'yesno') {
      const k = e.key.toLowerCase()
      if (k === 'y') pick(current.id, true)
      if (k === 'n') pick(current.id, false)
    }
  }

  const confetti = useMemo(
    () => Array.from({ length: compact ? 40 : 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 6 + Math.random() * 8,
      delay: Math.random() * 1.5,
      duration: 2.6 + Math.random() * 1.7,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    })),
    [compact],
  )

  const letter = (i) => String.fromCharCode(65 + i)

  return (
    <div
      ref={rootRef}
      className={`relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-ink/12 bg-cream shadow-card outline-none ${compact ? 'text-[15px]' : ''}`}
      role="form"
      aria-label={form?.title || 'WriteForm'}
      tabIndex={-1}
      onKeyDown={onKeyDown}
    >
      {step > total && confetti.map((c) => (
        <span key={c.id} className="confetti-piece" aria-hidden="true" style={{ left: `${c.left}%`, width: c.size, height: c.size * 0.42, background: c.color, animationDelay: `${c.delay}s`, animationDuration: `${c.duration}s` }} />
      ))}

      {/* progress bar */}
      <div className="h-1.5 w-full bg-ink/8" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} aria-label="Form completion">
        <div className="h-full transition-all duration-500 ease-out" style={{ width: `${progress}%`, background: theme.accent }} />
      </div>

      {/* ---------- welcome ---------- */}
      {step === 0 && (
        <div key="welcome" className="question-in flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center sm:p-10">
          <h2 className={`font-display font-bold leading-tight tracking-tight text-ink ${compact ? 'text-2xl' : 'text-3xl sm:text-4xl'}`}>{form.title || 'Untitled form'}</h2>
          {form.description && <p className="max-w-md leading-relaxed text-ink/65">{form.description}</p>}
          <button type="button" onClick={next} className="sheen group mt-2 inline-flex items-center gap-2 rounded-2xl px-7 py-3.5 font-bold transition-transform hover:scale-[1.04]" style={{ background: theme.accent, color: theme.text }}>
            Start <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </button>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/35">Press Enter ↵</p>
        </div>
      )}

      {/* ---------- questions ---------- */}
      {step >= 1 && step <= total && current && (
        <div key={current.id} className="question-in flex flex-1 flex-col justify-center p-5 sm:p-8">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-ink/40">Question {step} <span className="text-ink/25">/ {total}</span>{!current.required && ' · Optional'}</p>
          <h3 className={`mt-2 font-display font-bold leading-snug tracking-tight text-ink ${compact ? 'text-xl' : 'text-2xl'}`}>{current.label}</h3>

          <div className="mt-5">
            {(current.type === 'short' || current.type === 'email') && (
              <input ref={inputRef} type={current.type === 'email' ? 'email' : 'text'} inputMode={current.type === 'email' ? 'email' : 'text'} value={value ?? ''} onChange={(e) => { setAnswers((a) => ({ ...a, [current.id]: e.target.value })); setError('') }} placeholder={current.type === 'email' ? 'you@company.com' : current.id === 'form:name' ? 'Type your name…' : 'Type your answer…'} aria-label={current.label} className="w-full border-b-2 border-ink/15 bg-transparent pb-2 font-display text-xl text-ink placeholder-ink/25 outline-none transition-colors focus:border-coral sm:text-2xl" />
            )}
            {current.type === 'number' && (
              <input ref={inputRef} type="number" inputMode="numeric" value={value ?? ''} onChange={(e) => { setAnswers((a) => ({ ...a, [current.id]: e.target.value })); setError('') }} placeholder="0" aria-label={current.label} className="w-full border-b-2 border-ink/15 bg-transparent pb-2 font-display text-xl text-ink placeholder-ink/25 outline-none transition-colors focus:border-coral sm:text-2xl" />
            )}
            {current.type === 'long' && (
              <textarea ref={inputRef} rows={compact ? 2 : 3} value={value ?? ''} onChange={(e) => { setAnswers((a) => ({ ...a, [current.id]: e.target.value })); setError('') }} placeholder="Type as much as you like…" aria-label={current.label} className="w-full resize-y rounded-2xl border border-ink/15 bg-paper p-4 leading-relaxed text-ink placeholder-ink/25 outline-none transition-colors focus:border-coral" />
            )}
            {current.type === 'choice' && (
              <div className="grid gap-2" role="radiogroup" aria-label={current.label}>
                {(current.options ?? []).map((option, i) => {
                  const selected = value === option
                  return (
                    <button key={`${option}-${i}`} type="button" role="radio" aria-checked={selected} onClick={() => pick(current.id, option)} className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition-all ${selected ? 'border-transparent text-white shadow-pop' : 'border-ink/15 bg-paper hover:border-ink/35'}`} style={selected ? { background: theme.accent, color: theme.text } : undefined}>
                      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md border font-mono text-[11px] font-bold ${selected ? 'border-white/40' : 'border-ink/20 text-ink/55'}`}>{letter(i)}</span>
                      <span className="leading-snug">{option}</span>
                    </button>
                  )
                })}
                {(!current.options || current.options.length === 0) && <p className="text-sm text-ink/50">This question has no options yet — add some in the builder.</p>}
              </div>
            )}
            {current.type === 'yesno' && (
              <div className="flex flex-wrap gap-3" role="radiogroup" aria-label={current.label}>
                {[{ label: 'Yes', v: true, k: 'Y' }, { label: 'No', v: false, k: 'N' }].map((opt) => {
                  const selected = value === opt.v
                  return (
                    <button key={opt.label} type="button" role="radio" aria-checked={selected} onClick={() => pick(current.id, opt.v)} className={`flex items-center gap-3 rounded-2xl border px-6 py-4 font-display text-lg font-semibold transition-all ${selected ? 'border-transparent text-white shadow-pop' : 'border-ink/15 bg-paper hover:border-ink/35'}`} style={selected ? { background: theme.accent, color: theme.text } : undefined}>
                      <span className={`flex h-7 w-7 items-center justify-center rounded-md border font-mono text-[11px] ${selected ? 'border-white/40' : 'border-ink/20 text-ink/55'}`}>{opt.k}</span>{opt.label}
                    </button>
                  )
                })}
              </div>
            )}
            {current.type === 'rating' && (
              <div className="flex items-center gap-1.5 sm:gap-2" role="radiogroup" aria-label="Star rating">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} type="button" role="radio" aria-checked={Number(value) === n} aria-label={`${n} star${n > 1 ? 's' : ''}`} onClick={() => pick(current.id, n)} className="transition-transform hover:scale-110 focus-visible:scale-110">
                    <Star size={compact ? 34 : 40} strokeWidth={1.4} className={Number(value) >= n ? 'fill-amber text-amber' : 'text-ink/20'} aria-hidden="true" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {error && <p role="alert" className="mt-4 rounded-xl border border-rose/30 bg-rose-soft px-4 py-2 text-sm font-medium text-rose">{error}</p>}
        </div>
      )}

      {/* ---------- end ---------- */}
      {step > total && (
        <div key="end" className="question-in flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center sm:p-10">
          <span className="pop-in flex h-16 w-16 items-center justify-center rounded-full border border-sage/30 bg-sage-soft">
            <CheckCircle2 size={30} className="text-sage" aria-hidden="true" />
          </span>
          <h3 className="font-display text-3xl font-bold tracking-tight text-ink">That’s everything.</h3>
          <p className="max-w-xs text-ink/60">{storage ? 'Your response was saved on this device.' : 'Thanks — that’s the WriteForm rhythm.'}</p>
          <button type="button" onClick={reset} className="mt-1 inline-flex items-center gap-2 rounded-2xl border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink/75 transition-colors hover:border-ink hover:text-ink">
            <RotateCcw size={14} aria-hidden="true" /> Submit another response
          </button>
        </div>
      )}

      {/* ---------- footer bar ---------- */}
      {step >= 1 && step <= total && (
        <div className="flex items-center justify-between gap-3 border-t border-ink/8 px-4 py-3">
          <button type="button" onClick={back} className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold text-ink/55 transition-colors hover:bg-ink/5 hover:text-ink">
            <ArrowLeft size={15} aria-hidden="true" /> Back
          </button>
          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-[9px] uppercase tracking-[0.25em] text-ink/35 sm:block">Enter ↵</span>
            <button type="button" onClick={next} className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-bold transition-transform hover:scale-105" style={{ background: theme.accent, color: theme.text }}>
              OK <ArrowRight size={15} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
