import React from "react"

import style from "./Ui89Hr.module.css"
import { Ui89Theme } from "../theme"
import chosenThemeStyles from "../style/chosen-theme.module.css"

export enum Ui89HrLook {
  straight = "straight",
  dotted = "dotted",
  dashed = "dashed",
  double = "double",
}

export interface Ui89HrProps {
  look?: keyof typeof Ui89HrLook
  theme?: keyof typeof Ui89Theme
}

export function Ui89Hr({ look = "straight", theme }: Ui89HrProps) {
  return (
    <div
      className={`${style.hr} ${style[`hr--${look}`]} ${theme !== undefined ? style["hr--use-theme"] : ""} ${theme !== undefined ? chosenThemeStyles[theme] : ""}`}
    >
      <div className={style.hrDouble}></div>
    </div>
  )
}
