import React from "react"

export function Ui89SpaceVertical({ multiplier = 1 }: { multiplier?: number }) {
  const style = {
    paddingTop: `calc(var(--ui89-safe-space) * ${multiplier})`,
  }

  return <div style={style}></div>
}
