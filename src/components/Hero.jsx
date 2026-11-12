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
      <div className="hero-bg psychedelic" aria-hidden="true" />
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
        <span className="mute-icon" aria-hidden="true">{muted ? '🔇' : '🔊'}</span>
        <span>{muted ? 'Sound off — tap to hear the groove' : 'Sound on'}</span>
      </button>

      <div className="hero-copy">
        <p className="kicker">peace · love · rhythm</p>
        <h1>Lil Dude</h1>
        <p className="tagline">The quiet, portable cajon drumset.</p>
        <p className="sub">
          A full kit's worth of groove that fits in your backpack. Gentle enough for cafés,
          cozy enough for the living room — and priced so every kid can find their beat.
        </p>
        <div className="cta-row">
          <a className="btn btn-primary" href="#join" onClick={() => track('cta_click', { cta: 'hero_waitlist' })}>Join the waiting list</a>
          <a className="btn btn-ghost" href="#gallery" onClick={() => track('cta_click', { cta: 'hero_gallery' })}>See it in action</a>
        </div>
      </div>
    </header>
  )
}
