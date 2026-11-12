import { useState } from 'react'
import { media } from '../config.js'

const hues = [310, 40, 160, 270, 20, 200]

function Tile({ src, n, onOpen }) {
  const [failed, setFailed] = useState(false)
  return (
    <button className="tile" onClick={() => onOpen(src)} aria-label={`Open photo ${n + 1}`}
      style={{ '--h': hues[n % hues.length] }}>
      {failed ? <span className="tile-art" /> : (
        <img src={src} alt={`Lil Dude cajon drumset photo ${n + 1}`} loading="lazy"
          onError={() => setFailed(true)} />
      )}
    </button>
  )
}

export default function Gallery() {
  const [open, setOpen] = useState(null)
  return (
    <section className="section gallery" id="gallery">
      <h2>See it <span className="script">come together</span></h2>
      <p className="lead">From backpack to beat in under a minute.</p>

      <div className="video-frame">
        <video
          src={media.setupVideo}
          poster={media.setupPoster}
          controls
          playsInline
          preload="none"
        />
        <div className="video-fallback">Setup video coming soon ✌️</div>
      </div>

      <div className="tiles">
        {media.images.map((src, n) => <Tile key={src} src={src} n={n} onOpen={setOpen} />)}
      </div>

      {open && (
        <div className="lightbox" onClick={() => setOpen(null)} role="dialog" aria-modal="true">
          <img src={open} alt="" />
        </div>
      )}
    </section>
  )
}
