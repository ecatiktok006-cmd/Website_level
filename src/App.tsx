/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import BagelPromo from './components/BagelPromo';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

export default function App() {
  // Motion Selector State - Active level which coordinates across all components
  // Defaults to Level 3 (Interactive Motion) as a highly premium baseline showcase!
  const [motionLevel, setMotionLevel] = useState<number>(3);

  // Scroll to the top of the page whenever the animation style or level changes
  useEffect(() => {
    const scrollBehavior = motionLevel === 1 ? 'auto' : 'smooth';
    window.scrollTo({
      top: 0,
      behavior: scrollBehavior
    });
  }, [motionLevel]);

  return (
    <div className={`relative min-h-screen bg-background`}>
      {/* Main Page Layout Wrapper */}
      <Header motionLevel={motionLevel} setMotionLevel={setMotionLevel} />
      <main>
        <Hero motionLevel={motionLevel} />
        <BagelPromo motionLevel={motionLevel} />
        <Newsletter motionLevel={motionLevel} />
      </main>
      <Footer />
    </div>
  );
}


