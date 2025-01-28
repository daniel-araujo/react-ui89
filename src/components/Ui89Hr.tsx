import React from "react"

import "./Ui89Hr.css"
import { Ui89Theme } from "../theme"
import "../style/chosen-theme.css"

export enum Ui89HrPropsLook {
  straight = "straight",
  dotted = "dotted",
  dashed = "dashed",
  double = "double",
}

export interface Ui89HrProps {
  look?: Ui89HrPropsLook | keyof typeof Ui89HrPropsLook
  theme?: Ui89Theme | keyof typeof Ui89Theme
}

export function Ui89Hr({ look = "straight", theme }: Ui89HrProps) {
  return (
    <div
      className={`ui-89-hr ${`ui-89-hr--${look}`} ${theme !== undefined ? "ui-89-hr--use-theme" : ""} ${theme !== undefined ? `ui89-chosen-theme-${theme}` : ""}`}
    >
      <div className="ui-89-hr__double"></div>
    </div>
  )
}
