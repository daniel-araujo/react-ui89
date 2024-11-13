import React from 'react'

import iconShortcut from '../images/shortcut.svg'

import styles from './Ui89Shortcut.module.css'
import typoStyles from "../style/typo.module.css"

export function Ui89Shortcut({
  imageUrl,
  label,
  onClick = () => {},
}: {
  imageUrl: string
  label: string
  onClick?: () => void
}) {
  function onNativeClick() {
    onClick()
  }

  return (
    <div className={styles.container}>
      <img className={styles.image} src={imageUrl} onClick={onNativeClick} />

      <img className={styles.shortcutIcon}/>

      <div className={`${typoStyles.smallBold}`}>{label}</div>
    </div>
  )
}
