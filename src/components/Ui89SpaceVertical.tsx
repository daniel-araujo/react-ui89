import React from "react"

export function Ui89SpaceVertical({ gap = 1 }: { gap?: number }) {
  const style = {
    paddingTop: `calc(var(--ui89-safe-space) * ${gap})`,
  }

  return <div style={style}></div>
}
