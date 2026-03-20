import React from "react"
import "./Ui89TitleSpace.css"

export interface Ui89TitleSpaceProps {
  children?: React.ReactNode
}

export const Ui89TitleSpace = ({ children }: Ui89TitleSpaceProps) => {
  return (
    <div className="ui89-title-space">
      <div className="ui89-title-space__inside">{children}</div>
    </div>
  )
}
