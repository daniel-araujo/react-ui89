import React, { useState } from "react"

import styles from "./Ui89ThemeBackground.module.css"
import chosenThemeStyles from "../style/chosen-theme.module.css"

import { Ui89Theme } from "../theme"

interface Ui89ButtonProps {
  theme?: Ui89Theme | string
  children: React.ReactNode
}

export function Ui89ThemeBackground({
  theme = Ui89Theme.primary,
  children,
}: Ui89ButtonProps) {
  return (
    <div className={`${styles.background} ${chosenThemeStyles[theme]}`}>
      {children}
    </div>
  )
}
