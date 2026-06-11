import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { ShoppingBag, Star, Sparkles, Plus, Check } from 'lucide-react';

// Level 3 Highly Interactive Card
function L3InteractiveCard({ product }: { product: any }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const [added, setAdded] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleAddCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div
      style={{ perspective: 1000 }}
      whileHover={{ scale: 1.02 }}
      className="h-full"
    >
      <motion.article 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="flex flex-col group relative bg-white rounded-3xl border border-primary/10 p-5 shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full text-left cursor-pointer"
      >
        <div className="relative w-full aspect-square bg-surface-container-low rounded-2xl overflow-hidden mb-5">
          <motion.img 
            alt={product.imgAlt} 
            className="w-full h-full object-cover select-none" 
            src={product.imgUrl}
            style={{ transformZ: 40 }} // Creates parallax pop effect inside the card
            transition={{ duration: 0.3 }}
          />
          {/* Subtle reflection overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay" />
          
          {/* Embedded Price Tag */}
          <motion.div 
            style={{ transformZ: 60 }}
            className="absolute top-3 right-3 bg-white/90 backdrop-blur text-primary text-xs font-black p-2 rounded-xl shadow-md border border-white/50"
          >
            {product.price}
          </motion.div>
        </div>

        <motion.div className="flex flex-col flex-grow" style={{ transformZ: 30 }}>
          <div className="flex items-center gap-1 mb-2">
            <div className="flex text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-bold text-primary">{product.rating}</span>
            <span className="text-[10px] text-neutral-400 font-mono">({product.reviews})</span>
          </div>

          <h3 className="text-lg text-primary font-bold font-[family-name:theme('fontFamily.headline-md')] mb-2 group-hover:text-secondary transition-colors duration-200">
            {product.title}
          </h3>
          
          <p className="text-[#4f453f] text-xs leading-relaxed font-[family-name:theme('fontFamily.body-md')] flex-grow line-clamp-3">
            {product.description}
          </p>

          {/* Interactive Action Button */}
          <div className="mt-5 pt-4 border-t border-primary/5 flex items-center justify-between">
            <span className="text-[11px] font-black uppercase font-mono tracking-widest text-[#D4A373]">
              Quick Add
            </span>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={handleAddCart}
              className={`relative overflow-hidden group/btn text-white p-2.5 rounded-xl transition-all duration-300 shadow-md ${added ? 'bg-green-600' : 'bg-primary hover:bg-[#D4A373]'}`}
            >
              <AnimatePresence mode="popLayout">
                {added ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <Check className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="bag"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <Plus className="w-4 h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>
      </motion.article>
    </motion.div>
  );
}

