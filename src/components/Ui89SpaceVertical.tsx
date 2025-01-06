import React from "react"

export interface Ui89SpaceVerticalProps {
  gap?: number
}

export function Ui89SpaceVertical({ gap = 1 }: Ui89SpaceVerticalProps) {
  const style = {
    paddingTop: `calc(var(--ui89-safe-space) * ${gap})`,
  }

  return <div style={style}></div>
}
