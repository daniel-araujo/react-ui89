import React from "react"

import "./Ui89Scene.css"
import "../style/typo.css"
import "../style/scrollbar.css"

export interface Ui89SceneProps {
  children: React.ReactNode
}

export function Ui89Scene({ children }: Ui89SceneProps) {
  return (
    <div className={`ui89-scene ui89-typo-normal ui89-scrollbar`}>
      {children}
    </div>
  )
}
