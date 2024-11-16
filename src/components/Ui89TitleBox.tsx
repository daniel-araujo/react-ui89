import React from "react"

import styles from "./Ui89TitleBox.module.css"
import typoStyles from "../style/typo.module.css"
import textStyles from "../style/text.module.css"

export function Ui89TitleBox({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${styles.container} ${typoStyles.special}`}>
      <div className={`${styles.inside} ${textStyles.singleLine}`}>
        {children}
      </div>
    </div>
  )
}
