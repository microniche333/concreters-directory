"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { getStates, getStateData } from "@/lib/data"

export function SearchBox() {
  const [searchTerm, setSearchTerm] = useState("")
  const [results, setResults] = useState<{ type: "state" | "city"; name: string; path: string }[]>([])
  const router = useRouter()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)

    if (term.length < 2) {
      setResults([])
      return
    }

    // Search for states and cities
    const searchResults: { type: "state" | "city"; name: string; path: string }[] = []

    // Search states
    const states = getStates()
    states.forEach((state) => {
      if (state.toLowerCase().includes(term.toLowerCase())) {
        searchResults.push({
          type: "state",
          name: state,
          path: `/${state.toLowerCase().replace(/\s+/g, "-")}`,
        })
      }

      // Search cities in this state
      const { cities } = getStateData(state)
      cities.forEach((city) => {
        if (city.toLowerCase().includes(term.toLowerCase())) {
          searchResults.push({
            type: "city",
            name: `${city}, ${state}`,
            path: `/${state.toLowerCase().replace(/\s+/g, "-")}/${city.toLowerCase().replace(/\s+/g, "-")}`,
          })
        }
      })
    })

    setResults(searchResults.slice(0, 5)) // Limit to 5 results
  }

  return (
    <div className="relative">
      <div className="flex">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for states or cities..."
            className="pl-10 h-12 pr-4"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <Button
          type="button"
          className="ml-2"
          onClick={() => {
            if (results.length > 0) {
              router.push(results[0].path)
            }
          }}
        >
          Search
        </Button>
      </div>

      {results.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg">
          {results.map((result, index) => (
            <div
              key={index}
              className="p-3 hover:bg-muted cursor-pointer border-b last:border-b-0"
              onClick={() => {
                router.push(result.path)
                setSearchTerm("")
                setResults([])
              }}
            >
              <div className="flex items-center">
                <div className="mr-2">
                  {result.type === "state" ? (
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-secondary"></div>
                  )}
                </div>
                <div>
                  <div className="font-medium">{result.name}</div>
                  <div className="text-xs text-muted-foreground">{result.type === "state" ? "State" : "City"}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

