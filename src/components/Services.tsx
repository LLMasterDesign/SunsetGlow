import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Building2, Wrench, Calendar } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Residential Lighting",
    description: "Beautiful holiday displays for your home, from simple roof lines to elaborate yard decorations.",
  },
  {
    icon: Building2,
    title: "Commercial Projects",
    description: "Professional holiday lighting for businesses, shopping centers, and commercial properties.",
  },
  {
    icon: Wrench,
    title: "Installation & Removal",
    description: "Complete service including design, installation, maintenance, and post-season removal.",
  },
  {
    icon: Calendar,
    title: "Seasonal Maintenance",
    description: "Regular check-ups and repairs throughout the holiday season to keep your lights shining bright.",
  },
];

const Services = () => {
  return (
    <section className="py-20 px-4 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Our <span className="bg-gradient-sunset bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional holiday lighting solutions for every need and budget
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Card key={service.title} className="border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-warm transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-sunset rounded-full flex items-center justify-center shadow-glow">
                  <service.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl text-card-foreground">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;