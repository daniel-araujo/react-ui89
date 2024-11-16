import React from "react"
import styles from "./GridExpandTrick.module.css"

export default function GridExpandTrick({
  children,
}: {
  children: React.ReactNode
}) {
  return <span className={styles.gridExpandTrick}>{children}</span>
}
