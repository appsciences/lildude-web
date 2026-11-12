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

export const links = {
  donate: import.meta.env.VITE_STRIPE_DONATE_URL || '',
  preorder: import.meta.env.VITE_STRIPE_PREORDER_URL || '',
}

export const PRICE = 149 // placeholder pre-order price (USD)
