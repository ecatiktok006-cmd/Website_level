import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, ArrowRight, ShoppingCart, Heart } from 'lucide-react';

interface BagelPromoProps {
  motionLevel: number;
}

const bagels = [
  {
    id: 'plain',
    title: 'Bagel with Cream Cheese',
    writing: 'Plain cheese',
    desc: 'Classic golden toasted bagel generously layered with our thick, velvety original cream cheese spread.',
    tag: 'Pure & Simple',
    price: 'RM 10.00',
    color: 'from-amber-100 to-amber-200',
    image: '/src/assets/images/bagel_plain_1781149871655.png'
  },
  {
    id: 'capers',
    title: 'Bagel with Cream Cheese + Capers',
    writing: 'Caper cheese',
    desc: 'Toasted gourmet bagel layered with our rich cream cheese & tangy Capers for a subtle Mediterranean kick.',
    tag: 'Zesty Twist',
    price: 'RM 10.00',
    color: 'from-emerald-50 to-emerald-100',
    image: '/src/assets/images/bagel_caper_1781149883620.png'
  },
  {
    id: 'spring-onion',
    title: 'Bagel with Cream Cheese + Spring Onion',
    writing: 'Spring Onion',
    desc: 'Our freshly toasted bagel paired with custom cream cheese infused with aromatic local spring onions.',
    tag: 'Aromatic Herbs',
    price: 'RM 10.00',
    color: 'from-green-50 to-green-100',
    image: '/src/assets/images/bagel_spring_onion_1781149897138.png'
  },
  {
    id: 'roasted-garlic',
    title: 'Bagel with Cream Cheese + Roasted Garlic',
    writing: 'roasted garlic',
    desc: 'Rich cream cheese blended with soft, aromatic slow-roasted caramelized garlic over a perfect toasted bagel.',
    tag: 'Warm Savory',
    price: 'RM 11.00',
    color: 'from-rose-50 to-rose-100',
    image: '/src/assets/images/roasted_garlic_bagel_1781149991044.png'
  },
  {
    id: 'egg-spread',
    title: 'Egg Mayo Spread Bagel',
    writing: 'Egg spread',
    desc: 'Warm toasted bagel generously filled with a high-nutrition, ultra-fluffy spread of eggs and seasoned creamy mayonnaise.',
    tag: 'Breakfast Hero',
    price: 'RM 12.90',
    color: 'from-orange-50 to-orange-100',
    image: '/src/assets/images/egg_mayo_bagel_1781150008469.png'
  },
  {
    id: 'tuna-mayo',
    title: 'Bagel with Tuna Mayo',
    writing: 'tuna mayo',
    desc: 'Hearty flaked premium tuna tossed with loaded rich mayo, black pepper and selected spices in a fluffy toasted bagel.',
    tag: 'Gourmet Lunch',
    price: 'RM 15.00',
    color: 'from-stone-100 to-stone-200',
    image: '/src/assets/images/tuna_mayo_bagel_1781150027268.png'
  }
];

