import fs from "fs"
import path from "path"
import { parseDataFile } from "./csv-parser"

type Concreter = {
  businessName: string
  address: string
  city: string
  zipCode: string
  state: string
  website: string
  phone: string
  ratings: string
  email?: string
}

// This is a cache to avoid parsing the file multiple times
let concretersData: Concreter[] | null = null

// Function to load data from CSV/XLSX file
function loadData(): Concreter[] {
  if (concretersData) {
    return concretersData
  }

  try {
    // Try to find the data file in the data directory
    const dataDir = path.join(process.cwd(), "data")

    // Check if the data directory exists
    if (!fs.existsSync(dataDir)) {
      console.warn("Data directory not found. Creating directory and using sample data.")
      try {
        fs.mkdirSync(dataDir, { recursive: true })
      } catch (err) {
        console.error("Failed to create data directory:", err)
      }
      return getSampleData()
    }

    const files = fs.readdirSync(dataDir)

    // Look for CSV or XLSX files
    const dataFile = files.find((file) => file.endsWith(".csv") || file.endsWith(".xlsx"))

    if (!dataFile) {
      console.warn("No CSV or XLSX file found in the data directory. Using sample data instead.")
      return getSampleData()
    }

    const filePath = path.join(dataDir, dataFile)
    concretersData = parseDataFile(filePath)
    return concretersData
  } catch (error) {
    console.error("Error loading data file:", error)
    return getSampleData()
  }
}

// Sample data to use if no CSV/XLSX file is found
function getSampleData(): Concreter[] {
  return [
    {
      businessName: "ABC Concrete Solutions",
      address: "123 Main St",
      city: "Sydney",
      zipCode: "2000",
      state: "New South Wales",
      website: "www.abcconcrete.com.au",
      phone: "0412345678",
      ratings: "4.5",
      email: "info@abcconcrete.com.au",
    },
    {
      businessName: "Sydney Concrete Experts",
      address: "456 Park Ave",
      city: "Sydney",
      zipCode: "2000",
      state: "New South Wales",
      website: "www.sydneyconcrete.com.au",
      phone: "0423456789",
      ratings: "4.8",
      email: "contact@sydneyconcrete.com.au",
    },
    {
      businessName: "Melbourne Concrete Co",
      address: "789 Collins St",
      city: "Melbourne",
      zipCode: "3000",
      state: "Victoria",
      website: "www.melbourneconcrete.com.au",
      phone: "0434567890",
      ratings: "4.7",
      email: "hello@melbourneconcrete.com.au",
    },
    {
      businessName: "Brisbane Concrete Services",
      address: "101 Queen St",
      city: "Brisbane",
      zipCode: "4000",
      state: "Queensland",
      website: "www.brisbaneconcrete.com.au",
      phone: "0445678901",
      ratings: "4.6",
      email: "info@brisbaneconcrete.com.au",
    },
  ]
}

export function getStates(): string[] {
  const data = loadData()
  const states = new Set<string>()
  data.forEach((concreter) => {
    if (concreter.state) {
      states.add(concreter.state)
    }
  })
  return Array.from(states)
}

export function getStateData(state: string) {
  const data = loadData()
  const cities = new Set<string>()
  data.forEach((concreter) => {
    if (concreter.state === state && concreter.city) {
      cities.add(concreter.city)
    }
  })
  return {
    cities: Array.from(cities),
  }
}

export function getCityData(state: string, city: string): Concreter[] {
  const data = loadData()
  return data.filter((concreter) => concreter.state === state && concreter.city === city)
}

