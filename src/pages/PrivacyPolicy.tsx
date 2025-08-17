import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link to="/#contact">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold mb-8 text-foreground">Privacy Policy</h1>
          
          <div className="space-y-6 text-muted-foreground">
            <div>
              <p><strong>Effective Date:</strong> [Insert Date]</p>
              <p><strong>Last Updated:</strong> [Insert Date]</p>
            </div>

            <p>
              Namespace Ecosystem India Private Limited ("NAMESPACE," "we," "our," or "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, share, and protect your data when you interact with our website (namespace.world), programs, events, hackathons, and services (collectively, the "Services").
            </p>

            <p>
              By using our Services, you agree to the practices described in this Privacy Policy.
            </p>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">1. Information We Collect</h2>
              <p>We may collect the following categories of information:</p>
              
              <h3 className="text-xl font-medium mt-6 mb-3 text-foreground">(a) Information You Provide to Us</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Contact Information:</strong> Name, email address, phone number, mailing address.</li>
                <li><strong>Professional Information:</strong> Organization, role, education details, skillsets.</li>
                <li><strong>Event Participation:</strong> Hackathon/project submissions, team details, portfolio links.</li>
                <li><strong>Payment Information:</strong> Billing name, account details, tax IDs, and other payment-related data (when applicable).</li>
                <li><strong>Communication Data:</strong> Feedback, inquiries, survey responses, or other communications.</li>
              </ul>

              <h3 className="text-xl font-medium mt-6 mb-3 text-foreground">(b) Information We Collect Automatically</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Log & Usage Data:</strong> IP address, browser type, operating system, device identifiers.</li>
                <li><strong>Cookies & Tracking Data:</strong> Session cookies, analytics cookies (e.g., Google Analytics, Meta Pixel).</li>
                <li><strong>Interactions:</strong> Pages viewed, referral links, time spent on site.</li>
              </ul>

              <h3 className="text-xl font-medium mt-6 mb-3 text-foreground">(c) Information from Third Parties</h3>
              <p>We may receive information from:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Social media integrations (e.g., LinkedIn, GitHub, Discord).</li>
                <li>Event registration platforms or partner organizations.</li>
                <li>Public databases and professional directories.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">2. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide and improve our Services.</li>
                <li>Register you for events, hackathons, and community programs.</li>
                <li>Process payments, invoices, and legal compliance obligations.</li>
                <li>Communicate updates, newsletters, marketing, and promotional campaigns.</li>
                <li>Maintain security, detect fraud, and enforce policies.</li>
                <li>Conduct analytics, reporting, and research for service optimization.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">3. Sharing of Information</h2>
              <p>We do not sell your personal information. However, we may share data:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>With Partners & Sponsors:</strong> For co-hosted events, mentorship, recruitment, or collaboration opportunities.</li>
                <li><strong>With Service Providers:</strong> Payment processors, hosting providers, analytics tools, communication platforms.</li>
                <li><strong>For Legal Compliance:</strong> Where required by law, regulation, or government requests.</li>
                <li><strong>During Business Transfers:</strong> In case of merger, acquisition, or corporate restructuring.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">4. Data Retention</h2>
              <p>We retain personal data for as long as necessary to fulfill the purposes outlined above, unless a longer retention period is required by law.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">5. Your Rights</h2>
              <p>Depending on your jurisdiction (e.g., GDPR in the EU, Indian IT Act, CCPA in California), you may have the following rights:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access, correction, or deletion of your personal information.</li>
                <li>Restrict or object to processing.</li>
                <li>Data portability.</li>
                <li>Opt-out of marketing communications.</li>
              </ul>
              <p>To exercise rights, contact us at privacy@namespace.world.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">6. Cookies Policy</h2>
              <p>We use cookies and similar technologies to enhance user experience. You may manage cookies through your browser settings, though disabling them may limit website functionality.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">7. Data Security</h2>
              <p>We implement reasonable organizational, technical, and administrative measures to protect personal data. However, no method of transmission or storage is 100% secure.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">8. International Transfers</h2>
              <p>As a global community, your data may be transferred outside your country. In such cases, we ensure adequate data protection mechanisms are in place.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">9. Third-Party Links</h2>
              <p>Our website may contain links to third-party websites. We are not responsible for their privacy practices.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">10. Updates to Privacy Policy</h2>
              <p>We may update this Privacy Policy from time to time. The revised version will be posted with the updated date.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">11. Contact Us</h2>
              <p>If you have any questions, please contact us at:</p>
              <div className="mt-4">
                <p><strong>Namespace Ecosystem India Private Limited</strong></p>
                <p><strong>Email:</strong> contact@namespacecomm.in</p>
                <p><strong>Registered Office:</strong> Haryana, India</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;