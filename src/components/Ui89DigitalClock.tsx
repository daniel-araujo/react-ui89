import React, { useRef } from "react"
import typoStyles from "../style/typo.module.css"
import { TimeAnimation, TimeAnimationPropsChildrenProps } from "./TimeAnimation"

export interface Ui89DigitalClockProps {
  format?: string // Custom format string
}

export function Ui89DigitalClock({
  format = "HH:mm:ss",
}: Ui89DigitalClockProps) {
  function render({ now }: TimeAnimationPropsChildrenProps) {
    const placeholders: Record<string, string> = {
      YYYY: now.getFullYear().toString(),
      MM: (now.getMonth() + 1).toString().padStart(2, "0"),
      DD: now.getDate().toString().padStart(2, "0"),
      HH: now.getHours().toString().padStart(2, "0"),
      mm: now.getMinutes().toString().padStart(2, "0"),
      ss: now.getSeconds().toString().padStart(2, "0"),
      hh: (now.getHours() % 12 || 12).toString().padStart(2, "0"),
      A: now.getHours() >= 12 ? "PM" : "AM",
    }

    // Replace placeholders in the format string
    let formattedDate = format
    for (const [key, value] of Object.entries(placeholders)) {
      formattedDate = formattedDate.replace(key, value)
    }

    return formattedDate
  }

  return (
    <span className={`${typoStyles.special}`}>
      <TimeAnimation>{render}</TimeAnimation>
    </span>
  )
}
