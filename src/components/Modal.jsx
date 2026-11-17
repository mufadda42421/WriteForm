import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

export default function Modal({ open, onClose, labelledBy, children, wide = false }) {
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  useEffect(() => {
    if (!open) return undefined
    const t = window.setTimeout(() => {
      panelRef.current?.querySelector('input, textarea, button, a[href]')?.focus({ preventScroll: true })
    }, 60)
    return () => window.clearTimeout(t)
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-labelledby={labelledBy}>
      <button type="button" aria-label="Close dialog" onClick={onClose} className="overlay-in absolute inset-0 cursor-default bg-ink/60 backdrop-blur-[2px]" />
      <div
        ref={panelRef}
        className={`sheet-up relative z-10 max-h-[94vh] w-full overflow-y-auto rounded-t-3xl border border-ink/15 bg-cream text-ink shadow-card sm:rounded-3xl ${wide ? 'max-w-2xl' : 'max-w-lg'}`}
      >
        <button type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-4 rounded-full p-2 text-ink/50 transition-colors hover:bg-ink/5 hover:text-ink">
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  )
}
