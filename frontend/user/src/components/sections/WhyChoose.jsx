import Container from "../layout/Container";
import Card from "../ui/Card";
import { ShieldCheck, Wallet, Zap, Lock } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Professionals",
    description: "All technicians are background checked and trained.",
  },
  {
    icon: Wallet,
    title: "Affordable Pricing",
    description: "Transparent pricing with no hidden charges.",
  },
  {
    icon: Zap,
    title: "Fast Service",
    description: "Quick response and on-time service at your doorstep.",
  },
  {
    icon: Lock,
    title: "Secure Booking",
    description: "Safe and secure booking with trusted professionals.",
  },
];

const WhyChoose = () => {
  return (
    <section className="py-24 bg-background">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text">
            Why Choose FixNest
          </h2>

          <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded"></div>

          <p className="text-muted mt-4 font-sans">
            We make home services simple, reliable and affordable
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group text-center p-10 flex flex-col items-center border border-border hover:shadow-card transition duration-300 hover:-translate-y-1"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 mb-5 text-2xl transition group-hover:bg-primary group-hover:text-white group-hover:scale-105">
                <feature.icon size={28} className="text-primary group-hover:text-white" />
              </div>

              <h3 className="font-heading text-lg font-semibold text-text">
                {feature.title}
              </h3>

              <p className="text-sm text-muted mt-3 font-sans max-w-[220px]">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default WhyChoose;
