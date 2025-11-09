import React, { useState } from "react"

import "./Ui89Button.css"
import "../style/text.css"
import "../style/typo.css"
import "../style/chosen-theme.css"
import "../style/reset.css"

import HoverShadow from "./private/HoverShadow"

import { Ui89Theme } from "../theme"
import { useUi89 } from "../Ui89Provider"

export enum Ui89ButtonPropsSize {
  standard = "standard",
  square = "square",
}

export enum Ui89ButtonPropsType {
  submit = "submit",
  reset = "reset",
}

export interface Ui89ButtonProps {
  theme?: Ui89Theme | keyof typeof Ui89Theme
  size?: Ui89ButtonPropsSize | keyof typeof Ui89ButtonPropsSize
  block?: boolean
  onClick?: () => void | Promise<void>
  href?: string
  children: React.ReactNode
  autoDisableOnClick?: boolean
  disabled?: boolean
  activated?: boolean
  type?: keyof typeof Ui89ButtonPropsType
}

export function Ui89Button({
  theme = Ui89Theme.primary,
  size = Ui89ButtonPropsSize.standard,
  type,
  block,
  onClick,
  href,
  children,
  autoDisableOnClick = true,
  disabled,
  activated,
}: Ui89ButtonProps) {
  const overrides = useUi89()
  const [clicking, setClicking] = useState(false)

  let localDisabled = disabled || (autoDisableOnClick && clicking)

  async function onAnchorClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (localDisabled) {
      // The anchor tag does not support the disabled attribute so we do this.
      return
    }

    if (clicking) {
      // No double clicking allowed.
      return
    }

    try {
      setClicking(true)

      if (href !== undefined) {
        if (href.startsWith("/")) {
          if (overrides.routerPush !== undefined) {
            e.preventDefault()
            await overrides.routerPush(href)
          }
        }
      }
    } finally {
      setClicking(false)
    }
  }

  async function onButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (localDisabled) {
      // The anchor tag does not support the disabled attribute so we do this.
      return
    }

    if (clicking) {
      // No double clicking allowed.
      return
    }

    try {
      setClicking(true)

      if (onClick === undefined) {
        // No handler.
        return
      }

      await onClick()
    } finally {
      setClicking(false)
    }
  }

  let containerClass = ["ui89-button", `ui89-button--size-${size}`].join(" ")

  let buttonClass = [
    "ui89-button__button",
    "ui89-typo-special",
    "ui89-text-ellipsis",
    `ui89-chosen-theme-${theme}`,
    activated ? "ui89-button__button--active" : undefined,
    block ? "ui89-button__button--block" : undefined,
    disabled ? "ui89-button__button--disabled" : undefined,
    clicking ? "ui89-button__button--active" : undefined,
  ].join(" ")

  return (
    <div className={containerClass}>
      <HoverShadow>
        {href ? (
          <a
            className="ui-89-reset-a"
            role="button"
            href={href}
            onClick={onAnchorClick}
          >
            <span className={buttonClass}>
              <div className="ui89-button__button__content">{children}</div>
            </span>
          </a>
        ) : (
          <button
            className="ui-89-reset-button"
            type={type || "button"}
            onClick={onButtonClick}
            disabled={localDisabled}
          >
            <span className={buttonClass}>
              <div className="ui89-button__button__content">{children}</div>
            </span>
          </button>
        )}
      </HoverShadow>
    </div>
  )
}
