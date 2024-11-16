import React from "react"
import styles from "./ScrollContainer.module.css"

export default function ScrollContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return <span className={styles.scrollContainer}>{children}</span>
}
