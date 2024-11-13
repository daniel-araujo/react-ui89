import React from 'react'
import styles from './Ui89Card.module.css'

export function Ui89Card({
  topLeftCenter,
  topCenter,
  children,
}: {
  topLeftCenter?: React.ReactNode
  topCenter?: React.ReactNode
  children: React.ReactNode
}) {
  const hasTopContent = topLeftCenter || topCenter

  return (
    <div
      className={`${styles.container} ${hasTopContent ? styles.containerHasTop : ''}`}>
      <div className={styles.inside}>
        {topLeftCenter && (
          <div className={styles.topLeftCenter}>{topLeftCenter}</div>
        )}
        {topCenter && <div className={styles.topCenter}>{topCenter}</div>}

        {hasTopContent && <div className="space-vertical-1"></div>}

        {children}

        {hasTopContent && <div className="space-vertical-1"></div>}
      </div>
    </div>
  )
}
