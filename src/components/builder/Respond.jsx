import { AlertCircle, HardDrive } from 'lucide-react'
import Logo from '../Logo'
import Responder from '../Responder'
import { decodeForm } from '../../lib/store'

export default function Respond({ encoded }) {
  const form = decodeForm(encoded)

  if (!form) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-center">
        <AlertCircle size={36} className="text-ink/35" aria-hidden="true" />
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink">This link doesn’t carry a form</h1>
        <p className="mt-2 max-w-md text-ink/65">The URL looks incomplete or was edited after sharing. Ask the sender for a fresh link — or build your own.</p>
        <a href="#/builder" className="sheen mt-6 rounded-2xl bg-coral px-6 py-3.5 font-bold text-white">Build your own form — free</a>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      {/* minimal chrome — respondent arrives from a shared link */}
      <header className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between px-4">
        <a href="#/" aria-label="WriteForm — home"><Logo onDark={false} className="scale-90" /></a>
        <p className="hidden font-mono text-[9px] uppercase tracking-[0.3em] text-ink/40 sm:block">Shared form — fills in your browser</p>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 pb-6">
        <div className="min-h-[30rem] flex-1">
          <Responder form={form} storage />
        </div>
        <p className="mt-4 flex items-center justify-center gap-2 text-center font-mono text-[9px] uppercase tracking-[0.25em] text-ink/40">
          <HardDrive size={11} aria-hidden="true" /> Saved on this device only
          <span aria-hidden="true">·</span>
          <a href="#/builder" className="text-coral hover:underline">Make your own — free</a>
        </p>
      </main>
    </div>
  )
}
