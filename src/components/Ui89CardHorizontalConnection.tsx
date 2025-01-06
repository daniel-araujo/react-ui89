import React from "react"
import styles from "./Ui89Card.module.css"

export interface Ui89CardHorizontalConnectionProps {
  children: React.ReactNode
  overflow?: boolean
}

export function Ui89CardHorizontalConnection({
  children,
  overflow,
}: Ui89CardHorizontalConnectionProps) {
  return (
    <div
      className={`${styles.cardHorizontalConnection} ${overflow ? styles["cardHorizontalConnection--overflow"] : ""}`}
    >
      {children}
    </div>
  )
}
