import fs from "fs"
import path from "path"
import { parse } from "csv-parse/sync"
import * as XLSX from "xlsx"

type Concreter = {
  businessName: string
  address: string
  city: string
  zipCode: string
  state: string
  website: string
  phone: string
  ratings: string
}

export function parseDataFile(filePath: string): Concreter[] {
  const fileExtension = path.extname(filePath).toLowerCase()

  if (fileExtension === ".csv") {
    return parseCSV(filePath)
  } else if (fileExtension === ".xlsx") {
    return parseXLSX(filePath)
  } else {
    throw new Error("Unsupported file format. Please provide a CSV or XLSX file.")
  }
}

function parseCSV(filePath: string): Concreter[] {
  const fileContent = fs.readFileSync(filePath, "utf8")
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  })

  return normalizeData(records)
}

function parseXLSX(filePath: string): Concreter[] {
  const workbook = XLSX.readFile(filePath)
  const sheetName = workbook.SheetNames[0]
  const worksheet = workbook.Sheets[sheetName]
  const records = XLSX.utils.sheet_to_json(worksheet)

  return normalizeData(records)
}

function normalizeData(records: any[]): Concreter[] {
  return records.map((record) => ({
    businessName: record["Business Name"] || "",
    address: record["Address"] || "",
    city: record["City"] || "",
    zipCode: record["Zip Code"] || "",
    state: record["State"] || "",
    website: record["Website"] || "",
    phone: record["Phone"] || "",
    ratings: record["Ratings"] || "",
  }))
}

