import { Leaf, Box, Wheat } from 'lucide-react';

export default function Ingredients() {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container-low w-full">
      <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
        <div className="flex flex-col gap-stack-lg md:pr-12">
          <h2 className="text-headline-lg-mobile md:text-headline-lg text-primary">Obsessive Quality</h2>
          <p className="text-body-lg text-on-surface-variant">
            A cookie is only as good as what goes into it. We strip away the unnecessary and focus entirely on sourcing the absolute best ingredients available. No shortcuts, just pure indulgence.
          </p>
          
          <div className="flex flex-col gap-stack-md mt-4">
            <div className="flex items-start gap-4">
              <Leaf className="text-secondary w-8 h-8 flex-shrink-0 fill-current" />
              <div>
                <h4 className="text-xl text-primary mb-1 font-[family-name:theme('fontFamily.headline-md')]">100% Organic Butter</h4>
                <p className="text-on-surface-variant text-sm font-[family-name:theme('fontFamily.body-md')]">Sourced from grass-fed cows for an intensely rich, creamy base.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Wheat className="text-secondary w-8 h-8 flex-shrink-0" />
              <div>
                <h4 className="text-xl text-primary mb-1 font-[family-name:theme('fontFamily.headline-md')]">Heritage Flour</h4>
                <p className="text-on-surface-variant text-sm font-[family-name:theme('fontFamily.body-md')]">Unbleached, locally milled wheat that provides the perfect chew.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Box className="text-secondary w-8 h-8 flex-shrink-0" />
              <div>
                <h4 className="text-xl text-primary mb-1 font-[family-name:theme('fontFamily.headline-md')]">Ethically Sourced Cocoa</h4>
                <p className="text-on-surface-variant text-sm font-[family-name:theme('fontFamily.body-md')]">Fair-trade Valrhona chocolate that melts into pools of perfection.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative w-full min-h-[400px] md:min-h-[600px] h-full rounded-xl overflow-hidden shadow-ambient mt-8 md:mt-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-surface-dim to-surface-bright"></div>
          {/* We use the gradient as a placeholder container for the stylistic layout specified in the design */}
        </div>
      </div>
    </section>
  );
}
