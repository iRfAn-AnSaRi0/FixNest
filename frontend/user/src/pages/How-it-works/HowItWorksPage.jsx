import Container from "../../components/layout/Container";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import { ShieldCheck, PhoneCall, FileText, Star } from "lucide-react";
import { Helmet } from 'react-helmet-async';

const steps = [
    {
        title: "Choose a Service",
        desc: "Browse and select the service you need from our wide range of categories.",
    },
    {
        title: "Enter Your Details",
        desc: "Provide your address, preferred date and time for the service.",
    },
    {
        title: "Booking Confirmed",
        desc: "Your request is instantly confirmed after submission.",
    },
    {
        title: "Technician Assigned",
        desc: "A verified professional is assigned based on availability.",
    },
    {
        title: "Service at Your Doorstep",
        desc: "Technician arrives on time and completes the service.",
    },
    {
        title: "Payment & Feedback",
        desc: "Pay securely after service and rate your experience.",
    },
];

const trustPoints = [
    {
        icon: ShieldCheck,
        title: "Background Verified Experts",
        desc: "Every technician is verified with proper identity and background checks.",
    },
    {
        icon: PhoneCall,
        title: "Real-Time Communication",
        desc: "Technicians may contact you before arrival for better coordination.",
    },
    {
        icon: FileText,
        title: "Clear Service Process",
        desc: "You know exactly what will happen before, during and after booking.",
    },
    {
        icon: Star,
        title: "Rated by Customers",
        desc: "Service quality is maintained through real customer feedback.",
    },
];

