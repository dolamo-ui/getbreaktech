import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CardCarousel } from './CardCarousel';

// ─── Keyframes ───────────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(0.97); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const flip = keyframes`
  to { rotate: 360deg; }
`;

const rotate = keyframes`
  to { transform: rotate(90deg); }
`;

const bounce = keyframes`
  35%, 65% { scale: var(--scale); }
`;

const floatOut = keyframes`
  to { rotate: 360deg; }
`;

// ─── Layout ──────────────────────────────────────────────────────────────────

const HeroSectionStyled = styled.section`
  min-height: 100vh;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding: 100px 4rem 4rem;
  overflow: hidden;
  background: var(--cream);

  &::before {
    content: '';
    position: absolute;
    top: -10%;
    right: -5%;
    width: 55%;
    height: 75%;
    background: radial-gradient(ellipse at center, rgba(37,99,235,0.07) 0%, transparent 70%);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 10%;
    left: 5%;
    width: 40%;
    height: 40%;
    background: radial-gradient(ellipse at center, rgba(16,185,129,0.05) 0%, transparent 70%);
    pointer-events: none;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    padding: 120px 2rem 4rem;
    text-align: center;
  }
`;

const LeftCol = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  max-width: 560px;
`;

const BadgePill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(37,99,235,0.08);
  border: 1px solid rgba(37,99,235,0.18);
  border-radius: 100px;
  padding: 6px 14px 6px 8px;
  width: fit-content;
  animation: ${fadeUp} 0.6s ease both;

  .badge-icon {
    width: 22px;
    height: 22px;
    background: var(--accent-blue);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  span {
    font-family: var(--font-body);
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--accent-blue);
    letter-spacing: 0.02em;
  }

  @media (max-width: 900px) {
    margin: 0 auto;
  }
`;

const HeadingWrapper = styled.div`
  animation: ${fadeUp} 0.7s 0.1s ease both;
