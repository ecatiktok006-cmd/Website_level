import React, { useEffect, useState } from 'react';
import { Leaf, Box, Wheat, Check, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface IngredientsProps {
  motionLevel: number;
}

// Separate component for Level 3 to isolate its state and interactive components
function Level3Ingredients({ motionLevel, scrollY }: { motionLevel: number; scrollY: number }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const parentVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  };

  return (
    <section className="py-24 md:py-32 px-margin-mobile md:px-margin-desktop bg-background w-full overflow-hidden" id="ingredients">
      <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Columns - text of obsessive qualities */}
        <motion.div 
          variants={parentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="lg:col-span-7 flex flex-col gap-6 text-left"
        >
          <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-secondary uppercase tracking-widest font-mono">Our Sourcing Philosophy</span>
            <h2 className="text-3xl md:text-5xl text-primary font-black font-[family-name:theme('fontFamily.headline-lg')] tracking-tight">
              Obsessive Quality in <span className="text-secondary italic font-serif">Every Crumb</span>
            </h2>
            <div className="w-12 h-[2px] bg-[#D4A373] mt-2" />
          </motion.div>

          {/* Interactive Statistics */}
          <motion.div variants={itemVariants} className="flex gap-8 py-4">
            <div className="flex flex-col">
              <motion.span 
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-3xl font-black text-[#D4A373] font-mono"
              >
                100%
              </motion.span>
              <span className="text-xs uppercase tracking-wider font-bold text-primary mt-1">Farm Fresh</span>
            </div>
            <div className="flex flex-col">
              <motion.span 
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-3xl font-black text-[#D4A373] font-mono"
              >
                0g
              </motion.span>
              <span className="text-xs uppercase tracking-wider font-bold text-primary mt-1">Preservatives</span>
            </div>
            <div className="flex flex-col">
              <motion.span 
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl font-black text-[#D4A373] font-mono"
              >
                24h
              </motion.span>
              <span className="text-xs uppercase tracking-wider font-bold text-primary mt-1">Cold Ferment</span>
            </div>
          </motion.div>
          
          <motion.p variants={itemVariants} className="text-body-md md:text-lg text-on-surface-variant leading-relaxed max-w-2xl">
            A cinnamon roll is only as genuine as what goes into it. We strip away chemical preservatives, hydrogenated oils, and mass fillers, selecting only standard pasture-fresh and fair-trade ingredients.
          </motion.p>
          
          {/* Interactive FAQ / Accordion features */}
          <motion.div variants={itemVariants} className="flex flex-col gap-3 mt-4">
            {[
              { title: "Organic Sweet Grass Butter", icon: <Leaf className="w-5 h-5 flex-shrink-0 fill-current" />, text: "Sourced from pasture-raised, grass-fed family dairy farms for an intensely nutty, aromatic fat structure that creates a caramelized lace edge when baked." },
              { title: "Single-Origin Heritage Grain", icon: <Wheat className="w-5 h-5 flex-shrink-0" />, text: "Stone-milled custom crop wheat. It yields an incredibly rich crumb structure, deep wheat complexity, and a natural, delightful under-baked chew." },
              { title: "Noir Chocolate Blocks", icon: <Box className="w-5 h-5 flex-shrink-0" />, text: "Noir blocks of premium estate chocolate that we manually slice into giant pools. When baking, they melt into thick, decadent volcanic rivers." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                layout
                onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                whileHover={{ scale: 1.01, backgroundColor: "rgba(255,255,255,1)" }}
                whileTap={{ scale: 0.99 }}
                className={`p-4 rounded-2xl border cursor-pointer transition-colors shadow-ambient bg-white ${expandedIndex === idx ? 'border-[#D4A373]/50 ring-1 ring-[#D4A373]/20' : 'border-primary/5 hover:border-primary/15'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-xl transition-all duration-300 ${expandedIndex === idx ? 'bg-[#D4A373] text-white scale-110 shadow-md' : 'bg-[#D4A373]/10 text-secondary'}`}>
                    {item.icon}
                  </div>
                  <h4 className="text-base text-primary font-bold flex-grow font-[family-name:theme('fontFamily.headline-md')]">
                    {item.title}
                  </h4>
                  <motion.div animate={{ rotate: expandedIndex === idx ? 180 : 0 }} className="text-primary/40">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H11L7.5 10.5L4 6Z" fill="currentColor"></path></svg>
                  </motion.div>
                </div>
                
                <AnimatePresence>
                  {expandedIndex === idx && (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-on-surface-variant text-sm leading-relaxed pt-4 pl-16 pr-4">
                        {item.text}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Right Photo Column - Enhanced Elevation */}
        <motion.div 
          className="lg:col-span-5 relative w-full h-[350px] sm:h-[450px] lg:h-[600px] rounded-[2rem] overflow-hidden shadow-2xl group border border-primary/10"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ type: 'spring', stiffness: 60, damping: 20 }}
          whileHover={{ y: -10 }}
        >
          <img 
            alt="Cinnamon roll close up" 
            className="w-full h-full object-cover select-none transition-transform duration-700 group-hover:scale-105"
            src="/originalroll.png"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          
          {/* Floating Certified Overlay Badge */}
          <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur text-primary px-4 py-2.5 rounded-2xl shadow-xl border border-[#D4A373]/30 flex items-center gap-2 group-hover:bg-white group-hover:shadow-2xl transition-all">
            <Check className="w-4 h-4 text-secondary stroke-[3px]" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider">Heritage Mill Certified</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default function Ingredients({ motionLevel }: IngredientsProps) {
  const [scrollY, setScrollY] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const galleryImages = [
    "/originalroll.png",
    "/4chocolatehideout.png",
    "/4swirlofhappiness.png",
    "/4swirloforiginal.png",
    "/4swirlofpremium.png"
  ];

  useEffect(() => {
    if (motionLevel >= 4) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
      }, 1500);
      return () => clearInterval(interval);
    } else {
      setCurrentImageIndex(0);
    }
  }, [motionLevel]);

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

  const isL1 = motionLevel === 1;
  const isL2 = motionLevel === 2;
  const isL3 = motionLevel === 3;

  if (isL3) {
    return <Level3Ingredients motionLevel={motionLevel} scrollY={scrollY} />;
  }

  // Unified Entrance Animations
  const parentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: motionLevel >= 3 ? 0.15 : isL2 ? 0.08 : 0,
        delayChildren: isL1 ? 0 : 0.1
      }
    }
  };

  const leftTextVariants = {
    hidden: { opacity: 0, x: isL1 ? 0 : -35 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: motionLevel >= 4 
        ? { type: 'spring', stiffness: 80, damping: 14 }
        : isL2
        ? { type: 'tween', ease: 'easeOut', duration: 0.8 }
        : { duration: 0.6, ease: 'easeOut' }
    }
  };

  const rightImageVariants = {
    hidden: { opacity: 0, scale: isL1 ? 1 : 0.95, x: isL1 ? 0 : 35 },
    visible: { 
      opacity: 1, 
      scale: 1,
      x: 0,
      transition: motionLevel >= 4 
        ? { type: 'spring', stiffness: 70, damping: 13 }
        : isL2
        ? { type: 'tween', ease: 'easeOut', duration: 0.8 }
        : { duration: 0.7, ease: 'easeOut' }
    }
  };

  const listItemVariants = {
    hidden: { opacity: 0, y: isL1 ? 0 : 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: isL2 ? { type: 'tween', ease: 'easeOut', duration: 0.6 } : { duration: 0.4, ease: 'easeOut' }
    }
  };

  const getIngredientHoverProps = () => {
    if (isL1) return {};
    if (isL2) {
      return {
        whileHover: { x: 4 },
        transition: { type: 'tween', duration: 0.2, ease: 'easeInOut' }
      };
    }
    if (motionLevel === 3) {
      return {
        whileHover: { x: 8 },
        transition: { duration: 0.2, ease: 'easeOut' }
      };
    }
    return {
      whileHover: { x: 12, scale: 1.01 },
      transition: { type: 'spring', stiffness: 300, damping: 15 }
    };
  };

  if (isL1) {
    return (
      <section className="py-20 px-margin-mobile md:px-margin-desktop bg-background w-full text-left font-sans" id="ingredients">
        <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Columns - text of obsessive qualities */}
          <div className="lg:col-span-12 xl:col-span-7 flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-[#D4A373] uppercase tracking-widest font-mono">Our Sourcing Philosophy</span>
              <h2 className="text-3xl md:text-5xl text-primary font-black font-[family-name:theme('fontFamily.headline-lg')] tracking-tight">
                Obsessive Quality in <span className="text-secondary italic font-serif">Every Crumb</span>
              </h2>
            </div>

            <p className="text-body-md text-on-surface-variant leading-relaxed max-w-2xl">
              A cinnamon roll is only as genuine as what goes into it. We strip away chemical preservatives, hydrogenated oils, and mass fillers, selecting only standard pasture-fresh and fair-trade ingredients.
            </p>
            
            {/* Minimal flat description list (No card styling) */}
            <div className="flex flex-col gap-6 mt-2">
              <div>
                <h4 className="text-base text-primary font-bold mb-1 font-[family-name:theme('fontFamily.headline-md')]">
                  100% Organic Sweet Grass Butter
                </h4>
                <p className="text-on-surface-variant text-xs leading-relaxed max-w-xl">
                  Sourced from pasture-raised, grass-fed family dairy farms for an intensely nutty, aromatic fat structure that creates a caramelized lace edge when baked.
                </p>
              </div>
              <div className="border-t border-primary/10 pt-4">
                <h4 className="text-base text-primary font-bold mb-1 font-[family-name:theme('fontFamily.headline-md')]">
                  Single-Origin Heritage Grain Flour
                </h4>
                <p className="text-on-surface-variant text-xs leading-relaxed max-w-xl">
                  Stone-milled custom crop wheat. It yields an incredibly rich crumb structure, deep wheat complexity, and a natural, delightful under-baked chew.
                </p>
              </div>
              <div className="border-t border-primary/10 pt-4">
                <h4 className="text-base text-primary font-bold mb-1 font-[family-name:theme('fontFamily.headline-md')]">
                  Ethically Sourced Noir Chocolate Blocks
                </h4>
                <p className="text-on-surface-variant text-xs leading-relaxed max-w-xl">
                  Noir blocks of premium estate chocolate that we manually slice into giant pools. When baking, they melt into thick, decadent volcanic rivers.
                </p>
              </div>
            </div>
          </div>
          
          {/* Right Image (Static, clean, flat) */}
          <div className="lg:col-span-12 xl:col-span-5 relative w-full h-[320px] sm:h-[450px] lg:h-[500px]">
            <img 
              alt="Cinnamon roll close up" 
              className="w-full h-full object-cover rounded-xl select-none"
              src="/originalroll.png"
            />
          </div>

        </div>
      </section>
    );
  }

  return (
    <section className="py-24 md:py-32 px-margin-mobile md:px-margin-desktop bg-background w-full overflow-hidden" id="ingredients">
      <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Columns - text of obsessive qualities */}
        <motion.div 
          variants={parentVariants}
          initial={isL1 ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="lg:col-span-7 flex flex-col gap-6 text-left"
        >
          <motion.div variants={leftTextVariants} className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-secondary uppercase tracking-widest font-mono">Our Sourcing Philosophy</span>
            <h2 className="text-3xl md:text-5xl text-primary font-black font-[family-name:theme('fontFamily.headline-lg')] tracking-tight">
              Obsessive Quality in <span className="text-secondary italic font-serif">Every Crumb</span>
            </h2>
            <div className="w-12 h-[2px] bg-[#D4A373] mt-2" />
          </motion.div>

          <motion.p variants={leftTextVariants} className="text-body-md md:text-lg text-on-surface-variant leading-relaxed max-w-2xl">
            A cinnamon roll is only as genuine as what goes into it. We strip away chemical preservatives, hydrogenated oils, and mass fillers, selecting only standard pasture-fresh and fair-trade ingredients.
          </motion.p>
          
          {/* Bento-style Feature list cards */}
          <motion.div variants={leftTextVariants} className="flex flex-col gap-4.5 mt-2">
            
            <motion.div 
              variants={listItemVariants}
              {...getIngredientHoverProps()}
              className={`flex items-start gap-4.5 p-4 rounded-2xl relative overflow-hidden group cursor-pointer transition-colors ${motionLevel >= 4 ? 'bg-white/70 backdrop-blur-md border border-white shadow-[0_8px_16px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl hover:-translate-y-1' : 'bg-white border border-primary/5 hover:border-primary/10 shadow-ambient'}`}
            >
              {motionLevel >= 4 && <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />}
              <div className="bg-[#D4A373]/10 p-3 rounded-xl text-secondary group-hover:scale-115 group-hover:bg-[#D4A373]/20 transition-all duration-300 relative z-10">
                <Leaf className="w-5.5 h-5.5 flex-shrink-0 fill-current" />
              </div>
              <div className="flex-grow relative z-10">
                <h4 className="text-base text-primary font-bold font-[family-name:theme('fontFamily.headline-md')] mb-1">
                  100% Organic Sweet Grass Butter
                </h4>
                <p className="text-on-surface-variant text-xs leading-relaxed max-w-xl">
                  Sourced from pasture-raised, grass-fed family dairy farms for an intensely nutty, aromatic fat structure that creates a caramelized lace edge when baked.
                </p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-neutral-300 group-hover:text-secondary self-start transition-colors relative z-10" />
            </motion.div>
            
            <motion.div 
              variants={listItemVariants}
              {...getIngredientHoverProps()}
              className={`flex items-start gap-4.5 p-4 rounded-2xl relative overflow-hidden group cursor-pointer transition-colors ${motionLevel >= 4 ? 'bg-white/70 backdrop-blur-md border border-white shadow-[0_8px_16px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl hover:-translate-y-1' : 'bg-white border border-primary/5 hover:border-primary/10 shadow-ambient'}`}
            >
              {motionLevel >= 4 && <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />}
              <div className="bg-[#D4A373]/10 p-3 rounded-xl text-secondary group-hover:scale-115 group-hover:bg-[#D4A373]/20 transition-all duration-300 relative z-10">
                <Wheat className="w-5.5 h-5.5 flex-shrink-0" />
              </div>
              <div className="flex-grow relative z-10">
                <h4 className="text-base text-primary font-bold font-[family-name:theme('fontFamily.headline-md')] mb-1">
                  Single-Origin Heritage Grain Flour
                </h4>
                <p className="text-on-surface-variant text-xs leading-relaxed max-w-xl">
                  Stone-milled custom crop wheat. It yields an incredibly rich crumb structure, deep wheat complexity, and a natural, delightful under-baked chew.
                </p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-neutral-300 group-hover:text-secondary self-start transition-colors relative z-10" />
            </motion.div>
            
            <motion.div 
              variants={listItemVariants}
              {...getIngredientHoverProps()}
              className={`flex items-start gap-4.5 p-4 rounded-2xl relative overflow-hidden group cursor-pointer transition-colors ${motionLevel >= 4 ? 'bg-white/70 backdrop-blur-md border border-white shadow-[0_8px_16px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl hover:-translate-y-1' : 'bg-white border border-primary/5 hover:border-primary/10 shadow-ambient'}`}
            >
              {motionLevel >= 4 && <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />}
              <div className="bg-[#D4A373]/10 p-3 rounded-xl text-secondary group-hover:scale-115 group-hover:bg-[#D4A373]/20 transition-all duration-300 relative z-10">
                <Box className="w-5.5 h-5.5 flex-shrink-0" />
              </div>
              <div className="flex-grow relative z-10">
                <h4 className="text-base text-primary font-bold font-[family-name:theme('fontFamily.headline-md')] mb-1">
                  Ethically Sourced Noir Chocolate Blocks
                </h4>
                <p className="text-on-surface-variant text-xs leading-relaxed max-w-xl">
                  Noir blocks of premium estate chocolate that we manually slice into giant pools. When baking, they melt into thick, decadent volcanic rivers.
                </p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-neutral-300 group-hover:text-secondary self-start transition-colors relative z-10" />
            </motion.div>
            
          </motion.div>
        </motion.div>
        
        {/* Right Photo Column */}
        <motion.div 
          className="lg:col-span-5 relative w-full h-[320px] sm:h-[450px] lg:h-[580px] rounded-3xl overflow-hidden shadow-xl group border border-primary/5"
          variants={rightImageVariants}
          initial={isL1 ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          {/* Dynamic Parallax scale background under level >= 4 constraint */}
          <div 
            className="absolute inset-0 w-full h-[115%]"
            style={{
              transform: motionLevel >= 4 ? `translate3d(0, ${(scrollY - 1000) * -0.06}px, 0)` : 'none',
              transition: isL2 ? 'transform 0.4s ease-out' : 'all 0.3s'
            }}
          >
            <AnimatePresence mode="popLayout">
              <motion.img 
                key={motionLevel >= 4 ? currentImageIndex : 'static'}
                initial={motionLevel >= 4 ? { opacity: 0 } : false}
                animate={{ opacity: 1 }}
                exit={motionLevel >= 4 ? { opacity: 0 } : undefined}
                transition={{ duration: 0.5 }}
                alt="Cinnamon roll close up" 
                className={`absolute inset-0 w-full h-full object-cover select-none`}
                src={motionLevel >= 4 ? galleryImages[currentImageIndex] : "/originalroll.png"}
              />
            </AnimatePresence>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          
          {/* Floating Certified Overlay Badge */}
          <AnimatePresence>
            {motionLevel >= 4 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
                exit={{ opacity: 0 }}
                className="absolute bottom-6 right-6 bg-white/40 backdrop-blur-3xl text-white px-5 py-3 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] border border-white/50 flex items-center gap-2 overflow-hidden ring-1 ring-white/60"
                transition={{
                  scale: { duration: 0.3 },
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
                <Check className="w-5 h-5 text-[#facc15] stroke-[3px]" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest mix-blend-screen text-shadow-sm">Heritage Mill</span>
              </motion.div>
            ) : (
              // Simple static badge for L3
              <div className="absolute bottom-6 right-6 bg-white/95 text-primary px-4 py-2.5 rounded-2xl shadow-lg border border-[#D4A373]/20 flex items-center gap-2">
                <Check className="w-4 h-4 text-secondary stroke-[3px]" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider">Heritage Mill Certified</span>
              </div>
            ) : null}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
