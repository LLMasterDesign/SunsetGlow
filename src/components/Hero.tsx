import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import sunsetSky from "@/assets/sunset-sky.jpg";
import sunsetHouse from "@/assets/sunset-house.jpg";
import sunsetHouseLit from "@/assets/sunset-house-lit.jpg";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate scroll-based transforms
  const maxScroll = 800; // Total scroll distance for full effect
  const scrollProgress = Math.min(scrollY / maxScroll, 1);
  
  // House reveals from bottom as you scroll
  const houseTransform = `translateY(${100 - (scrollProgress * 100)}%)`;
  
  // Lights illuminate after house is partially revealed
  const lightOpacity = Math.max(0, (scrollProgress - 0.3) / 0.7);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Sky - Always visible */}
      <div 
        className="fixed inset-0 -z-10 bg-cover bg-no-repeat pointer-events-none"
        style={{ 
          backgroundImage: `url(${sunsetSky})`,
          backgroundPosition: 'center top'
        }}
      />
      
      {/* House Layer - Slides up from bottom */}
      <div 
        className="fixed inset-0 -z-10 bg-cover bg-no-repeat transition-transform duration-100 ease-out pointer-events-none"
        style={{ 
          backgroundImage: `url(${sunsetHouse})`,
          backgroundPosition: 'center bottom',
          transform: houseTransform
        }}
      />
      
      {/* Lit House Layer - Appears after house is visible */}
      <div 
        className="fixed inset-0 -z-10 bg-cover bg-no-repeat transition-all duration-500 pointer-events-none"
        style={{ 
          backgroundImage: `url(${sunsetHouseLit})`,
          backgroundPosition: 'center bottom',
          transform: houseTransform,
          opacity: lightOpacity
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-navy opacity-40" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
          <span className="bg-gradient-sunset bg-clip-text text-transparent">
            Sunset Glow
          </span>
          <br />
          <span className="text-foreground">Holiday Lighting</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-2xl mx-auto">
          Transform your property into a winter wonderland with professional Christmas light installation services
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8 py-6 shadow-glow hover:shadow-warm transition-all duration-300">
            Get Free Quote
          </Button>
          <Button variant="secondary" size="lg" className="text-lg px-8 py-6">
            View Our Work
          </Button>
        </div>
      </div>
      
      {/* Decorative glow effect */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
    </section>
  );
};

export default Hero;