import React from "react"
import styles from "./HoverShadow.module.css"

export default function HoverShadow({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <span className={styles.hoverShadow}>
      <span className={styles.hoverShadowBottom}></span>
      <span className={styles.hoverShadowRight}></span>
      {children}
    </span>
  )
}
