import toast from "react-hot-toast";
import Container from "../../components/layout/Container";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";
import { useState } from "react";
import { Link } from "react-router-dom";

const ContactSupportPage = () => {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        message: "",
    });

    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.name || !form.phone || !form.message) {
            return setError("All fields are required");
        }

        if (!/^[0-9]{10}$/.test(form.phone)) {
            return setError("Enter valid 10-digit phone number");
        }

        setError("")

        setForm({
            name: "",
            phone: "",
            message: "",
        })

        toast.success("Support request submitted successfully ✅");
    };

    return (
        <section className="pt-8 pb-16 bg-surface min-h-screen">
            <Container>

                {/* 🔗 BREADCRUMB */}
                <div className="text-sm text-muted font-sans mb-6 flex items-center gap-2 flex-wrap">
                    <Link to="/" className="hover:text-primary">Home</Link>
                    <span>/</span>
                    <span className="text-text font-medium">Contact & Support</span>
                </div>
                {/* 🔥 HEADER */}
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <h1 className="font-heading text-3xl md:text-4xl font-bold text-text">
                        Contact Support
                    </h1>

                    <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded"></div>

                    <p className="text-muted mt-3 font-sans">
                        Need help? Reach out to our support team anytime
                    </p>


                </div>

                {/* 📞 CONTACT OPTIONS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">

                    <div className="p-5 border border-border rounded-xl text-center bg-surface">
                        <p className="text-2xl mb-2">📞</p>
                        <h3 className="font-heading font-semibold text-text">
                            Call Us
                        </h3>
                        <p className="text-sm text-muted mt-1">+91 9876543210</p>
                    </div>

                    <div className="p-5 border border-border rounded-xl text-center bg-surface">
                        <p className="text-2xl mb-2">✉️</p>
                        <h3 className="font-heading font-semibold text-text">
                            Email
                        </h3>
                        <p className="text-sm text-muted mt-1">
                            support@fixnest.com
                        </p>
                    </div>

                    <div className="p-5 border border-border rounded-xl text-center bg-surface">
                        <p className="text-2xl mb-2">⏱</p>
                        <h3 className="font-heading font-semibold text-text">
                            Support Hours
                        </h3>
                        <p className="text-sm text-muted mt-1">
                            9 AM – 6 PM (All Days)
                        </p>
                    </div>

                </div>

                {/* 📝 FORM */}
                <div className="max-w-2xl mx-auto bg-surface border border-border rounded-xl p-6 md:p-8 shadow-sm">

                    <h2 className="font-heading text-xl font-semibold text-text mb-6">
                        Send us a message
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        <Input
                            label="Full Name"
                            placeholder=" "
                            value={form.name}
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                        />

                        <Input
                            label="Phone Number"
                            type="tel"
                            placeholder=" "
                            value={form.phone}
                            onChange={(e) =>
                                setForm({ ...form, phone: e.target.value })
                            }
                        />

                        <Textarea
                            id="message"
                            label="Message"
                            value={form.message}
                            onChange={(e) =>
                                setForm({ ...form, message: e.target.value })
                            }
                        />

                        {error && (
                            <p className="text-sm text-danger">{error}</p>
                        )}

                        {/* <Button variant="accent" className="w-full">
                            Submit Request
                        </Button> */}

                        <Button
                            variant="accent"
                            className="w-full"
                            disabled={!form.name || !form.phone || !form.message}
                        >
                            Submit Request
                        </Button>

                    </form>

                </div>

                {/* 🔒 TRUST NOTE */}
                <p className="text-xs text-muted text-center mt-6">
                    Your information is safe and will only be used for support purposes
                </p>

            </Container>
        </section>
    );
};

export default ContactSupportPage;