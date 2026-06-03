import Container from "../../components/layout/Container";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';

const PrivacyPolicyPage = () => {
  return (
    <section className="pt-8 pb-16 bg-surface min-h-screen">

<Helmet>
  <title>Privacy Policy | FixNest</title>
  <meta
    name="description"
    content="Read the FixNest Privacy Policy to understand how we collect, use, and protect your personal information."
  />
</Helmet>
      <Container>

       {/* 🔗 BREADCRUMB */}
                <div className="text-sm text-muted font-sans mb-6 flex items-center gap-2 flex-wrap">
                    <Link to="/" className="hover:text-primary">Home</Link>
                    <span>/</span>
                    <span className="text-text font-medium">Privacy Policy</span>
                </div>

        {/* 🔥 HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-text">
            Privacy Policy
          </h1>

          <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded"></div>

          <p className="text-muted font-sans mt-3 text-sm">
            Last Updated: March 2026
          </p>

        </div>

        {/* 📄 CONTENT */}
        <div className="max-w-3xl mx-auto">

          <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 space-y-8 shadow-sm">

            {/* INTRO */}
            <p className="text-sm text-muted font-sans leading-relaxed">
              At FixNest, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our platform.
            </p>

            {/* 1 */}
            <div>
              <h2 className="font-heading text-lg font-semibold text-text mb-2">
                1. Information We Collect
              </h2>

              <ul className="list-disc pl-5 text-sm font-sans text-muted space-y-1">
                <li>Full Name</li>
                <li>Phone Number</li>
                <li>Service details (what you book)</li>
              </ul>

              <p className="text-sm font-sans text-muted mt-2">
                We only collect information that is necessary to provide our services.
              </p>
            </div>

            {/* 2 */}
            <div>
              <h2 className="font-heading text-lg font-semibold text-text mb-2">
                2. How We Use Your Information
              </h2>

              <ul className="list-disc pl-5 text-sm font-sans text-muted space-y-1">
                <li>Process your service bookings</li>
                <li>Connect you with service professionals</li>
                <li>Communicate regarding your booking</li>
                <li>Improve our platform and services</li>
              </ul>
            </div>

            {/* 3 */}
            <div>
              <h2 className="font-heading text-lg font-semibold text-text mb-2">
                3. Data Protection
              </h2>

              <p className="text-sm text-muted font-sans leading-relaxed">
                We take reasonable steps to protect your data from unauthorized access or misuse.
                Your information is handled securely and responsibly.
              </p>
            </div>

            {/* 4 */}
            <div>
              <h2 className="font-heading text-lg font-semibold text-text mb-2">
                4. Sharing of Information
              </h2>

              <p className="text-sm text-muted font-sans mb-2">
                We do not sell or rent your personal data.
              </p>

              <ul className="list-disc pl-5 text-sm font-sans text-muted space-y-1">
                <li>Service professionals (to complete your booking)</li>
                <li>Internal team (for support and operations)</li>
              </ul>
            </div>

            {/* 5 */}
            <div>
              <h2 className="font-heading text-lg font-semibold text-text mb-2">
                5. Cookies & Tracking
              </h2>

              <p className="text-sm text-muted font-sans leading-relaxed">
                We may use basic cookies to improve user experience.
                (No advanced tracking or ads currently.)
              </p>
            </div>

            {/* 6 */}
            <div>
              <h2 className="font-heading text-lg font-semibold text-text mb-2">
                6. Your Rights
              </h2>

              <ul className="list-disc pl-5 text-sm font-sans text-muted space-y-1">
                <li>Request to update your information</li>
                <li>Request deletion of your data</li>
              </ul>

              <p className="text-sm text-muted font-sans mt-2">
                Contact us anytime for such requests.
              </p>
            </div>

            {/* 7 */}
            <div>
              <h2 className="font-heading text-lg font-semibold text-text mb-2">
                7. Changes to This Policy
              </h2>

              <p className="text-sm text-muted font-sans leading-relaxed">
                We may update this Privacy Policy from time to time.
                Updates will be posted on this page.
              </p>
            </div>

            {/* 8 */}
            <div>
              <h2 className="font-heading text-lg font-semibold text-text mb-2">
                8. Contact Us
              </h2>

              <p className="text-sm font-sans text-muted">
                If you have any questions, feel free to contact us:
              </p>

              <p className="text-sm font-sans text-primary mt-2 font-medium">
                 servicesfixnest@gmail.com
              </p>
            </div>

            {/* FOOT NOTE */}
            <div className="text-center  pt-4 border-t border-border">
              <p className="text-sm font-sans text-muted">
                Your trust matters to us ❤️
              </p>
            </div>

          </div>

        </div>

      </Container>

    </section>
  );
};

export default PrivacyPolicyPage;