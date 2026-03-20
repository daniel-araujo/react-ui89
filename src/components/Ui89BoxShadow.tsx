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
  gap,
  rowGap,
  columnGap,
}: Ui89BoxShadowProps) {
  const style = {
    "--ui89-box-shadow-row-gap":
      (rowGap ?? gap) !== undefined ? `${rowGap ?? gap}px` : undefined,
    "--ui89-box-shadow-column-gap":
      (columnGap ?? gap) !== undefined ? `${columnGap ?? gap}px` : undefined,
  } as React.CSSProperties

  return (
    <div className={`ui89-box-shadow`} style={style}>
      {children}
    </div>
  )
}
