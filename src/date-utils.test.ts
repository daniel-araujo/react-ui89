import { dateParse } from "./date-utils"
import { describe, it, expect } from "vitest"

describe("dateParse", () => {
  it("parses YYYY-MM-DD", () => {
    const date = dateParse("2023-12-25", "YYYY-MM-DD")
    expect(date).not.toBeNull()
    expect(date?.getFullYear()).toBe(2023)
    expect(date?.getMonth()).toBe(11) // Dec is 11
    expect(date?.getDate()).toBe(25)
  })

  it("parses DD-MM-YYYY", () => {
    const date = dateParse("25-12-2023", "DD-MM-YYYY")
    expect(date).not.toBeNull()
    expect(date?.getFullYear()).toBe(2023)
    expect(date?.getMonth()).toBe(11)
    expect(date?.getDate()).toBe(25)
  })

  it("parses MM/DD/YYYY", () => {
    const date = dateParse("12/25/2023", "MM/DD/YYYY")
    expect(date).not.toBeNull()
    expect(date?.getFullYear()).toBe(2023)
    expect(date?.getMonth()).toBe(11)
    expect(date?.getDate()).toBe(25)
  })

  it("parses HH:mm:ss", () => {
    const date = dateParse("14:30:15", "HH:mm:ss")
    expect(date).not.toBeNull()
    expect(date?.getHours()).toBe(14)
    expect(date?.getMinutes()).toBe(30)
    expect(date?.getSeconds()).toBe(15)
  })

  it("parses hh:mm:ss A correctly (PM)", () => {
    const date = dateParse("02:30:15 PM", "hh:mm:ss A")
    expect(date).not.toBeNull()
    expect(date?.getHours()).toBe(14)
    expect(date?.getMinutes()).toBe(30)
    expect(date?.getSeconds()).toBe(15)
  })

  it("parses hh:mm:ss A correctly (AM)", () => {
    const date = dateParse("02:30:15 AM", "hh:mm:ss A")
    expect(date).not.toBeNull()
    expect(date?.getHours()).toBe(2)
    expect(date?.getMinutes()).toBe(30)
    expect(date?.getSeconds()).toBe(15)
  })

  it("parses 12 AM", () => {
    const date = dateParse("12:00:00 AM", "hh:mm:ss A")
    expect(date).not.toBeNull()
    expect(date?.getHours()).toBe(0)
  })

  it("parses 12 PM", () => {
    const date = dateParse("12:00:00 PM", "hh:mm:ss A")
    expect(date).not.toBeNull()
    expect(date?.getHours()).toBe(12)
  })

  it("returns null for invalid month", () => {
    expect(dateParse("2023-13-01", "YYYY-MM-DD")).toBeNull()
    expect(dateParse("2023-00-01", "YYYY-MM-DD")).toBeNull()
  })

  it("returns null for invalid day", () => {
    expect(dateParse("2023-02-30", "YYYY-MM-DD")).toBeNull()
    expect(dateParse("2023-02-00", "YYYY-MM-DD")).toBeNull()
  })

  it("returns null for invalid hour", () => {
    expect(dateParse("24:00:00", "HH:mm:ss")).toBeNull()
  })

  it("returns null for invalid minute", () => {
    expect(dateParse("23:60:00", "HH:mm:ss")).toBeNull()
  })

  it("returns null for invalid second", () => {
    expect(dateParse("23:59:60", "HH:mm:ss")).toBeNull()
  })

  it("returns null for format mismatch", () => {
    expect(dateParse("2023/12/25", "YYYY-MM-DD")).toBeNull()
  })

  it("handles leap year", () => {
    const date = dateParse("2024-02-29", "YYYY-MM-DD")
    expect(date).not.toBeNull()
    expect(date?.getDate()).toBe(29)
  })

  it("returns null for non-leap year 29th Feb", () => {
    expect(dateParse("2023-02-29", "YYYY-MM-DD")).toBeNull()
  })

  it("parses with extra text in format", () => {
    const date = dateParse("Date: 2023-12-25", "Date: YYYY-MM-DD")
    expect(date).not.toBeNull()
    expect(date?.getFullYear()).toBe(2023)
    expect(date?.getMonth()).toBe(11)
    expect(date?.getDate()).toBe(25)
  })
})
