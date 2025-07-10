import React from "react"
import { Ui89SpacePadding } from "./Ui89SpacePadding"

export interface Ui89IndentProps {
  gap?: number
  children?: React.ReactNode
}

export function Ui89Indent(props: Ui89IndentProps) {
  const gap = props.gap ?? 1
  return (
    <Ui89SpacePadding gap={0} gapLeft={gap}>
      {props.children}
    </Ui89SpacePadding>
  )
}
