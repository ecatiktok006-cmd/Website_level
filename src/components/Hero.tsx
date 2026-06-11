import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useTransform, useMotionValue } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

function Level3Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 14 } }
  };

  // Button Ripple State
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);

  const handleRipple = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = e.currentTarget.getBoundingClientRect();
    setRipple({
      x: e.clientX - btn.left,
      y: e.clientY - btn.top
    });
    setTimeout(() => setRipple(null), 600);
  };

  // Counter State (simulating a live stat update specifically for L3)
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const springCount = useSpring(count, { stiffness: 40, damping: 20 });
  const displayCount = useTransform(springCount, value => value.toLocaleString());

  useEffect(() => {
    const timeout = setTimeout(() => {
      count.set(152340);
    }, 500);
    return () => clearTimeout(timeout);
  }, [count]);

  return (
    <section className="relative w-full min-h-[92vh] flex items-center justify-center px-margin-mobile md:px-margin-desktop py-24 md:py-32 overflow-hidden bg-background">
      {/* Background Image - cleaner, brighter */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          alt="gourmet cookies photography stack chocolate sea salt warm focus background" 
          className="w-full h-full object-cover opacity-80" 
          src="/bg.png"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-white/10" />
      </div>

      {/* Main interactive wrapper */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center gap-6 bg-white/80 backdrop-blur-xl p-8 md:p-16 rounded-[2.5rem] border border-white shadow-2xl"
      >
        <motion.div variants={itemVariants} className="flex justify-center mb-4">
          <img src="/logo.png" alt="Logo" className="w-32 h-32 md:w-48 md:h-48 object-contain" />
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col gap-4">
          <h1 className="text-4xl sm:text-5xl md:text-7xl text-primary leading-tight font-black font-[family-name:theme('fontFamily.headline-lg')] tracking-tight">
            The Ultimate Roll & Bagel <span className="text-secondary italic font-serif">Experience</span>
          </h1>
        </motion.div>
        
        <motion.p variants={itemVariants} className="text-body-md md:text-lg text-on-surface-variant max-w-lg mx-auto leading-relaxed">
          We are specialized in cinnamon rolls and bagels. We bake our breads from scratch, made with our own instant flour recipes. Our flour are made with natural ingredients and contain no improver or chemical agents. Even so, our breads still stay soft and fluffy for days.
        </motion.p>

        {/* Live Counter element */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 mt-2 bg-primary/5 px-6 py-3 rounded-2xl border border-primary/10">
          <span className="text-sm font-bold text-primary uppercase tracking-wider">Rolls Baked:</span>
          <motion.span className="text-2xl font-black text-secondary font-mono tracking-tighter">
            {displayCount}
          </motion.span>
        </motion.div>
        
        <motion.div variants={itemVariants} className="mt-6 w-full sm:w-auto">
          <motion.a 
            onClick={handleRipple}
            href="#core-four"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative w-full sm:inline-flex items-center justify-center gap-2 px-10 py-5 bg-primary text-white text-sm font-bold uppercase tracking-widest rounded-2xl shadow-xl hover:shadow-primary/30 transition-all cursor-pointer select-none overflow-hidden"
          >
            {/* Ripple Effect */}
            <AnimatePresence>
              {ripple && (
                <motion.span
                  initial={{ scale: 0, opacity: 0.5 }}
                  animate={{ scale: 4, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  style={{
                    position: "absolute",
                    left: ripple.x,
                    top: ripple.y,
                    width: 100,
                    height: 100,
                    marginTop: -50,
                    marginLeft: -50,
                    borderRadius: "50%",
                    backgroundColor: "rgba(255, 255, 255, 0.4)",
                    pointerEvents: "none"
                  }}
                />
              )}
            </AnimatePresence>
            
            <span className="relative z-10 flex items-center gap-2">
              Explore The Menu
              <ArrowRight className="w-5 h-5 ml-1 transform group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}

interface HeroProps {
  motionLevel: number;
}

export default function Hero({ motionLevel }: HeroProps) {
  // Parallax Scroll Tracking (Level 4+)
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (motionLevel < 4) {
      setScrollY(0);
      return;
    }
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [motionLevel]);

  // Magnetic Button Tracking (Level 4+)
  const btnRef = useRef<HTMLAnchorElement>(null);
  const [btnCoords, setBtnCoords] = useState({ x: 0, y: 0 });

  const handleBtnMouseMove = (e: React.MouseEvent) => {
    if (motionLevel < 4 || !btnRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const distance = Math.hypot(dx, dy);

    if (distance < 120) {
      setBtnCoords({ x: dx * 0.3, y: dy * 0.3 }); // pull force
    } else {
      setBtnCoords({ x: 0, y: 0 });
    }
  };

  const handleBtnMouseLeave = () => {
    setBtnCoords({ x: 0, y: 0 });
  };

  // Canvas Particle Interactive Mesh (Level 5)
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    if (motionLevel < 5 || !canvasRef.current || !containerRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = containerRef.current.offsetWidth);
    let height = (canvas.height = containerRef.current.offsetHeight);

    const handleResize = () => {
      if (!containerRef.current) return;
      width = canvas.width = containerRef.current.offsetWidth;
      height = canvas.height = containerRef.current.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Seed floating organic cookie golden crumbs particles
    const particlesCount = 45;
    const particlesArray: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;
    }> = [];

    for (let i = 0; i < particlesCount; i++) {
      particlesArray.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.6,
        speedY: (Math.random() - 0.5) * 0.6,
        color: `212, 163, 115`, // D4A373 RGB cookie golden tint
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    const animateParticles = () => {
      ctx.clearRect(0, 0, width, height);

      particlesArray.forEach((p) => {
        // Move organically
        p.x += p.speedX;
        p.y += p.speedY;

        // Bounce back borders
        if (p.x < 0 || p.x > width) p.speedX *= -1;
        if (p.y < 0 || p.y > height) p.speedY *= -1;

        // Gravity/pull attraction relative to interactive mouse moves
        const dx = mousePos.x - p.x;
        const dy = mousePos.y - p.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 180) {
          const force = (180 - dist) / 180;
          // Soft magnetic pull particles toward mouse coordinate
          p.x += (dx / dist) * force * 1.5;
          p.y += (dy / dist) * force * 1.5;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${p.color}, ${force * 0.15})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mousePos.x, mousePos.y);
          ctx.stroke();
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.shadowBlur = dist < 120 ? 8 : 0;
        ctx.shadowColor = `rgb(${p.color})`;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      animId = requestAnimationFrame(animateParticles);
    };

    animateParticles();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [motionLevel, mousePos]);

  // Motion Variants Configuration
  const isL1 = motionLevel === 1;
  const isL2 = motionLevel === 2;
  const isL3 = motionLevel === 3;

  if (isL3) {
    return <Level3Hero />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: motionLevel >= 3 ? 0.15 : motionLevel === 2 ? 0.08 : 0,
        delayChildren: motionLevel >= 3 ? 0.15 : 0
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: isL1 ? 0 : 30 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: motionLevel >= 4 
        ? { type: 'spring', stiffness: 80, damping: 12, mass: 0.6 }
        : isL2 
        ? { type: 'tween', ease: 'easeOut', duration: 0.8 } // Beautiful smooth tween slide up for Level 2
        : { duration: 0.5, ease: 'easeOut' } // Level 3 default
    }
  };

  // Double check our hover scale configurations
  const getBtnHoverProps = () => {
    if (isL1) return {};
    if (isL2) {
      return {
        whileHover: { scale: 1.03 },
        transition: { type: 'tween', duration: 0.2, ease: 'easeInOut' }
      };
    }
    if (motionLevel === 3) {
      return {
        whileHover: { scale: 1.04 },
        whileTap: { scale: 0.98 },
        transition: { duration: 0.2, ease: 'easeOut' }
      };
    }
    // L4 and L5: rich springing mechanics
    return {
      whileHover: { scale: 1.05 },
      whileTap: { scale: 0.95 }
    };
  };

  const isFloatingAction = motionLevel === 5;

  if (isL1) {
    return (
      <section className="relative w-full min-h-[92vh] flex items-center justify-center px-margin-mobile md:px-margin-desktop py-24 md:py-32 overflow-hidden bg-[#26170c]/5" id="hero">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 select-none overflow-hidden">
          <img 
            alt="gourmet cookies photography stack chocolate sea salt warm focus background" 
            className="w-full h-full object-cover opacity-35" 
            src="/bg.png"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent"></div>
        </div>

        {/* Basic centered text layout, no card box background */}
        <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center gap-6 p-4">
          <img src="/logo.png" alt="Logo" className="w-32 h-32 md:w-48 md:h-48 object-contain mb-2 mx-auto" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl text-primary leading-tight font-black font-[family-name:theme('fontFamily.headline-lg')] tracking-tight">
            The Ultimate Roll & Bagel <span className="text-secondary italic font-serif">Experience</span>
          </h1>
          <p className="text-body-md md:text-lg text-on-surface-variant max-w-lg mx-auto leading-relaxed">
            We are specialized in cinnamon rolls and bagels. We bake our breads from scratch, made with our own instant flour recipes. Our flour are made with natural ingredients and contain no improver or chemical agents. Even so, our breads still stay soft and fluffy for days.
          </p>
          <div className="mt-4 w-full sm:w-auto">
            <a 
              className="w-full sm:inline-flex items-center justify-center gap-2 px-10 py-4.5 bg-[#26170c] text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer select-none"
              href="#core-four"
            >
              Explore Our Menu
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={containerRef}
      onMouseMove={(e) => {
        if (motionLevel < 5 || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }}
      onMouseLeave={() => setMousePos({ x: -1000, y: -1000 })}
      className="relative w-full min-h-[92vh] flex items-center justify-center px-margin-mobile md:px-margin-desktop py-24 md:py-32 overflow-hidden bg-background"
    >
      {/* Interactive Cinematic Canvas background for Level 5 */}
      {motionLevel === 5 && (
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 z-1 pointer-events-none" 
        />
      )}

      {/* Background Image with optional interactive Parallax (Level 4+) */}
      <div 
        className="absolute inset-0 z-0 select-none overflow-hidden"
        style={{
          transform: motionLevel >= 4 ? `translate3d(0, ${scrollY * 0.15}px, 0)` : 'none',
          transition: isL2 ? 'transform 0.4s ease-out' : 'none'
        }}
      >
        <img 
          alt="gourmet cookies photography stack chocolate sea salt warm focus background" 
          className="w-full h-full object-cover opacity-85 scale-102" 
          src="/bg.png"
        />
        {/* Dynamic Gradient for L4+ */}
        {motionLevel >= 4 && (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/30 via-transparent to-transparent opacity-60 mix-blend-overlay"></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/35 to-transparent"></div>
        <div className="absolute inset-0 bg-black/5"></div>
      </div>
      
      {/* Floating Showcase Images or Videos for Level 4+ */}
      {motionLevel >= 4 && (
        <>
          <div
            className="absolute hidden lg:flex items-center justify-center left-[4%] xl:left-[12%] 2xl:left-[18%] top-[15%] z-20 w-72 h-72 pointer-events-none"
            style={{ 
              transform: `translateY(${scrollY * 0.18}px)`
            }}
          >
            <motion.div 
              initial={{ opacity: 0, x: -50, y: 50, rotate: -10 }}
              animate={{ opacity: 1, x: 0, y: [0, -15, 0], rotate: [-8, -6, -8] }}
              transition={{ opacity: { duration: 1 }, x: { duration: 1 }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" } }}
              className="w-full h-full flex items-center justify-center"
            >
              <img 
                src="/float1.png" 
                alt="Premium Baked Roll" 
                className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)]" 
              />
            </motion.div>
          </div>
 
          <div
            className="absolute hidden lg:flex items-center justify-center right-[-20%] xl:right-[-10%] 2xl:right-[-2%] top-[8%] z-20 w-[885px] h-[885px] pointer-events-none"
            style={{ 
              transform: `translateY(${scrollY * 0.26}px)`
            }}
          >
            <motion.div 
              initial={{ opacity: 0, x: 100, y: 100, rotate: 15 }}
              animate={{ opacity: 1, x: 0, y: [0, -25, 0], rotate: [12, 8, 12] }}
              transition={{ opacity: { duration: 1.2, delay: 0.2 }, x: { duration: 1.2, delay: 0.2 }, y: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }, rotate: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 } }}
              className="w-full h-full flex items-center justify-center"
            >
              <video 
                src="/floating2_3D.webm" 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-contain filter drop-shadow-[0_30px_60px_rgba(0,0,0,0.35)]" 
              />
            </motion.div>
          </div>
        </>
      )}

      {/* Unified Animated Container with layout cards */}
      <motion.div 
        variants={containerVariants}
        initial={isL1 ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-10%"} }
        id="hero-animated-card"
        className={`relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center gap-6 p-8 md:p-16 rounded-[2.5rem] ${motionLevel >= 4 ? 'bg-white/60 backdrop-blur-3xl border border-white/50 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] ring-1 ring-white/70' : 'bg-white/75 backdrop-blur-md border border-primary/10 shadow-xl'} `}
        animate={isFloatingAction ? {
          y: [0, -12, 0],
          transition: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }
        } : undefined}
      >
        {/* Little badge tag */}
        <motion.div variants={itemVariants} className="flex flex-col gap-3">
          <img src="/logo.png" alt="Logo" className="w-32 h-32 md:w-48 md:h-48 mx-auto object-contain mb-2" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl text-primary leading-tight font-black font-[family-name:theme('fontFamily.headline-lg')] tracking-tight">
            The Ultimate Roll & Bagel <span className="text-secondary italic font-serif">Experience</span>
          </h1>
        </motion.div>
        
        <motion.p variants={itemVariants} className="text-body-md md:text-lg text-on-surface-variant max-w-lg mx-auto leading-relaxed">
          We are specialized in cinnamon rolls and bagels. We bake our breads from scratch, made with our own instant flour recipes. Our flour are made with natural ingredients and contain no improver or chemical agents. Even so, our breads still stay soft and fluffy for days.
        </motion.p>
        
        <motion.div variants={itemVariants} className="mt-4 w-full sm:w-auto">
          <motion.a 
            ref={btnRef}
            onMouseMove={handleBtnMouseMove}
            onMouseLeave={handleBtnMouseLeave}
            className="w-full sm:inline-flex items-center justify-center gap-2 px-10 py-4.5 bg-[#26170c] text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer select-none"
            style={{
              transform: motionLevel >= 4 ? `translate3d(${btnCoords.x}px, ${btnCoords.y}px, 0)` : 'none',
              transition: motionLevel >= 4 ? 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), background-color 0.2s, color 0.2s' : 'all 0.3s ease'
            }}
            {...getBtnHoverProps()}
            href="#core-four"
          >
            Explore Our Menu
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
