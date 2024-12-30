import React, { useRef } from "react"

import { Ui89Theme } from "../theme"
import chosenThemeStyles from "../style/chosen-theme.module.css"
import typoStyles from "../style/typo.module.css"

import { TimeAnimation, TimeAnimationPropsChildrenProps } from "./TimeAnimation"

export function Ui89DigitalTime({
  theme,
  block,
  children,
}: {
  theme: Ui89Theme | string
  block?: boolean
  children: React.ReactNode
}) {
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
    <span className={`${chosenThemeStyles[theme]} ${typoStyles.special}`}>
      <TimeAnimation>{render}</TimeAnimation>
    </span>
  )
}
