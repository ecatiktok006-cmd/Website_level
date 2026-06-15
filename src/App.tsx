/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import BagelPromo from './components/BagelPromo';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
}

export default function App() {
  // Motion Selector State - Active level which coordinates across all components
  // Defaults to Level 3 (Interactive Motion) as a highly premium baseline showcase!
  const [motionLevel, setMotionLevel] = useState<number>(3);

  // Scroll to the top of the page whenever the animation style or level changes
  useEffect(() => {
    const scrollBehavior = motionLevel === 1 ? 'auto' : 'smooth';
    window.scrollTo({
      top: 0,
      behavior: scrollBehavior
    });
  }, [motionLevel]);

  // Cinematic Custom Cursor Tracking (Level 5)
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [clickablesHovered, setClickablesHovered] = useState(false);

  // Reactive Spark Clicking Particles (Level 5)
  const [particles, setParticles] = useState<Particle[]>([]);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    if (motionLevel !== 5) {
      setParticles([]);
      return;
    }

    const updateParticles = () => {
      setParticles((prevParticles) => {
        if (prevParticles.length === 0) return [];
        return prevParticles
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy + 0.08, // vertical drift gravity
            vx: p.vx * 0.98,      // slight organic deceleration
            alpha: p.alpha - 0.025
          }))
          .filter((p) => p.alpha > 0);
      });
      requestRef.current = requestAnimationFrame(updateParticles);
    };

    if (particles.length > 0) {
      requestRef.current = requestAnimationFrame(updateParticles);
    }

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [particles.length, motionLevel]);

  useEffect(() => {
    if (motionLevel !== 5) return;

    // Track cursor moves globally for trailing cursor & clickable hover check
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Efficient delegate check to see if the element under cursor is clickable
      const target = e.target as HTMLElement;
      if (target) {
        const isClickable = target.closest('a, button, [role="button"], input, select, textarea');
        setClickablesHovered(!!isClickable);
      }
    };

    // Spawn rich particle burst on page clicks
    const handlePageClick = (e: MouseEvent) => {
      const count = 15;
      const sparksColors = ['#D4A373', '#7d562d', '#faf9f6', '#dec1af', '#E6C594'];
      const newSparks: Particle[] = [];

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 2;
        newSparks.push({
          id: Date.now() + i + Math.random(),
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 5 + 3,
          color: sparksColors[Math.floor(Math.random() * sparksColors.length)],
          alpha: 1
        });
      }

      setParticles((prev) => [...prev, ...newSparks]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handlePageClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handlePageClick);
    };
  }, [motionLevel]);

  return (
    <div className={`relative min-h-screen bg-background ${
      motionLevel === 5 ? 'cursor-none select-none' : ''
    }`}>
      {/* Cinematic Custom Cursor Trail layer for Level 5 */}
      {motionLevel === 5 && (
        <>
          {/* Main trailing fluid aura */}
          <div 
            className="fixed pointer-events-none z-[9999] rounded-full mix-blend-difference"
            style={{
              width: clickablesHovered ? '48px' : '20px',
              height: clickablesHovered ? '48px' : '20px',
              backgroundColor: 'white',
              transform: `translate3d(${mousePos.x - (clickablesHovered ? 24 : 10)}px, ${mousePos.y - (clickablesHovered ? 24 : 10)}px, 0)`,
              transition: 'transform 0.08s cubic-bezier(0.25, 1, 0.5, 1), width 0.2s, height 0.2s, background-color 0.2s'
            }}
          />
          {/* Precise core inner dot */}
          <div 
            className="fixed pointer-events-none z-[10000] rounded-full bg-[#D4A373] w-2 h-2"
            style={{
              transform: `translate3d(${mousePos.x - 4}px, ${mousePos.y - 4}px, 0)`,
              transition: 'transform 0.01s ease-out'
            }}
          />

          {/* Spark Particles Layer */}
          <div className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden">
            {particles.map((p) => (
              <div
                key={p.id}
                className="absolute rounded-full"
                style={{
                  left: p.x,
                  top: p.y,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  backgroundColor: p.color,
                  opacity: p.alpha,
                  transform: 'translate3d(-50%, -50%, 0)',
                  boxShadow: `0 0 6px ${p.color}`,
                  transition: 'opacity 0.01s'
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Main Page Layout Wrapper */}
      <Header motionLevel={motionLevel} setMotionLevel={setMotionLevel} />
      <main>
        <Hero motionLevel={motionLevel} />
        <BagelPromo motionLevel={motionLevel} />
        <Newsletter motionLevel={motionLevel} />
      </main>
      <Footer />
    </div>
  );
}


