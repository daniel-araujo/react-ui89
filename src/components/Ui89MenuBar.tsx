import React from "react"

import styles from "./Ui89MenuBar.module.css"
import typoStyles from "../style/typo.module.css"
import scrollbarStyles from "../style/scrollbar.module.css"

export interface Ui89MenuBarPropsItem {
  label: React.ReactNode
  onClick?: () => void
  children?: Ui89MenuBarPropsItem[]
}

export interface Ui89MenuBarProps {
  items: Ui89MenuBarPropsItem[]
}

export function Ui89MenuBar({ items }: Ui89MenuBarProps) {
  return (
    <div
      className={`${styles.menuBar} ${typoStyles.special} ${scrollbarStyles.container}`}
    >
      {items.map((item, index) => {
        function onNativeClick() {
          if (item.onClick !== undefined) {
            item.onClick()
          }
        }

        return (
          <div
            key={index}
            className={styles.menuBarItem}
            onClick={onNativeClick}
          >
            {item.label}
          </div>
        )
      })}
    </div>
  )
}
