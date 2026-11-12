import { useEffect } from 'react'
import { track, PREORDER_ITEM } from '../analytics.js'
import { PRICE } from '../config.js'

// Set your PayPal button's return URL to https://<site>/thanks (and /thanks?type=donation for donations).
export default function Thanks() {
  const q = new URLSearchParams(window.location.search)
  const donation = q.get('type') === 'donation'
  useEffect(() => {
    const txn = q.get('tx') || q.get('transaction_id') || String(Date.now())
    let seen
    try { seen = sessionStorage.getItem('ld-tx-' + txn); sessionStorage.setItem('ld-tx-' + txn, '1') } catch { /* ignore */ }
    if (seen) return
    if (donation) track('donation_complete', { currency: 'USD', value: Number(q.get('amt')) || undefined })
    else track('purchase', { transaction_id: txn, currency: 'USD', value: PRICE, items: [PREORDER_ITEM(PRICE)] })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <section className="section thanks">
      <h1 className="script">Thank you!</h1>
      <p className="lead">{donation ? 'Your gift is putting a drum in a kid’s hands. Peace & love ☮' : 'Your Lil Dude is reserved. We’ll be in touch with next steps. ✌️'}</p>
      <a className="btn btn-primary" href="/">Back to the groove</a>
    </section>
  )
}
