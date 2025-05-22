import React from "react"
import "./Ui89Card.css"

export interface Ui89CardProps {
  topLeft?: React.ReactNode
  topRight?: React.ReactNode
  topCenter?: React.ReactNode
  bottomLeft?: React.ReactNode
  bottomRight?: React.ReactNode
  bottomCenter?: React.ReactNode
  children: React.ReactNode
}

export function Ui89Card(props: Ui89CardProps) {
  return (
    <div className={`ui89-card`}>
      <div className="ui89-card__inside">
        {props.topLeft && (
          <div className="ui89-card__top-left">{props.topLeft}</div>
        )}
        {props.topCenter && (
          <div className="ui89-card__top-center">{props.topCenter}</div>
        )}
        {props.topRight && (
          <div className="ui89-card__top-right">{props.topRight}</div>
        )}

        {props.children}

        {props.bottomLeft && (
          <div className="ui89-card__bottom-left">{props.bottomLeft}</div>
        )}
        {props.bottomCenter && (
          <div className="ui89-card__bottom-center">{props.bottomCenter}</div>
        )}
        {props.bottomRight && (
          <div className="ui89-card__bottom-right">{props.bottomRight}</div>
        )}
      </div>
    </div>
  )
}
