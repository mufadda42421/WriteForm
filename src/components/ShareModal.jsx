import { useState } from 'react'
import { Check, Copy, Download, Link2, Code2, Share2, Mail, MessageCircle } from 'lucide-react'
import Modal from './Modal'
import { useToast } from '../lib/toast-context'
import { shareUrl, downloadFile } from '../lib/store'

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    try {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.setAttribute('readonly', '')
      ta.style.position = 'absolute'
      ta.style.left = '-9999px'
      document.body.appendChild(ta)
      ta.select()
      const ok = document.execCommand('copy')
      ta.remove()
      return ok
    } catch {
      return false
    }
  }
}

// Brand glyphs are inlined — lucide-react no longer ships trademarked logos.
const XGlyph = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true" {...props}>
    <path d="M18.244 3H21l-6.56 7.5L22 21h-6.06l-4.55-5.4L6.9 21H4.14l6.94-7.94L2.5 3h6.2l4.13 4.93L18.244 3Zm-2.13 16.1h1.7L7.7 4.75H5.87l10.24 14.35Z" />
  </svg>
)

const LinkedInGlyph = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true" {...props}>
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM4.5 9.8h1v10.7h-1V9.8Zm5.5 0h.96v1.46h.02c.13-.25.46-.82 1.19-.82 1.27 0 2.13.83 2.13 2.34v4.02h-1v-3.56c0-.85-.02-1.95-1.19-1.95-1.19 0-1.37.93-1.37 1.89v3.62h-1V9.8Z" />
  </svg>
)

export default function ShareModal({ open, onClose, form }) {
  const { showToast } = useToast()
  const [copied, setCopied] = useState(null) // 'link' | 'embed'

  if (!form) return null

  const handleClose = () => {
    setCopied(null)
    onClose()
  }

  const url = shareUrl(form)
  const embed = `<iframe src="${url}" width="100%" height="640" style="border:0;border-radius:16px" title="${(form.title || 'WriteForm').replaceAll('"', '&quot;')}" loading="lazy"></iframe>`
  const shareText = `Fill out “${form.title || 'my form'}” — it takes under a minute`

  const socials = [
    { name: 'X', Icon: XGlyph, href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}` },
    { name: 'LinkedIn', Icon: LinkedInGlyph, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { name: 'WhatsApp', Icon: MessageCircle, href: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${url}`)}` },
    { name: 'Email', Icon: Mail, href: `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(url)}` },
  ]

  const handleCopy = async (kind, text) => {
    const ok = await copyText(text)
    setCopied(ok ? kind : null)
    showToast(ok ? (kind === 'link' ? 'Link copied to clipboard' : 'Embed code copied') : 'Copy failed — select and copy manually')
  }

  return (
    <Modal open={open} onClose={handleClose} labelledBy="share-title">
      <div className="px-6 py-8 sm:px-8">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-coral/10 text-coral"><Share2 size={22} aria-hidden="true" /></span>
        <h2 id="share-title" className="mt-3 font-display text-2xl font-bold tracking-tight">Share “{form.title || 'Untitled form'}”</h2>
        <p className="mt-1 text-sm text-ink/60">The link carries the whole form — nobody needs an account to respond.</p>

        {/* Link */}
        <label htmlFor="share-link" className="mt-6 mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/55"><Link2 size={12} aria-hidden="true" /> Form link</label>
        <div className="flex gap-2">
          <input id="share-link" readOnly value={url} onFocus={(e) => e.target.select()} className="min-w-0 flex-1 rounded-xl border border-ink/15 bg-paper px-4 py-3 font-mono text-[11px] text-ink/80 outline-none focus:border-coral" />
          <button type="button" onClick={() => handleCopy('link', url)} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ink text-cream transition-transform hover:scale-105" aria-label="Copy form link">
            {copied === 'link' ? <Check size={18} className="text-amber" aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}
          </button>
        </div>

        {/* Embed */}
        <label htmlFor="share-embed" className="mt-5 mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/55"><Code2 size={12} aria-hidden="true" /> Embed on your site</label>
        <div className="flex gap-2">
          <textarea id="share-embed" readOnly rows={2} value={embed} onFocus={(e) => e.target.select()} className="min-w-0 flex-1 resize-none rounded-xl border border-ink/15 bg-paper px-4 py-3 font-mono text-[10px] leading-relaxed text-ink/80 outline-none focus:border-coral" />
          <button type="button" onClick={() => handleCopy('embed', embed)} className="flex h-12 w-12 shrink-0 items-center justify-center self-start rounded-xl bg-ink text-cream transition-transform hover:scale-105" aria-label="Copy embed code">
            {copied === 'embed' ? <Check size={18} className="text-amber" aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}
          </button>
        </div>

        {/* Socials */}
        <p className="mt-5 mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/55">Share via</p>
        <div className="flex flex-wrap gap-2">
          {socials.map(({ name, Icon, href }) => (
            <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-ink/15 bg-paper text-ink/75 transition-all hover:-translate-y-0.5 hover:border-coral hover:text-coral" aria-label={`Share on ${name}`}>
              <Icon size={17} aria-hidden="true" />
            </a>
          ))}
          <button type="button" onClick={() => downloadFile(`${(form.title || 'form').toLowerCase().replace(/[^a-z0-9]+/g, '-')}.json`, JSON.stringify(form, null, 2), 'application/json')} className="inline-flex h-11 items-center gap-2 rounded-xl border border-ink/15 bg-paper px-4 text-sm font-semibold text-ink/75 transition-colors hover:border-coral hover:text-coral">
            <Download size={16} aria-hidden="true" /> JSON
          </button>
        </div>

        <p className="mt-6 rounded-2xl border border-ink/10 bg-paper p-4 text-xs leading-relaxed text-ink/60">
          Privacy note — the link encodes the form itself (questions only, never responses). Whoever opens it, answers land in the browser that collects them, exportable to CSV from Results.
        </p>
      </div>
    </Modal>
  )
}
