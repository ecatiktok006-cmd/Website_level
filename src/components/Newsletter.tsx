import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Send, Sparkles, CheckCircle2 } from 'lucide-react';

interface NewsletterProps {
  motionLevel: number;
}

export default function Newsletter({ motionLevel }: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Transform values for dynamic prominent CTA
  const scaleCTA = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const yCTA = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const opacityCTA = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  
  const bg1Y = useTransform(scrollYProgress, [0, 1], [-200, 200]);
  const bg2Y = useTransform(scrollYProgress, [0, 1], [300, -300]);

  // Magnetic Button Tracking (Level 4+)
  const submitRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (motionLevel < 4 || !submitRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = submitRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const distance = Math.hypot(dx, dy);

    if (distance < 100) {
      setCoords({ x: dx * 0.3, y: dy * 0.3 });
    } else {
      setCoords({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0 });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSuccess(true);
    setEmail('');
    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };

  const isL1 = motionLevel === 1;

  if (isL1) {
    return (
      <section className="py-20 px-margin-mobile md:px-margin-desktop bg-background w-full text-center" id="newsletter">
        <div className="max-w-md mx-auto flex flex-col items-center justify-center">
          <h3 className="text-2xl text-primary font-bold font-[family-name:theme('fontFamily.headline-md')] mb-3">
            The Inner Circle
          </h3>
          <p className="text-body-md text-on-surface-variant mb-6 max-w-md leading-relaxed">
            Be the first to know about new drops, seasonal flavors, and exclusive events.
          </p>
          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="relative w-full">
              <input 
                className="w-full bg-transparent border-0 border-b border-primary/30 py-3 px-0 text-md text-primary placeholder:text-primary/40 focus:ring-0 focus:border-primary transition-colors" 
                placeholder="Enter your email address" 
                required 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button 
              className="w-full py-4 bg-transparent border border-primary text-primary text-xs font-bold uppercase tracking-widest mt-2 cursor-pointer transition-colors duration-300 hover:bg-primary hover:text-white" 
              type="submit"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    );
  }

  // Animation configuration (Level >= 2)
  const containerVariants = {
    hidden: { opacity: 0, y: isL1 ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: motionLevel >= 4
        ? { type: 'spring', stiffness: 85, damping: 15 }
        : { duration: 0.6, ease: 'easeOut' }
    }
  };

  const buttonHoverProps = () => {
    if (isL1) return {};
    if (motionLevel === 3) {
      return {
        whileHover: { scale: 1.03 },
        whileTap: { scale: 0.98 },
        transition: { duration: 0.2, ease: 'easeOut' }
      };
    }
    // Level 4
    return {
      whileHover: { scale: 1.04 },
      whileTap: { scale: 0.96 }
    };
  };

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-margin-mobile md:px-margin-desktop bg-[#FAF8F5] border-t border-primary/5 w-full text-center relative overflow-hidden" id="newsletter">
      
      {/* Dynamic Ambient Background Elements for Level >= 4 */}
      {motionLevel >= 4 && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div 
            style={{ y: bg1Y }}
            className="absolute -top-40 -left-40 w-96 h-96 bg-[#D4A373]/10 rounded-full blur-3xl opacity-50"
          />
          <motion.div 
            style={{ y: bg2Y }}
            className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#7d562d]/5 rounded-full blur-3xl opacity-50"
          />
        </div>
      )}

      <div className="max-w-container-max mx-auto flex flex-col items-center justify-center relative z-10">
        
        {/* Newsletter Capsule Card */}
        <motion.div 
          initial={isL1 ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={motionLevel >= 4 ? undefined : containerVariants}
          style={motionLevel >= 4 ? { scale: scaleCTA, y: yCTA, opacity: opacityCTA } : {}}
          className={`flex flex-col items-center text-center max-w-lg w-full p-8 md:p-14 rounded-[2.5rem] relative overflow-hidden ${motionLevel >= 4 ? 'bg-white/80 backdrop-blur-2xl border border-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] ring-1 ring-primary/5' : 'bg-white border border-primary/10 shadow-ambient'}`}
        >
          {/* Subtle decorative gold details */}
          <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-[#D4A373] to-transparent" />

          {/* Icon Header */}
          <div className="bg-[#D4A373]/10 p-3.5 rounded-full text-secondary mb-6 hover:scale-110 transition-transform duration-300">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>

          <h3 className="text-2xl md:text-3xl text-primary font-black font-[family-name:theme('fontFamily.headline-md')] mb-3 tracking-tight">
            The Inner Circle
          </h3>
          
          <p className="text-body-md text-on-surface-variant mb-8 leading-relaxed max-w-sm">
            Subscribe to receive private bakery drop announcements, seasonal recipe releases, and members-only secret flavor codes.
          </p>

          <AnimatePresence mode="wait">
            {!success ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full flex flex-col gap-4.5" 
                onSubmit={handleSubmit}
              >
                <div className="relative w-full">
                  <input 
                    className="w-full bg-primary/5 border border-primary/10 rounded-xl py-3.5 px-4 text-sm text-primary placeholder:text-primary/45 focus:outline-none focus:ring-1 focus:ring-[#D4A373] focus:border-[#D4A373] transition-all" 
                    placeholder="Enter your email address" 
                    required 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <motion.button 
                  ref={submitRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  {...buttonHoverProps()}
                  className="w-full py-4.5 bg-primary text-white text-xs font-bold uppercase tracking-widest cursor-pointer select-none rounded-xl shadow-lg flex items-center justify-center gap-2" 
                  style={{
                    transform: motionLevel >= 4 ? `translate3d(${coords.x}px, ${coords.y}px, 0)` : 'none',
                    transition: motionLevel >= 4 ? 'transform 0.25s cubic-bezier(0.25, 1, 0.5, 1), background-color 0.2s' : 'all 0.3s ease'
                  }}
                  type="submit"
                >
                  <Send className="w-3.5 h-3.5" />
                  Subscribe Today
                </motion.button>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="w-full bg-[#FAF8F5] border border-[#D4A373]/30 p-6 rounded-2xl flex flex-col items-center gap-3"
              >
                <CheckCircle2 className="w-8 h-8 text-[#7d562d]" />
                <h4 className="text-sm font-bold text-primary uppercase tracking-wider font-mono">You're in the Circle!</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  We sent a welcoming discount code to your inbox. Check your emails soon!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
      </div>
    </section>
  );
}
