import Container from "../../components/layout/Container";
import Button from "../../components/ui/Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';

const faqs = [
  {
    question: "How do I book a service?",
    answer:
      "Browse services, select the one you need, and click on 'Book Now'. Follow the steps to confirm your booking.",
  },
  {
    question: "How are technicians assigned?",
    answer:
      "We assign nearby verified professionals based on availability and your location.",
  },
  {
    question: "Is there any visiting charge?",
    answer:
      "Yes, a visiting charge may apply after a technician is assigned, even if the service is not completed.",
  },
  {
    question: "Can I cancel my booking?",
    answer:
      "Yes, you can cancel before the technician is assigned. Charges may apply after assignment.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can contact our support team through the contact section below.",
  },
];

const HelpPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="pt-8 pb-16 bg-surface min-h-screen">
      <Helmet>
        <title>Help Center | FixNest</title>
        <meta
          name="description"
          content="Find answers to common questions about bookings, payments, services, professionals, and customer support on FixNest."
        />
      </Helmet>
      <Container>

        {/* 🔗 BREADCRUMB */}
        <div className="text-sm text-muted font-sans mb-6 flex items-center gap-2 flex-wrap">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <span className="text-text font-medium">Help</span>
        </div>

        {/* 🔥 HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-text">
            Help & Support
          </h1>

          <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded"></div>

          <p className="text-muted mt-3 font-sans">
            Find answers to common questions and get help quickly
          </p>

        </div>

        {/* ❓ FAQ SECTION */}
        <div className="max-w-3xl mx-auto space-y-4">

          {faqs.map((item, index) => (
            <div
              key={index}
              className="border border-border rounded-lg overflow-hidden"
            >

              {/* QUESTION */}
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full text-left p-4 flex justify-between items-center font-medium text-text"
              >
                {item.question}
                <span>{openIndex === index ? "−" : "+"}</span>
              </button>

              {/* ANSWER */}
              {openIndex === index && (
                <div className="px-4 pb-4 text-sm text-muted font-sans">
                  {item.answer}
                </div>
              )}

            </div>
          ))}

        </div>

        {/* 📞 CONTACT SECTION */}
        <div className="mt-20 max-w-3xl mx-auto text-center">

          <h2 className="font-heading text-xl md:text-2xl font-semibold text-text">
            Still need help?
          </h2>

          <p className="text-muted mt-2 font-sans">
            Our support team is here to assist you
          </p>

          <Link to="/contact">
            <Button variant="accent" size="lg" className="mt-5">Contact Support</Button>
          </Link>

        </div>

      </Container>
    </section>
  );
};

export default HelpPage;