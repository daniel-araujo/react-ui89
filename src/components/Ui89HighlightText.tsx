import React from "react"

import { Ui89Theme } from "../theme"
import "../style/chosen-theme.css"

import "./Ui89HighlightText.css"

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
      className={`ui89-highlight-text ui89-chosen-theme-${theme} ${block ? "ui89-highlight-text--block" : null}`}
    >
      {children}
    </span>
  )
}
