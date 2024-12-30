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
