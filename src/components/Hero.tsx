export default function Hero() {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center px-margin-mobile md:px-margin-desktop py-section-gap overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          alt="A high-end, professional food photography shot of a stack of thick, gooey chocolate chip cookies. Melted dark chocolate pools, a sprinkle of sea salt on top. Soft, warm lighting on a cream-colored ceramic plate. Depth of field with a soft-focus artisanal kitchen background. Premium, gourmet aesthetic." 
          className="w-full h-full object-cover opacity-90" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzrSaYUrc17lfk6DP-41_5S2BYSLwmEFd1-8dGmxfX0Xf0Y_l8ZjwPLjpHZmox3Lyh7M6dDsSHiz4U4KO7bpLPumAzE5UixcAz23zzUqKJJPBxre33O16wiyvcVmGQJb_oBccblXTCVHKM7vXq4oHA5jPispD4Cud461zB6xAG47X3frXGHPs7kz4aIK_fOADwq2-wD97Bd010oKgbb7kOgG4zBDc1zsynAz1v3GPRblpzxKQQwcgUBL6nxpeAE1o5ze-JZCcfMnI"
        />
        {/* Subtle gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center gap-stack-lg bg-surface/80 backdrop-blur-sm p-8 md:p-12 rounded-xl shadow-ambient">
        <div className="flex flex-col gap-stack-sm">
          <span className="text-label-caps text-secondary tracking-widest uppercase">Est. 2024</span>
          <h1 className="text-headline-lg-mobile md:text-display-lg text-primary">The Ultimate Cookie Experience</h1>
        </div>
        
        <p className="text-body-lg text-on-surface-variant max-w-xl mx-auto">
          Handcrafted in small batches with organic ingredients and obsessively sourced chocolate.
        </p>
        
        <a className="inline-flex items-center justify-center px-8 py-4 bg-[#D4A373] text-primary text-body-md font-bold tracking-wide hover:opacity-90 transition-opacity rounded-sm mt-4" href="#core-four">
          Shop Collection
        </a>
      </div>
    </section>
  );
}
