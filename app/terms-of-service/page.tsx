import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | Concreters Australia Directory",
  description:
    "Terms of Service for Concreters Australia Directory. Please read these terms carefully before using our website.",
}

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Terms of Service</h1>

      <div className="max-w-3xl mx-auto space-y-6">
        <p>Last updated: {new Date().toLocaleDateString()}</p>

        <h2 className="text-2xl font-bold mt-8">Introduction</h2>
        <p>
          These terms and conditions outline the rules and regulations for the use of Concreters Australia Directory's
          Website. By accessing this website, we assume you accept these terms and conditions. Do not continue to use
          Concreters Australia Directory if you do not agree to take all of the terms and conditions stated on this
          page.
        </p>

        <h2 className="text-2xl font-bold mt-8">License</h2>
        <p>
          Unless otherwise stated, Concreters Australia Directory and/or its licensors own the intellectual property
          rights for all material on Concreters Australia Directory. All intellectual property rights are reserved. You
          may access this from Concreters Australia Directory for your own personal use subjected to restrictions set in
          these terms and conditions.
        </p>

        <h3 className="text-xl font-semibold mt-6">You must not:</h3>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>Republish material from Concreters Australia Directory</li>
          <li>Sell, rent or sub-license material from Concreters Australia Directory</li>
          <li>Reproduce, duplicate or copy material from Concreters Australia Directory</li>
          <li>Redistribute content from Concreters Australia Directory</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8">User Comments</h2>
        <p>
          Parts of this website offer an opportunity for users to post and exchange opinions and information. Concreters
          Australia Directory does not filter, edit, publish or review Comments prior to their presence on the website.
          Comments do not reflect the views and opinions of Concreters Australia Directory, its agents and/or
          affiliates.
        </p>

        <h2 className="text-2xl font-bold mt-8">Disclaimer</h2>
        <p>
          To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions
          relating to our website and the use of this website. Nothing in this disclaimer will:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>Limit or exclude our or your liability for death or personal injury</li>
          <li>Limit or exclude our or your liability for fraud or fraudulent misrepresentation</li>
          <li>Limit any of our or your liabilities in any way that is not permitted under applicable law</li>
          <li>Exclude any of our or your liabilities that may not be excluded under applicable law</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8">Contact Us</h2>
        <p>If you have any questions about these Terms of Service, please contact us at:</p>
        <p className="mt-4">
          Email: legal@concretersaustralia.com
          <br />
          Phone: 1800 CONCRETE
          <br />
          Address: 123 Concrete Way, Sydney, NSW 2000, Australia
        </p>
      </div>
    </div>
  )
}

