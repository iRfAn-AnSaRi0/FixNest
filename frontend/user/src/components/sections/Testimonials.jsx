import Container from "../layout/Container";
import Card from "../ui/Card";

const testimonials = [
    {
        name: "Rahul Sharma",
        role: "Homeowner",
        review:
            "Amazing service! The electrician arrived on time and fixed everything quickly.",
        rating: 5,
    },
    {
        name: "Priya Verma",
        role: "Customer",
        review:
            "Very professional and affordable pricing. Booking was super easy.",
        rating: 4,
    },
    {
        name: "Amit Das",
        role: "Homeowner",
        review:
            "Great experience. The technician was polite and highly skilled.",
        rating: 5,
    },
];

const Testimonials = () => {
    return (
        <section className="py-24 bg-surface">
            <Container>

                {/* HEADER */}
                <div className="text-center max-w-2xl mx-auto mb-16">

                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-text">
                        Trusted by Homeowners
                    </h2>

                    <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded"></div>

                    <p className="text-muted mt-3 font-sans">
                        See what our happy customers say about our services.
                    </p>


                </div>

                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                    {testimonials.map((item, index) => (
                        <Card
                            key={index}
                            className="p-8 flex flex-col justify-between hover:shadow-card transition duration-300"
                        >

                            
                            <p className="text-sm text-muted font-sans leading-relaxed">
                                “{item.review}”
                            </p>

                            
                            <div className="mt-6 flex items-center gap-4">

                               
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-heading text-primary">
                                    {item.name.charAt(0)}
                                </div>

                               
                                <div>
                                    <p className="font-heading text-sm font-semibold text-text">
                                        {item.name}
                                    </p>
                                    <p className="text-xs text-muted">
                                        {item.role}
                                    </p>
                                </div>

                            </div>

                            
                            <div className="mt-4 text-yellow-400 text-sm">
                                {"★".repeat(item.rating)}
                                {"☆".repeat(5 - item.rating)}
                            </div>

                        </Card>
                    ))}

                </div>

            </Container>
        </section>
    );
};

export default Testimonials;