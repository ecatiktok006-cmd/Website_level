/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from './components/Header';
import Hero from './components/Hero';
import CoreFour from './components/CoreFour';
import Ingredients from './components/Ingredients';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CoreFour />
        <Ingredients />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}

