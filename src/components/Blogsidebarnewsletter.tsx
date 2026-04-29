// ─────────────────────────────────────────────────────────────────────────────
//  BLOG PAGE SIDEBAR — replace the existing .nl-card / sidebar newsletter form
//  in Blogpage.tsx with this component.
//
//  1. Add this import at the top of Blogpage.tsx:
//
//     import { saveEmail } from '../services/emailService'
//
//  2. Add this component definition above the BlogPage function:
//
//     (copy the BlogSidebarNewsletter component below)
//
//  3. Inside the <aside className="blog-sidebar"> replace the existing
//     <div className="nl-card"> block with:
//
//     <BlogSidebarNewsletter />
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import { saveEmail }        from '../services/emailService'

export const BlogSidebarNewsletter: React.FC = () => {
  const [email,  setEmail]  = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'dup' | 'err'>('idle')

  const handleSubscribe = async () => {
    if (!email.trim()) return
    setStatus('loading')
    const result = await saveEmail(email, 'blog_sidebar')
    setStatus(result === 'saved' ? 'done' : result === 'duplicate' ? 'dup' : 'err')
  }

  return (
    <div className="nl-card" style={{ marginBottom: 20 }}>
      <h3>Stay ahead of tech trends</h3>
      <p>Weekly career guides, salary data, and job market insights.</p>

      {status === 'done' || status === 'dup' ? (
        <div style={{
          background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.4)',
          borderRadius: 10, padding: '12px 14px',
          color: '#4ade80', fontWeight: 600, fontSize: '0.85rem',
        }}>
          {status === 'done' ? '✓ Subscribed! Check your inbox.' : '✓ Already subscribed — thanks!'}
        </div>
      ) : (
        <>
          {status === 'err' && (
            <p style={{ color: '#fca5a5', fontSize: '0.78rem', marginBottom: 6 }}>
              Something went wrong — try again.
            </p>
          )}
          <input
            className="nl-input"
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSubscribe() }}
          />
          <button
            className="nl-btn"
            disabled={status === 'loading'}
            onClick={handleSubscribe}
            style={{ opacity: status === 'loading' ? 0.7 : 1, cursor: status === 'loading' ? 'not-allowed' : 'pointer' }}
          >
            {status === 'loading' ? 'Saving…' : "Subscribe — it's free"}
          </button>
        </>
      )}
    </div>
  )
}

export default BlogSidebarNewsletter