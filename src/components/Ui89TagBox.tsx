import React from "react"

import { Ui89Theme } from "../theme"
import typoStyles from "../style/typo.module.css"
import chosenThemeStyles from "../style/chosen-theme.module.css"

import style from "./Ui89TagBox.module.css"

export interface Ui89TagBoxProps {
  theme: Ui89Theme | keyof typeof Ui89Theme
  children: React.ReactNode
}

export function Ui89TagBox({ theme, children }: Ui89TagBoxProps) {
  return (
    <div
      className={`${style.container} ${typoStyles.special} ${chosenThemeStyles[theme]}`}
    >
      {children}
    </div>
  )
}
