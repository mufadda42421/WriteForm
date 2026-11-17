import { useState } from 'react'
import { HardDrive, ShieldCheck } from 'lucide-react'
import Logo from './Logo'
import Modal from './Modal'
import { goToSection } from '../lib/nav'

export default function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const [year] = useState(() => new Date().getFullYear())

  return (
    <footer className="bg-ink text-cream/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
        <div>
          <a href="#/" aria-label="WriteForm — home"><Logo /></a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/55">
            A free, local-first conversational form builder — built as an educational,
            non-commercial study of how forms people love are made.
          </p>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-amber/25 bg-amber/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber">
            <HardDrive size={13} aria-hidden="true" /> 100% in-browser
          </p>
        </div>

        <nav aria-label="Product">
          <h2 className="font-mono text-[9px] font-medium uppercase tracking-[0.3em] text-cream/40">Product</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><a href="#/builder" className="transition-colors hover:text-cream">Create a form</a></li>
            <li><a href="#/forms" className="transition-colors hover:text-cream">My forms</a></li>
            <li><button type="button" onClick={() => goToSection('templates')} className="transition-colors hover:text-cream">Templates</button></li>
            <li><button type="button" onClick={() => goToSection('features')} className="transition-colors hover:text-cream">What’s inside</button></li>
          </ul>
        </nav>

        <nav aria-label="Learn">
          <h2 className="font-mono text-[9px] font-medium uppercase tracking-[0.3em] text-cream/40">Learn</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><button type="button" onClick={() => goToSection('how')} className="transition-colors hover:text-cream">How it works</button></li>
            <li><button type="button" onClick={() => goToSection('faq')} className="transition-colors hover:text-cream">FAQ</button></li>
          </ul>
        </nav>

        <div>
          <h2 className="font-mono text-[9px] font-medium uppercase tracking-[0.3em] text-cream/40">The fine print</h2>
          <p className="mt-4 text-xs leading-relaxed text-cream/55">
            WriteForm is an independent educational project. It is not affiliated with,
            endorsed by, or connected to Typeform S.L. All product names belong to their owners.
          </p>
          <button type="button" onClick={() => setPrivacyOpen(true)} className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-amber transition-colors hover:text-cream">
            <ShieldCheck size={14} aria-hidden="true" /> Privacy, plainly
          </button>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-[11px] text-cream/45 sm:px-6 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} WriteForm Studio · Educational, non-commercial</p>
          <p className="font-mono uppercase tracking-[0.2em]">No cookies · No tracking · No servers</p>
        </div>
      </div>

      <Modal open={privacyOpen} onClose={() => setPrivacyOpen(false)} labelledBy="privacy-title">
        <div className="px-6 py-8 sm:px-8">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-sage-soft text-sage"><ShieldCheck size={22} aria-hidden="true" /></span>
          <h2 id="privacy-title" className="mt-3 font-display text-2xl font-bold tracking-tight text-ink">Privacy, plainly</h2>
          <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-ink/75">
            <p>WriteForm has no backend. Forms you build and responses you collect are stored only in this browser’s local storage — nothing leaves your device, ever.</p>
            <p>Share links carry the form definition in the URL hash. They travel when you send them, and the browser that opens the link rebuilds the form locally. Responses submitted through a link are saved in the collecting browser and can be exported to CSV there.</p>
            <p>WriteForm is not affiliated with Typeform S.L. “Typeform” is referenced solely to describe the conversational-form pattern this project studies.</p>
          </div>
          <button type="button" onClick={() => setPrivacyOpen(false)} className="sheen mt-6 w-full rounded-2xl bg-ink py-3.5 font-bold text-cream">Got it</button>
        </div>
      </Modal>
    </footer>
  )
}
