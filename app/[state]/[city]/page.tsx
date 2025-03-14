import type { Metadata } from "next"
import { Phone, Star, Globe, MapPin, Mail } from "lucide-react"
import { getCityData, getStateData, getStates } from "@/lib/data"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export async function generateMetadata({ params }: { params: { state: string; city: string } }): Promise<Metadata> {
  const stateFormatted = params.state.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  const cityFormatted = params.city.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())

  return {
    title: `Concreters ${cityFormatted}, ${stateFormatted}`,
    description: `Find the best concreters in ${cityFormatted}, ${stateFormatted}. View contact details, ratings, and more for concrete services in your area.`,
    openGraph: {
      title: `Concreters ${cityFormatted}, ${stateFormatted}`,
      description: `Find the best concreters in ${cityFormatted}, ${stateFormatted}. View contact details, ratings, and more for concrete services in your area.`,
      type: "website",
    },
    alternates: {
      canonical: `/${params.state}/${params.city}`,
    },
  }
}

export async function generateStaticParams() {
  const states = getStates()
  const paths: { state: string; city: string }[] = []

  for (const state of states) {
    const { cities } = getStateData(state)
    for (const city of cities) {
      paths.push({
        state: state.toLowerCase().replace(/\s+/g, "-"),
        city: city.toLowerCase().replace(/\s+/g, "-"),
      })
    }
  }

  return paths
}

export default function CityPage({ params }: { params: { state: string; city: string } }) {
  const stateFormatted = params.state.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  const cityFormatted = params.city.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())

  const concreters = getCityData(stateFormatted, cityFormatted)

  if (!concreters.length) {
    notFound()
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 z-0" />
        <div className="container relative z-10 px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center justify-center mb-2">
              <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                Home
              </Link>
              <span className="mx-2 text-muted-foreground">/</span>
              <Link href={`/${params.state}`} className="text-sm text-muted-foreground hover:text-primary">
                {stateFormatted}
              </Link>
              <span className="mx-2 text-muted-foreground">/</span>
              <span className="text-sm font-medium">{cityFormatted}</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
              Concreters {cityFormatted}, {stateFormatted}
            </h1>
            <p className="text-xl text-muted-foreground">
              Find the best concreters in {cityFormatted}. View contact details, ratings, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Listings Section */}
      <section className="container px-4 py-12">
        <div className="space-y-8">
          {concreters.map((concreter, index) => (
            <Card
              key={index}
              className={
                index === 0
                  ? "relative overflow-hidden border-0 shadow-lg"
                  : "border shadow-md hover:shadow-lg transition-shadow"
              }
            >
              {index === 0 && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 z-0" />
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground py-1.5 px-4 rounded-bl-lg font-semibold z-10">
                    Featured
                  </div>
                </>
              )}

              <div className={`relative ${index === 0 ? "z-10" : ""}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className={`text-2xl ${index === 0 ? "text-primary" : ""}`}>
                        {concreter.businessName || "N/A"}
                      </CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <MapPin size={16} className="mr-1 text-muted-foreground" />
                        {concreter.address || "N/A"}, {cityFormatted}, {stateFormatted} {concreter.zipCode || "N/A"}
                      </CardDescription>
                    </div>
                    {concreter.ratings && (
                      <div className="flex items-center bg-muted px-2 py-1 rounded-md">
                        <Star size={16} className="mr-1 text-yellow-500 fill-yellow-500" />
                        <span className="font-medium">{concreter.ratings}</span>
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      {concreter.website && (
                        <div className="flex items-center">
                          <Globe size={18} className="mr-2 text-primary" />
                          <a
                            href={
                              concreter.website.startsWith("http") ? concreter.website : `https://${concreter.website}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {concreter.website}
                          </a>
                        </div>
                      )}

                      {concreter.phone && (
                        <div className="flex items-center">
                          <Phone size={18} className="mr-2 text-primary" />
                          <span>{concreter.phone}</span>
                        </div>
                      )}

                      <div className="flex items-center">
                        <Mail size={18} className="mr-2 text-primary" />
                        <span>{concreter.email || "N/A"}</span>
                      </div>
                    </div>

                    <div className={`rounded-lg p-4 ${index === 0 ? "bg-primary/10" : "bg-muted"}`}>
                      <h3 className="font-semibold mb-2">Services</h3>
                      <ul className="grid grid-cols-2 gap-2">
                        <li className="flex items-center text-sm">
                          <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                          Concrete Driveways
                        </li>
                        <li className="flex items-center text-sm">
                          <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                          Concrete Patios
                        </li>
                        <li className="flex items-center text-sm">
                          <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                          Concrete Foundations
                        </li>
                        <li className="flex items-center text-sm">
                          <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                          Decorative Concrete
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className={`${index === 0 ? "border-t border-primary/20 pt-6" : ""}`}>
                  <Button
                    className={`w-full ${index === 0 ? "bg-primary hover:bg-primary/90" : ""}`}
                    size={index === 0 ? "lg" : "default"}
                    asChild
                  >
                    <a href={`tel:${concreter.phone}`} className="flex items-center justify-center gap-2">
                      <Phone size={16} />
                      <span>Call Now: {concreter.phone || "N/A"}</span>
                    </a>
                  </Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="bg-muted/60 py-16">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Concrete Services in {cityFormatted}</h2>
            <div className="prose prose-gray">
              <p className="text-muted-foreground">
                Looking for professional concrete services in {cityFormatted}, {stateFormatted}? Our directory features
                the most reliable and skilled concreters in your area. Contact these concrete contractors for quotes on
                your residential or commercial concrete projects.
              </p>
              <p className="text-muted-foreground mt-4">
                Whether you need a new driveway, patio, foundation, or any other concrete work, these professionals have
                the expertise to deliver high-quality results. Many offer free quotes and consultations to help you plan
                your project.
              </p>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: concreters.map((concreter, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "LocalBusiness",
                name: concreter.businessName || "Concreter",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: concreter.address || "",
                  addressLocality: cityFormatted,
                  addressRegion: stateFormatted,
                  postalCode: concreter.zipCode || "",
                  addressCountry: "AU",
                },
                telephone: concreter.phone || "",
                url: concreter.website || "",
                aggregateRating: concreter.ratings
                  ? {
                      "@type": "AggregateRating",
                      ratingValue: concreter.ratings,
                      bestRating: "5",
                      worstRating: "1",
                      ratingCount: "1",
                    }
                  : undefined,
              },
            })),
          }),
        }}
      />
    </>
  )
}

