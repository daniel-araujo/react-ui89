import React from "react"
import "./Ui89TitleBracket.css"

export interface Ui89TitleBracketProps {
  children?: React.ReactNode
}

export const Ui89TitleBracket = ({ children }: Ui89TitleBracketProps) => {
  return (
    <div className="ui89-title-bracket">
      <span className="ui89-title-bracket__bracket">[</span>
      <div className="ui89-title-bracket__inside">{children}</div>
      <span className="ui89-title-bracket__bracket">]</span>
    </div>
  )
}
