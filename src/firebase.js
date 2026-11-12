// Firebase is lazy-loaded on first submit so it never blocks first paint.
const cfg = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'lildude-web',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

let dbPromise
function getDb() {
  if (!cfg.apiKey) return Promise.reject(new Error('Sign-ups are not switched on yet — check back soon!'))
  dbPromise ||= Promise.all([import('firebase/app'), import('firebase/firestore')]).then(
    ([{ initializeApp }, fs]) => ({ fs, db: fs.getFirestore(initializeApp(cfg)) })
  )
  return dbPromise
}

export async function submit(collectionName, data) {
  const { fs, db } = await getDb()
  return fs.addDoc(fs.collection(db, collectionName), { ...data, createdAt: fs.serverTimestamp() })
}
