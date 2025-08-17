import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const TermsOfUse = () => {
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
          <h1 className="text-4xl font-bold mb-8 text-foreground">Terms of Use</h1>
          
          <div className="space-y-6 text-muted-foreground">
            <div>
              <p><strong>Effective Date:</strong> [Insert Date]</p>
              <p><strong>Last Updated:</strong> [Insert Date]</p>
            </div>

            <p>
              Welcome to the website of Namespace Ecosystem India Private Limited ("NAMESPACE," "we," "our," or "us"). By accessing or using our website (namespace.world) and Services, you ("User," "you") agree to comply with and be bound by the following Terms of Use.
            </p>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">1. Eligibility</h2>
              <p>By using our Services, you confirm that:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You are at least 18 years old or have obtained parental/guardian consent if under 18.</li>
                <li>You have the legal capacity to enter into this agreement.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">2. Use of Services</h2>
              <p>You agree to use our Services only for lawful purposes and not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Engage in unauthorized access, hacking, or disruption of systems.</li>
                <li>Post, transmit, or distribute harmful, defamatory, or unlawful content.</li>
                <li>Infringe upon intellectual property or proprietary rights.</li>
                <li>Misuse Services for spam, fraud, or malicious activity.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">3. Intellectual Property</h2>
              <p>
                All content, trademarks, logos, event names (e.g., HACKHAZARDS), programs, and designs on this site are the property of Namespace Ecosystem India Private Limited or its licensors.
              </p>
              <p>
                Users retain ownership of content they submit (e.g., hackathon projects) but grant NAMESPACE a worldwide, royalty-free, non-exclusive license to display, promote, and share such submissions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">4. Event & Program Participation</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Participation in hackathons, workshops, or community programs is subject to additional rules provided at the time of registration.</li>
                <li>We may feature or publish participant submissions (with credit attribution) for promotional or community purposes.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">5. Payments & Refunds</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Payments made for event registrations, sponsorships, or services are governed by the terms mentioned at the point of transaction.</li>
                <li>Unless otherwise specified, all payments are non-refundable.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">6. Disclaimers</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Services are provided on an "as-is" basis without warranties of any kind.</li>
                <li>NAMESPACE does not guarantee uninterrupted, error-free access or specific outcomes from event participation.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">7. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Namespace Ecosystem India Private Limited shall not be liable for any indirect, incidental, special, or consequential damages arising from use of our Services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">8. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless Namespace Ecosystem India Private Limited, its directors, employees, and affiliates from any claims, damages, or liabilities arising out of your use of Services or violation of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">9. Termination</h2>
              <p>
                We reserve the right to suspend or terminate your access to Services at our sole discretion, without prior notice, for any violation of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">10. Governing Law & Jurisdiction</h2>
              <p>
                These Terms are governed by and construed under the laws of India. Courts in New Delhi, India shall have exclusive jurisdiction over disputes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">11. Changes to Terms</h2>
              <p>
                We may update these Terms periodically. Continued use of the Services after changes implies acceptance of the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">12. Contact Us</h2>
              <p>For any queries regarding these Terms, please contact:</p>
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

export default TermsOfUse;