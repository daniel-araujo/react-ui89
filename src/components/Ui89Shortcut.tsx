import React from "react"

import ShortcutSvg from "../images/shortcut.svg"

import "./Ui89Shortcut.css"
import "../style/typo.css"

import { Ui89SpaceVertical } from "./Ui89SpaceVertical"

export interface Ui89ShortcutProps {
  imageUrl: string
  label: React.ReactNode
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
    <div className="ui89-shortcut" onClick={onNativeClick}>
      <div className="ui89-shortcut__image-container">
        <img className="ui89-shortcut__image" src={imageUrl} />

        <div className="ui89-shortcut__shortcut-icon-container">
          <ShortcutSvg className="ui89-shortcut__shortcut-icon" width={16} height={16} />
        </div>
      </div>

      <Ui89SpaceVertical gap={1} />

      <div
        className={`ui89-shortcut__label ui89-typo-small-bold`}
        onClick={onNativeClick}
      >
        {label}
      </div>
    </div>
  )
}
