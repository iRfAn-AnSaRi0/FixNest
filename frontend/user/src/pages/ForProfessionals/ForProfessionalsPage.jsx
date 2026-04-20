import Container from "../../components/layout/Container";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

const benefits = [
  {
    icon: "💰",
    title: "Earn More",
    desc: "Get regular service requests and increase your income.",
  },
  {
    icon: "📅",
    title: "Flexible Work",
    desc: "Work on your own schedule and accept jobs anytime.",
  },
  {
    icon: "📍",
    title: "Nearby Jobs",
    desc: "Get bookings from customers near your location.",
  },
  {
    icon: "⭐",
    title: "Build Reputation",
    desc: "Get ratings and grow your professional profile.",
  },
];

const steps = [
  "Register your details",
  "Get verified by our team",
  "Start receiving service requests",
  "Complete jobs and earn money",
];

const ForProfessionalsPage = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Basic validation (optional but recommended)
    if (!form.name || !form.phone || !form.service) {
      toast.error("Please fill all fields");
      return;
    }

    // ✅ Success message
    toast.success("Application submitted successfully ✅");

    // ✅ Reset form
    setForm({
      name: "",
      phone: "",
      service: "",
    });
  };

  return (
    <section className="pt-8 pb-16 bg-surface min-h-screen">

      <Container>

        {/* 🔗 BREADCRUMB */}
        <div className="text-sm text-muted font-sans mb-6 flex items-center gap-2 flex-wrap">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <span className="text-text font-medium">For Professionals</span>
        </div>

        {/* 🔥 HERO */}
        <div className="text-center max-w-3xl mx-auto mb-14">

          <h1 className="font-heading text-3xl md:text-4xl font-bold text-text">
            Earn with FixNest
          </h1>

          <p className="text-muted mt-4 text-lg font-sans">
            Join our network of professionals and grow your income with consistent service requests.
          </p>

          <Button variant="accent" className="mt-6 px-8">
            Join Now
          </Button>

        </div>

        {/* 💎 BENEFITS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">

          {benefits.map((item, i) => (
            <div
              key={i}
              className="p-6 border border-border rounded-xl bg-surface text-center hover:shadow-card transition"
            >
              <div className="text-3xl mb-3">{item.icon}</div>

              <h3 className="font-heading font-semibold text-text">
                {item.title}
              </h3>

              <p className="text-sm text-muted mt-2 font-sans">
                {item.desc}
              </p>
            </div>
          ))}

        </div>

        {/* ⚙️ HOW IT WORKS */}
        <div className="max-w-3xl mx-auto mb-20">

          <h2 className="text-center font-heading text-2xl font-semibold text-text mb-10">
            How It Works
          </h2>

          <div className="space-y-5">

            {steps.map((step, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-5 border border-border rounded-lg bg-surface"
              >
                <div className="min-w-[32px] h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
                  {index + 1}
                </div>

                <p className="text-sm text-muted font-sans">
                  {step}
                </p>
              </div>
            ))}

          </div>

        </div>

        {/* 📝 JOIN FORM */}
        <div className="max-w-2xl mx-auto bg-surface border border-border rounded-xl p-6 md:p-8">

          <h2 className="font-heading text-xl font-semibold text-text mb-6 text-center">
            Join as a Professional
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            <Input
              label="Full Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <Input
              label="Phone Number"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />

            <Input
              label="Service Type (e.g. Electrician)"
              value={form.service}
              onChange={(e) =>
                setForm({ ...form, service: e.target.value })
              }
            />

            {/* <Button variant="accent" className="w-full">
              Submit Application
            </Button> */}

            <Button
              variant="accent"
              className="w-full"
              disabled={!form.name || !form.phone || !form.service}
            >
              Submit Application
            </Button>

          </form>

        </div>

      </Container>

    </section>
  );
};

export default ForProfessionalsPage;