import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Contact = () => {
  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Get In <span className="bg-gradient-sunset bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to light up your holidays or join our team? Contact us today!
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm shadow-deep">
            <CardHeader>
              <CardTitle className="text-2xl text-card-foreground flex items-center gap-2">
                <Phone className="w-6 h-6 text-primary" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-card-foreground">(555) 123-GLOW</p>
                  <p className="text-sm text-muted-foreground">Call for quotes & job inquiries</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-card-foreground">info@sunsetglowlighting.com</p>
                  <p className="text-sm text-muted-foreground">Email us anytime</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-card-foreground">Serving the Greater Metro Area</p>
                  <p className="text-sm text-muted-foreground">Free estimates within 25 miles</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-card-foreground">Mon-Sat: 8AM-6PM</p>
                  <p className="text-sm text-muted-foreground">Extended hours during season</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm shadow-deep">
            <CardHeader>
              <CardTitle className="text-2xl text-card-foreground">Quick Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button className="shadow-glow hover:shadow-warm transition-all duration-300">
                  Get Quote
                </Button>
                <Button variant="secondary">
                  Apply for Job
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
                  Schedule Call
                </Button>
                <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
                  View Gallery
                </Button>
              </div>
              <div className="pt-4 border-t border-border/50">
                <h4 className="font-medium text-card-foreground mb-2">Hiring Season:</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  We typically start hiring in September for our November-January busy season. 
                  Apply early for the best positions!
                </p>
                <Button variant="secondary" className="w-full">
                  Join Our Mailing List
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;