import React from "react"

import "./Ui89BoxShadow.css"

export interface Ui89BoxShadowProps {
  children?: React.ReactNode
  /**
   * The size of the shadow gap.
   */
  gap?: number
  /**
   * The size of the shadow row gap.
   */
  rowGap?: number
  /**
   * The size of the shadow column gap.
   */
  columnGap?: number
}

export function Ui89BoxShadow({
  children,
  gap = 1,
  rowGap,
  columnGap,
}: Ui89BoxShadowProps) {
  const style = {
    "--ui89-box-shadow-row-gap": `calc(var(--ui89-safe-space) * ${rowGap ?? gap})`,
    "--ui89-box-shadow-column-gap": `calc(var(--ui89-safe-space) * ${columnGap ?? gap})`,
  } as React.CSSProperties

  return (
    <span className="ui89-box-shadow" style={style}>
      <span className="ui89-box-shadow__bottom"></span>
      <span className="ui89-box-shadow__right"></span>
      {children}
    </span>
  )
}
