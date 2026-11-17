import { useCallback, useMemo, useRef, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { ToastContext } from './toast-context'

export default function ToastProvider({ children }) {
  const [toast, setToast] = useState(null)
  const timer = useRef(null)

  const showToast = useCallback((message) => {
    window.clearTimeout(timer.current)
    setToast(message)
    timer.current = window.setTimeout(() => setToast(null), 3800)
  }, [])

  const value = useMemo(() => ({ showToast }), [showToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast && (
        <div role="status" aria-live="polite" className="toast-in fixed bottom-6 left-1/2 z-[80] flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-ink/15 bg-ink px-5 py-3.5 text-sm font-semibold text-cream shadow-card">
          <CheckCircle2 size={18} className="shrink-0 text-amber" aria-hidden="true" />
          <span className="max-w-[80vw] leading-snug">{toast}</span>
        </div>
      )}
    </ToastContext.Provider>
  )
}
