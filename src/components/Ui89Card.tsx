import React from "react"
import "./Ui89Card.css"
import "../style/theme.css"

import { Ui89Palette, Ui89Theme } from "../theme"

export interface Ui89CardProps {
  theme?:
    | Ui89Theme
    | keyof typeof Ui89Theme
    | Ui89Palette
    | keyof typeof Ui89Palette
  topLeft?: React.ReactNode
  topRight?: React.ReactNode
  topCenter?: React.ReactNode
  bottomLeft?: React.ReactNode
  bottomRight?: React.ReactNode
  bottomCenter?: React.ReactNode
  children: React.ReactNode
}

export function Ui89Card(props: Ui89CardProps) {
  const themeClasses =
    props.theme !== undefined
      ? `ui89-card--themed ui89-theme-${props.theme}`
      : ""

  return (
    <div className={`ui89-card ${themeClasses}`}>
      <div className="ui89-card__inside">{props.children}</div>

      {props.topLeft && (
        <div className="ui89-card__top-left">{props.topLeft}</div>
      )}
      {props.topCenter && (
        <div className="ui89-card__top-center">{props.topCenter}</div>
      )}
      {props.topRight && (
        <div className="ui89-card__top-right">{props.topRight}</div>
      )}

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
  )
}
