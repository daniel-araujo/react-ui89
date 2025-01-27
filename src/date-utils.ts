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
    formattedDate = formattedDate.replace(key, value)
  }

  return formattedDate
}
