import Container from "../../components/layout/Container";
import { Link } from "react-router-dom";

const TermsPage = () => {
    return (
        <section className="pt-8 pb-16 bg-surface min-h-screen">

            <Container>

                {/* 🔗 BREADCRUMB */}
                <div className="text-sm text-muted font-sans mb-6 flex items-center gap-2 flex-wrap">
                    <Link to="/" className="hover:text-primary">Home</Link>
                    <span>/</span>
                    <span className="text-text font-medium">Terms & Conditions</span>
                </div>

                {/* 🔥 HEADER */}
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <h1 className="font-heading text-3xl md:text-4xl font-bold text-text">
                        Terms & Conditions
                    </h1>
                    <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded"></div>
                    <p className="text-muted mt-3 text-sm">
                        Last Updated: March 2026
                    </p>


                </div>

                {/* 📄 CONTENT */}
                <div className="max-w-3xl mx-auto">

                    <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 space-y-8 shadow-sm">

                        {/* INTRO */}
                        <p className="text-sm text-muted leading-relaxed">
                            Welcome to FixNest. By using our platform, you agree to the following terms and conditions.
                        </p>

                        {/* 1 */}
                        <div>
                            <h2 className="font-heading text-lg font-semibold text-text mb-2">
                                1. Service Platform
                            </h2>

                            <p className="text-sm text-muted leading-relaxed">
                                FixNest is a platform that connects users with service professionals.
                                We do not directly provide services but facilitate the booking process.
                            </p>
                        </div>

                        {/* 2 */}
                        <div>
                            <h2 className="font-heading text-lg font-semibold text-text mb-2">
                                2. Booking & Confirmation
                            </h2>

                            <ul className="list-disc pl-5 text-sm text-muted space-y-1">
                                <li>Users can book services through the platform</li>
                                <li>A technician will be assigned based on availability</li>
                                <li>You may receive a call for confirmation</li>
                            </ul>
                        </div>

                        {/* 3 */}
                        <div>
                            <h2 className="font-heading text-lg font-semibold text-text mb-2">
                                3. Pricing & Charges
                            </h2>

                            <p className="text-sm text-muted">
                                Prices shown are base service charges. Final cost may vary depending on actual work.
                            </p>

                            <div className="mt-3 bg-warning/10 border border-warning/30 rounded-lg p-3 text-xs text-muted">
                                A visiting charge may apply once a technician is assigned, even if the service is not completed.
                            </div>
                        </div>

                        {/* 4 */}
                        <div>
                            <h2 className="font-heading text-lg font-semibold text-text mb-2">
                                4. User Responsibilities
                            </h2>

                            <ul className="list-disc pl-5 text-sm text-muted space-y-1">
                                <li>Provide correct information</li>
                                <li>Be available at the scheduled time</li>
                                <li>Maintain respectful behavior with professionals</li>
                            </ul>
                        </div>

                        {/* 5 */}
                        <div>
                            <h2 className="font-heading text-lg font-semibold text-text mb-2">
                                5. Cancellation Policy
                            </h2>

                            <p className="text-sm text-muted">
                                You may cancel a booking before the technician is assigned.
                                Late cancellations may incur visiting charges.
                            </p>
                        </div>

                        {/* 6 */}
                        <div>
                            <h2 className="font-heading text-lg font-semibold text-text mb-2">
                                6. Service Responsibility
                            </h2>

                            <p className="text-sm text-muted">
                                Service quality is the responsibility of the assigned professional.
                                FixNest ensures verification but does not guarantee outcomes.
                            </p>
                        </div>

                        {/* 7 */}
                        <div>
                            <h2 className="font-heading text-lg font-semibold text-text mb-2">
                                7. Limitation of Liability
                            </h2>

                            <p className="text-sm text-muted">
                                FixNest is not liable for damages or delays caused during service.
                                However, we will try to assist in resolving issues.
                            </p>
                        </div>

                        {/* 8 */}
                        <div>
                            <h2 className="font-heading text-lg font-semibold text-text mb-2">
                                8. Changes to Terms
                            </h2>

                            <p className="text-sm text-muted">
                                We may update these terms at any time. Continued use of the platform means you accept the updated terms.
                            </p>
                        </div>

                        {/* 9 */}
                        <div>
                            <h2 className="font-heading text-lg font-semibold text-text mb-2">
                                9. Contact
                            </h2>

                            <p className="text-sm text-muted">
                                For any queries:
                            </p>

                            <p className="text-sm text-primary mt-2 font-medium">
                                support@fixnest.com
                            </p>
                        </div>

                        {/* FOOT NOTE */}
                        <div className="text-center pt-4 border-t border-border">
                            <p className="text-sm text-muted">
                                Thank you for choosing FixNest 🙌
                            </p>
                        </div>

                    </div>

                </div>

            </Container>

        </section>
    );
};

export default TermsPage;