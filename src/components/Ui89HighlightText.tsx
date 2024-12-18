import React from "react"

import { Ui89Theme } from "../theme"
import chosenThemeStyles from "../style/chosen-theme.module.css"

import style from "./Ui89HighlightText.module.css"

export function Ui89HighlightText({
  theme,
  block,
  children,
}: {
  theme: Ui89Theme | string
  block?: boolean
  children: React.ReactNode
}) {
  return (
    <span
      className={`${style.container} ${chosenThemeStyles[theme]} ${block ? style["container--block"] : null}`}
    >
      {children}
    </span>
  )
}
