import React from "react"

export interface Ui89SpaceHorizontalProps {
  gap?: number
}

export function Ui89SpaceHorizontal({ gap = 1 }: Ui89SpaceHorizontalProps) {
  const style = {
    paddingRight: `calc(var(--ui89-safe-space) * ${gap})`,
  }

  return <span style={style}></span>
}
