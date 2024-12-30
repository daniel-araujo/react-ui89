import React, { useRef } from "react"

import typoStyles from "../style/typo.module.css"

import { TimeAnimation, TimeAnimationPropsChildrenProps } from "./TimeAnimation"

export function Ui89DigitalTimeClock() {
  const withColon = useRef(false)

  function render({ now }: TimeAnimationPropsChildrenProps) {
    withColon.current = !withColon.current

    const separator = withColon.current ? ":" : " "

    return (
      now.getHours().toString().padStart(2, "0") +
      separator +
      now.getMinutes().toString().padStart(2, "0") +
      separator +
      now.getSeconds().toString().padStart(2, "0")
    )
  }

  return (
    <span className={`${typoStyles.special}`}>
      <TimeAnimation>{render}</TimeAnimation>
    </span>
  )
}
