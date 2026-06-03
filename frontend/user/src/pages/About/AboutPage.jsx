import Container from "../../components/layout/Container";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";
import { Search, Wallet, Zap } from "lucide-react";
import { Helmet } from 'react-helmet-async';

const AboutPage = () => {
  return (
    <section className="pt-8 pb-16 bg-surface min-h-screen">
      <Helmet>
        <title>About FixNest | Trusted Home Services in Gangtok</title>
        <meta
          name="description"
          content="Learn about FixNest, your trusted platform for electricians, plumbers, appliance repair, and home maintenance services in Gangtok."
        />
      </Helmet>
      <Container>
        {/* 🔗 BREADCRUMB */}
        <div className="text-sm text-muted font-sans mb-6 flex items-center gap-2 flex-wrap">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <span className="text-text font-medium">About Us</span>
        </div>

        {/* 🔥 HERO (UPGRADED) */}
        <div className="text-center max-w-4xl mx-auto mb-24">

          <h1 className="font-heading text-3xl md:text-4xl font-bold font-bold text-text leading-tight">
            Fixing Homes.
            <span className="block text-primary mt-2">
              Building Trust.
            </span>
          </h1>

          <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded"></div>

          <p className="text-muted mt-6 text-lg md:text-xl font-sans leading-relaxed">
            FixNest is your trusted platform to book reliable home services —
            fast, transparent, and hassle-free.
          </p>



        </div>

        {/* 🎯 MISSION + VISION */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">

          <div className="bg-surface border border-border rounded-2xl p-6">
            <h2 className="font-heading text-xl font-semibold text-text">
              Our Mission
            </h2>

            <p className="text-muted mt-3 font-sans">
              To simplify home services by connecting customers with verified professionals
              and delivering a seamless booking experience.
            </p>
          </div>

          <div className="bg-surface border border-border rounded-2xl p-6">
            <h2 className="font-heading text-xl font-semibold text-text">
              Our Vision
            </h2>

            <p className="text-muted mt-3 font-sans">
              To become the most trusted platform for home services across every city.
            </p>
          </div>

        </div>

        {/* 🚀 STORY SECTION (NEW → IMPORTANT) */}
        <div className="max-w-4xl mx-auto text-center mb-24">

          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-text">
            Why We Started FixNest
          </h2>

          <p className="text-muted mt-4 font-sans leading-relaxed">
            Finding reliable service professionals is often frustrating —
            unclear pricing, delays, and lack of trust.
            FixNest was built to solve this problem by bringing transparency,
            speed, and reliability into one simple platform.
          </p>

        </div>

        {/* 💎 FEATURES / VALUE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">

          <div className="p-6 rounded-xl border border-border bg-surface hover:shadow-card transition">
            <Search size={28} className="text-primary" />
            <h3 className="font-heading font-semibold mt-3 text-text">
              Verified Professionals
            </h3>
            <p className="text-sm text-muted mt-2">
              Background-checked and skilled experts you can trust.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-border bg-surface hover:shadow-card transition">
            <Wallet size={28} className="text-primary" />
            <h3 className="font-heading font-semibold mt-3 text-text">
              Transparent Pricing
            </h3>
            <p className="text-sm text-muted mt-2">
              No hidden costs. Know exactly what you pay.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-border bg-surface hover:shadow-card transition">
            <Zap size={28} className="text-primary" />
            <h3 className="font-heading font-semibold mt-3 text-text">
              Fast & Reliable
            </h3>
            <p className="text-sm text-muted mt-2">
              Quick booking and on-time service delivery.
            </p>
          </div>

        </div>

        {/* 🤝 TRUST STRIP (UPGRADED) */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center mb-24">

          <h2 className="font-heading text-2xl font-semibold text-text">
            Trusted by Customers
          </h2>

          <p className="text-muted mt-3 font-sans">
            We focus on reliability, safety, and customer satisfaction.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm">

            <span className="bg-background px-4 py-2 rounded-full border border-border">
              ✔ Verified Experts
            </span>

            <span className="bg-background px-4 py-2 rounded-full border border-border">
              ✔ Secure Booking
            </span>

            <span className="bg-background px-4 py-2 rounded-full border border-border">
              ✔ On-time Service
            </span>

          </div>

        </div>

        {/* 🚀 CTA (STRONGER) */}
        <div className="text-center">

          <h3 className="font-heading text-2xl md:text-3xl font-semibold text-text">
            Ready to book your service?
          </h3>

          <p className="text-muted mt-3 font-sans">
            Experience reliable home services with FixNest
          </p>

          <Link to="/services">
            <Button variant="accent" className="mt-6" size="md">
              Explore Services
            </Button>
          </Link>

        </div>

      </Container>

    </section>
  );
};

export default AboutPage;