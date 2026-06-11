export default function Footer() {
  return (
    <footer className="bg-surface-container-low dark:bg-primary-container w-full px-margin-mobile md:px-margin-desktop py-stack-lg">
      <div className="flex flex-col items-center w-full gap-stack-lg max-w-container-max mx-auto">
        {/* Brand Logo */}
        <a className="flex justify-center" href="#">
          <img src="/logo.png" alt="Logo" className="h-10 w-auto object-contain grayscale opacity-80" />
        </a>
        
        {/* Links */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-label-caps uppercase tracking-widest text-on-surface-variant font-semibold">
          <a className="hover:text-secondary dark:hover:text-secondary-fixed transition-colors duration-200" href="#">Shipping Policy</a>
          <a className="hover:text-secondary dark:hover:text-secondary-fixed transition-colors duration-200" href="#">Contact Us</a>
          <a className="hover:text-secondary dark:hover:text-secondary-fixed transition-colors duration-200" href="#">Wholesale</a>
          <a className="hover:text-secondary dark:hover:text-secondary-fixed transition-colors duration-200" href="#">Privacy</a>
        </nav>
        
        {/* Copyright text */}
        <p className="font-body-md text-sm text-on-surface-variant dark:text-on-surface-variant opacity-80 mt-4">
          © 2024 by afzan. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
