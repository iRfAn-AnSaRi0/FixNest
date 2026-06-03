import { useLocation } from "react-router-dom";
import Container from "../../components/layout/Container";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Textarea from "../../components/ui/Textarea";
import { Link } from "react-router-dom";
import { useState } from "react";
import { book } from "../../services/BookingApi";
import BookingSuccess from "./BookingSuccess";
import toast from "react-hot-toast";
import { Helmet } from 'react-helmet-async';

const BookingPage = () => {
    const { state } = useLocation(); // service ID

    const [successOpen, setSuccessOpen] = useState(false);
    const [bookingData, setBookingData] = useState(null);
    const [loading, setLoading] = useState(false)

    const service = state?.service || state?.services;
    const [quantity, setQuantity] = useState(1);
    const [form, setForm] = useState({
        street: "",
        city: "Gangtok",
        state: "Sikkim",
        pincode: "737101",
        problemDescription: "",
        date: "",
        time: ""
    })

    const today = new Date().toISOString().split("T")[0];
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5); // "HH:MM"

    const handleChange = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    const increaseQty = () => {
        setQuantity((prev) => prev + 1);
    }

    const decreaseQty = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    }

    const handleSubmit = async () => {

        // ✅ FRONTEND VALIDATION
        if (
            !form.street ||
            !form.city ||
            !form.state ||
            !form.pincode ||
            !form.date ||
            !form.time ||
            !form.problemDescription
        ) {
            toast.error("⚠️ Please fill all required fields");
            return;
        }

        setLoading(true);

        const selectedDateTime = new Date(`${form.date}T${form.time}`);
        if (selectedDateTime < new Date()) {
            toast.error("⏰ Please select a future time");
            return;
        }

        try {

            const payload = {
                items: [
                    {
                        service: service?._id,
                        quantity: quantity,
                        price: service?.price
                    }
                ],
                bookingDate: new Date(form.date), // ✅ only date
                problemDescription: form.problemDescription,
                address: {
                    street: form.street,
                    city: form.city,
                    state: form.state,
                    pincode: form.pincode
                }
            };

            const res = await book(payload)
            console.log(res.data.statusCode);

            if (res.data.statusCode === 201) {

                setBookingData({
                    serviceName: service.name,
                    date: form.date,
                    time: form.time,
                    estimateTime: service.estimateTime,
                    price: service.price * quantity,
                });
                //    console.log("successOpen:", successOpen);
                // ✅ Reset form
                setForm({
                    date: "",
                    time: "",
                    problemDescription: "",
                    street: "",
                    city: "Gangtok",
                    state: "Sikkim",
                    pincode: "737101"
                });

                setQuantity(1);
                setSuccessOpen(true);

            }
        } catch (error) {
            console.error("Booking failed:", error);
            toast.error(error.response?.data?.message || "Booking failed. Please try again.");
        }
        finally {
            setLoading(false); // 🔥 stop loading ALWAYS
        }

    }


    return (
        <section className="bg-background pt-8 pb-16 min-h-screen">
            <Helmet>
                <title>Book Home Services Online | FixNest Gangtok</title>
                <meta
                    name="description"
                    content="Book trusted home services online with FixNest. Schedule electricians, plumbers, appliance repair, and maintenance professionals in Gangtok."
                />
            </Helmet>
            <Container>

                <div className="text-sm text-muted font-sans mb-6 flex items-center gap-2 flex-wrap">

                    <Link to="/" className="hover:text-primary transition">
                        Home
                    </Link>

                    <span>/</span>

                    <Link to="/services" className="hover:text-primary transition">
                        Service
                    </Link>

                    <span>/</span>

                    <span className="text-text font-medium">
                        Booking
                    </span>

                </div>

                {/* 🔥 HEADER */}
                <div className="mb-10">
                    <h1 className="font-heading text-3xl font-bold text-text">
                        Book Service
                    </h1>
                    <p className="text-muted mt-2">
                        Fill details to confirm your booking
                    </p>
                </div>

                {/* 🧱 LAYOUT */}
                <div className="grid lg:grid-cols-3 gap-8">

                    {/* 📦 LEFT → SERVICE DETAILS */}
                    <div className="lg:col-span-2 space-y-6">

                        <div className="bg-surface border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition">

                            {/* TOP SECTION */}
                            <div className="flex gap-4">

                                {/* IMAGE */}
                                <img
                                    src={service?.serviceImage}
                                    alt={service?.name}
                                    className="w-24 h-24 rounded-xl object-cover"
                                />

                                {/* DETAILS */}
                                <div className="flex-1">

                                    <h2 className="font-heading text-lg font-semibold text-text">
                                        {service?.name || "Service Name"}
                                    </h2>

                                    <p className="text-sm text-muted mt-1 line-clamp-2">
                                        {service?.description}
                                    </p>

                                    <div className="flex items-center gap-4 mt-2 text-xs text-muted">
                                        <span>⏱ {service?.estimateTime}</span>
                                    </div>

                                </div>

                            </div>

                            {/* PRICE + QUANTITY */}
                            <div className="mt-5 flex items-center justify-between">

                                {/* PRICE */}
                                <div>
                                    {service?.originalPrice && (
                                        <span className="text-xs line-through text-muted block">
                                            ₹{service.originalPrice}
                                        </span>
                                    )}
                                    <span className="text-2xl font-bold text-text">
                                        ₹{service?.price || "199"}
                                    </span>
                                </div>

                                {/* QUANTITY CONTROL */}
                                <div className="flex items-center border border-border rounded-full overflow-hidden">

                                    <button
                                        onClick={decreaseQty}
                                        className="px-3 py-1 text-lg hover:bg-gray-100 transition"
                                    >
                                        −
                                    </button>

                                    <span className="px-4 font-semibold">
                                        {quantity}
                                    </span>

                                    <button
                                        onClick={increaseQty}
                                        className="px-3 py-1 text-lg hover:bg-gray-100 transition"
                                    >
                                        +
                                    </button>

                                </div>

                            </div>

                        </div>

                        {/* 📝 FORM */}
                        <div className="bg-surface border border-border rounded-xl p-5 space-y-4">

                            <h3 className="font-heading text-lg font-semibold text-text">
                                Your Details
                            </h3>

                            {/* <p className="text-sm text-warning">
                                🚫 Service available only in Gangtok, Sikkim (737101)
                            </p> */}

                            <div className="mt-3 bg-warning/10 border border-warning/30 rounded-lg p-3 text-xs text-muted">
                                <p className="text-warning">
                                    🚫 Service available only in Gangtok, Sikkim
                                </p>

                                <p className="text-warning">
                                    🚗 Additional travel charge of ₹100–₹200 may apply for locations below Gangtok Bazaar, Burtuk, and Tadong areas.
                                </p>
                            </div>

                            <Input
                                label="Street"
                                value={form.street}
                                disabled={loading}
                                onChange={(e) => handleChange("street", e.target.value)}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="City"
                                    value={form.city}
                                    disabled

                                />

                                <Input
                                    label="State"
                                    value={form.state}
                                    disabled

                                />
                            </div>

                            <Input
                                label="Pincode"
                                value={form.pincode}
                                disabled

                            />
                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative">
                                    {/* <input
                                        type="date"
                                        min={today}
                                        disabled={loading}
                                        value={form.date}
                                        // onChange={(e) => handleChange("date", e.target.value)}
                                        onChange={(e) => {
                                            handleChange("date", e.target.value);
                                            handleChange("time", ""); // reset time
                                        }}
                                        className="w-full border border-border rounded-lg px-3 pt-5 pb-2 bg-transparent outline-none focus:border-accent  focus:ring-accent"
                                    /> */}
                                    <input
                                        type="date"
                                        min={today}
                                        disabled={loading}
                                        value={form.date}
                                        onChange={(e) => {
                                            handleChange("date", e.target.value);
                                            handleChange("time", "");
                                        }}
                                        className="w-full border border-border rounded-lg px-3 pt-5 pb-2 bg-transparent outline-none focus:border-accent focus:ring-accent"
                                    />
                                    <label className="absolute left-3 top-1 text-xs text-muted">
                                        Select Date
                                    </label>
                                </div>

                                <div className="relative">
                                    <select
                                        value={form.time}
                                        disabled={loading || !form.date}
                                        onChange={(e) => handleChange("time", e.target.value)}
                                        className="w-full border border-border rounded-lg px-3 pt-5 pb-2 bg-transparent outline-none focus:border-accent focus:ring-accent appearance-none"
                                    >
                                        <option value="">Select Time Slot</option>

                                        {[
                                            { value: "09:00-13:00", label: "9 AM - 1 PM", end: "13:00" },
                                            { value: "13:00-15:00", label: "1 PM - 3 PM", end: "15:00" },
                                            { value: "15:00-18:00", label: "3 PM - 6 PM", end: "18:00" },
                                        ]
                                            .filter((slot) => {
                                                if (form.date !== today) return true;

                                                const now = new Date();
                                                const slotEnd = new Date(`${form.date}T${slot.end}`);

                                                return slotEnd > now;
                                            })
                                            .map((slot) => (
                                                <option key={slot.value} value={slot.value}>
                                                    {slot.label}
                                                </option>
                                            ))}
                                    </select>

                                    <label className="absolute left-3 top-1 text-xs text-muted">
                                        Select Time Slot
                                    </label>
                                </div>
                            </div>

                            <Textarea
                                id="problemDescription"
                                label="Problem description"
                                value={form.problemDescription}
                                disabled={loading}
                                onChange={(e) => handleChange("problemDescription", e.target.value)}
                            />


                        </div>

                    </div>

                    {/* 💰 RIGHT → SUMMARY */}
                    <div className="space-y-6">

                        <div className="bg-surface border border-border rounded-xl p-5">

                            <h3 className="font-heading text-lg font-semibold text-text">
                                Price Summary
                            </h3>

                            <div className="mt-4 space-y-2 text-sm">

                                <div className="flex justify-between">
                                    <span>Service Price</span>
                                    <span>₹{service?.price || "₹199"}</span>
                                </div>

                                <div className="flex justify-between text-muted">
                                    <span>Visiting Charge</span>
                                    <span>₹99</span>
                                </div>

                                <div className="border-t border-border my-2" />

                                <div className="flex justify-between font-semibold text-text">
                                    <span>Total</span>
                                    <span>₹{service?.price || "₹199"}</span>
                                </div>

                            </div>

                            <p className="text-xs text-muted mt-3">
                                * Visiting charges may apply after technician assignment
                            </p>

                            <Button variant="accent" disabled={loading} onClick={handleSubmit} className="w-full mt-5">


                                {loading ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                                        Booking your service...
                                    </>
                                ) : (
                                    "Confirm Booking"
                                )}
                            </Button>

                        </div>

                    </div>

                </div>

            </Container>

            <BookingSuccess
                open={successOpen}
                onClose={() => setSuccessOpen(false)}
                booking={bookingData}
            />

        </section>
    );
};

export default BookingPage;