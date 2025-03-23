import React from "react"

import "./Ui89LinkStealth.css"

import { Ui89LinkBase } from "./private/LinkBase"

export interface Ui89LinkStealthProps {
  onClick?: () => void | Promise<void>
  href?: string
  children: React.ReactNode
  autoDisableOnClick?: boolean
  disabled?: boolean
}

export function Ui89LinkStealth(props: Ui89LinkStealthProps) {
  return <Ui89LinkBase className="ui89-link-stealth" {...props} />
}
