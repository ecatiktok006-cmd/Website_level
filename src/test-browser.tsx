import React, { forwardRef, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

const HTMLFlipBook = forwardRef((props: any, ref) => {
  const [Comp, setComp] = useState<any>(null);

  useEffect(() => {
    import('react-pageflip').then((mod) => {
      const PageFlipBook = (mod as any).default?.default || (mod as any).default || mod;
      setComp(() => PageFlipBook);
    });
  }, []);

  if (!Comp) return <div ref={ref}>Loading...</div>;

  return React.createElement(Comp, { ...props, ref }, props.children);
});

console.log("HTMLFlipBook created");
