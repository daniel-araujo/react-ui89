import React from "react"

import { Ui89Theme } from "../theme"
import "../style/typo.css"
import "../style/chosen-theme.css"

import "./Ui89TagBox.css"

export interface Ui89TagBoxProps {
  theme: Ui89Theme | keyof typeof Ui89Theme
  children: React.ReactNode
}

export function Ui89TagBox({ theme, children }: Ui89TagBoxProps) {
  return (
    <div
      className={`ui89-tag-box ui89-typo-special ui89-chosen-theme-${theme}`}
    >
      {children}
    </div>
  )
}
