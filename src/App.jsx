import { lazy, Suspense } from 'react'
import ToastProvider from './lib/toast'
import useHashRoute from './lib/useHashRoute'
import Landing from './components/landing/Landing'

// App screens are code-split — the landing page stays lean and fast.
const Builder = lazy(() => import('./components/builder/Builder'))
const MyForms = lazy(() => import('./components/builder/MyForms'))
const Results = lazy(() => import('./components/builder/Results'))
const Respond = lazy(() => import('./components/builder/Respond'))

function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper" role="status" aria-label="Loading WriteForm">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-ink/15 border-t-coral" />
    </div>
  )
}

export default function App() {
  const route = useHashRoute()

  return (
    <ToastProvider>
      <Suspense fallback={<RouteFallback />}>
        {route.name === 'landing' && <Landing />}
        {route.name === 'builder' && <Builder params={route.params} />}
        {route.name === 'forms' && <MyForms />}
        {route.name === 'results' && <Results formId={route.formId} />}
        {route.name === 'respond' && <Respond encoded={route.encoded} />}
      </Suspense>
    </ToastProvider>
  )
}
