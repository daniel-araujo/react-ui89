import React from "react"

import "./Ui89TitleBox.css"
import "../style/typo.css"
import "../style/text.css"

export interface Ui89TitleBoxProps {
  children: React.ReactNode
}

export function Ui89TitleBox({ children }: Ui89TitleBoxProps) {
  return (
    <div className={`ui89-title-box ui89-typo-special`}>
      <div className={`ui89-title-box__inside ui89-text-single-line`}>
        {children}
      </div>
    </div>
  )
}
