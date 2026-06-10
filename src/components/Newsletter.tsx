export default function Newsletter() {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex flex-col items-center text-center">
      <h2 className="text-headline-md text-primary mb-stack-sm">The Inner Circle</h2>
      <p className="text-body-md text-on-surface-variant mb-stack-lg max-w-md mx-auto">
        Be the first to know about new drops, seasonal flavors, and exclusive events.
      </p>
      
      <form className="w-full max-w-md flex flex-col gap-stack-md" onSubmit={(e) => e.preventDefault()}>
        <div className="relative w-full">
          <input 
            className="w-full bg-transparent border-0 border-b border-primary/30 py-3 px-0 text-lg text-primary placeholder:text-primary/40 focus:ring-0 focus:border-primary transition-colors font-[family-name:theme('fontFamily.headline-md')]" 
            placeholder="Enter your email address" 
            required 
            type="email"
          />
        </div>
        <button 
          className="w-full py-4 bg-transparent border border-primary text-primary text-label-caps hover:bg-primary hover:text-on-primary transition-colors duration-300 uppercase tracking-widest mt-2 cursor-pointer" 
          type="submit"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
}
