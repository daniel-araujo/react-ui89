import React from "react"
import "./Ui89TitleSideLine.css"
import { Ui89Hr } from "./Ui89Hr"

export interface Ui89TitleSideLineProps {
  children?: React.ReactNode
}

export const Ui89TitleSideLine = ({ children }: Ui89TitleSideLineProps) => {
  return (
    <div className="ui89-title-side-line">
      <div className="ui89-title-side-line__line">
        <Ui89Hr />
      </div>

      <div className="ui89-title-side-line__inside">{children}</div>

      <div className="ui89-title-side-line__line">
        <Ui89Hr />
      </div>
    </div>
  )
}
