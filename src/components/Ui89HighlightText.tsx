import React from "react"

import { Ui89Palette, Ui89Theme } from "../theme"
import "../style/theme.css"

import "./Ui89HighlightText.css"

export interface Ui89HighlightTextProps {
  theme:
    | Ui89Theme
    | keyof typeof Ui89Theme
    | Ui89Palette
    | keyof typeof Ui89Palette
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
      className={`ui89-highlight-text ui89-theme-${theme} ${block ? "ui89-highlight-text--block" : null}`}
    >
      {children}
    </span>
  )
}
