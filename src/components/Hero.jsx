import { useRef, useState } from 'react'
import { media } from '../config.js'
import { track } from '../analytics.js'

export default function Hero() {
  const ref = useRef(null)
  const [muted, setMuted] = useState(true)

  const toggle = () => {
    const v = ref.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
    track('hero_sound_toggle', { sound: v.muted ? 'off' : 'on' })
    if (!v.muted) v.play().catch(() => {})
  }

  return (
    <header className="hero">
      <div className="hero-bg halftone" aria-hidden="true" />
      <video
        ref={ref}
        className="hero-video"
        src={media.heroVideo}
        poster={media.heroPoster}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        onError={(e) => (e.currentTarget.style.display = 'none')}
      />
      <div className="hero-shade" />

      <button className={`mute ${muted ? 'is-muted' : ''}`} onClick={toggle} aria-pressed={!muted}>
        <svg className="mute-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 9v6h4l5 4V5L8 9H4z" />
          {muted ? <path d="M17 9l5 6M22 9l-5 6" /> : <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" />}
        </svg>
        <span>{muted ? 'sound off. tap to hear the groove' : 'sound on'}</span>
      </button>

      <div className="hero-copy">
        <h1>
          <img src="/lildude-white.svg" alt="lildude" className="logo" />
        </h1>
        <p className="tagline">portable, quiet kit for shedding</p>
        <p className="tagline2">from sheds to cafés to stadiums <span className="aside">(stadiums not included)</span></p>
        <div className="cta-row">
          <a className="btn btn-light" href="#join" onClick={() => track('cta_click', { cta: 'hero_waitlist' })}>join the waiting list</a>
          <a className="btn btn-ghost-light" href="#gallery" onClick={() => track('cta_click', { cta: 'hero_gallery' })}>see it in action</a>
        </div>
      </div>
    </header>
  )
}
