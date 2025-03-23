import React, { useState } from "react"

import "../../style/reset.css"

import { useUi89Overrides } from "../../Ui89Override"

export interface Ui89LinkBaseProps {
  className?: string
  onClick?: () => void | Promise<void>
  href?: string
  children: React.ReactNode
  autoDisableOnClick?: boolean
  disabled?: boolean
}

export function Ui89LinkBase(props: Ui89LinkBaseProps) {
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

  return (
    <a
      className={`ui-89-reset-a ${props.className}`}
      role="link"
      href={props.href}
      onClick={onClick}
    >
      {props.children}
    </a>
  )
}
