import React from "react"

export interface Ui89SpacePaddingProps {
  top?: number
  right?: number
  bottom?: number
  left?: number
  children?: React.ReactNode
}

export function Ui89SpacePadding(props: Ui89SpacePaddingProps) {
  const style = {
    paddingTop: `calc(var(--ui89-safe-space) * ${props.top ?? 1})`,
    paddingRight: `calc(var(--ui89-safe-space) * ${props.right ?? 1})`,
    paddingBottom: `calc(var(--ui89-safe-space) * ${props.bottom ?? 1})`,
    paddingLeft: `calc(var(--ui89-safe-space) * ${props.left ?? 1})`,
  }

  return <div style={style}>{props.children}</div>
}
