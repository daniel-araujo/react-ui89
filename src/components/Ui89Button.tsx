import React, { useState } from "react"

import styles from "./Ui89Button.module.css"
import typoStyles from "../style/typo.module.css"
import chosenThemeStyles from "../style/chosen-theme.module.css"

import HoverShadow from "./HoverShadow"

import { Ui89Theme } from "../theme"

interface Ui89ButtonProps {
  theme?: Ui89Theme | string
  size?: string
  block?: boolean
  onClick?: () => void | Promise<void>
  href?: string
  children: React.ReactNode
  autoDisableOnClick?: boolean
  disabled?: boolean
  activated?: boolean
  routerPush?: (url: string) => void
}

export function Ui89Button({
  theme = Ui89Theme.primary,
  size = "normal",
  block,
  onClick,
  href,
  children,
  autoDisableOnClick = true,
  disabled,
  activated,
  routerPush,
}: Ui89ButtonProps) {
  //const router = useRouter()
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
          if (routerPush !== undefined) {
            e.preventDefault()
            routerPush(href)
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

  let buttonClass = [
    styles.button,
    typoStyles.special,
    chosenThemeStyles[theme],
    styles["size--" + size],
    activated ? styles.active : undefined,
    block ? styles.block : undefined,
    disabled ? styles.disabled : undefined,
    clicking ? styles.active : undefined,
  ].join(" ")

  if (href) {
    return (
      <span className={styles.container}>
        <HoverShadow>
          <a className={buttonClass} href={href} onClick={onAnchorClick}>
            <span className={styles.click}></span>
            {children}
          </a>
        </HoverShadow>
      </span>
    )
  } else {
    return (
      <span className={styles.container}>
        <HoverShadow>
          <button
            className={buttonClass}
            type="button"
            onClick={onButtonClick}
            disabled={localDisabled}
          >
            <span className={styles.click}></span>
            {children}
          </button>
        </HoverShadow>
      </span>
    )
  }
}
