import { getStates } from "@/lib/data"
import StatePageClient from "./StatePageClient"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: { state: string } }): Promise<Metadata> {
  const stateFormatted = params.state.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())

  return {
    title: `Concreters ${stateFormatted}, Australia`,
    description: `Find the best concreters in ${stateFormatted}, Australia. Browse by city to find concrete services near you.`,
    openGraph: {
      title: `Concreters ${stateFormatted}, Australia`,
      description: `Find the best concreters in ${stateFormatted}, Australia. Browse by city to find concrete services near you.`,
      type: "website",
    },
    alternates: {
      canonical: `/${params.state}`,
    },
  }
}

export async function generateStaticParams() {
  const states = getStates()
  return states.map((state) => ({
    state: state.toLowerCase().replace(/\s+/g, "-"),
  }))
}

export default function StatePage({ params }: { params: { state: string } }) {
  return <StatePageClient params={params} />
}

