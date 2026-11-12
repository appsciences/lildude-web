// Media lives on Firebase Storage / CDN. Set VITE_MEDIA_BASE to e.g.
// https://firebasestorage.googleapis.com/v0/b/backup-2b746.firebasestorage.app/o
// and upload files with ?alt=media URLs, or point at a CDN-fronted bucket path.
// Blank = served from /media on Firebase Hosting (also CDN-backed).
const base = (import.meta.env.VITE_MEDIA_BASE || '/media').replace(/\/$/, '')

export const media = {
  heroVideo: `${base}/hero.mp4`,
  heroPoster: `${base}/hero-poster.jpg`,
  setupVideo: `${base}/setup.mp4`,
  setupPoster: `${base}/setup-poster.jpg`,
  // Add real photos as /media/gallery-1.jpg ... ; art fallbacks show until they exist
  images: [1, 2, 3, 4, 5, 6].map((n) => `${base}/gallery-${n}.jpg`),
}

// PayPal: PAYPAL_ME is your PayPal.me link (e.g. https://paypal.me/yourname), used for
// preset amounts and pre-order totals. DONATE_URL (optional) is a hosted PayPal Donate
// button link, used for "any amount"; falls back to PAYPAL_ME.
const trim = (u) => (u || '').replace(/\/$/, '')
export const links = {
  checkout: import.meta.env.VITE_PAYPAL_CHECKOUT_URL || '', // PayPal checkout button link for pre-orders
  paypalMe: trim(import.meta.env.VITE_PAYPAL_ME),
  donate: import.meta.env.VITE_PAYPAL_DONATE_URL || trim(import.meta.env.VITE_PAYPAL_ME),
}
export const paypalAmountUrl = (amount) => (links.paypalMe ? `${links.paypalMe}/${amount}USD` : '')

export const PRICE = 149 // placeholder pre-order price (USD)
