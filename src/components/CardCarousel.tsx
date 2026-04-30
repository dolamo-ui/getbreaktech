import React from 'react';
import styled, { keyframes, } from 'styled-components';

import img1 from '../assets/DevOps Engineer.jpg';
import img2 from '../assets/Cloud Engineer.jpg';
import img3 from '../assets/Cybersecurity Specialist2.jpg';
import img4 from '../assets/Data Scientist.jpg';
import img5 from '../assets/Data Analyst.jpg';
import img6 from '../assets/Software Developer.jpg';
import img7 from '../assets/AI Engineer1.jpg';
import img8 from '../assets/Product Manager.jpg';
import img9 from '../assets/IT Support Specialist.jpg';
import img10 from '../assets/Business Analyst.jpg';

// ─── NOTE FOR INTEGRATION ──────────────────────────────────────────────────────
// Replace the import paths above with your actual image paths, e.g.:
//   import img1 from '../../assets/1774620849463_image.png';
//   import img2 from '../../assets/1774620906893_image.png';
//   etc.
// Or swap to require() / public URL strings if preferred.
// ───────────────────────────────────────────────────────────────────────────────

const rotating = keyframes`
  from {
    transform: perspective(1000px) rotateX(-12deg) rotateY(0deg);
  }
  to {
    transform: perspective(1000px) rotateX(-12deg) rotateY(360deg);
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
`;

const Inner = styled.div`
  --w: 110px;
  --h: 160px;
  --quantity: 10;
  --translateZ: 280px;
  position: absolute;
  width: var(--w);
  height: var(--h);
  top: 30%;
  left: calc(50% - (var(--w) / 2));
  transform-style: preserve-3d;
  animation: ${rotating} 22s linear infinite;

  @media (max-width: 1200px) {
    --translateZ: 240px;
  }

  @media (max-width: 900px) {
    --w: 90px;
    --h: 134px;
    --translateZ: 200px;
    top: 35%;
  }

  @media (max-width: 600px) {
    --w: 72px;
    --h: 110px;
    --translateZ: 160px;
    top: 38%;
  }

  @media (max-width: 400px) {
    --w: 60px;
    --h: 92px;
    --translateZ: 130px;
  }
`;

interface CardProps {
  index: number;
  color: string;
}

const CardItem = styled.div<CardProps>`
  position: absolute;
  inset: 0;
  border: 1.5px solid rgba(${p => p.color}, 0.7);
  border-radius: 16px;
  overflow: hidden;
  transform: rotateY(calc((360deg / 10) * ${p => p.index})) translateZ(var(--translateZ));
  box-shadow:
    0 0 20px rgba(${p => p.color}, 0.15),
    inset 0 0 20px rgba(${p => p.color}, 0.05);
  transition: border-color 0.3s;

  &:hover {
    border-color: rgba(${p => p.color}, 1);
  }
`;

const CardImg = styled.div<{ color: string; hasImage: boolean }>`
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at center,
    rgba(${p => p.color}, 0.12) 0%,
    rgba(${p => p.color}, 0.45) 60%,
    rgba(${p => p.color}, 0.75) 100%
  );
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${p => p.hasImage ? 'flex-end' : 'center'};
  gap: ${p => p.hasImage ? '0' : '8px'};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%);
    z-index: 1;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 55%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.72) 0%, transparent 100%);
    z-index: 2;
    pointer-events: none;
  }
`;

const Photo = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
`;

const CardLabel = styled.span<{ color: string }>`
  font-family: var(--font-display);
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: rgba(${p => p.color}, 1);
  text-transform: uppercase;
  position: relative;
  z-index: 3;
  text-align: center;
  padding: 0 6px 10px;
  line-height: 1.2;
  text-shadow: 0 1px 4px rgba(0,0,0,0.6);

  @media (max-width: 600px) {
    font-size: 0.45rem;
    padding: 0 4px 7px;
  }

  @media (max-width: 400px) {
    font-size: 0.4rem;
    padding: 0 3px 5px;
  }
`;

const CardDot = styled.div<{ color: string }>`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(${p => p.color}, 0.3);
  border: 1.5px solid rgba(${p => p.color}, 0.8);
  position: relative;
  z-index: 1;

  @media (max-width: 600px) {
    width: 16px;
    height: 16px;
  }
`;

// Cards with image paths (null = no image, show dot instead)
const cards: { color: string; label: string; image: string | null }[] = [
  { color: '142, 249, 252', label: 'DevOps Engineer',          image: img1 },
  { color: '142, 252, 204', label: 'Cloud Engineer',           image: img2 },
  { color: '142, 252, 157', label: 'Cybersecurity Specialist', image: img3 },
  { color: '215, 252, 142', label: 'Data Scientist',           image: img4 },
  { color: '252, 230, 142', label: 'Data Analyst',             image: img5 },
  { color: '252, 208, 142', label: 'Software Developer',       image: img6 },
  { color: '252, 160, 142', label: 'Product Manager',          image: img8 },
  { color: '252, 142, 239', label: 'AI Engineer',              image: img7 },
  { color: '204, 142, 252', label: 'Business Analyst',         image: img10 },
  { color: '142, 202, 252', label: 'IT Support Specialist',    image: img9 },
];

export const CardCarousel: React.FC = () => {
  return (
    <Wrapper className="w-full h-full min-h-[260px] sm:min-h-[340px] md:min-h-[520px]">
      <Inner
        style={{ '--quantity': 10 } as React.CSSProperties}
      >
        {cards.map((card, i) => (
          <CardItem
            key={i}
            index={i}
            color={card.color}
          >
            <CardImg
              color={card.color}
              hasImage={!!card.image}
            >
              {card.image && (
                <Photo src={card.image} alt={card.label} />
              )}
              {!card.image && <CardDot color={card.color} />}
              <CardLabel color={card.color}>{card.label}</CardLabel>
            </CardImg>
          </CardItem>
        ))}
      </Inner>
    </Wrapper>
  );
};