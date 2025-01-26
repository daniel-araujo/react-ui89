import React from "react"

export interface Ui89SpacePaddingProps {
  gap?: number
  gapVertical?: number
  gapHorizontal?: number
  gapTop?: number
  gapRight?: number
  gapBottom?: number
  gapLeft?: number
  children?: React.ReactNode
}

export function Ui89SpacePadding(props: Ui89SpacePaddingProps) {
  const gap = props.gap ?? 1

  const style = {
    paddingTop: `calc(var(--ui89-safe-space) * ${props.gapTop ?? props.gapVertical ?? gap})`,
    paddingRight: `calc(var(--ui89-safe-space) * ${props.gapRight ?? props.gapHorizontal ?? gap})`,
    paddingBottom: `calc(var(--ui89-safe-space) * ${props.gapBottom ?? props.gapVertical ?? gap})`,
    paddingLeft: `calc(var(--ui89-safe-space) * ${props.gapLeft ?? props.gapHorizontal ?? gap})`,
  }

  return <div style={style}>{props.children}</div>
}