function Level3CoreFour({ products }: { products: any[] }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  };

  return (
    <section className="py-24 md:py-32 px-margin-mobile md:px-margin-desktop bg-[#FAF8F5] border-t border-b border-primary/5 w-full" id="core-four">
      <div className="max-w-container-max mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={itemVariants}
          className="flex flex-col items-center text-center gap-3 mb-16 md:mb-20"
        >
          <span className="text-[10px] font-bold text-[#D4A373] uppercase tracking-widest font-mono bg-[#D4A373]/10 px-3 py-1 rounded-full">Bestselling</span>
          <h2 className="text-4xl md:text-5xl text-primary font-black font-[family-name:theme('fontFamily.headline-lg')] tracking-tight">The Core Four</h2>
          <div className="w-16 h-[3px] bg-[#D4A373] mt-2 mb-4 rounded-full shadow-sm" />
          <p className="text-body-md md:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Our signature cinnamon roll selection. Freshly baked swirls of happiness with rich, gooey frostings and premium flavors. Click cards to toggle details.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-8%" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 perspective-1000"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <L3InteractiveCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default function CoreFour({ motionLevel }: { motionLevel: number }) {
  const products = [
    {
      id: "swirl-of-original",
      title: "4 Swirl of Original",
      price: "RM 25.00",
      rating: "4.9",
      reviews: "128",
      description: "4 swirls of Original cinnamon rolls with cream cheese frosting",
      imgUrl: "/4swirloforiginal.jpg",
      imgAlt: "4 Swirl of Original"
    },
    {
      id: "swirl-of-happiness",
      title: "4 Swirl of Happiness",
      price: "RM 28.00",
      rating: "4.8",
      reviews: "96",
      description: "4 swirl of best sellers. Original, peanut butter, dark choc and mix(dark choc+peanut butter)",
      imgUrl: "/4swirlofhappiness.jpg",
      imgAlt: "4 Swirl of Happiness"
    },
    {
      id: "swirl-of-premium",
      title: "4 Swirl of Premium",
      price: "RM 32.00",
      rating: "5.0",
      reviews: "214",
      description: "Consist of Original, Nutella, Ovomaltine and Biscoff flavor cinnamon rolls",
      imgUrl: "/4swirlofpremium.jpg",
      imgAlt: "4 Swirl of Premium"
    },
    {
      id: "chocolate-hide-out",
      title: "4 Chocolate Hide Out",
      price: "RM 35.00",
      rating: "4.9",
      reviews: "156",
      description: "4 swirls of cinnamon rolls with cream cheese frosting. (2 Nutella + 2 Ovomaltine)",
      imgUrl: "/4chocolatehideout.jpg",
      imgAlt: "4 Chocolate Hide Out"
    }
  ];

  const isL1 = motionLevel === 1;
  const isL2 = motionLevel === 2;
  const isL3 = motionLevel === 3;

  if (isL3) {
    return <Level3CoreFour products={products} />;
  }

  // Header Entry Transition Variants (Level >= 2)
  const titleVariants = {
    hidden: { opacity: 0, y: isL1 ? 0 : 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' }
    }
  };

  // Card Grid Entry Stagger (Level >= 2)
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: motionLevel >= 3 ? 0.12 : isL2 ? 0.08 : 0,
        delayChildren: isL1 ? 0 : 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: isL1 ? 0 : 35 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: motionLevel >= 4 
        ? { type: 'spring', stiffness: 90, damping: 14 }
        : isL2 
        ? { type: 'tween', ease: 'easeOut', duration: 0.8 } // Standard smooth slide up for Level 2
        : { duration: 0.6, ease: 'easeOut' } // Level 3 default
    }
  };

  // Dynamic Hover Motion definition depending on levels
  const getCardHoverProps = () => {
    if (isL1) return {};
    if (isL2) {
      // Level 2 basic hover scale
      return {
        whileHover: { y: -6, scale: 1.015 },
        transition: { type: 'tween', duration: 0.25, ease: 'easeInOut' }
      };
    }
    if (motionLevel === 3) {
      return {
        whileHover: { y: -8, scale: 1.025 },
        transition: { duration: 0.25, ease: 'easeOut' }
      };
    }
    if (motionLevel === 4) {
      return {
        whileHover: { y: -12, scale: 1.04 },
        transition: { type: 'spring', stiffness: 200, damping: 12 }
      };
    }
    // Level 5: Premium game feel responsive floating glow
    return {
      whileHover: { y: -16, scale: 1.05, rotateZ: [0, -0.5, 0.5, 0] },
      transition: {
        y: { type: 'spring', stiffness: 220, damping: 10 },
        scale: { type: 'spring', stiffness: 220, damping: 10 },
        rotateZ: { type: 'tween', duration: 0.4, ease: 'easeInOut' }
      }
    };
  };

  if (isL1) {
    return (
      <section className="py-20 px-margin-mobile md:px-margin-desktop bg-[#FAF8F5] border-t border-b border-primary/5 w-full font-sans" id="core-four">
        <div className="max-w-container-max mx-auto">
          
          {/* Section Header */}
          <div className="flex flex-col items-center text-center gap-3 mb-16">
            <span className="text-[10px] font-bold text-secondary uppercase tracking-widest font-mono">Bestselling Recipes</span>
            <h2 className="text-3xl md:text-5xl text-primary font-black font-[family-name:theme('fontFamily.headline-lg')] tracking-tight">The Core Four</h2>
            <div className="w-12 h-[2px] bg-[#D4A373] my-1" />
            <p className="text-body-md text-on-surface-variant max-w-2xl leading-relaxed">
              Our signature cinnamon roll selection. Freshly baked swirls of happiness with rich, gooey frostings and premium flavors.
            </p>
          </div>

          {/* Simple flat cardless layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <article key={product.id} className="flex flex-col relative h-full text-left">
                {/* Image layout without massive padded cards */}
                <div className="relative w-full aspect-square bg-surface-container-low rounded-lg overflow-hidden mb-4">
                  <img 
                    alt={product.imgAlt} 
                    className="w-full h-full object-cover select-none" 
                    src={product.imgUrl}
                  />
                  <div className="absolute top-2.5 right-2.5 bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-sm">
                    {product.price}
                  </div>
                </div>

                <div className="flex flex-col flex-grow">
                  <h3 className="text-lg text-primary font-bold mb-1 font-[family-name:theme('fontFamily.headline-md')]">
                    {product.title}
                  </h3>
                  <p className="text-[#4f453f] text-xs leading-relaxed flex-grow line-clamp-3">
                    {product.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
          
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 md:py-32 px-margin-mobile md:px-margin-desktop bg-[#FAF8F5] border-t border-b border-primary/5 w-full" id="core-four">
      <div className="max-w-container-max mx-auto">
        
        {/* Section Header */}
        <motion.div 
          initial={isL1 ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={titleVariants}
          className="flex flex-col items-center text-center gap-3 mb-16 md:mb-20"
        >
          <span className="text-[10px] font-bold text-secondary uppercase tracking-widest font-mono">Bestselling Recipes</span>
          <h2 className="text-3xl md:text-5xl text-primary font-black font-[family-name:theme('fontFamily.headline-lg')] tracking-tight">The Core Four</h2>
          <div className="w-12 h-[2px] bg-[#D4A373] my-1" />
          <p className="text-body-md md:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Our signature cinnamon roll selection. Freshly baked swirls of happiness with rich, gooey frostings and premium flavors.
          </p>
        </motion.div>

        {/* Responsive Grid mapping */}
        <motion.div 
          variants={gridVariants}
          initial={isL1 ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-8%" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {products.map((product) => (
            <motion.article 
              key={product.id} 
              variants={cardVariants}
              {...getCardHoverProps()}
              className={`flex flex-col group cursor-pointer relative rounded-3xl p-4.5 transition-shadow duration-300 h-full text-left ${motionLevel >= 4 ? 'bg-white/80 backdrop-blur-xl border border-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] ring-1 ring-primary/5 hover:ring-primary/10 hover:-translate-y-2' : 'bg-white border border-primary/5 shadow-ambient hover:shadow-xl'}`}
            >
              {/* Floating Halo for Level 5 */}
              {motionLevel === 5 && (
                <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-[#D4A373]/0 via-[#D4A373]/15 to-[#D4A373]/0 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500 pointer-events-none" />
              )}
              {/* Premium Glow effect for Level >= 4 */}
              {motionLevel >= 4 && (
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              )}

              {/* Product Image Container */}
              <div className="relative w-full aspect-square bg-surface-container-low rounded-2xl overflow-hidden mb-5">
                <img 
                  alt={product.imgAlt} 
                  className={`w-full h-full object-cover select-none ${
                    motionLevel >= 2 ? 'transform group-hover:scale-105 transition-transform duration-500 ease-out' : ''
                  }`} 
                  src={product.imgUrl}
                />
                
                {/* Embedded Price Tag */}
                <div className="absolute top-3.5 right-3.5 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                  {product.price}
                </div>
              </div>

              {/* Info Block */}
              <div className="flex flex-col flex-grow">
                {/* Rating Badge */}
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <span className="text-xs font-bold text-primary">{product.rating}</span>
                  <span className="text-[10px] text-neutral-400 font-mono">({product.reviews})</span>
                </div>

                <h3 className="text-lg text-primary font-bold font-[family-name:theme('fontFamily.headline-md')] mb-2 group-hover:text-secondary transition-colors duration-200">
                  {product.title}
                </h3>
                
                <p className="text-[#4f453f] text-xs leading-relaxed font-[family-name:theme('fontFamily.body-md')] flex-grow line-clamp-3">
                  {product.description}
                </p>

                {/* Interactive CTA buttons directly in cards */}
                <div className="mt-5 pt-4 border-t border-primary/5 flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase font-mono tracking-wider text-secondary flex items-center gap-1 group-hover:text-primary transition-colors">
                    Add to Cart
                  </span>
                  <div className="bg-primary/5 group-hover:bg-[#D4A373] text-primary group-hover:text-white p-2 rounded-xl transition-colors duration-200">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}
