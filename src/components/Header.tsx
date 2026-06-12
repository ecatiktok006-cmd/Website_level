import React, { useRef, useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Sparkles, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  motionLevel: number;
  setMotionLevel: (level: number) => void;
}

export default function Header({ motionLevel, setMotionLevel }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const levels = [
    { num: 1, label: 'L1', title: 'Static Website', desc: 'No animations, instant hovers' },
    { num: 2, label: 'L2', title: 'Basic Motion', desc: 'Subtle transitions & initial load animations' },
    { num: 3, label: 'L3', title: 'Interactive Motion', desc: 'Scroll reveals, staggered entry, rich hover shadows/scales' },
    { num: 4, label: 'L4', title: 'Immersive Motion', desc: 'Parallax scrolls, springs & magnetic buttons' },
    { num: 5, label: 'L5', title: 'Game-Feel Experience', desc: 'Canvas particles, trailing cursor, floating assets, click sparkles' }
  ];

  const navLinks = [
    { 
      href: '#menu-book-section', 
      label: 'The Menu Book',
      dropdownItems: [
        { href: '#menu-book-section', label: 'SIGNATURE SWIRLS' },
        { href: '#menu-book-section', label: 'CUSTOM BOX COMPOSITOR' },
      ]
    },
    { href: '#ingredients', label: 'Our Sourcing' },
    { href: '#newsletter', label: 'Join the Club' }
  ];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Magnetic logo effect state (Level >= 4)
  const logoRef = useRef<HTMLAnchorElement>(null);
  const [logoCoords, setLogoCoords] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const headerScrolled = scrollY > 50;

  const handleLogoMouseMove = (e: React.MouseEvent) => {
    if (motionLevel < 4 || !logoRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = logoRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const distance = Math.hypot(dx, dy);

    if (distance < 100) {
      setLogoCoords({ x: dx * 0.25, y: dy * 0.25 });
    } else {
      setLogoCoords({ x: 0, y: 0 });
    }
  };

  const handleLogoMouseLeave = () => {
    setLogoCoords({ x: 0, y: 0 });
  };

  // Get active description to describe the currently active level design mode
  const activeLevelInfo = levels.find(l => l.num === motionLevel) || levels[1];

  return (
    <>
      <header className={`w-full top-0 sticky z-50 transition-all duration-500 ${
        motionLevel >= 4 
          ? (headerScrolled 
              ? 'bg-white/70 backdrop-blur-xl py-3 border-b border-primary/10 shadow-xl' 
              : 'bg-gradient-to-b from-white/90 to-transparent backdrop-blur-[2px] py-6 border-b-transparent shadow-none') 
          : 'bg-background/95 backdrop-blur-md py-4 border-b border-primary/5 shadow-sm'
      }`}>
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative">
          
          {/* Logo with optional Magnetic effect on Level 4/5 */}
          <a
            ref={logoRef}
            onMouseMove={handleLogoMouseMove}
            onMouseLeave={handleLogoMouseLeave}
            className="text-2xl font-bold font-[family-name:theme('fontFamily.headline-md')] text-primary tracking-tight relative cursor-pointer select-none transition-transform"
            style={{
              transform: motionLevel >= 4 ? `translate3d(${logoCoords.x}px, ${logoCoords.y}px, 0)` : 'none',
              transition: motionLevel === 2 ? 'transform 0.3s ease' : motionLevel >= 3 ? 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
            }}
            href="#"
          >
            by afzan
          </a>

          {/* Desktop Brand Navigation Links (Smooth scrolling) */}
          <nav className="hidden md:flex gap-8 items-center text-label-caps">
            {navLinks.map((link) => (
              <div key={link.href} className="relative group">
                <a
                  className="text-primary/75 hover:text-primary relative py-1 text-xs font-[600] tracking-wider uppercase transition-colors"
                  href={link.href}
                >
                  {link.label}
                  {/* Modern Underline transition on Hover (Level >= 2) */}
                  {motionLevel >= 2 && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#D4A373] origin-bottom-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                  )}
                </a>
                
                {link.dropdownItems && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 min-w-[600px]">
                    <div className={`rounded-3xl border border-primary/5 p-12 flex flex-col items-center relative transition-all duration-500 overflow-hidden ${motionLevel >= 4 ? 'bg-white/80 backdrop-blur-2xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] ring-1 ring-white/50' : 'bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)]'}`}>
                      {motionLevel >= 4 && (
                        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
                      )}
                      <div className="absolute top-5 right-5 z-10">
                        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors cursor-pointer group/btn" aria-label="Close">
                          <X className="w-5 h-5 text-gray-400 group-hover/btn:text-gray-600" strokeWidth={1.5} />
                        </button>
                      </div>
                      <div className="flex flex-col items-center gap-7 mt-4 w-full text-center">
                        {link.dropdownItems.map(item => (
                          <a 
                            key={item.label} 
                            href={item.href}
                            className="text-[15px] tracking-wide font-black uppercase text-[#5ce1e6] hover:text-[#45a4c0] hover:-translate-y-0.5 transition-all w-full block"
                          >
                            {item.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            
            {/* Ultimate Dropdown Showcase Level Selector */}
            <div className="relative" ref={dropdownRef} id="showcase-selector-container">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 bg-[#26170c]/5 hover:bg-[#26170c]/10 text-primary border border-primary/10 hover:border-primary/25 text-xs font-semibold rounded-full select-none cursor-pointer ${
                  motionLevel >= 2 ? 'transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]' : 'transition-none'
                }`}
              >
                <Sparkles className={`w-3.5 h-3.5 text-[#7d562d] ${motionLevel === 5 ? 'animate-spin' : 'animate-pulse'}`} />
                <span className="font-mono text-[11px] font-bold">MODE: L{motionLevel}</span>
                <span className="hidden sm:inline-block text-[11px] opacity-80 border-l border-primary/10 pl-1.5 ml-0.5">
                  {activeLevelInfo.title}
                </span>
                <span className="text-[9px] opacity-50 ml-0.5">▼</span>
              </button>

              {/* Floating Popover Container */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={motionLevel >= 2 ? { opacity: 0, y: 8, scale: 0.95 } : undefined}
                    animate={motionLevel >= 2 ? { opacity: 1, y: 0, scale: 1 } : undefined}
                    exit={motionLevel >= 2 ? { opacity: 0, y: 8, scale: 0.95 } : undefined}
                    transition={{ duration: motionLevel >= 3 ? 0.2 : motionLevel === 2 ? 0.12 : 0, ease: 'easeOut' }}
                    className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-primary/5 overflow-hidden z-50 p-2"
                  >
                    <div className="px-3 py-2 border-b border-primary/5 mb-1 text-left">
                      <span className="text-[9px] font-bold text-secondary uppercase tracking-widest font-mono">Select Showcase Mode</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      {levels.map((lvl) => {
                        const isActive = motionLevel === lvl.num;
                        return (
                          <button
                            key={lvl.num}
                            onClick={() => {
                              setMotionLevel(lvl.num);
                              setDropdownOpen(false);
                            }}
                            className={`flex flex-col text-left px-3 py-2 rounded-xl transition-colors cursor-pointer select-none ${
                              isActive
                                ? 'bg-primary text-white'
                                : 'hover:bg-primary/5 text-primary'
                            }`}
                          >
                            <div className="flex items-center gap-1.5">
                              <span className={`text-[9px] font-mono font-bold px-1 rounded ${
                                isActive ? 'bg-secondary-fixed text-primary' : 'bg-primary/10 text-primary'
                              }`}>
                                L{lvl.num}
                              </span>
                              <span className="text-xs font-bold">{lvl.title}</span>
                            </div>
                            <p className={`text-[10px] mt-0.5 leading-snug ${
                              isActive ? 'text-white/75' : 'text-on-surface-variant/80'
                            }`}>
                              {lvl.desc}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Shopping Cart (With hover scale on level >= 2) */}
            <button 
              aria-label="shopping_cart" 
              className={`text-primary flex items-center justify-center p-1 rounded-full ${
                motionLevel >= 2 ? 'hover:scale-110 active:scale-95 hover:bg-primary/5 transition-all duration-200' : 'transition-none'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
            </button>

            {/* Mobile menu trigger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-primary p-1 hover:bg-primary/5 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: motionLevel >= 3 ? 0.3 : motionLevel === 2 ? 0.15 : 0 }}
            className="md:hidden w-full bg-background border-b border-primary/10 overflow-hidden z-40 sticky top-[84px] shadow-lg text-left"
          >
            <div className="px-margin-mobile py-5 flex flex-col gap-4">
              <span className="text-label-caps text-secondary tracking-widest text-[10px] font-bold block">Quick Navigation:</span>
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <div key={link.href} className="flex flex-col">
                    <a
                      onClick={() => !link.dropdownItems && setMobileMenuOpen(false)}
                      href={link.href}
                      className="text-primary font-semibold text-sm py-1 border-b border-primary/5 hover:text-secondary hover:pl-1 transition-all"
                    >
                      {link.label}
                    </a>
                    {link.dropdownItems && (
                      <div className="flex flex-col pl-4 mt-1 border-l border-primary/10 ml-2">
                        {link.dropdownItems.map(item => (
                          <a
                            key={item.label}
                            onClick={() => setMobileMenuOpen(false)}
                            href={item.href}
                            className="text-[#58CBEB] font-bold text-xs py-1.5 uppercase tracking-wider hover:text-[#45a4c0] hover:pl-1 transition-all"
                          >
                            {item.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
