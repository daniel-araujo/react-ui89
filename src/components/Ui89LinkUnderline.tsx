import React, { useState } from "react"

import "../style/reset.css"
import "./Ui89LinkUnderline.css"

import { useUi89Overrides } from "../Ui89Override"

export interface Ui89LinkUnderlineProps {
  onClick?: () => void | Promise<void>
  href?: string
  children: React.ReactNode
  autoDisableOnClick?: boolean
  disabled?: boolean
}

export function Ui89LinkUnderline(props: Ui89LinkUnderlineProps) {
  const overrides = useUi89Overrides()
  const [clicking, setClicking] = useState(false)

  let localDisabled =
    props.disabled || ((props.autoDisableOnClick ?? true) && clicking)

  async function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (localDisabled) {
      // The anchor tag does not support the disabled attribute so we do this.
      return
    }

    try {
      setClicking(true)

      if (props.onClick !== undefined) {
        // A function takes over control.
        e.preventDefault()
        await props.onClick()
      } else if (props.href !== undefined) {
        if (props.href.startsWith("/")) {
          if (overrides.routerPush !== undefined) {
            e.preventDefault()
            overrides.routerPush(props.href)
          }
        }
      } else {
        // Do nothing.
        e.preventDefault()
      }
    } finally {
      setClicking(false)
    }
  }

  let containerClass = ['ui89-link-underline'].join(" ")

  return (
    <a
      className={`ui-89-reset-a ${containerClass}`}
      role="link"
      href={props.href}
      onClick={onClick}
    >
      {props.children}
    </a>
  )
}
