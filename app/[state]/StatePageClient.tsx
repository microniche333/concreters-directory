"use client"

import Link from "next/link"
import { useState } from "react"
import { getStateData } from "@/lib/data"
import { notFound } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Search, MapPin } from "lucide-react"

export default function StatePageClient({ params }: { params: { state: string } }) {
  const stateFormatted = params.state.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  const { cities } = getStateData(stateFormatted)
  const [searchTerm, setSearchTerm] = useState("")

  if (!cities.length) {
    notFound()
  }

  const filteredCities = cities.filter((city) => city.toLowerCase().includes(searchTerm.toLowerCase()))

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
              <span className="text-sm font-medium">{stateFormatted}</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
              Concreters {stateFormatted}, Australia
            </h1>
            <p className="text-xl text-muted-foreground">
              Find the best concreters in {stateFormatted}. Browse by city to find concrete services near you.
            </p>

            {/* Search Box */}
            <div className="max-w-md mx-auto mt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for a city..."
                  className="pl-10 h-12"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section className="container px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Cities in {stateFormatted}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => (
              <Link
                href={`/${params.state}/${city.toLowerCase().replace(/\s+/g, "-")}`}
                key={city}
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 bg-background"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="p-6 flex items-center justify-between">
                  <div className="text-xl font-semibold group-hover:text-primary transition-colors">{city}</div>
                  <MapPin className="text-primary" />
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-muted-foreground">No cities found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="bg-muted/60 py-16">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">About Concreters in {stateFormatted}</h2>
            <div className="prose prose-gray">
              <p className="text-muted-foreground">
                Looking for professional concrete services in {stateFormatted}? Our directory features the most reliable
                and skilled concreters across {stateFormatted}. Browse through cities to find concrete contractors who
                can help with your residential or commercial concrete projects.
              </p>
              <p className="text-muted-foreground mt-4">
                From driveways and patios to foundations and decorative concrete, the concreters in our directory offer
                a wide range of services to meet your needs. Contact them directly to discuss your project and get a
                quote.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

