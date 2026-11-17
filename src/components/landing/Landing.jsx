import Navbar from '../Navbar'
import Footer from '../Footer'
import Hero from './Hero'
import Marquee from './Marquee'
import HowItWorks from './HowItWorks'
import AppTour from './AppTour'
import Features from './Features'
import Templates from './Templates'
import Testimonials from './Testimonials'
import Faq from './Faq'
import FinalCta from './FinalCta'

export default function Landing() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <HowItWorks />
        <AppTour />
        <Features />
        <Templates />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
