import React, { useState, useEffect } from 'react'
import styled, { keyframes, createGlobalStyle } from 'styled-components'
import { Navbar }             from '../components/Navbar'
import { HeroSection }        from '../components/HeroSection'
import { CategoriesSection }  from '../components/CategoriesSection'
import { GuidesSection }      from '../components/GuidesSection'
import { WhySection }         from '../components/WhySection'
import { FAQSection }         from '../components/Faqsection'
import { CTASection }         from '../components/Catsection'
import { Newsletter, Footer } from '../components/Footer'
import Loader                 from '../components/Loader'   // ← your existing Loader component

// ─── How long the loader stays visible (ms) ───────────────────────────────────
const LOADER_DURATION = 2800

// ─── Keyframes ────────────────────────────────────────────────────────────────

const fadeOut = keyframes`
  0%   { opacity: 1; }
  100% { opacity: 0; }
`

const fadeIn = keyframes`
  0%   { opacity: 0; transform: translateY(12px); }
  100% { opacity: 1; transform: translateY(0); }
`

// ─── Global style: lock scroll while loader is active ─────────────────────────
const LockScroll = createGlobalStyle`
  body { overflow: hidden; }
`

// ─── Loader overlay ───────────────────────────────────────────────────────────
const Overlay = styled.div<{ $fading: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  /* fade-out once $fading becomes true */
  animation: ${({ $fading }) => $fading ? fadeOut : 'none'} 0.5s ease forwards;
`

const BrandText = styled.div`
  font-family: var(--font-display, 'Sora', sans-serif);
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #94a3b8;
`

const ProgressTrack = styled.div`
  width: 160px;
  height: 3px;
  background: #f1f5f9;
  border-radius: 99px;
  overflow: hidden;
`

const ProgressBar = styled.div<{ $duration: number }>`
  height: 100%;
  border-radius: 99px;
  background: linear-gradient(90deg, #2563eb, #06b6d4);
  width: 0%;
  animation: grow ${({ $duration }) => $duration}ms cubic-bezier(0.4, 0, 0.2, 1) forwards;

  @keyframes grow {
    0%   { width: 0%;   }
    60%  { width: 72%;  }
    85%  { width: 90%;  }
    100% { width: 100%; }
  }
`

// ─── Page wrapper — fades in after loader ─────────────────────────────────────
const PageWrapper = styled.div<{ $visible: boolean }>`
  opacity: 0;
  animation: ${({ $visible }) => $visible ? fadeIn : 'none'} 0.6s ease 0.1s forwards;
`

// ─── LandingPage ──────────────────────────────────────────────────────────────

const LandingPage: React.FC = () => {
  // 'loading'  → loader visible, page hidden
  // 'fading'   → loader fading out, page starts appearing
  // 'done'     → loader unmounted, page fully visible
  const [phase, setPhase] = useState<'loading' | 'fading' | 'done'>('loading')

  useEffect(() => {
    // After LOADER_DURATION ms, begin fade-out
    const fadeTimer = setTimeout(() => setPhase('fading'), LOADER_DURATION)

    // After fade animation (500ms) completes, remove loader from DOM
    const doneTimer = setTimeout(() => setPhase('done'), LOADER_DURATION + 500)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
    }
  }, [])

  return (
    <>
      {/* Lock scroll only while loader is active */}
      {phase !== 'done' && <LockScroll />}

      {/* ── LOADER OVERLAY ── */}
      {phase !== 'done' && (
        <Overlay $fading={phase === 'fading'}>
          <Loader />
          <BrandText>GetBreakTech</BrandText>
          <ProgressTrack>
            <ProgressBar $duration={LOADER_DURATION} />
          </ProgressTrack>
        </Overlay>
      )}

      {/* ── PAGE CONTENT ── */}
      <PageWrapper $visible={phase !== 'loading'}>
        <Navbar />
        <HeroSection />
        <CategoriesSection />
        <GuidesSection />
        <WhySection />
        <FAQSection />
        <CTASection />
        <Newsletter />
        <Footer />
      </PageWrapper>
    </>
  )
}

export default LandingPage