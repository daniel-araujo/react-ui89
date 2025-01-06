import React from "react"

import { Ui89Theme } from "../theme"
import chosenThemeStyles from "../style/chosen-theme.module.css"

import style from "./Ui89HighlightText.module.css"

export interface Ui89HighlightTextProps {
  theme: Ui89Theme | keyof typeof Ui89Theme
  block?: boolean
  children: React.ReactNode
}

export function Ui89HighlightText({
  theme,
  block,
  children,
}: Ui89HighlightTextProps) {
  return (
    <span
      className={`${style.container} ${chosenThemeStyles[theme]} ${block ? style["container--block"] : null}`}
    >
      {children}
    </span>
  )
}
