import React from "react"

import "./Ui89LinkBracket.css"

import { Ui89LinkBase } from "./private/LinkBase"

export interface Ui89LinkBracketProps {
  onClick?: () => void | Promise<void>
  href?: string
  children: React.ReactNode
  autoDisableOnClick?: boolean
  disabled?: boolean
}

export function Ui89LinkBracket({ children, ...props }: Ui89LinkBracketProps) {
  return (
    <Ui89LinkBase className="ui89-link-bracket" {...props}>
      [{children}]
    </Ui89LinkBase>
  )
}
