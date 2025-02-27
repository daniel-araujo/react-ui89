import React from "react"
import "./Ui89Card.css"

export interface Ui89CardHorizontalConnectionProps {
  children: React.ReactNode
  overflow?: boolean
}

export function Ui89CardHorizontalConnection({
  children,
  overflow,
}: Ui89CardHorizontalConnectionProps) {
  return (
    <div
      className={`ui89-card__horizontal-connection ${overflow ? "ui89-card__horizontal-connection--overflow" : ""}`}
    >
      {children}
    </div>
  )
}
