import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Clock, Users, MapPin } from "lucide-react";

const jobs = [
  {
    title: "Installation Technician",
    type: "Seasonal Full-Time",
    pay: "$18-25/hour",
    location: "Multiple Locations",
    description: "Install and maintain Christmas light displays. Experience with ladders and electrical work preferred.",
    requirements: ["Valid driver's license", "Comfortable working at heights", "Physical fitness required"],
  },
  {
    title: "Installation Helper",
    type: "Seasonal Part-Time",
    pay: "$15-20/hour",
    location: "Local Area",
    description: "Assist with light installation projects. Great entry-level position for seasonal work.",
    requirements: ["Reliable transportation", "Willingness to learn", "Weekend availability"],
  },
  {
    title: "Customer Service Rep",
    type: "Seasonal Remote",
    pay: "$16-22/hour",
    location: "Remote/Office",
    description: "Handle customer inquiries, scheduling, and support during our busy holiday season.",
    requirements: ["Strong communication skills", "Customer service experience", "Computer proficiency"],
  },
];

const JobOpportunities = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            <span className="bg-gradient-sunset bg-clip-text text-transparent">Seasonal Jobs</span> Available
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join our team for the holiday season! Competitive pay, flexible schedules, and festive work environment.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {jobs.map((job) => (
            <Card key={job.title} className="border-border bg-card shadow-deep hover:shadow-warm transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl text-card-foreground flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  {job.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">{job.type}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-primary" />
                  <span className="text-foreground font-medium">{job.pay}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">{job.location}</span>
                </div>
                <p className="text-sm text-muted-foreground">{job.description}</p>
                <div>
                  <h4 className="font-medium text-card-foreground mb-2">Requirements:</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button className="w-full shadow-glow hover:shadow-warm transition-all duration-300">
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center bg-gradient-warm p-8 rounded-lg border border-border/50">
          <h3 className="text-2xl font-bold mb-4 text-foreground">
            Ready to Brighten the Holidays?
          </h3>
          <p className="text-muted-foreground mb-6">
            We're hiring now for the upcoming holiday season. Great pay, flexible hours, and a chance to spread holiday joy!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="shadow-glow hover:shadow-warm transition-all duration-300">
              View All Positions
            </Button>
            <Button variant="secondary" size="lg">
              Contact HR
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobOpportunities;