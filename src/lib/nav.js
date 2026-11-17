// Scroll to a landing-page section, navigating home first when needed.
export function goToSection(id) {
  const scroll = () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  const onLanding = window.location.hash === '#/' || window.location.hash === '' || window.location.hash.startsWith('#/?')
  if (onLanding) {
    scroll()
  } else {
    window.location.hash = '/'
    window.setTimeout(scroll, 120)
  }
}