export default function BagelPromo({ motionLevel }: BagelPromoProps) {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [addedToCart, setAddedToCart] = useState<Record<string, boolean>>({});
  const [videoSrc, setVideoSrc] = useState<string>('/bagel.mp4');
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const handleVideoError = () => {
    // If the local bagel.mp4 file fails (e.g. is 0 bytes empty), we fall back to a gorgeous warm oven baking loop
    setVideoSrc('https://assets.mixkit.co/videos/preview/mixkit-fresh-breads-at-a-bakery-41584-large.mp4');
  };
  
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.25]);
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

  // Render basic clean level 1 markup
  if (isL1) {
    return (
      <section 
        id="bagels" 
        className="relative py-24 px-margin-mobile md:px-margin-desktop bg-[#1a110a] text-white w-full overflow-hidden"
      >
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <img
            src="/bg.png"
            alt="Bakery background"
            className="w-full h-full object-cover opacity-30 filter brightness-[0.7]"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="max-w-container-max mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-mono text-amber-200 font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10">
              BAGELS (TOASTED / READY TO EAT)
            </span>
            <h2 className="text-4xl md:text-5xl font-black font-sans mt-4 mb-6 leading-tight tracking-tight">
              Baked Fresh, Crafted For Devotion
            </h2>
            <p className="text-sm font-light text-white/70 leading-relaxed">
              Every single bagel is hand-rolled from scratch, using our proprietary flour recipe. Natural ingredients, absolutely zero improvers or chemical agents. Crispy outside, delightfully chewy inside.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bagels.map((bagel) => (
              <div 
                key={bagel.id}
                className="bg-white/5 rounded-2xl p-6 border border-white/10 relative flex flex-col justify-between h-full transition-all duration-300 shadow-lg"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] uppercase font-mono tracking-wider px-2.5 py-1 rounded bg-[#ffca98]/10 text-[#ffca98] font-bold border border-[#ffca98]/20">
                      {bagel.tag}
                    </span>
                    <span className="text-[10px] font-mono font-medium text-white/50 tracking-widest italic uppercase">
                      "{bagel.writing}"
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                    {bagel.title}
                  </h3>
                  <p className="text-xs text-white/60 mb-6 font-light leading-relaxed">
                    {bagel.desc}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/10 mt-auto">
                  <span className="text-lg font-black text-[#ffca98] font-mono leading-none">
                    {bagel.price}
                  </span>
                  <button 
                    onClick={(e) => addToCart(bagel.id, e)}
                    className="px-4 py-2 bg-[#ffca98] text-primary text-xs font-bold uppercase rounded-lg cursor-pointer"
                  >
                    {addedToCart[bagel.id] ? 'ADDED!' : 'ORDER NOW'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Render immersive L2 / L3 / L4 state with smart dynamic expansion effects
  return (
    <section 
      ref={sectionRef} 
      id="bagels" 
      className="relative py-28 md:py-36 px-margin-mobile md:px-margin-desktop bg-[#150d08] text-white w-full overflow-hidden"
    >
      {/* Background Video Engine with Parallax and Ambient Overlay */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        {motionLevel >= 3 ? (
          <motion.video
            src={videoSrc}
            onError={handleVideoError}
            autoPlay
            loop
            muted
            playsInline
            style={{ scale: videoScale }}
            className="w-full h-full object-cover opacity-65 filter brightness-90 grayscale-[2%]"
          />
        ) : (
          <video
            src={videoSrc}
            onError={handleVideoError}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-65 filter brightness-90"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#150d08]/50 via-transparent to-[#150d08]/50 z-10" />
        <div className="absolute inset-0 bg-[#150d08]/30 mix-blend-multiply z-10" />
      </div>

      <div className="max-w-container-max mx-auto relative z-20">
        
        {/* Responsive Headline Segment with scroll-driven entry hooks */}
        <motion.div 
          style={motionLevel >= 4 ? { y: textY, opacity: textOpacity } : {}}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-[#ffca98]/10 border border-[#ffca98]/20 px-4 py-1.5 rounded-full text-[#ffca98] text-xs font-semibold tracking-widest uppercase font-mono mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#ffca98] animate-spin" style={{ animationDuration: '6s' }} />
            TOASTED / READY TO EAT BAGELS
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-sans mb-6 leading-none md:leading-tight tracking-tight bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-transparent">
            Freshly Rounded, Devoted to Goodness
          </h2>
          
          <p className="text-body-md text-white/70 max-w-2xl mx-auto leading-relaxed">
            Every single roll in our bagel fleet is hand-poured from custom natural flours. Completely free from baking enhancers or chemicals. Always toasted golden crisp on the exterior & ultra-fluffy inside.
          </p>
        </motion.div>

        {/* Dynamic Bento Style Bagel Showcases with Micro-Interactive Expansions for Level 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {bagels.map((bagel, index) => {
            const cardVariants = {
              hidden: { opacity: 0, y: 40 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { 
                  type: 'spring', 
                  stiffness: 70, 
                  damping: 15,
                  delay: index * 0.08 
                }
              }
            };

            const isHovered = hoveredCardId === bagel.id;

            return (
              <motion.div
                key={bagel.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-5%" }}
                variants={cardVariants}
                onMouseEnter={() => setHoveredCardId(bagel.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                className="group relative bg-[#2a1b12]/70 hover:bg-[#342116]/90 backdrop-blur-md rounded-3xl p-6 border border-white/5 hover:border-[#ffca98]/30 transition-all duration-300 flex flex-col justify-between h-full shadow-[0_15px_30px_-10px_rgba(0,0,0,0.5)] z-10 overflow-hidden"
                animate={
                  motionLevel >= 2 
                    ? { 
                        scale: isHovered ? 1.03 : 1,
                        boxShadow: isHovered 
                          ? "0 25px 50px -12px rgba(255, 202, 152, 0.15)" 
                          : "0 15px 30px -10px rgba(0,0,0,0.5)" 
                      } 
                    : {}
                }
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
              >
                {/* Ambient Radial Mesh Glow behind cards on hover (Level >= 3) */}
                {motionLevel >= 3 && (
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                    style={{
                      background: `radial-gradient(circle at 50% 10%, rgba(255, 202, 152, 0.12) 0%, transparent 65%)`
                    }}
                  />
                )}

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    {/* In Level 3: Simple elegant static image preview on top of the card */}
                    {motionLevel === 3 && (
                      <div className="w-full h-44 overflow-hidden rounded-2xl relative bg-[#1c120a] border border-white/5 mb-5">
                        <img 
                          src={bagel.image} 
                          alt={bagel.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        />
                      </div>
                    )}

                    {/* In Level 4: Expandable Image Area: Starts at height 0px, expands smoothly to 190px when hovered */}
                    {motionLevel >= 4 && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                        animate={{ 
                          height: isHovered ? 190 : 0, 
                          opacity: isHovered ? 1 : 0,
                          marginBottom: isHovered ? 20 : 0
                        }}
                        transition={{ type: "spring", stiffness: 180, damping: 22 }}
                        className="w-full overflow-hidden rounded-2xl relative bg-[#1c120a] border border-white/5"
                      >
                        <motion.img 
                          src={bagel.image} 
                          alt={bagel.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                          animate={{ scale: isHovered ? 1.06 : 1 }}
                          transition={{ duration: 0.4 }}
                        />
                      </motion.div>
                    )}

                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-3 py-1 rounded-full bg-[#ffca98]/10 text-[#ffca98] border border-[#ffca98]/15">
                        {bagel.tag}
                      </span>
                      <span className="text-[10px] font-mono text-white/40 tracking-wider font-light italic">
                        "{bagel.writing}"
                      </span>
                    </div>

                    <h3 className="text-2xl font-black font-sans text-white mb-2.5 group-hover:text-[#ffca98] transition-colors leading-tight">
                      {bagel.title}
                    </h3>
                    
                    <p className="text-xs text-white/60 mb-6 font-light leading-relaxed">
                      {bagel.desc}
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-5 border-t border-white/10 mt-auto relative z-10">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-white/40 font-mono uppercase tracking-widest">Price</span>
                      <span className="text-xl font-black text-[#ffca98] font-mono mt-0.5 tracking-tight">
                        {bagel.price}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => toggleFavorite(bagel.id, e)}
                        className={`p-2.5 rounded-xl border border-white/10 hover:border-[#ffca98]/30 transition-all duration-300 cursor-pointer ${
                          favorites[bagel.id] ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' : 'text-white/60 hover:text-white'
                        }`}
                        aria-label="Add to favorites"
                      >
                        <Heart 
                          className={`w-4 h-4 transition-transform ${favorites[bagel.id] ? 'scale-110 fill-rose-400' : 'group-hover:scale-105'}`} 
                          strokeWidth={favorites[bagel.id] ? 2.5 : 1.5} 
                        />
                      </button>

                      <button 
                        onClick={(e) => addToCart(bagel.id, e)}
                        className={`px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-widest flex items-center gap-1.5 cursor-pointer transition-all duration-300 ${
                          addedToCart[bagel.id] 
                            ? 'bg-emerald-500 text-white shadow-lg' 
                            : 'bg-[#ffca98] text-primary hover:bg-[#ffb065] shadow-md hover:shadow-[#ffca98]/10'
                        }`}
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        {addedToCart[bagel.id] ? 'Added!' : 'Order'}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Highlight Callout Badge */}
        <div className="mt-16 md:mt-20 flex justify-center text-center">
          <p className="text-xs text-white/50 bg-white/5 border border-white/5 backdrop-blur-md px-6 py-3 rounded-full inline-flex items-center gap-2 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            FRESHLY HANDMADE EVERY MORNING. ORDERS OPEN UNTIL 4 PM DAILY.
          </p>
        </div>

      </div>
    </section>
  );
}
