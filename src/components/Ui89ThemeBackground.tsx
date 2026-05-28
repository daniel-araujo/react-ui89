import React, { useState } from "react"

import "./Ui89ThemeBackground.css"
import "../style/theme.css"

import { Ui89Palette, Ui89Theme } from "../theme"

export interface Ui89ThemeBackgroundProps {
  theme?:
    | Ui89Theme
    | keyof typeof Ui89Theme
    | Ui89Palette
    | keyof typeof Ui89Palette
  children: React.ReactNode
}

export function Ui89ThemeBackground({
  theme = Ui89Theme.primary,
  children,
}: Ui89ThemeBackgroundProps) {
  return (
    <div className={`ui89-theme-background ui89-theme-${theme}`}>
      {children}
    </div>
  )
}
