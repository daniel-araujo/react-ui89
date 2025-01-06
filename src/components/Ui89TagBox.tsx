import React from "react"

import { Ui89Theme } from "../theme"
import typoStyles from "../style/typo.module.css"
import chosenThemeStyles from "../style/chosen-theme.module.css"

import style from "./Ui89TagBox.module.css"

export function Ui89TagBox({
  theme,
  children,
}: {
  theme: Ui89Theme | keyof typeof Ui89Theme
  children: React.ReactNode
}) {
  return (
    <div
      className={`${style.container} ${typoStyles.special} ${chosenThemeStyles[theme]}`}
    >
      {children}
    </div>
  )
}
