import React from "react"

import { Ui89Look } from "../theme"

import "./Ui89Scene.css"
import "../style/look.css"
import "../style/typo.css"
import "../style/scrollbar.css"

export interface Ui89SceneProps {
  look?: Ui89Look | string
  children: React.ReactNode
}

export function Ui89Scene({ look = Ui89Look.main, children }: Ui89SceneProps) {
  return (
    <div
      className={`ui89-scene ui-89-look-${look} ui89-typo-normal ui89-scrollbar`}
    >
      {children}
    </div>
  )
}
