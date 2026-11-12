import { useState } from 'react'
import { analyticsEnabled, consentChoice, setConsent } from '../analytics.js'

export default function Consent() {
  const [shown, setShown] = useState(analyticsEnabled() && consentChoice() === null)
  if (!shown) return null
  const pick = (g) => { setConsent(g); setShown(false) }
  return (
    <div className="consent" role="dialog" aria-label="Cookie preferences">
      <p>We use privacy-friendly analytics to see what helps folks find their beat. OK? 🍪</p>
      <div>
        <button className="btn btn-primary" onClick={() => pick(true)}>Sounds good</button>
        <button className="btn btn-ghost" onClick={() => pick(false)}>No thanks</button>
      </div>
    </div>
  )
}
