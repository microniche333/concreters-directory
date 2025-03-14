import { getStates, getStateData } from "@/lib/data"
import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://your-domain.com" // Replace with your actual domain

  // Homepage
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ]

  // State pages
  const states = getStates()
  for (const state of states) {
    const stateSlug = state.toLowerCase().replace(/\s+/g, "-")
    routes.push({
      url: `${baseUrl}/${stateSlug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    })

    // City pages
    const { cities } = getStateData(state)
    for (const city of cities) {
      const citySlug = city.toLowerCase().replace(/\s+/g, "-")
      routes.push({
        url: `${baseUrl}/${stateSlug}/${citySlug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      })
    }
  }

  return routes
}

