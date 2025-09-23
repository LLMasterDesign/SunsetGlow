import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import sunsetHouse from "@/assets/sunset-house.jpg";
import sunsetHouseLit from "@/assets/sunset-house-lit.jpg";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [lightOpacity, setLightOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Calculate light opacity based on scroll position (0-500px scroll range)
      const maxScroll = 500;
      const opacity = Math.min(currentScrollY / maxScroll, 1);
      setLightOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image - Unlit House */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-300"
        style={{ backgroundImage: `url(${sunsetHouse})` }}
      />
      
      {/* Background Image - Lit House (appears on scroll) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500"
        style={{ 
          backgroundImage: `url(${sunsetHouseLit})`,
          opacity: lightOpacity
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-navy opacity-60" />
      
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