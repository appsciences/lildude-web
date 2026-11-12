import { useEffect } from 'react'
import Hero from './components/Hero.jsx'
import Vibes from './components/Vibes.jsx'
import Gallery from './components/Gallery.jsx'
import Join from './components/Join.jsx'
import Thanks from './components/Thanks.jsx'
import Consent from './components/Consent.jsx'
import { initAnalytics, track } from './analytics.js'

initAnalytics()

function useEngagement() {
  useEffect(() => {
    // Which sections people actually see
    const seen = new Set()
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !seen.has(e.target.id)) {
          seen.add(e.target.id)
          track('view_section', { section: e.target.id || 'hero' })
        }
      })
    }, { threshold: 0.4 })
    document.querySelectorAll('header.hero, section[id]').forEach((el) => io.observe(el))

    // Scroll depth
    const marks = [25, 50, 75, 100]; const hit = new Set()
    const onScroll = () => {
      const h = document.documentElement
      const pct = ((h.scrollTop + innerHeight) / h.scrollHeight) * 100
      marks.forEach((m) => { if (pct >= m - 1 && !hit.has(m)) { hit.add(m); track('scroll_depth', { percent: m }) } })
    }
    addEventListener('scroll', onScroll, { passive: true })
    return () => { io.disconnect(); removeEventListener('scroll', onScroll) }
  }, [])
}

export default function App() {
  useEngagement()
  if (window.location.pathname.replace(/\/$/, '') === '/thanks') return <><Thanks /><Consent /></>
  return (
    <>
      <Hero />
      <main>
        <Vibes />
        <Gallery />
        <Join />
      </main>
      <footer className="footer">
        <p>Made with love, rhythm &amp; recycled wood ☮ © {new Date().getFullYear()} Lil Dude</p>
      </footer>
      <Consent />
    </>
  )
}
