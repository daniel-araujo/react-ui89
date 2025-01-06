import React from "react"

import { Ui89Look } from "../theme"

import styles from "./Ui89Scene.module.css"
import lookStyles from "../style/look.module.css"
import typoStyles from "../style/typo.module.css"
import scrollbarStyles from "../style/scrollbar.module.css"

export interface Ui89SceneProps {
  look?: Ui89Look | string
  children: React.ReactNode
}

export function Ui89Scene({ look = Ui89Look.main, children }: Ui89SceneProps) {
  return (
    <div
      className={`${styles.scene} ${lookStyles[look]} ${typoStyles.normal} ${scrollbarStyles.container}`}
    >
      {children}
    </div>
  )
}
