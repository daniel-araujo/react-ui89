import React from 'react'
import styles from './HoverShadow.module.css'

export default function HoverShadow({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <span className={styles.container}>
      <span className={styles.bottom}></span>
      <span className={styles.right}></span>
      {children}
    </span>
  )
}
