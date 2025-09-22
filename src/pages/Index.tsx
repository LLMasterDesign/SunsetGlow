import Hero from "@/components/Hero";
import Services from "@/components/Services";
import JobOpportunities from "@/components/JobOpportunities";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <JobOpportunities />
      <Contact />
    </div>
  );
};

export default Index;
