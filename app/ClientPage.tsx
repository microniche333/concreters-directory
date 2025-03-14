"use client"

import Link from "next/link"
import { useState } from "react"
import { getStates } from "@/lib/data"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin } from "lucide-react"

export default function ClientPage() {
  const states = getStates()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredStates = states.filter((state) => state.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <>
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 z-0" />
        <div className="container relative z-10 px-4 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
              Welcome to Concreters Australia Directory
            </h1>
            <p className="text-xl text-muted-foreground">
              Find the best concreters across Australia. Browse by state and city to find concrete services near you.
            </p>

            {/* Search Box */}
            <div className="max-w-md mx-auto mt-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for a state..."
                  className="pl-10 h-12"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* States Section */}
      <section className="container px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Browse by State</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredStates.length > 0 ? (
            filteredStates.map((state) => (
              <Link
                href={`/${state.toLowerCase().replace(/\s+/g, "-")}`}
                key={state}
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 bg-background"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="p-6 flex items-center justify-between">
                  <div className="text-xl font-semibold group-hover:text-primary transition-colors">{state}</div>
                  <MapPin className="text-primary" />
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-muted-foreground">No states found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="bg-muted/60 py-16">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">About Concreters Australia Directory</h2>
            <div className="prose prose-gray">
              <p className="text-muted-foreground">
                Welcome to the most comprehensive directory of concrete services across Australia. Whether you need
                concrete driveways, patios, foundations, or any other concrete work, our directory helps you find
                reliable concreters in your area. Browse by state and city to find the perfect concrete contractor for
                your project.
              </p>
              <p className="text-muted-foreground mt-4">
                Our directory features businesses from all across Australia, providing you with contact information,
                ratings, and other essential details to help you make an informed decision for your concrete needs.
              </p>
            </div>
            <div className="mt-8">
              <Button asChild>
                <Link href="/about">Learn More About Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

