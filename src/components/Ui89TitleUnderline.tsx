import React from "react"

import "./Ui89TitleUnderline.css"
import "../style/typo.css"
import "../style/text.css"

export interface Ui89TitleUnderlineProps {
  children: React.ReactNode
}

export function Ui89TitleUnderline({ children }: Ui89TitleUnderlineProps) {
  return (
    <div className={`ui89-title-underline ui89-typo-special`}>
      <div className={`ui89-title-underline__inside ui89-text-single-line`}>
        {children}
      </div>
    </div>
  )
}
