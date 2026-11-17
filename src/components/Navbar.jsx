import { useEffect, useState } from 'react'
import { Menu, X, ArrowRight, FolderOpen } from 'lucide-react'
import Logo from './Logo'
import { goToSection } from '../lib/nav'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const nav = (id) => {
    setOpen(false)
    goToSection(id)
  }

  return (
    <header className={`sticky top-0 z-40 border-b transition-all duration-300 ${scrolled ? 'border-ink/10 bg-paper/90 backdrop-blur-xl shadow-[0_8px_30px_-18px_rgba(22,48,43,0.45)]' : 'border-transparent bg-paper'}`}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6" aria-label="Primary">
        <a href="#/" className="transition-opacity hover:opacity-75">
          <Logo onDark={false} />
        </a>

        <div className="hidden md:flex items-center gap-1 text-sm font-semibold text-ink/75">
          <button type="button" onClick={() => nav('how')} className="rounded-full px-4 py-2 transition-colors hover:bg-ink/5 hover:text-ink">How it works</button>
          <button type="button" onClick={() => nav('templates')} className="rounded-full px-4 py-2 transition-colors hover:bg-ink/5 hover:text-ink">Templates</button>
          <button type="button" onClick={() => nav('faq')} className="rounded-full px-4 py-2 transition-colors hover:bg-ink/5 hover:text-ink">FAQ</button>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <a href="#/forms" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-ink/75 transition-colors hover:bg-ink/5 hover:text-ink">
            <FolderOpen size={15} aria-hidden="true" /> My forms
          </a>
          <a href="#/builder" className="sheen inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-cream transition-transform hover:scale-[1.03]">
            Create a form <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>

        <button type="button" className="md:hidden rounded-xl p-2 text-ink hover:bg-ink/5" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-ink/10 bg-paper sheet-up">
          <div className="px-5 py-5 pb-8">
            {[['How it works', 'how'], ['Templates', 'templates'], ['FAQ', 'faq']].map(([label, id]) => (
              <button key={id} type="button" onClick={() => nav(id)} className="block w-full border-b border-ink/8 py-4 text-left font-semibold text-ink/85">
                {label}
              </button>
            ))}
            <a href="#/forms" onClick={() => setOpen(false)} className="block border-b border-ink/8 py-4 font-semibold text-ink/85">My forms</a>
            <a href="#/builder" onClick={() => setOpen(false)} className="sheen mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-coral px-5 py-4 text-center font-bold text-white">
              Create a form — it’s free <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
