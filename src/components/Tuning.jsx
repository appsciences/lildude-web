import { media } from '../config.js'
import { track } from '../analytics.js'

export default function Tuning() {
  return (
    <section className="section tuning" id="tuning">
      <div className="tuning-grid">
        <div className="tuning-copy">
          <h2>tuned to 55 hz</h2>
          <p className="lead-left">
            that’s the low thump of a bass drum. a tuned port tube in the box turns the whole cajon into a
            resonator, so the air inside rings right where a kick drum lives.
          </p>
          <p>
            same trick as a bass-reflex speaker: the length and width of the tube set the note. hit it, and the
            box answers back with real low end, in a kit that fits in your backpack.
          </p>
        </div>
        <div className="tuning-video">
          <video
            src={media.tuningVideo}
            poster={media.tuningPoster}
            controls
            playsInline
            preload="none"
            onPlay={() => track('tuning_video_play')}
            onEnded={() => track('tuning_video_complete')}
          />
        </div>
      </div>
    </section>
  )
}
