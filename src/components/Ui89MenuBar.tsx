import React from "react"

import "./Ui89MenuBar.css"
import "../style/typo.css"
import "../style/scrollbar.css"

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
    <div className={`ui89-menu-bar ui89-typo-special ui89-scrollbar`}>
      {items.map((item, index) => {
        function onNativeClick() {
          if (item.onClick !== undefined) {
            item.onClick()
          }
        }

        return (
          <div
            key={index}
            className="ui89-menu-bar__item"
            onClick={onNativeClick}
          >
            {item.label}
          </div>
        )
      })}
    </div>
  )
}
