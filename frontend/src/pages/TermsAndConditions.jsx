import React from 'react';
import Card from '../components/common/Card';

const TermsAndConditions = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Terms and Conditions</h1>
          <p className="mt-2 text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <Card className="prose prose-blue max-w-none p-8">
          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing and using our music distribution platform, you agree to be bound
            by these Terms and Conditions. If you disagree with any part of these terms,
            you may not access our service.
          </p>

          <h2>2. Music Distribution Services</h2>
          <p>
            Our platform provides digital music distribution services to various streaming
            platforms and online music stores. By using our service, you:
          </p>
          <ul>
            <li>Confirm you own or have rights to distribute the music</li>
            <li>Grant us permission to distribute your music</li>
            <li>Understand distribution times may vary by platform</li>
            <li>Accept platform-specific requirements and guidelines</li>
          </ul>

          <h2>3. Rights and Ownership</h2>
          <p>
            You retain all rights to your music. By using our service, you grant us a
            non-exclusive license to:
          </p>
          <ul>
            <li>Distribute your music to selected platforms</li>
            <li>Use your music metadata for distribution purposes</li>
            <li>Display your content for promotional purposes</li>
            <li>Collect and distribute royalties on your behalf</li>
          </ul>

          <h2>4. Content Guidelines</h2>
          <p>
            All content submitted must comply with our content guidelines. You agree not
            to submit content that:
          </p>
          <ul>
            <li>Infringes on intellectual property rights</li>
            <li>Contains explicit or inappropriate material without proper labeling</li>
            <li>Violates any applicable laws or regulations</li>
            <li>Contains malware or malicious code</li>
          </ul>

          <h2>5. Payment and Royalties</h2>
          <p>
            We operate on a revenue-share model where:
          </p>
          <ul>
            <li>You receive 100% of your earned royalties</li>
            <li>Payments are processed monthly with a 45-day delay</li>
            <li>Minimum payout threshold may apply</li>
            <li>Payment methods and currencies may vary by region</li>
          </ul>

          <h2>6. Account Management</h2>
          <p>
            You are responsible for:
          </p>
          <ul>
            <li>Maintaining accurate account information</li>
            <li>Keeping your login credentials secure</li>
            <li>All activity occurring under your account</li>
            <li>Notifying us of any unauthorized access</li>
          </ul>

          <h2>7. Service Modifications</h2>
          <p>
            We reserve the right to:
          </p>
          <ul>
            <li>Modify or discontinue services without notice</li>
            <li>Update these terms and conditions</li>
            <li>Adjust pricing and payment structures</li>
            <li>Add or remove distribution platforms</li>
          </ul>

          <h2>8. Termination</h2>
          <p>
            We may terminate or suspend your account if you:
          </p>
          <ul>
            <li>Violate these terms and conditions</li>
            <li>Engage in fraudulent activity</li>
            <li>Submit unauthorized content</li>
            <li>Abuse our services or platform</li>
          </ul>

          <h2>9. Limitation of Liability</h2>
          <p>
            We are not liable for:
          </p>
          <ul>
            <li>Platform-specific distribution delays</li>
            <li>Third-party service interruptions</li>
            <li>Lost or corrupted content</li>
            <li>Indirect or consequential damages</li>
          </ul>

          <h2>10. Contact Information</h2>
          <p>
            For questions about these terms, please contact us at:
          </p>
          <ul>
            <li>Email: legal@example.com</li>
            <li>Phone: 1-800-123-4567</li>
            <li>Address: 123 Music Street, Nashville, TN 37203</li>
          </ul>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              By using our service, you acknowledge that you have read and understood
              these terms and conditions and agree to be bound by them.
            </p>
          </div>
        </Card>

        <div className="mt-8 flex justify-center space-x-4">
          <a
            href="/privacy-policy"
            className="text-blue-600 hover:text-blue-800"
          >
            Privacy Policy
          </a>
          <span className="text-gray-300">|</span>
          <a
            href="/cookie-policy"
            className="text-blue-600 hover:text-blue-800"
          >
            Cookie Policy
          </a>
          <span className="text-gray-300">|</span>
          <a
            href="/contact"
            className="text-blue-600 hover:text-blue-800"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;