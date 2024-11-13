import React from "react"

import { Ui89Look } from "../theme"

import style from "./Ui89Background.module.css"
import lookStyle from "../style/look.module.css"

export function Ui89Background({
  look,
  children,
}: {
  look: Ui89Look | string
  children: React.ReactNode
}) {
  return (
    <div className={`${style.container} ${lookStyle[look]}`}>{children}</div>
  )
}
