import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, ShoppingCart, Heart, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import bagelBg from '../assets/images/bagel_background_1781232798138.jpg';

interface BagelPromoProps {
  motionLevel: number;
}

const cinnamonRolls = [
  {
    id: 'original-cream-cheese',
    title: 'Original Cream Cheese Swirl',
    writing: 'Classics',
    desc: 'Golden-brown baked cinnamon scroll smothered in our warm signature Madagascar vanilla cream cheese frosting.',
    tag: 'House Favorite',
    price: 'RM 6.50',
    image: '/4swirloforiginal.png'
  },
  {
    id: 'dark-chocolate-happiness',
    title: 'Dark Chocolate Happiness Swirl',
    writing: 'Choc Glaze',
    desc: 'Deep warm cocoa glaze swirled over toasted cinnamon crumb, layered thick for chocolate lovers.',
    tag: 'Sweet Decay',
    price: 'RM 7.50',
    image: '/4swirlofhappiness.png'
  },
  {
    id: 'peanut-butter-classic',
    title: 'Peanut Butter Jelly Swirl',
    writing: 'Nutty & Tart',
    desc: 'Organic creamy peanut butter glaze drizzle balanced with a rich sweet raspberry jam swirl.',
    tag: 'Salty Sweet',
    price: 'RM 7.50',
    image: '/4swirlofhappiness.png'
  },
  {
    id: 'premium-nutella',
    title: 'Hazelnut Nutella Premium Swirl',
    writing: 'Hazelnuts',
    desc: 'Warm hazelnut Nutella spread swirled lovingly over baked cinnamon layers, topped with chopped roasted nuts.',
    tag: 'Nutella Dream',
    price: 'RM 8.50',
    image: '/4swirlofpremium.png'
  },
  {
    id: 'ovomaltine-crunch',
    title: 'Ovomaltine Crunchy Swirl',
    writing: 'Malty Crisp',
    desc: 'Crispy malty chocolate Ovomaltine spread topped with crunchy cocoa crumbs for ultimate texture.',
    tag: 'Malt Crunch',
    price: 'RM 8.50',
    image: '/4chocolatehideout.png'
  },
  {
    id: 'lotus-biscoff',
    title: 'Lotus Biscoff Speculoos Swirl',
    writing: 'Cookie Butter',
    desc: 'Caramelized Lotus Biscoff glaze dripped elegantly over our spiced crust, loaded with speculoos biscuit crunch.',
    tag: 'Sweet Speculoos',
    price: 'RM 9.00',
    image: '/4swirlofpremium.png'
  }
];

