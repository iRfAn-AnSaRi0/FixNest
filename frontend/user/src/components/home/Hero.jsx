import { Link } from "react-router-dom";
import Container from "../layout/Container";
import Button from "../ui/Button";

const Hero = () => {
  return (
    <section className="bg-surface pt-8 pb-16">
      <Container className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="max-w-2xl text-center md:text-left">
          <div className="inline-block px-3 py-1 font-sans mb-4 text-xs bg-background border border-border rounded-full text-muted">
            ✔ Verified Professionals • Fast Service
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text leading-tight">
            Trusted <span className="text-accent">Home Services</span>{" "}
            <br className="hidden md:block" /> At Your Doorstep
          </h1>

          <p className="mt-5 text-lg text-muted font-sans">
            Book trusted electricians, plumbers, cleaners and more — reliable
            professionals ready to help.
          </p>

          <div className="mt-6 flex flex-wrap font-sans justify-center md:justify-start gap-3">
            <span className="px-3 py-1 text-sm border border-border rounded-md bg-background">
              Plumbing
            </span>

            <span className="px-3 py-1 text-sm border border-border rounded-md bg-background">
              Electrician
            </span>

            <span className="px-3 py-1 text-sm border border-border rounded-md bg-background">
              AC Repair
            </span>

            <span className="px-3 py-1 text-sm border border-border rounded-md bg-background">
              Refrigerator
            </span>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link to="/services">
              <Button variant="accent" size="lg">
                Book a Service
              </Button>
            </Link>

            <Link to="/services">
              <Button variant="outline" size="lg">
                View Services
              </Button>
            </Link>
          </div>
        </div>

        <div className="hidden lg:flex justify-end">
          {/* <img src="" alt="home services" className="w-full max-w-lg" /> */}
        </div>
      </Container>
    </section>
  );
};

export default Hero;
