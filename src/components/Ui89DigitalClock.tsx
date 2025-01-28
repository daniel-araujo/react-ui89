import React, { useRef } from "react"
import "../style/typo.css"
import { TimeAnimation, TimeAnimationPropsChildrenProps } from "./TimeAnimation"
import { dateFormat } from "../date-utils"

export interface Ui89DigitalClockProps {
  format?: string // Custom format string
}

export function Ui89DigitalClock({
  format = "HH:mm:ss",
}: Ui89DigitalClockProps) {
  function render({ now }: TimeAnimationPropsChildrenProps) {
    return dateFormat(now, format)
  }

  return (
    <span className="ui89-typo-special">
      <TimeAnimation>{render}</TimeAnimation>
    </span>
  )
}
