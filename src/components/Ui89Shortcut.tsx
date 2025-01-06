import React from "react"

import ShortcutSvg from "../images/shortcut.svg"

import styles from "./Ui89Shortcut.module.css"
import typoStyles from "../style/typo.module.css"

import { Ui89SpaceVertical } from "./Ui89SpaceVertical"

export interface Ui89ShortcutProps {
  imageUrl: string
  label: string
  onClick?: () => void
}

export function Ui89Shortcut({
  imageUrl,
  label,
  onClick = () => {},
}: Ui89ShortcutProps) {
  function onNativeClick() {
    onClick()
  }

  return (
    <div className={styles.container} onClick={onNativeClick}>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={imageUrl} />

        <div className={styles.shortcutIconContainer}>
          <ShortcutSvg className={styles.shortcutIcon} width={16} height={16} />
        </div>
      </div>

      <Ui89SpaceVertical gap={1} />

      <div
        className={`${styles.label} ${typoStyles.smallBold}`}
        onClick={onNativeClick}
      >
        {label}
      </div>
    </div>
  )
}