`;

const Heading = styled.h1`
  font-family: var(--font-display);
  font-size: clamp(2.6rem, 5vw, 3.8rem);
  font-weight: 800;
  line-height: 1.1;
  color: var(--charcoal);
  letter-spacing: -0.03em;

  .highlight {
    display: block;
    background: linear-gradient(135deg, #2563EB 0%, #06B6D4 50%, #2563EB 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${shimmer} 4s linear infinite;
  }
`;

const SubText = styled.p`
  font-family: var(--font-body);
  font-size: 1.05rem;
  line-height: 1.75;
  color: var(--text-muted);
  font-weight: 300;
  animation: ${fadeUp} 0.7s 0.2s ease both;
`;

// ─── CTA Group ───────────────────────────────────────────────────────────────

const CTAGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  animation: ${fadeUp} 0.7s 0.3s ease both;

  @media (max-width: 900px) {
    justify-content: center;
  }
`;

// ─── Primary Sparkle Button ───────────────────────────────────────────────────

const SparkleWrap = styled.div`
  --transition: 0.25s;
  --spark: 1.8s;
  --cut: 0.1em;
  position: relative;

  .sparkle-button {
    --active: 0;
    --bg:
      radial-gradient(40% 50% at center 100%, hsl(260 calc(var(--active) * 97%) 72% / var(--active)), transparent),
      radial-gradient(80% 100% at center 120%, hsl(260 calc(var(--active) * 97%) 70% / var(--active)), transparent),
      hsl(260 calc(var(--active) * 97%) calc((var(--active) * 44%) + 12%));
    background: #2563eb;
    font-size: 0.95rem;
    font-weight: 700;
    font-family: var(--font-display, inherit);
    letter-spacing: 0.01em;
    border: 0;
    cursor: pointer;
    padding: 0.85em 1.8em;
    display: inline-flex;
    align-items: center;
    gap: 0.4em;
    white-space: nowrap;
    border-radius: 12px;
    position: relative;
    text-decoration: none;
    box-shadow:
      0 0 calc(var(--active) * 3em) calc(var(--active) * 1em) hsl(260 97% 61% / 0.75),
      0 0em 0 0 hsl(260 calc(var(--active) * 97%) calc((var(--active) * 50%) + 30%)) inset,
      0 -0.05em 0 0 hsl(260 calc(var(--active) * 97%) calc(var(--active) * 60%)) inset;
    scale: calc(1 + (var(--active) * 0.04));
    transition: box-shadow var(--transition), scale var(--transition), background var(--transition);
  }

  .sparkle-button:active {
    scale: 0.97;
    transition: 0.1s;
  }

  .sparkle-button:is(:hover, :focus-visible) {
    --active: 1;
    --play-state: running;
    background: var(--bg);
  }

  .sparkle-button::before {
    content: '';
    position: absolute;
    inset: -0.15em;
    z-index: -1;
    border: 0.2em solid hsl(260 97% 50% / 0.5);
    border-radius: 14px;
    opacity: var(--active, 0);
    transition: opacity var(--transition);
  }

  .spark {
    position: absolute;
    inset: 0;
    border-radius: 12px;
    rotate: 0deg;
    overflow: hidden;
    mask: linear-gradient(white, transparent 50%);
    animation: ${flip} calc(var(--spark) * 2) infinite steps(2, end);
  }

  .spark::before {
    content: '';
    position: absolute;
    width: 200%;
    aspect-ratio: 1;
    top: 0%;
    left: 50%;
    z-index: -1;
    translate: -50% -15%;
    transform: rotate(-90deg);
    opacity: calc((var(--active)) + 0.4);
    background: conic-gradient(from 0deg, transparent 0 340deg, white 360deg);
    transition: opacity var(--transition);
    animation: ${rotate} var(--spark) linear infinite both;
  }

  .spark::after {
    content: '';
    position: absolute;
    inset: var(--cut);
    border-radius: 12px;
  }

  .backdrop {
    position: absolute;
    inset: var(--cut);
    background: var(--bg);
    border-radius: 12px;
    transition: background var(--transition);
  }

  .sparkle path {
    color: hsl(0 0% calc((var(--active, 0) * 70%) + var(--base)));
    transform-box: fill-box;
    transform-origin: center;
    fill: currentColor;
    stroke: currentColor;
    animation-delay: calc((var(--transition) * 1.5) + (var(--delay) * 1s));
    animation-duration: 0.6s;
    transition: color var(--transition);
  }

  .sparkle-button:is(:hover, :focus-visible) path {
    animation-name: ${bounce};
  }

  .sparkle path:nth-of-type(1) { --scale: 0.5; --delay: 0.1; --base: 40%; }
  .sparkle path:nth-of-type(2) { --scale: 1.5; --delay: 0.2; --base: 20%; }
  .sparkle path:nth-of-type(3) { --scale: 2.5; --delay: 0.35; --base: 30%; }

  .particle-pen {
    position: absolute;
    width: 200%;
    aspect-ratio: 1;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    -webkit-mask: radial-gradient(white, transparent 65%);
    z-index: -1;
    opacity: var(--active, 0);
    transition: opacity var(--transition);
  }

  .sparkle-button:is(:hover, :focus-visible) ~ .particle-pen {
    --active: 1;
    --play-state: running;
  }

  .particle {
    fill: white;
    width: calc(var(--size, 0.25) * 1rem);
    aspect-ratio: 1;
    position: absolute;
    top: calc(var(--y) * 1%);
    left: calc(var(--x) * 1%);
    opacity: var(--alpha, 1);
    animation: ${floatOut} calc(var(--duration, 1) * 1s) calc(var(--delay) * -1s) infinite linear;
    transform-origin: var(--origin-x, 1000%) var(--origin-y, 1000%);
    z-index: -1;
    animation-play-state: var(--play-state, paused);
  }

  .particle path { fill: hsl(260 97% 80%); stroke: none; }
  .particle:nth-of-type(even) { animation-direction: reverse; }

  .btn-text {
    translate: 2% -6%;
    letter-spacing: 0.02ch;
    background: linear-gradient(
      90deg,
      hsl(0 0% calc((var(--active) * 100%) + 65%)),
      hsl(0 0% calc((var(--active) * 100%) + 26%))
    );
    -webkit-background-clip: text;
    color: transparent;
    transition: background var(--transition);
  }

  .sparkle-button svg.sparkle {
    inline-size: 1.1em;
    translate: -10% -5%;
  }
`;

// ─── Secondary Underline Button ───────────────────────────────────────────────

const UnderlineBtn = styled(Link)`
  font-size: 0.95rem;
  color: var(--charcoal);
  font-family: var(--font-display, inherit);
  font-weight: 700;
  letter-spacing: 0.01em;
  cursor: pointer;
  position: relative;
  border: 1.5px solid rgba(0, 0, 0, 0.15);
  background: transparent;
  padding: 0.85em 1.6em;
  border-radius: 12px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-duration: 400ms;
  transition-property: color, border-color, background;

  &:hover,
  &:focus-visible {
    color: #2563eb;
    border-color: #2563eb;
    background: rgba(37, 99, 235, 0.04);
  }

  &::after {
    content: '';
    pointer-events: none;
    bottom: 10px;
    left: 50%;
    position: absolute;
    width: 0%;
    height: 2px;
    background: linear-gradient(90deg, #2563eb, #06b6d4);
    border-radius: 2px;
    transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
    transition-duration: 400ms;
    transition-property: width, left;
  }

  &:hover::after,
  &:focus-visible::after {
    width: calc(100% - 3.2em);
    left: 1.6em;
  }
`;

// ─── Stats ────────────────────────────────────────────────────────────────────

const StatsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  animation: ${fadeUp} 0.7s 0.4s ease both;

  @media (max-width: 900px) {
    justify-content: center;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;

  .number {
    font-family: var(--font-display);
    font-size: 1.6rem;
    font-weight: 800;
    color: var(--charcoal);
    letter-spacing: -0.03em;
  }

  .label {
    font-size: 0.78rem;
    color: var(--text-muted);
    font-weight: 400;
    margin-top: 2px;
  }
`;

const StatDivider = styled.div`
  width: 1px;
  height: 36px;
  background: var(--border);
`;

// ─── Right column ─────────────────────────────────────────────────────────────

const RightCol = styled.div`
  position: relative;
  height: 520px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  animation: ${fadeIn} 1s 0.3s ease both;

  @media (max-width: 900px) {
    height: 380px;
    margin-top: 2rem;
  }
`;

const FloatingCard = styled.div`
  position: absolute;
  background: white;
  border-radius: 16px;
  padding: 14px 18px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06);
  border: 1px solid rgba(255,255,255,0.8);
  z-index: 10;
  animation: ${float} 3s ease-in-out infinite;
`;

const FloatingCard1 = styled(FloatingCard)`
  top: 8%;
  right: 5%;
  animation-delay: 0s;
  display: flex;
  align-items: center;
  gap: 10px;

  .avatar-stack {
    display: flex;
    .avatar {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      border: 2px solid white;
      margin-left: -6px;
      &:first-child { margin-left: 0; }
    }
  }

  .info {
    .top { font-family: var(--font-display); font-size: 0.78rem; font-weight: 700; color: var(--charcoal); }
    .bottom { font-size: 0.68rem; color: var(--text-muted); }
  }
`;

const FloatingCard2 = styled(FloatingCard)`
  bottom: 18%;
  left: 2%;
  animation-delay: 1.2s;

  .label { font-size: 0.7rem; color: var(--text-muted); margin-bottom: 6px; }
  .value { font-family: var(--font-display); font-size: 1.1rem; font-weight: 800; color: var(--accent-green); }
  .sub { font-size: 0.65rem; color: var(--text-muted); margin-top: 2px; }
`;

const PulseRing = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 340px;
  height: 340px;
  border-radius: 50%;
  border: 1px solid rgba(37,99,235,0.12);
  animation: ${pulse} 3s ease-in-out infinite;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    inset: 30px;
    border-radius: 50%;
    border: 1px solid rgba(37,99,235,0.08);
    animation: ${pulse} 3s ease-in-out infinite 0.5s;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 60px;
    border-radius: 50%;
    border: 1px solid rgba(37,99,235,0.05);
    animation: ${pulse} 3s ease-in-out infinite 1s;
  }
`;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const avatarColors = ['#2563EB', '#10B981', '#F59E0B', '#EF4444'];

const CountUp: React.FC<{ target: number; duration?: number }> = ({ target, duration = 1500 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress === 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);

  return <>{count.toLocaleString()}</>;
};

// Sparkle SVG icon reused inside the button
const SparkleSVG = () => (
  <svg className="sparkle" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z" fill="black" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z" fill="black" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z" fill="black" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Particle SVG reused 20×
const ParticleSVG = () => (
  <svg className="particle" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.937 3.846L7.75 1L8.563 3.846C8.77313 4.58114 9.1671 5.25062 9.70774 5.79126C10.2484 6.3319 10.9179 6.72587 11.653 6.936L14.5 7.75L11.654 8.563C10.9189 8.77313 10.2494 9.1671 9.70874 9.70774C9.1681 10.2484 8.77413 10.9179 8.564 11.653L7.75 14.5L6.937 11.654C6.72687 10.9189 6.3329 10.2494 5.79226 9.70874C5.25162 9.1681 4.58214 8.77413 3.847 8.564L1 7.75L3.846 6.937C4.58114 6.72687 5.25062 6.3329 5.79126 5.79226C6.3319 5.25162 6.72587 4.58214 6.936 3.847L6.937 3.846Z" fill="black" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── HeroSection ─────────────────────────────────────────────────────────────

export const HeroSection: React.FC = () => {
  return (
    <HeroSectionStyled id="home">

      {/* ── Left Column ── */}
      <LeftCol className="w-full max-w-full px-2 sm:px-4 md:max-w-[560px] md:mx-0 mx-auto">

        {/* Badge */}
        <BadgePill className="mx-auto md:mx-0">
          <div className="badge-icon">
            <Sparkles size={12} />
          </div>
          <span>New Career Paths Opened</span>
        </BadgePill>

        {/* Heading */}
        <HeadingWrapper className="w-full">
          <Heading className="text-center md:text-left">
            Break Into Tech
            <span className="highlight">Today.</span>
          </Heading>
        </HeadingWrapper>

        {/* Subtext */}
        <SubText className="text-center md:text-left text-sm sm:text-base">
          Navigate the complexity of the tech industry with curated roadmaps,
          mentorship, and a community built for career changers.
        </SubText>

        {/* CTA Buttons */}
        <CTAGroup className="flex-col sm:flex-row justify-center md:justify-start w-full sm:w-auto">

          {/* ── Primary: Sparkle button ── */}
          <SparkleWrap className="w-full sm:w-auto">
            <Link
              to="/roadmaps"
              className="sparkle-button w-full sm:w-auto justify-center"
            >
              <span className="spark" />
              <span className="backdrop" />
              <SparkleSVG />
              <span className="btn-text">Start Your Journey</span>
            </Link>
            <span aria-hidden="true" className="particle-pen">
              {Array.from({ length: 20 }).map((_, i) => (
                <ParticleSVG key={i} />
              ))}
            </span>
          </SparkleWrap>

          {/* ── Secondary: Underline hover button ── */}
          <UnderlineBtn
            to="/roadmaps"
            className="w-full sm:w-auto"
          >
            Explore Roadmaps
          </UnderlineBtn>

        </CTAGroup>

        {/* Stats */}
        <StatsRow className="flex-wrap gap-4 sm:gap-8 justify-center md:justify-start">
          <StatItem>
            <span className="number">
              <CountUp target={3400} />+
            </span>
            <span className="label">Students Today</span>
          </StatItem>
          <StatDivider className="hidden sm:block" />
          <StatItem>
            <span className="number">46+</span>
            <span className="label">Career Roadmaps</span>
          </StatItem>
          <StatDivider className="hidden sm:block" />
          <StatItem>
            <span className="number">98%</span>
            <span className="label">Success Rate</span>
          </StatItem>
        </StatsRow>

      </LeftCol>

      {/* ── Right Column ── */}
      <RightCol className="w-full h-[280px] sm:h-[360px] md:h-[520px] mt-8 md:mt-0">
        <PulseRing className="hidden sm:block" />
        <CardCarousel />

        <FloatingCard1 className="hidden sm:flex scale-90 sm:scale-100">
          <div className="avatar-stack">
            {avatarColors.map((c, i) => (
              <div key={i} className="avatar" style={{ background: c }} />
            ))}
          </div>
          <div className="info">
            <div className="top">3.4k+ Students</div>
            <div className="bottom">joined this week</div>
          </div>
        </FloatingCard1>

        <FloatingCard2 className="hidden sm:block scale-90 sm:scale-100">
          <div className="label">Avg. Salary Increase</div>
          <div className="value">+42%</div>
          <div className="sub">after roadmap completion</div>
        </FloatingCard2>
      </RightCol>

    </HeroSectionStyled>
  );
};