const HowItWorksPage = () => {

    return (
        <section className="pt-8 pb-16 bg-surface">

            <Helmet>
                <title>How FixNest Works | Easy Home Service Booking</title>
                <meta
                    name="description"
                    content="Learn how FixNest works. Book trusted home services in a few simple steps and get professional help at your doorstep."
                />
            </Helmet>
            <Container>

                {/* 🔗 BREADCRUMB */}
                <div className="text-sm text-muted font-sans mb-6 flex items-center gap-2 flex-wrap">
                    <Link to="/" className="hover:text-primary">Home</Link>
                    <span>/</span>
                    <span className="text-text font-medium">How It Works</span>
                </div>

                {/* 🔥 HERO */}
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <h1 className="font-heading text-3xl md:text-4xl font-bold text-text">
                        How FixNest Works
                    </h1>
                    <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded"></div>

                    <p className="text-muted mt-4 font-sans leading-relaxed">
                        From booking to completion — we make home services simple,
                        reliable and stress-free.
                    </p>
                </div>


                {/* 🚀 TIMELINE */}
                <div className="max-w-4xl mx-auto">

                    <div className="space-y-6 md:space-y-12 relative">

                        {/* DESKTOP LINE */}
                        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-border -translate-x-1/2"></div>

                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className={`flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                            >

                                {/* TEXT CARD */}
                                <div className="w-full md:w-1/2">
                                    <div className="relative bg-surface border border-border rounded-xl p-5 md:p-6 shadow-sm hover:shadow-card transition">

                                        {/* STEP BADGE (FIXED POSITION) */}
                                        <div className="absolute -top-3 font-sans left-4 md:left-6 bg-accent text-white text-xs px-3 py-1 rounded-full shadow">
                                            Step {index + 1}
                                        </div>

                                        <h3 className="font-heading text-lg font-semibold text-text mt-2">
                                            {step.title}
                                        </h3>

                                        <p className="text-sm text-muted mt-2 font-sans">
                                            {step.desc}
                                        </p>

                                    </div>
                                </div>

                            </div>
                        ))}

                    </div>

                </div>

                <div className="mt-24 max-w-3xl mx-auto">

                    {/* HEADER */}
                    <div className="text-center mb-14">
                        <h2 className="font-heading text-2xl md:text-3xl font-semibold text-text">
                            What Happens After Booking?
                        </h2>

                        <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded"></div>

                        <p className="text-muted mt-3 font-sans">
                            Here’s exactly what happens once you place a request
                        </p>


                    </div>

                    {/* FLOW */}
                    <div className="space-y-6">

                        {/* ITEM */}
                        <div className="flex items-start gap-4 p-5 rounded-xl border border-border bg-surface hover:shadow-card transition">

                            <div className="min-w-[32px] h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
                                1
                            </div>

                            <div>
                                <h3 className="font-heading text-base font-semibold text-text">
                                    Booking Confirmed Instantly
                                </h3>
                                <p className="text-sm text-muted mt-1 font-sans">
                                    Your request is successfully received and confirmed in real-time.
                                </p>
                            </div>

                        </div>

                        {/* ITEM */}
                        <div className="flex items-start gap-4 p-5 rounded-xl border border-border bg-surface hover:shadow-card transition">

                            <div className="min-w-[32px] h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
                                2
                            </div>

                            <div>
                                <h3 className="font-heading text-base font-semibold text-text">
                                    Technician is Assigned
                                </h3>
                                <p className="text-sm text-muted mt-1 font-sans">
                                    A nearby verified professional is assigned based on availability.
                                </p>
                            </div>

                        </div>

                        {/* ITEM */}
                        <div className="flex items-start gap-4 p-5 rounded-xl border border-border bg-surface hover:shadow-card transition">

                            <div className="min-w-[32px] h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
                                3
                            </div>

                            <div>
                                <h3 className="font-heading text-base font-semibold text-text">
                                    Technician Contacts You
                                </h3>
                                <p className="text-sm text-muted mt-1 font-sans">
                                    For better coordination, the technician may call before arrival.
                                </p>
                            </div>

                        </div>

                        {/* ITEM */}
                        <div className="flex items-start gap-4 p-5 rounded-xl border border-border bg-surface hover:shadow-card transition">

                            <div className="min-w-[32px] h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
                                4
                            </div>

                            <div>
                                <h3 className="font-heading text-base font-semibold text-text">
                                    Service Delivered at Your Home
                                </h3>
                                <p className="text-sm text-muted mt-1 font-sans">
                                    The job is completed professionally at your doorstep.
                                </p>
                            </div>

                        </div>

                    </div>

                </div>
                <div className="mt-24 max-w-5xl mx-auto">

                    {/* HEADER */}
                    <div className="text-center mb-14">
                        <h2 className="font-heading text-2xl md:text-3xl font-semibold text-text">
                            Built for Trust & Transparency
                        </h2>

                        <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded"></div>

                        <p className="text-muted mt-3 font-sans">
                            We ensure every step is clear, safe and reliable
                        </p>

                    </div>

                    {/* GRID */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                        {trustPoints.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-4 p-5 rounded-xl border border-border bg-surface hover:shadow-card transition duration-300"
                            >

                                {/* ICON (FIXED SIZE - NO SQUEEZE) */}
                                <div className="min-w-[40px] h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary text-lg">
                                    <item.icon
                                        size={28} />
                                </div>

                                {/* TEXT */}
                                <div>
                                    <h3 className="font-heading text-base font-semibold text-text">
                                        {item.title}
                                    </h3>

                                    <p className="text-sm font-sans text-muted mt-1 font-sans leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>

                            </div>
                        ))}

                    </div>

                </div>

                {/* ℹ️ TRANSPARENCY NOTE */}
                <div className="mt-20 max-w-3xl mx-auto">

                    <div className="flex items-start gap-4 p-5 rounded-xl border border-border bg-surface">

                        {/* ICON */}
                        <div className="min-w-[36px] h-9 flex items-center justify-center rounded-full text-primary text-sm">
                            ℹ️
                        </div>

                        {/* CONTENT */}
                        <div>
                            <p className="font-medium text-text font-heading">
                                Transparent Pricing Policy
                            </p>

                            <p className="text-sm text-muted mt-1 font-sans leading-relaxed">
                                A visiting charge may apply after a technician is assigned,
                                even if the service is not completed. This ensures fair
                                compensation for the professional’s time and travel.
                            </p>
                        </div>

                    </div>

                </div>

                <div className="mt-24 w-full">

                    <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-border rounded-2xl p-8 md:p-10 text-center shadow-sm">

                        {/* HEADING */}
                        <h3 className="font-heading text-2xl md:text-3xl font-semibold text-text">
                            Ready to fix your problem?
                        </h3>

                        {/* SUBTEXT */}
                        <p className="text-muted mt-3 font-sans mx-auto">
                            Book trusted professionals in minutes and get your work done without hassle.
                        </p>

                        {/* CTA BUTTON */}
                        <Link to="/services">
                            <Button
                                variant="accent"
                                className="mt-6"
                            >
                                Book a Service
                            </Button>
                        </Link>

                        {/* TRUST LINE */}
                        <p className="text-xs text-accent mt-4 font-sans">
                            ✔ Verified professionals • ✔ Transparent pricing • ✔ Secure booking
                        </p>

                    </div>

                </div>
            </Container>

        </section>
    );
};

export default HowItWorksPage;