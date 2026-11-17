// Local-first persistence for WriteForm.
// Every form and every response lives in this browser's localStorage.
// Shared links carry the *entire form definition* in the URL hash, so a
// recipient can fill it without any account or server round-trip.

const FORMS_KEY = 'writeform:forms'
const responsesKey = (id) => `writeform:responses:${id}`
const formCacheKey = (id) => `writeform:formcache:${id}`

export function uid() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID().slice(0, 8)
  return Math.random().toString(36).slice(2, 10)
}

export const QUESTION_TYPES = [
  { id: 'short', label: 'Short text', hint: 'One line — name, answer, anything' },
  { id: 'long', label: 'Long text', hint: 'A paragraph or two' },
  { id: 'choice', label: 'Multiple choice', hint: 'Pick one of your options' },
  { id: 'yesno', label: 'Yes / No', hint: 'A simple binary answer' },
  { id: 'rating', label: 'Rating', hint: '1–5 stars' },
  { id: 'email', label: 'Email', hint: 'Validated email address' },
  { id: 'number', label: 'Number', hint: 'Numeric answer only' },
]

export const NAME_QUESTION = { id: 'form:name', type: 'short', label: 'Your name?', required: true, options: [] }

export function emptyForm() {
  return {
    id: uid(),
    title: 'Untitled form',
    description: '',
    theme: 'coral',
    askName: true,
    questions: [
      { id: uid(), type: 'short', label: 'How can we help?', required: true, options: [] },
    ],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }
}

/**
 * The question list as a respondent experiences it — with the synthetic
 * name question prepended when the form asks for it. Single source of
 * truth for the renderer, the results table and CSV export.
 */
export function effectiveQuestions(form) {
  const base = Array.isArray(form?.questions) ? form.questions : []
  return form?.askName ? [NAME_QUESTION, ...base] : base
}

function safeParse(raw, fallback) {
  try {
    const parsed = JSON.parse(raw)
    return parsed ?? fallback
  } catch {
    return fallback
  }
}

export function loadForms() {
  if (typeof window === 'undefined') return []
  const forms = safeParse(window.localStorage.getItem(FORMS_KEY), [])
  return Array.isArray(forms) ? forms : []
}

export function getForm(id) {
  return loadForms().find((f) => f.id === id) ?? null
}

export function upsertForm(form) {
  const forms = loadForms()
  const next = { ...form, updatedAt: Date.now() }
  const index = forms.findIndex((f) => f.id === form.id)
  if (index >= 0) forms[index] = next
  else forms.unshift(next)
  window.localStorage.setItem(FORMS_KEY, JSON.stringify(forms))
  return next
}

export function deleteForm(id) {
  const forms = loadForms().filter((f) => f.id !== id)
  window.localStorage.setItem(FORMS_KEY, JSON.stringify(forms))
  window.localStorage.removeItem(responsesKey(id))
  window.localStorage.removeItem(formCacheKey(id))
}

export function loadResponses(formId) {
  if (typeof window === 'undefined') return []
  const rows = safeParse(window.localStorage.getItem(responsesKey(formId)), [])
  return Array.isArray(rows) ? rows : []
}

export function addResponse(form, answers) {
  const response = { id: uid(), submittedAt: Date.now(), answers }
  const rows = [...loadResponses(form.id), response]
  window.localStorage.setItem(responsesKey(form.id), JSON.stringify(rows))
  // Cache the form definition so a results view opened on this device can
  // render labels even if the form itself was never saved here.
  window.localStorage.setItem(formCacheKey(form.id), JSON.stringify(toSharePayload(form)))
  return response
}

export function saveResponses(formId, rows) {
  window.localStorage.setItem(responsesKey(formId), JSON.stringify(rows))
}

export function clearResponses(formId) {
  window.localStorage.removeItem(responsesKey(formId))
}

export function getCachedForm(id) {
  if (typeof window === 'undefined') return null
  return safeParse(window.localStorage.getItem(formCacheKey(id)), null)
}

/* ---------- URL encoding (share links work with zero backend) ---------- */

function toSharePayload(form) {
  const { id, title, description, theme, questions, askName } = form
  return { id, title, description, theme, questions, askName: Boolean(askName) }
}

function b64urlEncode(str) {
  const bytes = new TextEncoder().encode(str)
  let binary = ''
  bytes.forEach((b) => { binary += String.fromCharCode(b) })
  return window.btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '')
}

function b64urlDecode(encoded) {
  const b64 = encoded.replaceAll('-', '+').replaceAll('_', '/')
  const binary = window.atob(b64)
  const bytes = Uint8Array.from(binary, (ch) => ch.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

export function encodeForm(form) {
  return b64urlEncode(JSON.stringify(toSharePayload(form)))
}

export function decodeForm(encoded) {
  try {
    const parsed = JSON.parse(b64urlDecode(encoded))
    if (!parsed || !Array.isArray(parsed.questions) || !parsed.title) return null
    return {
      ...parsed,
      id: parsed.id || uid(),
      theme: parsed.theme || 'coral',
      description: parsed.description || '',
      askName: Boolean(parsed.askName),
      questions: parsed.questions.map((q) => ({
        id: q.id || uid(),
        type: q.type || 'short',
        label: String(q.label ?? '').slice(0, 300),
        required: Boolean(q.required),
        options: Array.isArray(q.options) ? q.options.map((o) => String(o).slice(0, 120)).slice(0, 12) : [],
      })),
    }
  } catch {
    return null
  }
}

export function shareUrl(form) {
  return `${window.location.origin}${window.location.pathname}#/f/${encodeForm(form)}`
}

/* ------------------------------ CSV export ------------------------------ */

function csvCell(value) {
  const text = value === undefined || value === null ? '' : Array.isArray(value) ? value.join('; ') : String(value)
  return `"${text.replaceAll('"', '""')}"`
}

export function formToCSV(form, responses) {
  const questions = effectiveQuestions(form)
  const header = ['submitted_at', ...questions.map((q) => q.label || '(untitled question)')]
  const rows = responses.map((r) => [
    new Date(r.submittedAt).toISOString(),
    ...questions.map((q) => r.answers?.[q.id]),
  ])
  return [header, ...rows].map((row) => row.map(csvCell).join(',')).join('\r\n')
}

export function downloadFile(filename, content, mime = 'text/plain') {
  const blob = new Blob([content], { type: `${mime};charset=utf-8` })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
