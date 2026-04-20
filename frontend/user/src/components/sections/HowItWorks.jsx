import Container from "../layout/Container";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { Search, CalendarCheck, Wrench } from "lucide-react";

const steps = [
  {
    step: "Step 1",
    icon: Search,
    title: "Choose Service",
    description: "Browse our services and select the one you need.",
  },
  {
    step: "Step 2",
    icon: CalendarCheck,
    title: "Book Appointment",
    description: "Pick a convenient time and confirm your booking.",
  },
  {
    step: "Step 3",
    icon: Wrench,
    title: "Professional Arrives",
    description: "Our verified technician arrives and fixes the issue.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-surface">
      <Container>

        
        <div className="text-center max-w-2xl mx-auto mb-16">

          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text">
            How FixNest Works
          </h2>

          <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded"></div>


          <p className="text-muted mt-3 font-sans">
            Book trusted home services in just a few simple steps
          </p>


        </div>


       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 cursor-pointer">

          {steps.map((item, index) => (
            <Card
              key={index}
              className="group relative text-center p-10 flex flex-col items-center hover:shadow-card transition duration-300 hover:-translate-y-1"
            >

              
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge status="step">{item.step}</Badge>
              </div>

             
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 text-4xl mb-4 group-hover:scale-110 transition">
                <item.icon size={32} className="text-primary" />
              </div>

              
              <h3 className="font-heading text-xl font-semibold text-text">
                {item.title}
              </h3>

              
              <p className="text-sm text-muted mt-2 max-w-xs font-sans">
                {item.description}
              </p>

            </Card>
          ))}

        </div>

      </Container>
    </section>
  );
};

export default HowItWorks;
