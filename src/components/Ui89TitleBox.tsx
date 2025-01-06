import React from "react"

import styles from "./Ui89TitleBox.module.css"
import typoStyles from "../style/typo.module.css"
import textStyles from "../style/text.module.css"

export interface Ui89TitleBoxProps {
  children: React.ReactNode
}

export function Ui89TitleBox({ children }: Ui89TitleBoxProps) {
  return (
    <div className={`${styles.container} ${typoStyles.special}`}>
      <div className={`${styles.inside} ${textStyles.singleLine}`}>
        {children}
      </div>
    </div>
  )
}
