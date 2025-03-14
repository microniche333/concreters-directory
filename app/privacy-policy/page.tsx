import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Concreters Australia Directory",
  description:
    "Privacy Policy for Concreters Australia Directory. Learn how we collect, use, and protect your personal information.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Privacy Policy</h1>

      <div className="max-w-3xl mx-auto space-y-6">
        <p>Last updated: {new Date().toLocaleDateString()}</p>

        <h2 className="text-2xl font-bold mt-8">Introduction</h2>
        <p>
          At Concreters Australia Directory, we respect your privacy and are committed to protecting your personal data.
          This privacy policy will inform you about how we look after your personal data when you visit our website and
          tell you about your privacy rights and how the law protects you.
        </p>

        <h2 className="text-2xl font-bold mt-8">The Data We Collect</h2>
        <p>
          We may collect, use, store and transfer different kinds of personal data about you which we have grouped
          together as follows:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>Identity Data includes first name, last name, username or similar identifier.</li>
          <li>Contact Data includes email address and telephone numbers.</li>
          <li>
            Technical Data includes internet protocol (IP) address, browser type and version, time zone setting and
            location, browser plug-in types and versions, operating system and platform, and other technology on the
            devices you use to access this website.
          </li>
          <li>Usage Data includes information about how you use our website.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8">How We Use Your Data</h2>
        <p>
          We will only use your personal data when the law allows us to. Most commonly, we will use your personal data
          in the following circumstances:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>To provide you with the information you request from us.</li>
          <li>To improve our website and services.</li>
          <li>To administer and protect our business and this website.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8">Data Security</h2>
        <p>
          We have put in place appropriate security measures to prevent your personal data from being accidentally lost,
          used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal
          data to those employees, agents, contractors, and other third parties who have a business need to know.
        </p>

        <h2 className="text-2xl font-bold mt-8">Your Legal Rights</h2>
        <p>
          Under certain circumstances, you have rights under data protection laws in relation to your personal data,
          including the right to request access, correction, erasure, restriction, transfer, to object to processing, to
          portability of data and (where the lawful ground of processing is consent) to withdraw consent.
        </p>

        <h2 className="text-2xl font-bold mt-8">Contact Us</h2>
        <p>If you have any questions about this privacy policy or our privacy practices, please contact us at:</p>
        <p className="mt-4">
          Email: privacy@concretersaustralia.com
          <br />
          Phone: 1800 CONCRETE
          <br />
          Address: 123 Concrete Way, Sydney, NSW 2000, Australia
        </p>
      </div>
    </div>
  )
}

