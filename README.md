# Lil Dude — portable cajon drumset site

Static React (Vite) site on Firebase Hosting. Firebase project: `backup-2b746`.

## Run
```bash
npm install
cp .env.example .env   # fill in Firebase web config + PayPal link
npm run dev
```

## Media (Firebase CDN)
Upload to Storage/Hosting under `media/`: `hero.mp4`, `hero-poster.jpg`, `setup.mp4`,
`setup-poster.jpg`, `gallery-1.jpg` … `gallery-6.jpg`. Set `VITE_MEDIA_BASE` if serving from Storage.
Missing media falls back to animated psychedelic art. Keep the hero video short (≤15 s loop, ≤4 MB, 720p).

## Deploy
```bash
npm i -g firebase-tools && firebase login
npm run deploy   # hosting + firestore + storage rules
```

## Forms & payments
- Waiting list sign-ups are written to Firestore (`waitlist`); rules allow create-only.
- Pre-orders use a PayPal checkout button (`VITE_PAYPAL_CHECKOUT_URL`); PayPal records the orders.
- Donations use `VITE_PAYPAL_ME` for preset amounts and optional `VITE_PAYPAL_DONATE_URL` for any amount.
