import React from "react"

import styles from "./Ui89TitleUnderline.module.css"
import typoStyles from "../style/typo.module.css"
import textStyles from "../style/text.module.css"

export interface Ui89TitleUnderlineProps {
  children: React.ReactNode
}

export function Ui89TitleUnderline({ children }: Ui89TitleUnderlineProps) {
  return (
    <div className={`${styles.container} ${typoStyles.special}`}>
      <div className={`${styles.inside} ${textStyles.singleLine}`}>
        {children}
      </div>
    </div>
  )
}
