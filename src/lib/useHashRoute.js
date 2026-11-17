import { useEffect, useState } from 'react'

export function parseHash(hash) {
  const raw = (hash || '').replace(/^#/, '') || '/'
  const [path, query = ''] = raw.split('?')
  const parts = path.split('/').filter(Boolean)
  const params = new URLSearchParams(query)

  if (parts.length === 0) return { name: 'landing', params }
  if (parts[0] === 'builder') return { name: 'builder', params }
  if (parts[0] === 'forms') return { name: 'forms', params }
  if (parts[0] === 'f' && parts[1]) return { name: 'respond', encoded: parts[1] }
  if (parts[0] === 'results' && parts[1]) return { name: 'results', formId: parts[1] }
  return { name: 'landing', params }
}

export default function useHashRoute() {
  const [route, setRoute] = useState(() => parseHash(window.location.hash))
  useEffect(() => {
    const onChange = () => {
      setRoute(parseHash(window.location.hash))
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}
