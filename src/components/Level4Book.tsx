import React, { forwardRef, useRef, useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import bagelBg from '../assets/images/bagel_background_1781232798138.jpg';
import FlipBookWrapper from './FlipBookWrapper';

interface Level4BookProps {
  cinnamonRolls: any[];
  customBox: Record<string, number>;
  updateBoxCount: (id: string, amount: number) => void;
  totalBoxCount: number;
  finalBoxPrice: number;
  setCustomBox: (val: any) => void;
}

const Page = forwardRef<HTMLDivElement, any>((props, ref) => {
  return (
    <div className="page" ref={ref} data-density={props.density || 'soft'}>
      <div className="w-full h-full bg-[#fdfaf6] text-[#2c241b] relative overflow-hidden flex flex-col p-4 md:p-12 shadow-[inset_0_0_20px_rgba(0,0,0,0.03)] shadow-[0_4px_10px_rgba(0,0,0,0.1)] select-none">
        
        {/* Subtle paper grain texture */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-multiply" 
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')" }} 
        />
        
        {/* Soft center shading for realism */}
        <div className={`absolute top-0 bottom-0 ${props.isLeft ? 'right-0 w-8 bg-gradient-to-l' : 'left-0 w-8 bg-gradient-to-r'} from-black/5 to-transparent pointer-events-none z-10`} />

        <div className="relative z-10 w-full h-full flex flex-col pt-4">
          {props.children}
        </div>

        {/* Elegant Footer Numbering */}
        {props.number && (
          <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center pointer-events-none z-10">
            <div className="flex items-center space-x-4">
              {props.isLeft && <span className="w-8 h-px bg-[#2c241b]/20" />}
              <span className="font-serif text-[10px] tracking-[0.2em] text-[#2c241b]/60 uppercase">
                {props.number}
              </span>
              {!props.isLeft && <span className="w-8 h-px bg-[#2c241b]/20" />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default function Level4Book({
  cinnamonRolls,
  customBox,
  updateBoxCount,
  totalBoxCount,
  finalBoxPrice,
  setCustomBox
}: Level4BookProps) {
  const [innerWidth, setInnerWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1000);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => setInnerWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const isMobile = innerWidth < 768;

  const bookRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const onFlip = (e: any) => setCurrentPage(e.data);

  const flipToPage = (target: number) => {
    bookRef.current?.pageFlip()?.flip(target);
  };

  const directoryItems = [
    { title: 'The Story', targetIndex: 2, pageNum: '02' },
    { title: 'Signature Cinnamon Swirls', targetIndex: 3, pageNum: '03' },
    { title: 'Rahmah & Ala Carte', targetIndex: 4, pageNum: '04' },
    { title: 'Gourmet Haus Bagels', targetIndex: 5, pageNum: '05' },
    { title: "The Baker's Craft", targetIndex: 6, pageNum: '06' },
    { title: 'Box Compositor', targetIndex: 7, pageNum: '07' },
    { title: 'Gourmet Soft Cookies', targetIndex: 8, pageNum: '08' },
    { title: 'Cakes & Beverages', targetIndex: 9, pageNum: '09' }
  ];

  return (
    <div className="w-full relative py-12 flex flex-col items-center justify-center min-h-[90vh] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[#3e2413]/30">
      
      {/* Background Atmosphere - Dark Wood/Cafe Ambiance */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundColor: '#1E140D',
          backgroundImage: "url('https://images.unsplash.com/photo-1555505019-8c3f1c4aba5f?auto=format&fit=crop&w=2000&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.25,
          mixBlendMode: 'luminosity'
        }}
      />

      <div className="relative z-20 w-full max-w-[1400px] flex justify-center items-center perspective-2000 p-1 md:p-8 rounded-lg">
        
        {/* Book spine back */}
        <div className="absolute left-1/2 top-2 bottom-2 w-14 -ml-7 bg-[#1A110C] rounded-md shadow-[inset_0_0_20px_rgba(0,0,0,0.9)] z-0 hidden md:block"></div>

        {/* Interactive Note for Cover Page */}
        {currentPage === 0 && (
          <div className="absolute left-2 top-1/2 -translate-y-1/2 z-30 flex flex-col items-end animate-pulse pointer-events-none md:left-[22%]">
            <span className="font-serif text-[#ffb157] italic text-sm md:text-xl mb-2 md:mb-3 tracking-wider pr-1 md:pr-2 drop-shadow-md">Open the Menu</span>
            <div className="flex items-center text-[#ffb157] drop-shadow-md">
              <span className="w-8 md:w-32 h-[1px] bg-[#ffb157]/70"></span>
              <ChevronRight className="w-4 h-4 md:w-6 md:h-6 ml-[-4px]" />
            </div>
          </div>
        )}

        {/* Page Navigators */}
        {currentPage > 0 && (
          <button 
            onClick={() => bookRef.current?.pageFlip()?.flipPrev()} 
            className="absolute top-1/2 left-1 md:-translate-x-12 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-[#2c1a0e]/60 backdrop-blur-md border border-[#ffb157]/30 text-white rounded-full flex items-center justify-center hover:bg-[#2c1a0e]/95 transition-all z-30 shadow-lg"
            title="Previous Page"
          >
            <ChevronLeft className="w-5 h-5 -ml-1 text-[#ffb157]" />
          </button>
        )}

        {/* @ts-ignore */}
        <FlipBookWrapper
          width={isMobile ? Math.max(300, Math.min(innerWidth - 12, 340)) : 550}
          height={isMobile ? 520 : 750}
          size="stretch"
          minWidth={300}
          maxWidth={600}
          minHeight={400}
          maxHeight={900}
          maxShadowOpacity={0.4}
          showCover={true}
          mobileScrollSupport={true}
          className="shadow-2xl shadow-black/60 rounded-xl overflow-hidden max-w-[1100px] mx-auto"
          ref={bookRef}
          usePortrait={isMobile}
          startPage={0}
          drawShadow={true}
          flippingTime={900}
          onFlip={onFlip}
        >
          {/* Cover Page */}
          <Page isLeft={false} density="hard">
            <div className="w-full h-full bg-[#1A110C] text-[#fdfaf6] flex flex-col justify-center items-center p-12 text-center rounded-r-xl border-l-[6px] border-[#0F0A07]">
              <div className="mb-12">
                 <img src="/whitelogo.png" alt="Lily Cups" className="w-16 h-16 object-contain opacity-50" />
              </div>
              <h1 className="font-serif text-5xl md:text-6xl font-normal tracking-wide text-[#E3CBB3] mb-6">
                Lily Cups
              </h1>
              <div className="w-12 h-px bg-[#E3CBB3]/30 mb-6"></div>
              <p className="font-sans text-[10px] tracking-[0.3em] font-semibold text-[#E3CBB3]/70 uppercase">
                Artisanal Menu & Catalog
              </p>
            </div>
          </Page>

          {/* Left Inside Cover */}
          <Page isLeft={true} density="hard">
             <div className="w-full h-full bg-[#271c14] flex flex-col items-center justify-center rounded-l-xl">
                 <img src="/whitelogo.png" alt="Lily Cups" className="w-24 opacity-10 mix-blend-luminosity" />
             </div>
          </Page>

          {/* Page 1 (Right): Directory Spread */}
          <Page isLeft={false} number="01">
            <div className="h-full flex flex-col">
              <div className="mb-4 md:mb-12 text-center mt-2 md:mt-6">
                <span className="font-sans text-[9px] tracking-[0.2em] font-bold text-[#8c6b4f] uppercase block mb-1 md:mb-3">Chapter I</span>
                <h3 className="font-serif text-3xl md:text-4xl font-normal text-[#2c241b]">Index</h3>
              </div>

              <div className="space-y-3 md:space-y-6 px-2 md:px-8 flex-grow">
                {directoryItems.map((category, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => flipToPage(category.targetIndex)}
                    className="group flex items-baseline justify-between cursor-pointer w-full text-xs md:text-base"
                  >
                    <div className="flex items-baseline space-x-2 md:space-x-4 flex-grow bg-transparent relative z-10 w-full overflow-hidden">
                      <span className="font-serif text-xs md:text-base font-normal text-[#2c241b] group-hover:text-[#8c6b4f] transition-colors whitespace-nowrap bg-[#fdfaf6] pr-2 md:pr-3 z-10">
                        {category.title}
                      </span>
                      {/* Dotted Leader */}
                      <span className="absolute inset-x-0 bottom-[5px] border-b border-dotted border-[#2c241b]/20 z-0"></span>
                    </div>
                    <span className="font-serif text-xs md:text-base font-normal text-[#8c6b4f] bg-[#fdfaf6] pl-2 md:pl-3 z-10">
                      {category.pageNum}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Page>

          {/* Page 2 (Left): Welcome & Story */}
          <Page isLeft={true} number="02">
            <div className="h-full flex flex-col pt-4 md:pt-8 px-2 md:px-6">
              <div className="text-center mb-4 md:mb-10">
                <h3 className="font-serif text-2xl md:text-4xl font-normal text-[#2c241b] mb-2 md:mb-4">Our Heritage</h3>
                <div className="mx-auto w-8 h-px bg-[#8c6b4f]/40"></div>
              </div>

              <div className="flex-grow">
                <p className="font-serif text-base md:text-xl italic text-[#5c4a3d] text-center leading-relaxed mb-4 md:mb-10 px-2 md:px-4">
                  "Tradition gently folded into every layer."
                </p>
                <div className="font-sans font-light text-[11px] md:text-sm text-[#4a3e35] text-justify leading-relaxed md:leading-loose max-h-[160px] md:max-h-none overflow-y-auto custom-scrollbar">
                  <span className="font-serif text-[2.5rem] md:text-[3.5rem] float-left mr-2 md:mr-3 mt-1 text-[#2c241b] leading-[0.7]">P</span>
                  remium unbleached organic flour, wild mountain yeast starter, organic butter, and pure brown sugar form the essence of our artisanal creations. Each signature swirl is individually rolled and delicately cut by hand. We believe in patience—utilizing natural butter and a slow 24-hour proofing process that yields an unbelievably soft, moisture-rich texture intended to linger.
                </div>
              </div>

              <div className="border-t border-[#2c241b]/10 pt-4 md:pt-6 mt-4 md:mt-8">
                <p className="font-serif text-center text-[9px] md:text-[10px] uppercase tracking-widest text-[#8c6b4f]">Established MMXIV</p>
              </div>
            </div>
          </Page>          {/* Page 3 (Right): SPREAD 0 RIGHT: Cinnamon Rolls Set */}
          <Page isLeft={false} number="03">
            <div className="h-full flex flex-col pt-4 md:pt-8 px-1 md:px-2">
              <div className="text-center mb-4 md:mb-8">
                <h3 className="font-serif text-2xl md:text-4xl font-normal text-[#2c241b]">Signature Sets</h3>
                <p className="font-serif italic text-[#8c6b4f] text-xs md:text-sm mt-1 md:mt-3">Curated for sharing</p>
              </div>

              <div className="space-y-3 md:space-y-6 flex-grow px-1 md:px-4">
                {[
                  { title: '4 Swirl of Original', desc: 'Signature swirls layered with cream cheese frosting.', price: '25.00', image: '/4swirloforiginal.png' },
                  { title: '4 Swirl of Happiness', desc: 'Original, Nutella, Ovomaltine and Biscoff tasting flight.', price: '30.00', image: '/4swirlofhappiness.png' },
                  { title: '4 Swirl of Premium', desc: 'Premium assortment of Lotus Biscoff and rich hazelnut.', price: '34.00', image: '/4swirloofpremium.png' },
                  { title: '4 Chocolate Hideout', desc: 'A pure chocolate affair of Nutella and Ovomaltine.', price: '34.00', image: '/4chocolatehideout.png' },
                ].map((set, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 md:gap-4 p-1.5 md:p-2 rounded-xl border border-transparent hover:border-[#2c241b]/5 transition duration-300">
                    <img src={set.image} alt={set.title} className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover shadow-[0_4px_10px_rgba(0,0,0,0.08)] bg-white/50 border border-white" />
                    <div className="flex-grow pt-0.5 md:pt-1.5 border-b border-[#2c241b]/10 pb-2 md:pb-4">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <h4 className="text-xs md:text-sm font-serif font-bold text-[#2c241b] tracking-wide">{set.title}</h4>
                        <span className="text-[9px] md:text-[10px] font-sans tracking-wider text-[#8c6b4f]">RM {set.price}</span>
                      </div>
                      <p className="text-[10px] md:text-xs font-serif italic text-[#5c4a3d] leading-relaxed line-clamp-1 md:line-clamp-none">{set.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Page>

          {/* Page 4 (Left): SPREAD 1 LEFT: Set Rahmah & Ala Carte */}
          <Page isLeft={true} number="04">
            <div className="h-full flex flex-col pt-4 md:pt-8 px-1 md:px-4 overflow-y-auto custom-scrollbar">
              
              {/* Set Rahmah section */}
              <div className="mb-4 md:mb-8">
                <div className="text-center mb-3 md:mb-6">
                  <h3 className="font-serif text-lg md:text-xl font-bold text-[#2c241b]">Set Rahmah</h3>
                  <div className="mx-auto w-6 h-px bg-[#8c6b4f] mt-1 md:mt-2 mb-1"></div>
                  <p className="font-serif italic text-[9px] md:text-[10px] text-[#8c6b4f]">Accessible Indulgence</p>
                </div>
                
                <div className="space-y-2 md:space-y-4">
                  {[
                    { title: 'Rahmah Happiness', price: '26.00', image: '/4swirlofhappiness.png', desc: 'Less sweet assorted flavors.' },
                    { title: 'Rahmah Premium', price: '27.00', image: '/4swirloofpremium.png', desc: 'Selected fresh baked assortment.' },
                  ].map((set, idx) => (
                    <div key={idx} className="flex items-center gap-2 md:gap-3">
                      <img src={set.image} alt={set.title} className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover shadow border border-white" />
                      <div className="flex-grow border-b border-[#2c241b]/5 pb-1 md:pb-2">
                        <div className="flex justify-between items-center">
                          <span className="font-serif text-xs md:text-sm text-[#2c241b]">{set.title}</span>
                          <span className="text-[9px] md:text-[10px] font-sans tracking-wider text-[#8c6b4f]">RM {set.price}</span>
                        </div>
                        <p className="text-[9px] md:text-[10px] font-serif italic text-[#8c6b4f] leading-none mt-0.5 md:mt-1">{set.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ala Carte */}
              <div className="flex-grow pt-2 md:pt-4">
                <h4 className="font-sans text-[9px] tracking-[0.15em] uppercase font-bold text-[#2c241b] text-center mb-3 md:mb-5">Single Delicacies</h4>
                <div className="grid grid-cols-1 gap-y-2 md:gap-y-3 gap-x-6 text-[10px] md:text-[11px] font-serif">
                  {[
                    { name: 'Original Cinnamon', price: '6.50' },
                    { name: 'Chocolate Cinnamon', price: '7.50' },
                    { name: 'Peanut Butter Cinnamon', price: '7.50' },
                    { name: 'Choc Peanut Butter', price: '8.00' },
                    { name: 'Double Cheese Berry', price: '8.00' },
                    { name: 'Biscoff Cinnamon', price: '8.50' },
                    { name: 'Almond Apple Caramel', price: '8.50' },
                    { name: 'Nutella Cinnamon Roll', price: '9.00' },
                    { name: 'Ovomatine Cinnamon', price: '10.50' },
                    { name: 'Pistachio Cinnamon', price: '11.00' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-end border-b border-dotted border-[#2c241b]/15 pb-1">
                      <span className="text-[#2c241b]">{item.name}</span>
                      <span className="text-[#8c6b4f] font-sans text-[9px] tracking-wider font-semibold pl-2">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Page>

          {/* Page 5 (Right): SPREAD 1 RIGHT: Bagels Menu */}
          <Page isLeft={false} number="05">
            <div className="h-full flex flex-col pt-4 md:pt-8 px-2 md:px-6 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 pointer-events-none z-0 overflow-hidden mix-blend-multiply">
                <video 
                  src="/bagel.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover grayscale opacity-60"
                />
              </div>

              <div className="relative z-10 text-center mb-3 md:mb-8">
                <h3 className="font-serif text-2xl md:text-3xl font-normal text-[#2c241b] tracking-wide">Gourmet Bagels</h3>
                <div className="mx-auto w-6 h-[2px] bg-[#8c6b4f] mt-1 md:mt-3"></div>
              </div>

              <p className="relative z-10 text-center font-sans tracking-[0.1em] text-[8px] uppercase text-[#8c6b4f] font-bold mb-3 md:mb-6">Toasted & Ready to Eat</p>

              <div className="relative z-10 space-y-2 md:space-y-4 px-1 md:px-2 overflow-y-auto custom-scrollbar flex-grow pb-4 md:pb-8">
                {[
                  { name: 'Bagel with Cream Cheese', price: '10.00', detail: 'House plain spread' },
                  { name: 'Cream Cheese & Capers', price: '10.00', detail: 'Tangy zest finish' },
                  { name: 'Spring Onion Cream Cheese', price: '10.00', detail: 'Herb infused' },
                  { name: 'Garlic Cream Cheese', price: '11.00', detail: 'Roasted garlic blend' },
                  { name: 'Jalapeno Cream Cheese', price: '10.00', detail: 'With a slight kick' },
                  { name: 'Egg Mayo Spread', price: '12.90', detail: 'Chunky egg & herbs' },
                  { name: 'Tuna Mayo Bagel', price: '15.00', detail: 'Premium ocean flakes' },
                  { name: 'Sambal Hitam Meknon', price: '13.00', detail: 'Local spiced favorite', isNew: true },
                  { name: 'Double Cheese Chicken', price: '16.00', detail: 'Smoked ham & melted cheese' },
                  { name: 'Beef Streaky & Cheese', price: '18.00', detail: 'Crispy strips' },
                  { name: 'Smoked Salmon', price: '25.00', detail: 'Dill, capers & onion' },
                  { name: 'Smoked Beef Brisket', price: '32.00', detail: 'Slow roasted tenderness' }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-end border-b border-[#2c241b]/10 pb-1.5 md:pb-2">
                    <div>
                      <div className="flex items-center">
                        <span className="font-serif text-[#2c241b] text-xs md:text-sm">{item.name}</span>
                        {item.isNew && <span className="ml-2 px-1 py-[1px] border border-[#8c6b4f] text-[#8c6b4f] text-[7px] uppercase tracking-widest leading-none rounded-sm">New</span>}
                      </div>
                      <span className="font-serif italic text-[9px] md:text-[10px] text-[#8c6b4f]">{item.detail}</span>
                    </div>
                    <span className="font-sans text-[9px] md:text-[10px] font-semibold text-[#8c6b4f] tracking-wider mb-0.5">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </Page>

          {/* Page 6 (Left): Baker's Secrets */}
          <Page isLeft={true} number="06">
            <div className="h-full flex flex-col pt-4 md:pt-8 px-2 md:px-8">
              <div className="text-center mb-4 md:mb-10">
                <span className="font-sans text-[9px] font-bold tracking-[0.2em] text-[#8c6b4f] uppercase mb-1 md:mb-2 block">Our Process</span>
                <h3 className="font-serif text-2xl md:text-3xl text-[#2c241b]">The Baker's Craft</h3>
              </div>

              <div className="flex-grow space-y-4 md:space-y-10">
                <div className="border border-[#2c241b]/10 p-4 md:p-6 relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fdfaf6] px-3 md:px-4 font-serif italic text-base md:text-lg text-[#2c241b]">Sourdough</div>
                  <p className="font-sans font-light text-[11px] md:text-xs text-center text-[#4a3e35] leading-relaxed">
                    Crafted with a wild mountain yeast starter, our dough under-goes a slow 24-hour cold fermentation. This lengthy process aids digestion and develops a profound complexity in flavor.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-x-4 md:gap-x-8 gap-y-4 md:gap-y-8 items-start pt-2 md:pt-4">
                  <div className="text-center">
                    <span className="text-xl md:text-2xl font-serif text-[#2c241b] block mb-1 md:mb-2">24h</span>
                    <div className="w-4 h-[1px] bg-[#8c6b4f] mx-auto mb-1 md:mb-2" />
                    <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-[#8c6b4f]">Cold Proof</span>
                  </div>
                  <div className="text-center">
                    <span className="text-xl md:text-2xl font-serif text-[#2c241b] block mb-1 md:mb-2">100%</span>
                    <div className="w-4 h-[1px] bg-[#8c6b4f] mx-auto mb-1 md:mb-2" />
                    <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-[#8c6b4f]">Pure Butter</span>
                  </div>
                  <div className="text-center">
                    <span className="text-xl md:text-2xl font-serif text-[#2c241b] block mb-1 md:mb-2">Ceylon</span>
                    <div className="w-4 h-[1px] bg-[#8c6b4f] mx-auto mb-1 md:mb-2" />
                    <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-[#8c6b4f]">Cinnamon</span>
                  </div>
                  <div className="text-center">
                    <span className="text-xl md:text-2xl font-serif text-[#2c241b] block mb-1 md:mb-2">Hand</span>
                    <div className="w-4 h-[1px] bg-[#8c6b4f] mx-auto mb-1 md:mb-2" />
                    <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-[#8c6b4f]">Rolled</span>
                  </div>
                </div>
              </div>
            </div>
          </Page>

          {/* Page 7 (Right): Box Compositor */}
          <Page isLeft={false} number="07">
            <div className="h-full flex flex-col pt-4 md:pt-8 px-1.5 md:px-6">
              <div className="text-center mb-3 md:mb-6">
                <span className="font-sans text-[9px] tracking-[0.2em] font-bold text-[#8c6b4f] uppercase block mb-1 md:mb-2">Experience</span>
                <h3 className="font-serif text-2xl md:text-3xl font-normal text-[#2c241b]">Bespoke Box</h3>
                <p className="font-serif italic text-[11px] md:text-xs text-[#5c4a3d] mt-1 md:mt-2 border-b border-[#2c241b]/10 pb-2 md:pb-4 inline-block">
                  Curate 6 pieces. Enjoy a 10% privilege.
                </p>
              </div>

              <div className="space-y-2 md:space-y-4 flex-grow overflow-y-auto custom-scrollbar px-1 md:px-2 pb-2 md:pb-4">
                {cinnamonRolls.map((roll) => {
                  const quantity = customBox[roll.id] || 0;
                  return (
                    <div key={roll.id} className="flex justify-between items-center group">
                      <div className="flex items-center gap-2 md:gap-3">
                         <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-[#2c241b]/10 p-0.5 overflow-hidden">
                           <img src={roll.image} alt={roll.title} className="w-full h-full object-cover rounded-full mix-blend-multiply" />
                         </div>
                         <div>
                           <span className="font-serif text-xs md:text-sm text-[#2c241b] block leading-tight">{roll.title.replace(' Swirl', '')}</span>
                           <span className="font-sans text-[8px] md:text-[9px] font-semibold tracking-wider text-[#8c6b4f]">{roll.price}</span>
                         </div>
                      </div>

                      <div className="flex items-center space-x-2 md:space-x-3 bg-white/50 px-1.5 md:px-2 py-0.5 md:py-1 border border-[#2c241b]/5 rounded-sm">
                        <button onClick={() => updateBoxCount(roll.id, -1)} className="font-serif text-[#8c6b4f] hover:text-[#2c241b] transition px-1">-</button>
                        <span className="font-sans text-[9px] md:text-[10px] w-3 text-center">{quantity}</span>
                        <button onClick={() => updateBoxCount(roll.id, 1)} disabled={totalBoxCount >= 6} className="font-serif text-[#8c6b4f] hover:text-[#2c241b] transition px-1 disabled:opacity-30">+</button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 pt-4 border-t border-[#2c241b]/20 text-center">
                <div className="flex justify-between items-start mb-4 px-2">
                  <div className="text-left py-1">
                    <span className="font-sans text-[9px] font-bold uppercase tracking-widest text-[#2c241b] block mb-1">Capacity</span>
                    <span className="font-serif text-lg text-[#8c6b4f]">{totalBoxCount} <span className="text-sm">/ 6</span></span>
                  </div>
                  <div className="text-right py-1">
                     <span className="font-sans text-[9px] font-bold uppercase tracking-widest text-[#2c241b] block mb-1">Total</span>
                     <span className="font-serif text-lg text-[#2c241b]">RM {finalBoxPrice.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  disabled={totalBoxCount === 0}
                  onClick={() => {
                    showToast(`Curated box of ${totalBoxCount} swirls arranged for you!`);
                    setCustomBox({
                      'original-cream-cheese': 0, 'dark-chocolate-happiness': 0, 'peanut-butter-classic': 0,
                      'premium-nutella': 0, 'ovomaltine-crunch': 0, 'lotus-biscoff': 0,
                    });
                  }}
                  className={`w-full py-3 rounded-sm font-sans font-bold uppercase tracking-widest text-[9px] transition-all border ${
                    totalBoxCount > 0 
                      ? 'border-[#2c241b] bg-[#2c241b] text-white hover:bg-[#3e342a]' 
                      : 'border-[#2c241b]/20 text-[#2c241b]/30 cursor-not-allowed'
                  }`}
                >
                  {totalBoxCount === 6 ? 'Seal & Order' : 'Add to Collection'}
                </button>
              </div>
            </div>
          </Page>

          {/* Page 8 (Left): Soft Cookies */}
          <Page isLeft={true} number="08">
            <div className="h-full flex flex-col pt-4 md:pt-8 px-2 md:px-8">
              <div className="text-center mb-3 md:mb-6 border-b border-[#2c241b]/5 pb-2 md:pb-4">
                <h3 className="font-serif text-2xl md:text-3xl text-[#2c241b]">Gourmet Cookies</h3>
                <p className="font-serif italic text-xs md:text-sm text-[#8c6b4f] mt-1">Warm, gooey elegance.</p>
              </div>

              {/* Video container */}
              <div className="w-full h-24 md:h-[220px] rounded-sm overflow-hidden mb-4 md:mb-8 border border-[#2c241b]/10 bg-black/5 flex-shrink-0">
                <video src="/redvelvetsoftcookies.mp4" className="w-full h-full object-cover mix-blend-multiply opacity-90" autoPlay loop muted playsInline />
              </div>

              <div className="space-y-2 md:space-y-5 flex-grow overflow-y-auto custom-scrollbar">
                {[
                  { name: 'Red Velvet', price: '8.00', desc: 'Indulgent cocoa & cream cheese center' },
                  { name: 'Matcha Blossom', price: '7.50', desc: 'Premium matcha green team baked soft' },
                  { name: 'Pistachio Kunafeh', price: '9.00', desc: 'Middle-eastern pistachio crunch' },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start border-b border-[#2c241b]/10 pb-2 md:pb-3">
                    <div>
                      <span className="font-serif text-xs md:text-sm font-bold text-[#2c241b] block">{item.name}</span>
                      <span className="font-serif text-[10px] md:text-xs italic text-[#5c4a3d] mt-0.5 md:mt-1 block leading-none">{item.desc}</span>
                    </div>
                    <span className="font-sans text-[9px] md:text-[10px] font-semibold text-[#8c6b4f] tracking-widest pt-0.5 md:pt-1">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </Page>

          {/* Page 9 (Right): Cakes & Drinks */}
          <Page isLeft={false} number="09">
            <div className="h-full flex flex-col pt-4 md:pt-8 px-2 md:px-8">
              <div className="text-center mb-4 md:mb-10">
                <h3 className="font-serif text-2xl md:text-3xl text-[#2c241b]">Companions</h3>
                <div className="mx-auto w-8 h-px bg-[#8c6b4f]/40 mt-2 md:mt-4 mb-2"></div>
              </div>

              <div className="flex-grow space-y-4 md:space-y-12 overflow-y-auto custom-scrollbar pb-4">
                <div>
                  <h4 className="font-sans text-[8px] md:text-[9px] font-bold tracking-[0.2em] uppercase text-[#8c6b4f] mb-3 md:mb-6 border-b border-[#2c241b]/10 pb-1.5 md:pb-2">Sliced Cakes</h4>
                  <div className="space-y-2 md:space-y-4">
                    <div className="flex justify-between items-baseline border-b border-dotted border-[#2c241b]/20 pb-1.5 md:pb-2">
                        <span className="font-serif text-xs md:text-sm text-[#2c241b]">Burnt Cheesecake</span>
                        <span className="font-sans text-[8px] md:text-[9px] font-semibold text-[#8c6b4f] pl-4">15.00</span>
                    </div>
                    <div className="flex justify-between items-baseline border-b border-dotted border-[#2c241b]/20 pb-1.5 md:pb-2">
                        <span className="font-serif text-xs md:text-sm text-[#2c241b]">Premium Spiced Carrot Cake</span>
                        <span className="font-sans text-[8px] md:text-[9px] font-semibold text-[#8c6b4f] pl-4">14.00</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-sans text-[8px] md:text-[9px] font-bold tracking-[0.2em] uppercase text-[#8c6b4f] mb-3 md:mb-6 border-b border-[#2c241b]/10 pb-1.5 md:pb-2">Beverages</h4>
                  <div className="space-y-2 md:space-y-4">
                    <div className="flex justify-between items-baseline border-b border-[#2c241b]/5 pb-1.5 md:pb-2">
                        <span className="font-serif text-xs md:text-sm text-[#2c241b]">Americano <span className="text-[8px] md:text-[9px] font-serif italic text-gray-500">(Hot/Iced)</span></span>
                        <span className="font-sans text-[8px] md:text-[9px] font-semibold text-[#8c6b4f] pl-4">8.00</span>
                    </div>
                    <div className="flex justify-between items-baseline border-b border-[#2c241b]/5 pb-1.5 md:pb-2">
                        <span className="font-serif text-xs md:text-sm text-[#2c241b]">Latte <span className="text-[8px] md:text-[9px] font-serif italic text-gray-500">(Hot/Iced)</span></span>
                        <span className="font-sans text-[8px] md:text-[9px] font-semibold text-[#8c6b4f] pl-4">10.00</span>
                    </div>
                    <div className="flex justify-between items-baseline border-b border-[#2c241b]/5 pb-1.5 md:pb-2">
                        <span className="font-serif text-xs md:text-sm text-[#2c241b]">Matcha Latte <span className="text-[8px] md:text-[9px] font-serif italic text-gray-500">(Hot/Iced)</span></span>
                        <span className="font-sans text-[8px] md:text-[9px] font-semibold text-[#8c6b4f] pl-4">12.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Page>

          {/* Page 10 (Left): Thanks / Closing */}
          <Page isLeft={true} number="10">
              <div className="h-full flex flex-col pt-4 md:pt-8 px-2 md:px-8">
                 <div className="my-auto flex flex-col items-center text-center">
                   <div className="mb-4 md:mb-8 p-1 border border-[#2c241b]/10 rounded-full">
                     <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-[#2c241b] flex items-center justify-center">
                       <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-[#8c6b4f]" />
                     </div>
                   </div>
                   
                   <h2 className="font-serif text-2xl md:text-3xl text-[#2c241b] mb-3 md:mb-6">Gratitude</h2>
                   <p className="font-serif text-xs md:text-sm italic text-[#5c4a3d] leading-relaxed md:leading-loose max-w-[240px] mb-6 md:mb-10">
                     Thank you for taking the time to explore our artisanal collection. We hope our flavors bring warmth to your day.
                   </p>

                   <button 
                     onClick={() => showToast("Redirecting you to our checkout systems!")}
                     className="border border-[#2c241b] text-[#2c241b] px-6 md:px-8 py-2 md:py-3 font-sans text-[8px] md:text-[9px] tracking-[0.2em] uppercase transition-colors hover:bg-[#2c241b] hover:text-white"
                   >
                     Initialize Order
                   </button>
                   
                   <p className="text-[8px] mt-8 md:mt-16 font-sans text-[#2c241b]/40 tracking-widest uppercase">Lily Cups Bakery &copy; MMXIV</p>
                 </div>
              </div>
          </Page>

          {/* Back Cover */}
          <Page isLeft={true} density="hard">
            <div className="w-full h-full bg-[#1A110C] text-[#fdfaf6] flex flex-col justify-center items-center p-12 text-center rounded-l-xl border-r-[6px] border-[#0F0A07]">
               <img src="/whitelogo.png" alt="Lily Cups" className="w-12 h-12 object-contain opacity-40 mb-8" />
               <p className="font-sans text-[8px] tracking-[0.4em] uppercase text-[#E3CBB3]/50">Finis</p>
            </div>
          </Page>
        </FlipBookWrapper>

        {currentPage < 11 && (
          <button 
            onClick={() => bookRef.current?.pageFlip()?.flipNext()} 
            className="absolute top-1/2 right-1 md:-translate-x-[-3rem] -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-[#2c1a0e]/60 backdrop-blur-md border border-[#ffb157]/30 text-white rounded-full flex items-center justify-center hover:bg-[#2c1a0e]/95 transition-all z-30 shadow-lg"
            title="Next Page"
          >
            <ChevronRight className="w-5 h-5 ml-1 text-[#ffb157]" />
          </button>
        )}
      </div>

      {/* Premium Toast Overlay for Action Confirmation */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-6 z-50 bg-[#2c1a0e]/95 backdrop-blur-md text-[#fdfaf6] px-6 py-3.5 rounded-xl border border-[#ffb157]/30 shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex items-center gap-3"
          >
            <Sparkles className="w-5 h-5 text-[#ffb157] animate-pulse" />
            <span className="font-sans text-xs font-semibold uppercase tracking-wider">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