export default function BagelPromo({ motionLevel }: BagelPromoProps) {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [addedToCart, setAddedToCart] = useState<Record<string, boolean>>({});
  const [videoSrc, setVideoSrc] = useState<string>('https://assets.mixkit.co/videos/preview/mixkit-fresh-breads-at-a-bakery-41584-large.mp4');

  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.22]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [80, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const addToCart = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setAddedToCart(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAddedToCart(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const isL1 = motionLevel === 1;

  // Immersive Menu Book state representation
  const [activeSpread, setActiveSpread] = useState<number>(0); // 0: Directory, 1: Sets, 2: Sourdough
  const [direction, setDirection] = useState<number>(0);

  const changeSpread = (newSpread: number) => {
    setDirection(newSpread > activeSpread ? 1 : -1);
    setActiveSpread(newSpread);
  };

  const [customBox, setCustomBox] = useState<Record<string, number>>({
    'original-cream-cheese': 0,
    'dark-chocolate-happiness': 0,
    'peanut-butter-classic': 0,
    'premium-nutella': 0,
    'ovomaltine-crunch': 0,
    'lotus-biscoff': 0,
  });

  const updateBoxCount = (id: string, amount: number) => {
    setCustomBox(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + amount);
      const values = Object.values({ ...prev, [id]: next }) as number[];
      const total = values.reduce((a, b) => a + b, 0);
      if (total <= 6) {
        return { ...prev, [id]: next };
      }
      return prev;
    });
  };

  const getPriceNum = (priceStr: string) => {
    return parseFloat(priceStr.replace('RM', '').trim());
  };

  const totalBoxPrice = Object.entries(customBox).reduce((acc, [id, qty]) => {
    const item = cinnamonRolls.find(r => r.id === id);
    if (!item) return acc;
    return acc + getPriceNum(item.price) * (qty as number);
  }, 0);

  const totalBoxCount = (Object.values(customBox) as number[]).reduce((a, b) => a + b, 0);
  const finalBoxPrice = totalBoxCount === 6 ? totalBoxPrice * 0.9 : totalBoxPrice; // 10% discount if full box of 6

  // Clean Level 1 rendering for static mode (no animations)
  if (isL1) {
    return (
      <section 
        id="menu-book-section" 
        className="relative py-24 px-margin-mobile md:px-margin-desktop bg-[#faf9f6] text-[#26170c] w-full overflow-hidden"
      >
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <img
            src="/bg.png"
            alt="Bakery background"
            className="w-full h-full object-cover opacity-10 filter brightness-[1.1]"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-mono text-[#7d562d] font-semibold px-3 py-1 rounded-full bg-[#7d562d]/10 border border-[#7d562d]/20">
              THE FLOUR-PROOFED MENU BOOK
            </span>
            <h2 className="text-4xl md:text-5xl font-black font-sans mt-4 mb-6 leading-tight tracking-tight text-[#26170c]">
              Aromatic Cinnamon Swirls
            </h2>
            <p className="text-sm font-light text-[#4f453f] leading-relaxed">
              Every single swirl in our gourmet fleet is hand-poured from custom natural flours. Flip through our classic selection to order your favorites individually or compose a custom box of six.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cinnamonRolls.map((roll) => (
              <div 
                key={roll.id}
                className="bg-white rounded-2xl p-6 border border-[#26170c]/10 relative flex flex-col justify-between h-full transition-all duration-300 shadow-sm"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] uppercase font-mono tracking-wider px-2.5 py-1 rounded bg-[#7d562d]/10 text-[#7d562d] font-bold border border-transparent">
                      {roll.tag}
                    </span>
                    <span className="text-[10px] font-mono font-medium text-[#26170c]/50 tracking-widest italic uppercase">
                      "{roll.writing}"
                    </span>
                  </div>

                  <div className="w-full h-44 overflow-hidden rounded-xl bg-neutral-100 border border-[#26170c]/10 mb-5">
                    <img 
                      src={roll.image} 
                      alt={roll.title} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <h3 className="text-xl font-bold text-[#26170c] mb-2 tracking-tight">
                    {roll.title}
                  </h3>
                  <p className="text-xs text-[#4f453f] mb-6 font-light leading-relaxed">
                    {roll.desc}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-[#26170c]/10 mt-auto">
                  <span className="text-lg font-black text-[#7d562d] font-mono leading-none">
                    {roll.price}
                  </span>
                  <button 
                    onClick={(e) => addToCart(roll.id, e)}
                    className="px-4 py-2 bg-[#26170c] text-white text-xs font-bold uppercase rounded-lg cursor-pointer hover:bg-[#7d562d] transition-colors"
                  >
                    {addedToCart[roll.id] ? 'ADDED!' : 'ORDER NOW'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Active Interactive / Immersive Multi-Level Rendering
  return (
    <section 
      ref={sectionRef} 
      id="menu-book-section" 
      className="relative py-28 md:py-36 px-margin-mobile md:px-margin-desktop bg-[#faf9f6] text-[#26170c] w-full overflow-hidden"
    >
      {/* Background Video Engine with Parallax and Ambient Overlay */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        {motionLevel >= 3 ? (
          <motion.video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            style={{ scale: videoScale }}
            className="w-full h-full object-cover opacity-20 filter brightness-110"
          />
        ) : (
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-20 filter brightness-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf9f6]/80 via-transparent to-[#faf9f6]/80 z-10" />
        <div className="absolute inset-0 bg-[#faf9f6]/60 mix-blend-overlay z-10" />
      </div>

      <div className="max-w-[1200px] mx-auto relative z-20">
        
        {/* Responsive Headline Segment with scroll-driven entry hooks */}
        <motion.div 
          style={motionLevel >= 4 ? { y: textY, opacity: textOpacity } : {}}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#7d562d]/10 border border-[#7d562d]/20 px-4 py-1.5 rounded-full text-[#7d562d] text-xs font-semibold tracking-widest uppercase font-mono mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#7d562d] animate-spin" style={{ animationDuration: '6s' }} />
            THE FLOUR-PROOFED MENU BOOK
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-sans mb-6 leading-none md:leading-tight tracking-tight text-[#26170c]">
            Warm Swirls of Happiness
          </h2>
          
          <p className="text-body-md text-[#4f453f] max-w-2xl mx-auto leading-relaxed font-light">
            Every single roll in our gourmet fleet is hand-poured from custom natural flours. Flip through our traditional menu ledger to explore our signature swirled creations or compose your own custom box.
          </p>
        </motion.div>

        {/* Elegant Menu Book Container with 3D Book Layout */}
        <div className="relative py-6 max-w-[1120px] mx-auto">
          
          {/* Leather Cover with paper-shadow and rounded profile edges */}
          <div 
            className="rounded-[24px] p-2.5 md:p-6 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.85)] relative overflow-hidden bg-cover bg-center border border-[#3e2413]/55"
            style={{
              backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC6TODvZ9Lwbn-4m-_pBz0fRBm883N1MNd7AcxKdZxS8wsJo1fb7RheqPeJCcna7zrFOhydHKtIJc1aS2BKOscLNzepichJbkNvtYna-RkRpuB711feJLroxt1UckvM-PWhPfiAEEEGounBIvK9PCefKCN1Y-QfTUyhG7S4QLt-zFezPxrKJ-vbGUz5kmi0dCKZk1-c7OLeISvSzJMR3B0xS9llGNz0XviQHU4xLQbNoExq1NceVfAjvQcKxWvjot3-qJOip8j5X0g')"
            }}
          >
            {/* Soft inner shadow of the leather fold */}
            <div className="absolute inset-0 bg-[#28180d]/40 mix-blend-color-burn pointer-events-none rounded-[24px]" />

            {/* Left Page Turn Ribbon Action Indicator */}
            {activeSpread > 0 && (
              <button 
                onClick={() => changeSpread(activeSpread - 1)} 
                className="absolute top-0 left-12 w-9 h-20 bg-[#7d562d]/90 text-white flex flex-col items-center justify-end pb-3 hover:pb-5 hover:h-24 transition-all duration-300 rounded-b-md shadow-lg z-30 cursor-pointer hidden md:flex border-l border-r border-[#623a1a]"
                title="Previous Page"
              >
                <ChevronLeft className="w-5 h-5 animate-bounce mb-1" />
                <span className="text-[9px] font-mono font-bold tracking-widest uppercase rotate-270 scale-[0.8] mb-1">BACK</span>
              </button>
            )}

            {/* Right Page Turn Ribbon Action Indicator */}
            {activeSpread < 3 && (
              <button 
                onClick={() => changeSpread(activeSpread + 1)} 
                className="absolute top-0 right-12 w-9 h-24 bg-[#26170c]/90 text-[#ffca98] flex flex-col items-center justify-end pb-3 hover:pb-5 hover:h-28 transition-all duration-300 rounded-b-md shadow-lg z-30 cursor-pointer hidden md:flex border-l border-r border-[#1a110a]"
                title="Next Page"
              >
                <ChevronRight className="w-5 h-5 animate-bounce mb-1" />
                <span className="text-[9px] font-mono font-bold tracking-widest uppercase rotate-90 scale-[0.8] mb-1">MORE</span>
              </button>
            )}

            {/* Two-Page Spread Paper Container */}
            <div className="relative rounded-lg overflow-hidden bg-[#faf9f6]/95 border border-[#3e2413]/25">
              
              {/* Spine Effect in Center */}
              <div 
                className="hidden md:block absolute left-1/2 top-0 bottom-0 w-14 -ml-[28px] z-20 pointer-events-none"
                style={{
                  background: "linear-gradient(to right, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.03) 25%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.03) 75%, rgba(0,0,0,0.18) 100%)",
                  boxShadow: "inset 1px 0 0 rgba(255,255,255,0.04), inset -1px 0 0 rgba(0,0,0,0.15)"
                }}
              />

              {/* Spread Render Switcher with motion animations */}
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={activeSpread}
                  initial={motionLevel >= 4 
                    ? { opacity: 0, rotateY: direction === 1 ? 90 : -90, scale: 0.9 }
                    : motionLevel >= 3 
                      ? { opacity: 0, x: activeSpread === 1 ? 60 : -60 } 
                      : {}}
                  animate={motionLevel >= 4 
                    ? { opacity: 1, rotateY: 0, scale: 1 }
                    : motionLevel >= 3 
                      ? { opacity: 1, x: 0, scale: 1 } 
                      : {}}
                  exit={motionLevel >= 4 
                    ? { opacity: 0, rotateY: direction === 1 ? -90 : 90, scale: 0.9 }
                    : {}}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  className="flex flex-col md:flex-row min-h-[760px] md:min-h-[810px] h-full text-[#26170c] w-full transform-gpu"
                  style={{
                    perspective: 1500,
                    transformOrigin: 'center',
                    backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCDTudGehFn6wlnWJXD9qpHcFssvEvEsi2T9F1MnKQGbOmBmfSmLN1KkEHWbz-BgAQ7U0dS884Qkgq_PDSSOtxspu9VucFZGBT5yCHVG-_yRBd_0C9F0cdYUll10rEOv0Q_TOzhVkakF2vw0AbHBhTzwnLyC-aooDAbnGzSGIsaEigfCn_AggkIujmpk8PbUOniZMscPSWNr9QL0j_z00ZB7VUGHnZ1CkQhSpOzPpkd-fa02v1w9oO6_Y2PFG6FVlRbS5U9jaeGjww')",
                    backgroundSize: "cover"
                  }}
                >

                {/* SPREAD 0: THE DIRECTORY */}
                {activeSpread === 0 ? (
                  <>
                    {/* LEFT PAGE: DIRECTORY */}
                    <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-between relative border-b md:border-b-0 md:border-r border-[#26170c]/5 min-h-[400px]">
                      
                      {/* Top Page Number & Title Banner */}
                      <div className="flex justify-between items-center border-b border-[#26170c]/12 pb-4 mb-6">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#7d562d] font-bold">Page 01</span>
                        <span className="text-[11px] font-mono tracking-widest font-extrabold uppercase text-[#26170c]/60">Menu Directory</span>
                      </div>

                      {/* Heading */}
                      <div className="text-center mb-6">
                        <h3 
                          className="font-serif text-3xl font-black tracking-widest text-[#26170c] inline-block pb-1.5 border-b-2 border-[#7d562d]/25 uppercase mix-blend-multiply text-center"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          Menu Directory
                        </h3>
                        <p className="text-xs md:text-sm font-light italic text-[#4f453f] mt-1.5">
                          Discover our aromatic offerings.
                        </p>
                      </div>

                      {/* Categories List */}
                      <div className="space-y-4 flex-grow px-2">
                        {[
                          { title: 'CINNAMON ROLLS SET', targetSpread: 0 },
                          { title: 'SET RAHMAH JIMAT GILER!', targetSpread: 1 },
                          { title: 'CINNAMON ROLLS ALA CARTE', targetSpread: 1 },
                          { title: 'BAGELS (UNTOASTED)', targetSpread: 1 },
                          { title: 'SCHMEAR (CREAM CHEESE)', targetSpread: 1 },
                          { title: 'BAGELS (TOASTED / READY TO EAT)', targetSpread: 1 },
                          { title: 'SOFT COOKIES', targetSpread: 2 },
                          { title: 'CAKE', targetSpread: 2 },
                          { title: 'DRINKS', targetSpread: 2 }
                        ].map((category, idx) => (
                          <div 
                            key={idx} 
                            onClick={() => {
                              // If it links to 0 but we are already on 0, don't do anything unless we want it to just jump to right side, 
                              // but since both sides are visible we can just change spread
                              if (activeSpread !== category.targetSpread) {
                                changeSpread(category.targetSpread);
                              }
                            }}
                            className="group flex items-end gap-3 w-full cursor-pointer hover:bg-[#26170c]/5 p-1.5 -mx-1.5 rounded transition-colors"
                          >
                            <span className="text-xs md:text-sm font-mono font-bold text-[#7d562d] w-5 md:w-6 leading-none">0{idx + 1}</span>
                            <h4 className="text-sm md:text-base font-bold text-[#26170c] tracking-tight group-hover:text-[#7d562d] transition-colors whitespace-nowrap leading-none">{category.title}</h4>
                            <div className="flex-grow border-b border-dotted border-[#26170c]/20 relative top-[-4px]"></div>
                          </div>
                        ))}
                      </div>

                      {/* Footer branding of paper page */}
                      <div className="mt-8 pt-4 border-t border-[#26170c]/8 text-[10px] font-mono text-[#26170c]/45 flex justify-between items-center">
                        <span className="hidden md:inline">EST. 2024</span>
                        <span>PAGE 01</span>
                      </div>
                    </div>

                    {/* RIGHT PAGE: CINNAMON ROLLS SET */}
                    <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-between relative min-h-[400px]">
                      
                      {/* Top Page Number & Title Banner */}
                      <div className="flex justify-between items-center border-b border-[#26170c]/12 pb-4 mb-6">
                        <span className="text-[11px] font-mono tracking-widest font-extrabold uppercase text-[#26170c]/60">Cinnamon Rolls Set</span>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#7d562d] font-bold">Page 02</span>
                      </div>

                      {/* Heading */}
                      <div className="text-center mb-8">
                        <h3 
                          className="font-serif text-3xl font-black tracking-widest text-[#26170c] inline-block pb-1.5 border-b-2 border-[#7d562d]/25 uppercase mix-blend-multiply text-center"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          Cinnamon Rolls Set
                        </h3>
                        <p className="text-xs md:text-sm font-light italic text-[#4f453f] mt-1.5">
                          Hand-crafted sets ready for sharing and indulgence.
                        </p>
                      </div>

                      {/* Sets List */}
                      <div className="space-y-4 flex-grow">
                        {[
                          { title: '4 SWIRL OF ORIGINAL', desc: '4 signature swirls of Original cinnamon rolls with cream cheese frosting.', price: 'RM 25.00', image: '/4swirloforiginal.png' },
                          { title: '4 SWIRL OF HAPPINESS', desc: 'Consists of Original, Nutella, Ovomaltine and Biscoff flavor cinnamon rolls.', price: 'RM 30.00', image: '/4swirlofhappiness.png' },
                          { title: '4 SWIRL OF PREMIUM', desc: 'Our premium assorted swirls featuring Lotus Biscoff and hazelnut Nutella rolls.', price: 'RM 34.00', image: '/4swirlofpremium.png' },
                          { title: '4 CHOCOLATE HIDE OUT', desc: '4 swirls of pure chocolate bliss (2 Nutella + 2 Ovomaltine).', price: 'RM 34.00', image: '/4chocolatehideout.png' },
                        ].map((set, idx) => (
                          <div key={idx} className="group flex items-center justify-between p-2 rounded-xl hover:bg-[#26170c]/5 transition-all border border-transparent hover:border-[#26170c]/10">
                            <div className="flex items-center gap-4 w-full">
                              <img src={set.image} alt={set.title} className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-white shadow-sm" />
                              <div className="flex-grow">
                                <div className="flex justify-between items-end mb-1">
                                  <h4 className="text-xs md:text-sm font-bold text-[#26170c] tracking-tight group-hover:text-[#7d562d] transition-colors">{set.title}</h4>
                                  <span className="text-xs md:text-sm font-mono font-black text-[#7d562d] ml-2">{set.price}</span>
                                </div>
                                <p className="text-[11px] md:text-xs text-[#4f453f] font-light italic leading-snug">{set.desc}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Footer branding of paper page */}
                      <div className="mt-8 pt-4 border-t border-[#26170c]/8 text-center text-[10px] font-mono text-[#26170c]/45 flex justify-between">
                        <span>PAGE 02</span>
                        <button 
                          onClick={() => changeSpread(1)} 
                          className="text-[#7d562d] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                        >
                          FLIP PAGE <ArrowRight className="w-3 h-3 animate-pulse" />
                        </button>
                      </div>
                    </div>
                  </>
                ) : activeSpread === 1 ? (
                  <>
                    {/* LEFT PAGE: CLASSIC SWIRLS */}
                    <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-between relative border-b md:border-b-0 md:border-r border-[#26170c]/5 min-h-[400px]">
                      
                      {/* Top Page Number & Title Banner */}
                      <div className="flex justify-between items-center border-b border-[#26170c]/12 pb-4 mb-4">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#7d562d] font-bold">Page 03</span>
                        <span className="text-[11px] font-mono tracking-widest font-extrabold uppercase text-[#26170c]/60">Set Rahmah & Ala Carte</span>
                      </div>

                      {/* Heading */}
                      <div className="text-center mb-4">
                        <h3 
                          className="font-serif text-3xl font-black tracking-widest text-[#26170c] inline-block pb-1.5 border-b-2 border-[#7d562d]/25 uppercase mix-blend-multiply text-center"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          Set Rahmah
                        </h3>
                        <p className="text-xs md:text-sm font-light italic text-[#4f453f] mt-1.5">
                          Set jimat dan kurang manis (Jimat Giler!)
                        </p>
                      </div>

                      {/* Sets List - compact list */}
                      <div className="space-y-1 mb-4 flex-grow flex flex-col justify-center">
                        {[
                          { title: 'Set RAHMAH HAPPINESS (Ready to Eat)', price: 'RM 26.00', image: '/4swirlofhappiness.png', desc: 'Consists of delicious, less sweet assorted cinnamon rolls set.' },
                          { title: 'Set RAHMAH PREMIUM (Ready to Eat)', price: 'RM 27.00', image: '/4swirlofpremium.png', desc: 'Our premium selected flavor assortment of fresh sweet rolls set.' },
                        ].map((set, idx) => (
                          <div key={idx} className="group flex items-center justify-between p-1.5 rounded-xl hover:bg-[#26170c]/5 transition-all duration-300 border border-transparent hover:border-[#7d562d]/10">
                            <div className="flex items-center gap-3 w-full">
                              <img src={set.image} alt={set.title} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                              <div className="flex-grow">
                                <div className="flex justify-between items-center mb-0.5">
                                  <h4 className="text-xs md:text-sm font-bold text-[#26170c] tracking-tight group-hover:text-[#7d562d] transition-colors leading-tight uppercase">{set.title}</h4>
                                  <span className="text-xs md:text-sm font-mono font-black text-[#7d562d] whitespace-nowrap ml-2">{set.price}</span>
                                </div>
                                <p className="text-[11px] md:text-xs text-[#4f453f] font-light italic leading-none mt-0.5">{set.desc}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Cinnamon Rolls Ala Carte List */}
                      <div className="border-t border-[#26170c]/12 pt-4 flex-grow flex flex-col justify-center">
                        <div className="text-center mb-3">
                          <h3 
                            className="font-serif text-3xl font-black tracking-widest text-[#26170c] inline-block pb-1.5 border-b-2 border-[#7d562d]/25 uppercase mix-blend-multiply text-center"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                          >
                            Ala Carte
                          </h3>
                          <p className="text-xs md:text-sm font-light italic text-[#4f453f] mt-1.5">Freshly baked individual delicacies</p>
                          <div className="mt-3 mb-1 flex justify-center">
                            <img src="/originalroll.png" alt="Cinnamon Roll" className="w-20 h-20 object-cover rounded-full shadow-sm" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs md:text-sm">
                          {[
                            { name: 'Original Cinnamon Rolls', price: 'RM 6.50' },
                            { name: 'Chocolate Cinnamon Rolls', price: 'RM 7.50' },
                            { name: 'Peanut Butter Cinnamon Rolls', price: 'RM 7.50' },
                            { name: 'Chocolate Peanut Butter Rolls', price: 'RM 8.00' },
                            { name: 'Nutella Cinnamon Roll', price: 'RM 9.00' },
                            { name: 'Biscoff Cinnamon Rolls', price: 'RM 8.50' },
                            { name: 'Ovomatine Cinnamon Rolls', price: 'RM 10.50' },
                            { name: 'Pistachio Cinnamon Rolls', price: 'RM 11.00' },
                            { name: 'Double Cheese Strawberry/Blueby', price: 'RM 8.00 - 8.50' },
                            { name: 'Almond Apple Caramel Cinnamon', price: 'RM 8.50' },
                          ].map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center py-1 border-b border-dashed border-[#26170c]/8 hover:bg-[#26170c]/5 px-1 rounded transition-colors duration-150">
                              <span className="text-[#26170c] font-medium leading-tight text-left min-w-[90px] truncate">{item.name}</span>
                              <span className="text-[#7d562d] font-mono font-bold whitespace-nowrap ml-2">{item.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Footer branding of paper page */}
                      <div className="mt-8 pt-4 border-t border-[#26170c]/8 text-[10px] font-mono text-[#26170c]/45 flex justify-between items-center">
                        <button 
                          onClick={() => changeSpread(0)} 
                          className="text-[#7d562d] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                        >
                          <ChevronLeft className="w-3 h-3" /> PREV PAGE
                        </button>
                        <span>PAGE 03</span>
                      </div>
                    </div>

                    {/* RIGHT PAGE: GOURMET PREMIUM SWIRLS */}
                    <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-between relative min-h-[400px]">
                      
                      {/* Top Page Number & Title Banner */}
                      <div className="flex justify-between items-center border-b border-[#26170c]/12 pb-4 mb-6">
                        <span className="text-[11px] font-mono tracking-widest font-extrabold uppercase text-[#26170c]/60">Gourmet Toppings</span>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#7d562d] font-bold">Page 04</span>
                      </div>

                      {/* Heading */}
                      <div className="text-center mb-6">
                        <h3 
                          className="font-serif text-3xl font-black tracking-widest text-[#26170c] inline-block pb-1.5 border-b-2 border-[#7d562d]/25 uppercase mix-blend-multiply text-center"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          Bagels Menu
                        </h3>
                        <p className="text-xs md:text-sm font-light italic text-[#4f453f] mt-1.5">
                          Hand-rolled, boiled, and baked fresh daily.
                        </p>
                      </div>

                      {/* Items Column */}
                      <div className="space-y-6 flex-grow flex flex-col justify-center">
                        <div className="relative z-10 bg-white/40 md:bg-transparent p-2 md:p-0 rounded-xl">
                          <h4 className="text-sm md:text-base font-mono font-bold tracking-widest uppercase text-[#7d562d] mb-4 border-b border-[#26170c]/10 pb-1.5">Toasted / Ready to Eat</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-xs md:text-sm">
                            {[
                              { name: 'Bagel with cream cheese', price: 'RM 10.00' },
                              { name: 'Bagel with cream cheese + capers', price: 'RM 10.00' },
                              { name: 'Bagel with cream cheese + spring onion', price: 'RM 10.00' },
                              { name: 'Bagel with cream cheese + roasted garlic', price: 'RM 11.00' },
                              { name: 'Egg mayo spread bagel', price: 'RM 12.90' },
                              { name: 'Bagel with tuna mayo', price: 'RM 15.00' },
                              { name: 'Bagel with cream cheese + jalapeno', price: 'RM 10.00' },
                              { name: 'Sambal hitam meknon bagel with egg 🌶️', price: 'RM 13.00', isNew: true },
                              { name: 'Double cheese chicken slice bagel', price: 'RM 16.00' },
                              { name: 'Beef streaky bagels with cheddar cheese', price: 'RM 18.00' },
                              { name: 'Bagels with smoked salmon', price: 'RM 25.00' },
                              { name: 'Bagel with Smoked Beef Brisket', price: 'RM 32.00' }
                            ].map((item, idx) => (
                              <div key={idx} className="flex justify-between items-start py-1 border-b border-dashed border-[#26170c]/10 last:border-0 hover:bg-[#26170c]/5 px-1 rounded transition-colors duration-150">
                                <span className="text-[#26170c] font-medium leading-tight max-w-[85%] pr-1">
                                  {item.isNew && <span className="text-rose-600 border border-rose-200 bg-rose-50 px-1 rounded font-bold mr-1 text-[9px] uppercase animate-pulse">NEW</span>}
                                  {item.name}
                                </span>
                                <span className="text-[#7d562d] font-mono font-bold whitespace-nowrap mt-0.5">{item.price}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Overlay Photo */}
                      <div className="absolute -bottom-8 -right-8 w-64 h-64 md:w-80 md:h-80 opacity-[0.08] pointer-events-none z-0">
                        <img src={bagelBg} alt="Bagel Background" className="w-full h-full object-cover rounded-full mix-blend-multiply grayscale blur-[1px]" />
                      </div>

                      {/* Footer branding of paper page */}
                      <div className="mt-8 pt-4 border-t border-[#26170c]/8 text-center text-[10px] font-mono text-[#26170c]/45 flex justify-between">
                        <span>PAGE 04</span>
                        <button 
                          onClick={() => changeSpread(2)} 
                          className="text-[#7d562d] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                        >
                          FLIP PAGE <ArrowRight className="w-3 h-3 animate-pulse" />
                        </button>
                      </div>
                    </div>
                  </>
                ) : activeSpread === 2 ? (
                  <>
                    {/* SPREAD 2: DIARY & BOX BUILDER */}
                    {/* LEFT PAGE: STORY & CRUMB DIARY */}
                    <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-between relative border-b md:border-b-0 md:border-r border-[#26170c]/5 min-h-[400px]">
                      
                      {/* Top Page Number & Title Banner */}
                      <div className="flex justify-between items-center border-b border-[#26170c]/12 pb-4 mb-6">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#7d562d] font-bold">Page 05</span>
                        <span className="text-[11px] font-mono tracking-widest font-extrabold uppercase text-[#26170c]/60">Sourdough & Kneading</span>
                      </div>

                      <div className="flex-grow space-y-7 md:space-y-10 my-auto">
                        <div className="text-center mb-6">
                          <span className="text-xs font-mono font-semibold uppercase text-[#7d562d] tracking-[0.2em] mb-1.5 block">Our Craft Sourdough</span>
                          <h3 
                            className="font-serif text-3xl font-black tracking-widest text-[#26170c] inline-block pb-1.5 border-b-2 border-[#7d562d]/25 uppercase mix-blend-multiply text-center"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                          >
                            Baker's Secrets
                          </h3>
                        </div>

                        <div className="space-y-6 text-[#4f453f] leading-relaxed text-xs">
                          <p className="font-light italic text-center text-xs md:text-sm px-4">
                            "Premium unbleached organic flour, wild mountain yeast starter, organic butter, and pure brown sugar. Absolute pure ingredients for our spiral swirls."
                          </p>

                          <div className="grid grid-cols-2 gap-4 pt-4">
                            <div className="p-4 bg-[#26170c]/4 border border-[#26170c]/8 rounded-xl text-center">
                              <span className="block text-xl font-bold font-mono text-[#7d562d] leading-none mb-1">24 HR</span>
                              <span className="text-[9px] font-mono uppercase tracking-wider text-[#26170c]/60">Slow Proofing</span>
                            </div>
                            <div className="p-4 bg-[#26170c]/4 border border-[#26170c]/8 rounded-xl text-center">
                              <span className="block text-xl font-bold font-mono text-[#7d562d] leading-none mb-1">CEYLON</span>
                              <span className="text-[9px] font-mono uppercase tracking-wider text-[#26170c]/60">Premium Cinnamon</span>
                            </div>
                            <div className="p-4 bg-[#26170c]/4 border border-[#26170c]/8 rounded-xl text-center">
                              <span className="block text-xl font-bold font-mono text-[#7d562d] leading-none mb-1">STONE</span>
                              <span className="text-[9px] font-mono uppercase tracking-wider text-[#26170c]/60">Deck Oven Baked</span>
                            </div>
                            <div className="p-4 bg-[#26170c]/4 border border-[#26170c]/8 rounded-xl text-center">
                              <span className="block text-xl font-bold font-mono text-[#7d562d] leading-none mb-1">100%</span>
                              <span className="text-[9px] font-mono uppercase tracking-wider text-[#26170c]/60">Natural Yeast starter</span>
                            </div>
                          </div>

                          <p className="text-center font-light leading-relaxed text-[#26170c]/80 mt-4 px-2">
                            Each cinnamon roll swirl is individually rolled and sliced by hand. We use natural butter to keep them unbelievably soft and moist for days, with a delicate outer crispiness.
                          </p>
                        </div>
                      </div>

                      {/* Footer branding of paper page */}
                      <div className="mt-8 pt-4 border-t border-[#26170c]/8 text-[10px] font-mono text-[#26170c]/45 flex justify-between items-center">
                        <button 
                          onClick={() => changeSpread(1)} 
                          className="text-[#7d562d] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                        >
                          <ChevronLeft className="w-3 h-3" /> PREV PAGE
                        </button>
                        <span>PAGE 05</span>
                      </div>
                    </div>

                    {/* RIGHT PAGE: THE CUSTOM SWIRL BOX BUILDER */}
                    <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-between relative min-h-[400px]">
                      
                      {/* Top Page Number & Title Banner */}
                      <div className="flex justify-between items-center border-b border-[#26170c]/12 pb-4 mb-6">
                        <span className="text-[11px] font-mono tracking-widest font-extrabold uppercase text-[#26170c]/60">Box Compositor</span>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#7d562d] font-bold">Page 06</span>
                      </div>

                      {/* Heading */}
                      <div className="text-center mb-6">
                        <h3 
                          className="font-serif text-3xl font-black tracking-widest text-[#26170c] inline-block pb-1.5 border-b-2 border-[#7d562d]/25 uppercase mix-blend-multiply text-center"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          Compose Your Swirl Box
                        </h3>
                        <p className="text-xs md:text-sm font-light italic text-[#4f453f] mt-1.5">
                          Assemble precisely 6 cinnamon rolls inside our signature kraft box and receive a <strong>10% Box Discount!</strong>
                        </p>
                      </div>

                      {/* Quick compose selector */}
                      <div className="space-y-3 flex-grow pr-1 overflow-y-auto max-h-[300px]">
                        {cinnamonRolls.map((roll) => {
                          const quantity = customBox[roll.id] || 0;
                          return (
                            <div key={roll.id} className="flex justify-between items-center bg-[#26170c]/4 p-2 rounded-xl border border-[#26170c]/6">
                              <div className="flex items-center gap-2.5">
                                <img src={roll.image} alt={roll.title} className="w-8 h-8 rounded-full object-cover border border-white" referrerPolicy="no-referrer" />
                                <div>
                                  <span className="text-xs md:text-sm font-bold block text-[#26170c] leading-none mb-1">{roll.title.replace(' Swirl', '')}</span>
                                  <span className="text-[11px] md:text-xs font-mono text-[#7d562d]">{roll.price} / ea</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 bg-white rounded-lg border border-[#2a170c]/12 px-2 py-0.5 shadow-sm">
                                <button 
                                  onClick={() => updateBoxCount(roll.id, -1)}
                                  className="text-xs font-black px-1.5 py-0.5 text-[#26170c] hover:bg-[#26170c]/5 rounded cursor-pointer leading-none"
                                >
                                  -
                                </button>
                                <span className="font-mono text-xs font-bold min-w-[12px] text-center text-[#26170c]">{quantity}</span>
                                <button 
                                  onClick={() => updateBoxCount(roll.id, 1)}
                                  className="text-xs font-black px-1.5 py-0.5 text-[#26170c] hover:bg-[#26170c]/5 rounded cursor-pointer leading-none"
                                  disabled={totalBoxCount >= 6}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Price Summary & Purchase trigger of Custom Box */}
                      <div className="mt-5 pt-3 border-t border-[#26170c]/12 space-y-3.5">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-[10px] font-mono uppercase text-[#26170c]/65 block">Swirls Count: {totalBoxCount}/6</span>
                            {totalBoxCount === 6 ? (
                              <span className="text-[10px] font-bold font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">10% Box Discount applied!</span>
                            ) : (
                              <span className="text-[9px] text-[#4f453f] italic font-light">Add {6 - totalBoxCount} more swirls to claim pack deal!</span>
                            )}
                          </div>
                          <div className="text-right">
                            <span className="text-[9px] font-mono uppercase text-[#26170c]/50 leading-none">Pack Total</span>
                            <span className="block text-xl font-mono font-black text-[#7d562d]">RM {finalBoxPrice.toFixed(2)}</span>
                          </div>
                        </div>

                        <button
                          disabled={totalBoxCount === 0}
                          onClick={() => {
                            alert(`Submitting box containing ${totalBoxCount} delicious cinnamon swirls for your order!`);
                            setCustomBox({
                              'original-cream-cheese': 0,
                              'dark-chocolate-happiness': 0,
                              'peanut-butter-classic': 0,
                              'premium-nutella': 0,
                              'ovomaltine-crunch': 0,
                              'lotus-biscoff': 0,
                            });
                          }}
                          className={`w-full py-3 rounded-xl font-bold uppercase tracking-widest text-xs shadow-md transition-all text-center ${
                            totalBoxCount > 0 
                              ? 'bg-[#7d562d] hover:bg-[#26170c] text-white cursor-pointer active:scale-98' 
                              : 'bg-[#26170c]/12 text-[#26170c]/45 cursor-not-allowed'
                          }`}
                        >
                          {totalBoxCount === 6 ? 'ORDER COMPLETED BOX' : 'ADD ASSEMBLY TO CART'}
                        </button>
                      </div>

                      {/* Return link */}
                      <div className="mt-6 pt-4 border-t border-[#26170c]/8 text-[10px] font-mono text-[#26170c]/45 flex justify-between items-center px-1">
                        <button 
                          onClick={() => changeSpread(1)} 
                          className="text-[#7d562d] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
                        >
                          <ChevronLeft className="w-3 h-3" /> SWIRLS LIST
                        </button>
                        <span className="font-bold hidden md:inline">PAGE 06</span>
                        <button 
                          onClick={() => changeSpread(3)} 
                          className="text-[#7d562d] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
                        >
                          FLIP PAGE <ArrowRight className="w-3 h-3 animate-pulse" />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* SPREAD 3: SOFT COOKIES & BEVERAGES/CAKES */}
                    {/* LEFT PAGE: SOFT COOKIES */}
                    <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-between relative border-b md:border-b-0 md:border-r border-[#26170c]/5 min-h-[400px]">
                      
                      {/* Top Page Number & Title Banner */}
                      <div className="flex justify-between items-center border-b border-[#26170c]/12 pb-4 mb-6">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#7d562d] font-bold">Page 07</span>
                        <span className="text-[11px] font-mono tracking-widest font-extrabold uppercase text-[#26170c]/60">Soft Cookies</span>
                      </div>

                      <div className="flex-grow flex flex-col">
                        {/* Heading */}
                        <div className="text-center mb-6">
                          <h3 
                            className="font-serif text-3xl font-black tracking-widest text-[#26170c] inline-block pb-1.5 border-b-2 border-[#7d562d]/25 uppercase mix-blend-multiply text-center"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                          >
                            Soft Cookies
                          </h3>
                          <p className="text-xs md:text-sm font-light italic text-[#4f453f] mt-1.5">
                            Warm, gooey, and irresistibly soft.
                          </p>
                        </div>

                        {/* Feature Image Header */}
                        <div className="w-full h-64 md:h-80 lg:h-[360px] rounded-2xl overflow-hidden relative mb-6 shadow-md border border-[#26170c]/10">
                          <img src="/softcookies.png" alt="Soft Cookies Assortment" className="w-full h-full object-cover origin-center hover:scale-105 transition-transform duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#26170c]/90 via-[#26170c]/20 to-transparent flex flex-col justify-end p-4 md:p-6">
                            <span className="text-[10px] text-[#ffca98] font-mono uppercase tracking-widest font-bold mb-1 drop-shadow-md">Baked Daily</span>
                            <h4 className="text-white font-serif text-2xl md:text-3xl font-bold leading-tight drop-shadow-lg">Gourmet Cookie Collection</h4>
                          </div>
                        </div>

                        {/* Items List */}
                        <div className="space-y-3">
                          {[
                            { name: 'Red Velvet Cookies', price: 'RM 8.00', desc: 'Indulgent cocoa and vanilla with cream cheese center' },
                            { name: 'Matcha Cookies', price: 'RM 7.50', desc: 'Premium matcha green tea baked to a soft perfection' },
                            { name: 'Pistachio Kunafeh', price: 'RM 9.00', desc: 'Middle-eastern inspired with roasted pistachio crunch' },
                          ].map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center py-2 px-3 rounded-xl hover:bg-[#26170c]/5 transition-colors border border-transparent hover:border-[#26170c]/10">
                              <div>
                                <span className="text-[#26170c] font-bold text-sm md:text-base leading-tight block">{item.name}</span>
                                <span className="text-[#4f453f] text-[10px] md:text-xs font-light italic mt-0.5 block">{item.desc}</span>
                              </div>
                              <span className="text-[#7d562d] font-mono font-black whitespace-nowrap ml-4 bg-[#7d562d]/10 px-2 py-1 rounded text-xs md:text-sm">{item.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Footer branding of paper page */}
                      <div className="mt-8 pt-4 border-t border-[#26170c]/8 text-[10px] font-mono text-[#26170c]/45 flex justify-between items-center">
                        <button 
                          onClick={() => changeSpread(2)} 
                          className="text-[#7d562d] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                        >
                          <ChevronLeft className="w-3 h-3" /> PREV PAGE
                        </button>
                        <span>PAGE 07</span>
                      </div>
                    </div>

                    {/* RIGHT PAGE: BEVERAGES & CAKES */}
                    <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-between relative min-h-[400px]">
                      {/* Top Page Number & Title Banner */}
                      <div className="flex justify-between items-center border-b border-[#26170c]/12 pb-4 mb-6 relative z-10">
                        <span className="text-[11px] font-mono tracking-widest font-extrabold uppercase text-[#26170c]/60">Cakes & Drinks</span>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#7d562d] font-bold">Page 08</span>
                      </div>

                      {/* Heading */}
                      <div className="text-center mb-6 relative z-10">
                        <h3 
                          className="font-serif text-3xl font-black tracking-widest text-[#26170c] inline-block pb-1.5 border-b-2 border-[#7d562d]/25 uppercase mix-blend-multiply text-center"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          Cakes & Drinks
                        </h3>
                        <p className="text-xs md:text-sm font-light italic text-[#4f453f] mt-1.5">
                          Sweet treats and refreshing sips.
                        </p>
                      </div>

                      {/* Content Placeholders */}
                      <div className="space-y-8 flex-grow flex flex-col justify-start relative z-10">
                        <div>
                          <h4 className="text-sm md:text-base font-mono font-bold tracking-widest uppercase text-[#7d562d] mb-4 border-b border-[#26170c]/10 pb-1.5">Sliced Cakes</h4>
                          <div className="grid grid-cols-1 gap-2 text-xs md:text-sm">
                            <div className="flex justify-between items-start py-1.5 border-b border-dashed border-[#26170c]/10 last:border-0 hover:bg-[#26170c]/5 px-2 rounded transition-colors duration-150">
                                <span className="text-[#26170c] font-medium leading-tight">Burnt Cheesecake</span>
                                <span className="text-[#7d562d] font-mono font-bold whitespace-nowrap">RM 15.00</span>
                            </div>
                            <div className="flex justify-between items-start py-1.5 border-b border-dashed border-[#26170c]/10 last:border-0 hover:bg-[#26170c]/5 px-2 rounded transition-colors duration-150">
                                <span className="text-[#26170c] font-medium leading-tight">Carrot Cake</span>
                                <span className="text-[#7d562d] font-mono font-bold whitespace-nowrap">RM 14.00</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm md:text-base font-mono font-bold tracking-widest uppercase text-[#7d562d] mb-4 border-b border-[#26170c]/10 pb-1.5">Hot & Cold Drinks</h4>
                          <div className="grid grid-cols-1 gap-2 text-xs md:text-sm">
                            <div className="flex justify-between items-start py-1.5 border-b border-dashed border-[#26170c]/10 last:border-0 hover:bg-[#26170c]/5 px-2 rounded transition-colors duration-150">
                                <span className="text-[#26170c] font-medium leading-tight">Americano (Hot / Iced)</span>
                                <span className="text-[#7d562d] font-mono font-bold whitespace-nowrap">RM 8.00</span>
                            </div>
                            <div className="flex justify-between items-start py-1.5 border-b border-dashed border-[#26170c]/10 last:border-0 hover:bg-[#26170c]/5 px-2 rounded transition-colors duration-150">
                                <span className="text-[#26170c] font-medium leading-tight">Latte (Hot / Iced)</span>
                                <span className="text-[#7d562d] font-mono font-bold whitespace-nowrap">RM 10.00</span>
                            </div>
                            <div className="flex justify-between items-start py-1.5 border-b border-dashed border-[#26170c]/10 last:border-0 hover:bg-[#26170c]/5 px-2 rounded transition-colors duration-150">
                                <span className="text-[#26170c] font-medium leading-tight">Matcha Latte (Hot / Iced)</span>
                                <span className="text-[#7d562d] font-mono font-bold whitespace-nowrap">RM 12.00</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Return link */}
                      <div className="mt-8 pt-4 border-t border-[#26170c]/8 text-center text-[10px] font-mono text-[#26170c]/45 flex justify-between relative z-10">
                        <span>PAGE 08</span>
                        <button 
                          onClick={() => changeSpread(0)} 
                          className="text-[#7d562d] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                        >
                          BACK TO DIRECTORY <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Highlight Callout Badge */}
        <div className="mt-16 md:mt-20 flex justify-center text-center">
          <p className="text-xs text-[#4f453f] bg-[#26170c]/5 border border-[#26170c]/10 backdrop-blur-md px-6 py-3 rounded-full inline-flex items-center gap-2 font-mono shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            FRESHLY HANDMOLDED EVERY MORNING. ORDER SLOTS OPEN TILL 4 PM DAILY.
          </p>
        </div>

      </div>
    </section>
  );
}
