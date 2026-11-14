// Google Analytics 4, loaded lazily and consent-gated (Consent Mode v2).
// Set VITE_GA_MEASUREMENT_ID (G-XXXXXXX). With no ID, everything here is a no-op.
const ID = import.meta.env.VITE_GA_MEASUREMENT_ID
const KEY = 'ld-consent'

const read = () => { try { return localStorage.getItem(KEY) } catch { return null } }
const write = (v) => { try { localStorage.setItem(KEY, v) } catch { /* private mode */ } }

function gtag() { window.dataLayer.push(arguments) }

export function initAnalytics() {
  if (!ID || window.__gaInit) return
  window.__gaInit = true
  window.dataLayer = window.dataLayer || []
  gtag('consent', 'default', {
    ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
    analytics_storage: read() === 'granted' ? 'granted' : 'denied',
  })
  gtag('js', new Date())
  gtag('config', ID, { send_page_view: true })
  const load = () => {
    const s = document.createElement('script')
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${ID}`
    document.head.appendChild(s)
  }
  // keep analytics off the critical path
  if ('requestIdleCallback' in window) requestIdleCallback(load, { timeout: 3000 })
  else setTimeout(load, 1500)
}

export const analyticsEnabled = () => Boolean(ID)
export const consentChoice = () => read() // 'granted' | 'denied' | null

export function setConsent(granted) {
  write(granted ? 'granted' : 'denied')
  if (ID) gtag('consent', 'update', { analytics_storage: granted ? 'granted' : 'denied' })
}

export function track(event, params = {}) {
  if (!ID || !window.dataLayer) return
  gtag('event', event, params)
}

// Ecommerce shape used for pre-orders (abandoned cart = begin_checkout without purchase)
export const PREORDER_ITEM = (price) => ({ item_id: 'lildude-cajon', item_name: 'Lil Dude Cajon Drumset', price, quantity: 1 })
