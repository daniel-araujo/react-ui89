import React, { useState } from "react"

import "./Ui89Button.css"
import "../style/typo.css"
import "../style/chosen-theme.css"
import "../style/reset.css"

import HoverShadow from "./HoverShadow"

import { Ui89Theme } from "../theme"
import { useUi89Overrides } from "../Ui89Override"

export enum Ui89ButtonPropsSize {
  standard = "standard",
  square = "square",
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
}

export function Ui89Button({
  theme = Ui89Theme.primary,
  size = Ui89ButtonPropsSize.standard,
  block,
  onClick,
  href,
  children,
  autoDisableOnClick = true,
  disabled,
  activated,
}: Ui89ButtonProps) {
  const overrides = useUi89Overrides()
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
            overrides.routerPush(href)
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
    `ui89-chosen-theme-${theme}`,
    activated ? "ui89-button__button--active" : undefined,
    block ? "ui89-button__button--block" : undefined,
    disabled ? "ui89-button__button--disabled" : undefined,
    clicking ? "ui89-button__button--active" : undefined,
  ].join(" ")

  if (href) {
    return (
      <span className={containerClass}>
        <HoverShadow>
          <a
            className={`ui-89-reset-a ${buttonClass}`}
            role="button"
            href={href}
            onClick={onAnchorClick}
          >
            <span className="ui89-button__button__click"></span>
            <span>{children}</span>
          </a>
        </HoverShadow>
      </span>
    )
  } else {
    return (
      <span className={containerClass}>
        <HoverShadow>
          <button
            className={buttonClass}
            type="button"
            onClick={onButtonClick}
            disabled={localDisabled}
          >
            <span className="ui89-button__button__click"></span>
            <span>{children}</span>
          </button>
        </HoverShadow>
      </span>
    )
  }
}
