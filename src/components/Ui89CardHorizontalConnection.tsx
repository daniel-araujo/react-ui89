import React from "react"
import styles from "./Ui89Card.module.css"

export function Ui89CardHorizontalConnection({
  children,
  overflow,
}: {
  children: React.ReactNode
  overflow?: boolean
}) {
  return (
    <div
      className={`${styles.cardHorizontalConnection} ${overflow ? styles["cardHorizontalConnection--overflow"] : ""}`}
    >
      {children}
    </div>
  )
}
