import { ShoppingCart } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-background/80 dark:bg-background/80 backdrop-blur-md w-full top-0 sticky z-50">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-stack-md max-w-container-max mx-auto transition-all duration-300 ease-in-out">
        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex gap-8 items-center text-label-caps">
          <a className="text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-colors" href="#">Our Cookies</a>
          <a className="text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-colors" href="#">Gifting</a>
          <a className="text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-colors" href="#">Locations</a>
        </nav>
        
        {/* Brand Logo */}
        <a className="text-headline-md font-semibold text-primary dark:text-primary-fixed tracking-tight hover:opacity-80 transition-opacity absolute left-1/2 -translate-x-1/2" href="#">
          Artisanal Crumb
        </a>
        
        {/* Trailing Actions */}
        <div className="flex items-center gap-4 ml-auto md:ml-0">
          <button aria-label="shopping_cart" className="text-primary dark:text-primary-fixed hover:opacity-80 transition-opacity flex items-center justify-center">
            <ShoppingCart className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
