import React, { useState } from "react"

import styles from "./Ui89Button.module.css"
import typoStyles from "../style/typo.module.css"
import chosenThemeStyles from "../style/chosen-theme.module.css"
import resetStyles from "../style/reset.module.css"

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

  let containerClass = [
    styles.container,
    styles["container--size-" + size],
  ].join(" ")

  let buttonClass = [
    styles.button,
    typoStyles.special,
    chosenThemeStyles[theme],
    activated ? styles.active : undefined,
    block ? styles.block : undefined,
    disabled ? styles.disabled : undefined,
    clicking ? styles.active : undefined,
  ].join(" ")

  if (href) {
    return (
      <span className={containerClass}>
        <HoverShadow>
          <a
            className={`${resetStyles.a} ${buttonClass}`}
            role="button"
            href={href}
            onClick={onAnchorClick}
          >
            <span className={styles.click}></span>
            <span className={styles.buttonContent}>{children}</span>
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
            <span className={styles.click}></span>
            <span className={styles.buttonContent}>{children}</span>
          </button>
        </HoverShadow>
      </span>
    )
  }
}
