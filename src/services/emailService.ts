// src/services/emailService.ts
// ─────────────────────────────────────────────────────────────────────────────
//  Central helper — call saveEmail() from any component that collects an email.
//  Every submission goes to the "subscribers" collection in Firestore.
// ─────────────────────────────────────────────────────────────────────────────

import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase'

// ── Types ────────────────────────────────────────────────────────────────────

export type EmailSource =
  | 'newsletter_footer'     // Footer Newsletter section
  | 'newsletter_home'       // Home / Landing-page newsletter widget
  | 'newsletter_ai_career'  // AI Career page CTA
  | 'blog_sidebar'          // Blog sidebar mini-form
  | 'contact_form'          // Contact page (full form)

export interface EmailRecord {
  email:     string
  source:    EmailSource
  name?:     string          // only from contact form
  topic?:    string          // only from contact form
  message?:  string          // only from contact form
  createdAt: ReturnType<typeof serverTimestamp>
}

// ── Save email (deduplication per source) ────────────────────────────────────

/**
 * Saves an email to the "subscribers" Firestore collection.
 *
 * @returns  'saved'      – new record written successfully
 *           'duplicate'  – this email+source combo already exists (no write)
 *           'error'      – something went wrong (see console)
 */
export async function saveEmail(
  email:   string,
  source:  EmailSource,
  extras?: { name?: string; topic?: string; message?: string }
): Promise<'saved' | 'duplicate' | 'error'> {
  try {
    const normalised = email.trim().toLowerCase()

    // Check for existing record with same email + source
    const q   = query(
      collection(db, 'subscribers'),
      where('email',  '==', normalised),
      where('source', '==', source)
    )
    const existing = await getDocs(q)
    if (!existing.empty) return 'duplicate'

    const record: EmailRecord = {
      email:     normalised,
      source,
      createdAt: serverTimestamp(),
      ...extras,
    }

    await addDoc(collection(db, 'subscribers'), record)
    return 'saved'
  } catch (err) {
    console.error('[emailService] saveEmail error:', err)
    return 'error'
  }
}