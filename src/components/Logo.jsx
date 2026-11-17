export default function Logo({ onDark = true, className = '' }) {
  const word = onDark ? '#fdfbf6' : '#16302b'
  return (
    <span className={`inline-flex items-center gap-2.5 select-none ${className}`} aria-label="WriteForm — home">
      <svg width="30" height="30" viewBox="0 0 64 64" role="img" aria-hidden="true" className="shrink-0">
        <rect width="64" height="64" rx="16" fill="#16302B" />
        <path fill="#FF4B1F" d="M18 18h28a6 6 0 0 1 6 6v6a6 6 0 0 1-6 6H32l-9 9v-9h-5a6 6 0 0 1-6-6v-6a6 6 0 0 1 6-6Z" />
        <circle cx="25" cy="27" r="2.6" fill="#FDFBF6" />
        <circle cx="34" cy="27" r="2.6" fill="#FDFBF6" />
        <circle cx="43" cy="27" r="2.6" fill="#FDFBF6" />
      </svg>
      <span className="font-display text-[1.45rem] font-bold tracking-tight" style={{ color: word }}>
        writeform
      </span>
    </span>
  )
}
