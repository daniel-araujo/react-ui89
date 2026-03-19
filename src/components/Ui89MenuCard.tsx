import React from "react"
import { Ui89Card } from "./Ui89Card"
import { Ui89TitleBox } from "./Ui89TitleBox"
import { Ui89Hr } from "./Ui89Hr"
import "./Ui89MenuCard.css"
import { Ui89CardHorizontalConnection } from "./Ui89CardHorizontalConnection"
import { Ui89LinkStealth } from "./Ui89LinkStealth"
import { Ui89SpaceVertical } from "./Ui89SpaceVertical"

export interface Ui89MenuCardPropsOption {
  type?: "item" | "separator"
  label?: string
  onClick?: () => void
  href?: string
  disabled?: boolean
  oppositeLabel?: React.ReactNode
}

export interface Ui89MenuCardProps {
  options: Ui89MenuCardPropsOption[]
}

export const Ui89MenuCard: React.FC<Ui89MenuCardProps> = (props) => {
  return (
    <Ui89Card>
      <Ui89CardHorizontalConnection>
        <div className="ui89-menu-card__list">
          {props.options.map((option, index) => {
            if (option.type === "separator") {
              return (
                <div key={index} className="ui89-menu-card__separator">
                  <Ui89SpaceVertical />
                  <Ui89Hr />
                  <Ui89SpaceVertical />
                </div>
              )
            }
            return (
              <Ui89LinkStealth
                key={index}
                href={option.href}
                onClick={!option.disabled ? option.onClick : undefined}
              >
                <div
                  className={`ui89-menu-card__item ${
                    option.disabled ? "ui89-menu-card__item--disabled" : ""
                  }`}
                >
                  <span>{option.label}</span>
                  {option.oppositeLabel && <span>{option.oppositeLabel}</span>}
                </div>
              </Ui89LinkStealth>
            )
          })}
        </div>
      </Ui89CardHorizontalConnection>
    </Ui89Card>
  )
}
