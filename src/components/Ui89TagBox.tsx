import React from "react"

import { Ui89Palette, Ui89Theme } from "../theme"
import "../style/typo.css"
import "../style/theme.css"

import "./Ui89TagBox.css"

export enum Ui89TagBoxPropsVariant {
  solid = "solid",
  outline = "outline",
  ghost = "ghost",
  soft = "soft",
  dot = "dot",
  gradient = "gradient",
  underline = "underline",
}

export interface Ui89TagBoxProps {
  theme:
    | Ui89Theme
    | keyof typeof Ui89Theme
    | Ui89Palette
    | keyof typeof Ui89Palette
  variant?: Ui89TagBoxPropsVariant | keyof typeof Ui89TagBoxPropsVariant
  children: React.ReactNode
}

export function Ui89TagBox({
  theme,
  variant = "solid",
  children,
}: Ui89TagBoxProps) {
  return (
    <div
      className={`ui89-tag-box ui89-tag-box--variant-${variant} ui89-typo-special ui89-theme-${theme}`}
    >
      {children}
    </div>
  )
}
