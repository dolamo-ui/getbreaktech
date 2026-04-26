import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Shield } from 'lucide-react'

const PrivacyPolicyPage: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        .legal-page { background: #f9f8f5; font-family: 'DM Sans', sans-serif; min-height: 100vh; padding: 60px 0 100px; }
        .legal-container { max-width: 760px; margin: 0 auto; padding: 0 28px; }
        .legal-back { display: inline-flex; align-items: center; gap: 6px; font-size: 0.82rem; color: #6b7280; text-decoration: none; margin-bottom: 32px; transition: color 0.2s; }
        .legal-back:hover { color: #111; }
        .legal-header { margin-bottom: 40px; }
        .legal-icon { width: 52px; height: 52px; border-radius: 14px; background: #dbeafe; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
        .legal-h1 { font-family: 'Instrument Serif', serif; font-size: 2.4rem; font-weight: 400; color: #111; margin-bottom: 10px; }
        .legal-updated { font-size: 0.82rem; color: #9ca3af; }
        .legal-card { background: #fff; border-radius: 16px; border: 1px solid #ebebeb; padding: 36px; }
        .legal-section { margin-bottom: 32px; }
        .legal-section:last-child { margin-bottom: 0; }
        .legal-h2 { font-size: 1.1rem; font-weight: 600; color: #111; margin-bottom: 12px; }
        .legal-p { font-size: 0.9rem; color: #374151; line-height: 1.8; font-weight: 300; margin-bottom: 12px; }
        .legal-p:last-child { margin-bottom: 0; }
        .legal-ul { list-style: disc; padding-left: 20px; }
        .legal-ul li { font-size: 0.9rem; color: #374151; line-height: 1.8; font-weight: 300; margin-bottom: 4px; }
        .legal-divider { border: none; border-top: 1px solid #f0f0f0; margin: 28px 0; }
        a.legal-link { color: #2563eb; text-decoration: none; }
        a.legal-link:hover { text-decoration: underline; }
      `}</style>

      <div className="legal-page">
        <div className="legal-container">
          <Link to="/" className="legal-back">
            <ArrowLeft size={14} /> Back to home
          </Link>

          <div className="legal-header">
            <div className="legal-icon">
              <Shield size={24} color="#2563eb" />
            </div>
            <h1 className="legal-h1">Privacy Policy</h1>
            <p className="legal-updated">Last updated: January 1, {currentYear}</p>
          </div>

          <div className="legal-card">

            <div className="legal-section">
              <p className="legal-p">
                CareerPathGuide ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website careerpathguide.com (the "Site").
              </p>
              <p className="legal-p">
                Please read this policy carefully. If you disagree with its terms, please discontinue use of the Site.
              </p>
            </div>

            <hr className="legal-divider" />

            <div className="legal-section">
              <h2 className="legal-h2">1. Information we collect</h2>
              <p className="legal-p">We may collect information about you in the following ways:</p>
              <p className="legal-p"><strong>Information you provide voluntarily:</strong> If you subscribe to our newsletter, we collect your email address. We do not collect payment information; all payments (if applicable) are handled by third-party processors.</p>
              <p className="legal-p"><strong>Automatically collected data:</strong> When you visit our Site, certain information is collected automatically, including your IP address, browser type, operating system, referring URLs, and pages viewed. This is standard data collected by most websites.</p>
              <p className="legal-p"><strong>Cookies and tracking technologies:</strong> We use cookies and similar tracking technologies to track activity on our Site and store certain information. See our Cookie section below for more detail.</p>
            </div>

            <hr className="legal-divider" />

            <div className="legal-section">
              <h2 className="legal-h2">2. How we use your information</h2>
              <p className="legal-p">We use the information we collect to:</p>
              <ul className="legal-ul">
                <li>Deliver the newsletter and career content you subscribed to</li>
                <li>Improve, operate, and maintain our Site</li>
                <li>Understand how visitors use the Site (analytics)</li>
                <li>Comply with legal obligations</li>
                <li>Respond to inquiries and support requests</li>
              </ul>
              <p className="legal-p">We do not sell your personal information to third parties.</p>
            </div>

            <hr className="legal-divider" />

            <div className="legal-section">
              <h2 className="legal-h2">3. Google AdSense and advertising</h2>
              <p className="legal-p">
                We use Google AdSense to display advertisements on our Site. Google AdSense uses cookies to serve ads based on your prior visits to our Site or other websites. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our Site and/or other sites on the Internet.
              </p>
              <p className="legal-p">
                You may opt out of personalised advertising by visiting <a className="legal-link" href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google's Ads Settings</a>. You can also opt out of a third-party vendor's use of cookies for personalised advertising by visiting <a className="legal-link" href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">www.aboutads.info</a>.
              </p>
              <p className="legal-p">
                Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites. These cookies allow Google and its partners to serve ads based on your visit to our site.
              </p>
            </div>

            <hr className="legal-divider" />

            <div className="legal-section">
              <h2 className="legal-h2">4. Cookies</h2>
              <p className="legal-p">
                Cookies are small data files stored on your device. We use cookies for the following purposes:
              </p>
              <ul className="legal-ul">
                <li><strong>Analytics:</strong> We use Google Analytics to understand how visitors use our Site. Google Analytics uses cookies to collect anonymous usage data.</li>
                <li><strong>Advertising:</strong> Google AdSense and other advertising partners use cookies to serve relevant ads.</li>
                <li><strong>Functionality:</strong> We may use cookies to remember your preferences (e.g. newsletter sign-up state).</li>
              </ul>
              <p className="legal-p">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Site.
              </p>
            </div>

            <hr className="legal-divider" />

            <div className="legal-section">
              <h2 className="legal-h2">5. Third-party services</h2>
              <p className="legal-p">Our Site may contain links to third-party websites. We are not responsible for the privacy practices of those sites. This policy applies only to information collected by CareerPathGuide.</p>
              <p className="legal-p">We may use the following third-party services:</p>
              <ul className="legal-ul">
                <li>Google Analytics (website analytics)</li>
                <li>Google AdSense (advertising)</li>
                <li>Email service provider (newsletter delivery)</li>
              </ul>
            </div>

            <hr className="legal-divider" />

            <div className="legal-section">
              <h2 className="legal-h2">6. Data retention</h2>
              <p className="legal-p">
                We retain your email address for as long as you are subscribed to our newsletter. You may unsubscribe at any time using the link in any newsletter email, and your address will be removed promptly.
              </p>
            </div>

            <hr className="legal-divider" />

            <div className="legal-section">
              <h2 className="legal-h2">7. Your rights</h2>
              <p className="legal-p">Depending on your location, you may have the following rights regarding your personal data:</p>
              <ul className="legal-ul">
                <li>The right to access the personal information we hold about you</li>
                <li>The right to request correction of inaccurate data</li>
                <li>The right to request deletion of your data</li>
                <li>The right to opt out of marketing communications</li>
                <li>The right to lodge a complaint with a supervisory authority</li>
              </ul>
              <p className="legal-p">To exercise any of these rights, contact us at <a className="legal-link" href="mailto:privacy@careerpathguide.com">privacy@careerpathguide.com</a>.</p>
            </div>

            <hr className="legal-divider" />

            <div className="legal-section">
              <h2 className="legal-h2">8. Children's privacy</h2>
              <p className="legal-p">
                Our Site is not directed to individuals under the age of 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately.
              </p>
            </div>

            <hr className="legal-divider" />

            <div className="legal-section">
              <h2 className="legal-h2">9. Changes to this policy</h2>
              <p className="legal-p">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically.
              </p>
            </div>

            <hr className="legal-divider" />

            <div className="legal-section">
              <h2 className="legal-h2">10. Contact us</h2>
              <p className="legal-p">
                If you have questions about this Privacy Policy, please contact us at:<br />
                <a className="legal-link" href="mailto:privacy@careerpathguide.com">privacy@careerpathguide.com</a>
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default PrivacyPolicyPage