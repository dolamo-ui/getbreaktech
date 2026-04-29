// src/firebase.ts
// ─────────────────────────────────────────────────────────────────────────────
//  Firebase initialisation — import this file anywhere you need Firestore
// ─────────────────────────────────────────────────────────────────────────────

import { initializeApp, getApps }   from 'firebase/app'
import { getFirestore }              from 'firebase/firestore'
import { getAnalytics, isSupported } from 'firebase/analytics'

const firebaseConfig = {
  apiKey:            'AIzaSyD5a-TSS3YDeZPOrPltdDYnzK9tyMvidJE',
  authDomain:        'getbreaktech.firebaseapp.com',
  projectId:         'getbreaktech',
  storageBucket:     'getbreaktech.firebasestorage.app',
  messagingSenderId: '563526750543',
  appId:             '1:563526750543:web:fa8bf13f87bfb51afcf53a',
  measurementId:     'G-V8EYFQLZ4P',
}

// Prevent duplicate initialisation in strict-mode / hot-reload
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)

// Firestore database instance — use this everywhere
export const db = getFirestore(app)

// Analytics — only in browser environments that support it
isSupported().then(yes => { if (yes) getAnalytics(app) })

export default app