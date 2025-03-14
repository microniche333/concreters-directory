import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Concreters Australia Directory",
  description:
    "Learn about the Concreters Australia Directory, the most comprehensive resource for finding concrete services across Australia.",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">About Concreters Australia Directory</h1>

      <div className="max-w-3xl mx-auto space-y-6">
        <p>
          Welcome to Concreters Australia Directory, the most comprehensive resource for finding concrete services
          across Australia. Our mission is to connect homeowners and businesses with reliable, skilled concrete
          contractors in their local area.
        </p>

        <h2 className="text-2xl font-bold mt-8">Our Purpose</h2>
        <p>
          Finding the right concreter for your project can be challenging. Our directory simplifies this process by
          providing a centralized database of concrete contractors organized by state and city. We aim to help you make
          informed decisions by providing contact information, ratings, and other essential details about concrete
          services in your area.
        </p>

        <h2 className="text-2xl font-bold mt-8">How It Works</h2>
        <p>
          Our directory is organized geographically, allowing you to browse concreters by state and city. Simply
          navigate to your location to find a list of concrete contractors serving your area. Each listing includes the
          business name, address, contact information, and ratings when available.
        </p>

        <h2 className="text-2xl font-bold mt-8">For Concrete Contractors</h2>
        <p>
          If you're a concrete contractor and would like to be listed in our directory, please contact us. We're always
          looking to expand our database to provide the most comprehensive resource for concrete services across
          Australia.
        </p>

        <h2 className="text-2xl font-bold mt-8">Contact Us</h2>
        <p>
          Have questions or feedback? We'd love to hear from you. Please visit our Contact page to get in touch with our
          team.
        </p>
      </div>
    </div>
  )
}

