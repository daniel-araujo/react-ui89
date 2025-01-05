import React from "react"

import style from "./Ui89Hr.module.css"

export enum Ui89HrLook {
  straight = "straight",
  dotted = "dotted",
  dashed = "dashed",
  double = "double",
}

export interface Ui89HrProps {
  look?: keyof typeof Ui89HrLook
}

export function Ui89Hr({ look = "straight" }: Ui89HrProps) {
  return (
    <div className={`${style.hr} ${style[`hr--${look}`]}`}>
      <div className={style.hrDouble}></div>
    </div>
  )
}
