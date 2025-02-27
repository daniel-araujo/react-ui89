import React from "react"
import "./Ui89Card.css"

export interface Ui89CardProps {
  topLeftCenter?: React.ReactNode
  topCenter?: React.ReactNode
  children: React.ReactNode
}

export function Ui89Card({
  topLeftCenter,
  topCenter,
  children,
}: Ui89CardProps) {
  const hasTopContent = topLeftCenter || topCenter

  return (
    <div className={`ui89-card ${hasTopContent ? "ui89-card--has-top" : ""}`}>
      <div className="ui89-card__inside">
        {topLeftCenter && (
          <div className="ui89-card__top-left-center">{topLeftCenter}</div>
        )}
        {topCenter && <div className="ui89-card__top-center">{topCenter}</div>}

        {hasTopContent && <div className="space-vertical-1"></div>}

        {children}

        {hasTopContent && <div className="space-vertical-1"></div>}
      </div>
    </div>
  )
}
