import React, { useState, useEffect, useImperativeHandle, forwardRef, Children } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const FlipBookWrapper = forwardRef<any, any>((props, ref) => {
  const childrenArray = Children.toArray(props.children);
  const N = childrenArray.length;

  const [currentPage, setCurrentPage] = useState(props.startPage || 0);
  const isMobile = !!props.usePortrait;

  // Sync state if startPage prop changes dynamically
  useEffect(() => {
    if (props.startPage !== undefined && props.startPage !== currentPage) {
      setCurrentPage(props.startPage);
    }
  }, [props.startPage]);

  // Expose react-pageflip's interface so Level4Book remains unchanged
  useImperativeHandle(ref, () => ({
    pageFlip: () => ({
      flip: (target: number) => {
        if (target >= 0 && target < N) {
          setCurrentPage(target);
          if (props.onFlip) {
            props.onFlip({ data: target });
          }
        }
      },
      flipNext: () => {
        let next = currentPage + 1;
        if (!isMobile) {
          if (currentPage === 0) {
            next = 1;
          } else {
            const activeLeft = currentPage % 2 !== 0 ? currentPage : currentPage - 1;
            next = activeLeft + 2;
          }
        }
        if (next < N) {
          setCurrentPage(next);
          if (props.onFlip) {
            props.onFlip({ data: next });
          }
        }
      },
      flipPrev: () => {
        let prev = currentPage - 1;
        if (!isMobile) {
          if (currentPage <= 2) {
            prev = 0;
          } else {
            const activeLeft = currentPage % 2 !== 0 ? currentPage : currentPage - 1;
            prev = activeLeft - 2;
          }
        }
        if (prev >= 0) {
          setCurrentPage(prev);
          if (props.onFlip) {
            props.onFlip({ data: prev });
          }
        }
      }
    })
  }));

  if (isMobile) {
    // Elegant single-page 3D slide-and-fold transition for mobile
    return (
      <div 
        className="relative flex items-center justify-center select-none w-full" 
        style={{ height: `${props.height || 520}px`, perspective: '1200px' }}
      >
        <div className="relative w-full h-full overflow-hidden rounded-xl shadow-2xl shadow-black/50">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, rotateY: 35, x: 80 }}
              animate={{ opacity: 1, rotateY: 0, x: 0 }}
              exit={{ opacity: 0, rotateY: -35, x: -80 }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              className="w-full h-full absolute inset-0"
              style={{ backfaceVisibility: 'hidden', transformStyle: 'preserve-3d' }}
            >
              {childrenArray[currentPage]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // Active spread indices on desktop
  const activeLeft = currentPage % 2 !== 0 ? currentPage : currentPage - 1;
  const activeRight = activeLeft + 1;

  // Elegant double-spread 3D book layout for desktop
  return (
    <div 
      className={`relative select-none ${props.className || ''}`}
      style={{ 
        width: '100%', 
        maxWidth: '1100px', 
        height: `${props.height || 750}px`, 
        perspective: '2500px',
        margin: '0 auto',
        transformStyle: 'preserve-3d',
        ...props.style
      }}
    >
      {/* Invisible center hinge guideline shadow */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-black/10 z-30 pointer-events-none" />

      <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
        {childrenArray.map((child, i) => {
          let rotateY = 0;
          let zIndex = 0;
          let pointerEvents: 'auto' | 'none' = 'none';

          if (i === 0) {
            // Cover Page (folds on the right side)
            const isFlipped = currentPage > 0;
            rotateY = isFlipped ? -180 : 0;
            zIndex = isFlipped ? 5 : 100;
            pointerEvents = isFlipped ? 'none' : 'auto';
          } else if (i % 2 !== 0) {
            // Left Pages (odd index: 1, 3, 5, 7, 9, 11)
            const isFlippedToLeft = i <= activeLeft;
            rotateY = isFlippedToLeft ? 0 : 180;
            
            // Render active left page above older pages
            if (isFlippedToLeft) {
              zIndex = 100 - Math.abs(activeLeft - i);
              pointerEvents = i === activeLeft ? 'auto' : 'none';
            } else {
              zIndex = 10 - Math.abs(i - activeLeft);
            }
          } else {
            // Right Pages (even index: 2, 4, 6, 8, 10, 12)
            const isFlippedToLeft = i <= activeLeft;
            rotateY = isFlippedToLeft ? -180 : 0;
            
            // Render active right page above future pages
            if (isFlippedToLeft) {
              zIndex = 10 - Math.abs(activeLeft - i);
            } else {
              zIndex = 100 - Math.abs(i - activeRight);
              pointerEvents = i === activeRight ? 'auto' : 'none';
            }
          }

          // Compute style
          const isLeftPage = i % 2 !== 0;
          const pageStyle: React.CSSProperties = {
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: i === 0 ? '50%' : '50%',
            height: '100%',
            left: isLeftPage ? '0px' : '50%',
            transformOrigin: isLeftPage ? 'right center' : 'left center',
            transform: `rotateY(${rotateY}deg)`,
            transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), z-index 0.8s ease',
            zIndex: zIndex,
            backfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
            pointerEvents: pointerEvents,
          };

          return (
            <div key={i} style={pageStyle}>
              {child}
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default FlipBookWrapper;
