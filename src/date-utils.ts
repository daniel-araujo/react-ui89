export interface DateComponents {
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
  day: number
  month: number
  year: number
}

function dateComponents(date: Date): DateComponents {
  return {
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    milliseconds: date.getMilliseconds(),
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  }
}

export function dateFormat(date: Date, format: string) {
  const placeholders: Record<string, string> = {
    YYYY: date.getFullYear().toString(),
    MM: (date.getMonth() + 1).toString().padStart(2, "0"),
    DD: date.getDate().toString().padStart(2, "0"),
    HH: date.getHours().toString().padStart(2, "0"),
    mm: date.getMinutes().toString().padStart(2, "0"),
    ss: date.getSeconds().toString().padStart(2, "0"),
    hh: (date.getHours() % 12 || 12).toString().padStart(2, "0"),
    A: date.getHours() >= 12 ? "PM" : "AM",
  }

  // Replace placeholders in the format string
  let formattedDate = format
  for (const [key, value] of Object.entries(placeholders)) {
    formattedDate = formattedDate.replace(new RegExp(key, "g"), value)
  }

  return formattedDate
}

export function dateParse(dateStr: string, format: string): Date | null {
  const placeholderRegex: Record<string, string> = {
    YYYY: "(\\d{4})",
    MM: "(\\d{2})",
    DD: "(\\d{2})",
    HH: "(\\d{2})",
    mm: "(\\d{2})",
    ss: "(\\d{2})",
    hh: "(\\d{2})",
    A: "(AM|PM)",
  }
  const placeholderKeys = Object.keys(placeholderRegex).sort(
    (a, b) => b.length - a.length,
  )

  let regexPattern = "^"
  const partTypes: string[] = []
  let i = 0
  while (i < format.length) {
    let found = false
    for (const key of placeholderKeys) {
      if (format.startsWith(key, i)) {
        regexPattern += placeholderRegex[key]
        partTypes.push(key)
        i += key.length
        found = true
        break
      }
    }
    if (!found) {
      const char = format[i]
      regexPattern += char.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")
      i++
    }
  }
  regexPattern += "$"

  const regex = new RegExp(regexPattern)
  const match = dateStr.match(regex)

  if (!match) {
    return null
  }

  const now = new Date()
  const parts = {
    year: now.getFullYear(),
    month: now.getMonth(),
    day: now.getDate(),
    hours: 0,
    minutes: 0,
    seconds: 0,
  }

  let ampm: "AM" | "PM" | undefined
  const parsedFields: Set<string> = new Set()

  for (let j = 1; j < match.length; j++) {
    const type = partTypes[j - 1]
    const value = match[j]
    parsedFields.add(type)

    if (type === "YYYY") parts.year = parseInt(value, 10)
    else if (type === "MM") parts.month = parseInt(value, 10) - 1
    else if (type === "DD") parts.day = parseInt(value, 10)
    else if (type === "HH") parts.hours = parseInt(value, 10)
    else if (type === "mm") parts.minutes = parseInt(value, 10)
    else if (type === "ss") parts.seconds = parseInt(value, 10)
    else if (type === "hh") parts.hours = parseInt(value, 10)
    else if (type === "A") ampm = value as "AM" | "PM"
  }

  if (ampm) {
    let hours = parts.hours
    if (ampm === "PM" && hours < 12) {
      hours += 12
    }
    if (ampm === "AM" && hours === 12) {
      // 12 AM is 00 hours
      hours = 0
    }
    parts.hours = hours
  }

  const date = new Date(
    parts.year,
    parts.month,
    parts.day,
    parts.hours,
    parts.minutes,
    parts.seconds,
  )

  // Validate date by checking if components overflowed for parsed fields
  if (parsedFields.has("YYYY") && date.getFullYear() !== parts.year) return null
  if (parsedFields.has("MM") && date.getMonth() !== parts.month) return null
  if (parsedFields.has("DD") && date.getDate() !== parts.day) return null
  if (
    (parsedFields.has("HH") || parsedFields.has("hh")) &&
    date.getHours() !== parts.hours
  )
    return null
  if (parsedFields.has("mm") && date.getMinutes() !== parts.minutes) return null
  if (parsedFields.has("ss") && date.getSeconds() !== parts.seconds) return null

  return date
}
