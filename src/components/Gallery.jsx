import { useState } from 'react'
import { media } from '../config.js'
import { track } from '../analytics.js'


function Tile({ src, n, onOpen }) {
  const [failed, setFailed] = useState(false)
  return (
    <button className="tile" onClick={() => { track('gallery_image_open', { index: n + 1 }); onOpen(src) }} aria-label={`Open photo ${n + 1}`}
>
      {failed ? <span className="tile-art" /> : (
        <img src={src} alt={`lildude cajon drumset photo ${n + 1}`} loading="lazy"
          onError={() => setFailed(true)} />
      )}
    </button>
  )
}

export default function Gallery() {
  const [open, setOpen] = useState(null)
  return (
    <section className="section gallery" id="gallery">
      <h2>see it come together</h2>
      <p className="lead">from backpack to beat in under a minute.</p>

      <div className="video-frame">
        <video
          src={media.setupVideo}
          poster={media.setupPoster}
          controls
          onPlay={() => track('setup_video_play')}
          onEnded={() => track('setup_video_complete')}
          playsInline
          preload="none"
        />
        <div className="video-fallback">setup video coming soon</div>
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
