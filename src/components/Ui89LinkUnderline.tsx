import React from "react"

import "./Ui89LinkUnderline.css"

import { Ui89LinkBase } from "./private/LinkBase"

export interface Ui89LinkUnderlineProps {
  onClick?: () => void | Promise<void>
  href?: string
  children: React.ReactNode
  autoDisableOnClick?: boolean
  disabled?: boolean
}

export function Ui89LinkUnderline(props: Ui89LinkUnderlineProps) {
  return <Ui89LinkBase className="ui89-link-underline" {...props} />
}
