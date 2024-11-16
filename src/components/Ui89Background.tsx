import React from "react"

import { Ui89Look } from "../theme"

import styles from "./Ui89Background.module.css"
import lookStyles from "../style/look.module.css"
import typoStyles from "../style/typo.module.css"

export function Ui89Background({
  look = Ui89Look.main,
  children,
}: {
  look?: Ui89Look | string
  children: React.ReactNode
}) {
  return (
    <div
      className={`${styles.container} ${lookStyles[look]} ${typoStyles.normal}`}
    >
      {children}
    </div>
  )
}
