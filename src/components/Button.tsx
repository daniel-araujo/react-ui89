import React, { MouseEvent, useState } from 'react'
import styles from './Button.module.css'
import HoverShadow from './HoverShadow'

interface ButtonProps {
  theme?: string,
  size?: string,
  block?: boolean,
  onClick?: () => void,
  href?: string,
  children: React.ReactNode,
  autoDisableOnClick?: boolean,
  disabled?: boolean,
  activated?: boolean,
}

export default function Button({
  theme = 'good',
  size = 'normal',
  block,
  onClick,
  href,
  children,
  autoDisableOnClick = true,
  disabled,
  activated,
}: ButtonProps) {
  //const router = useRouter()
  const [clicking, setClicking] = useState(false)

  let localDisabled = disabled || (autoDisableOnClick && clicking)

  async function onAnchorClick(e: MouseEvent<HTMLAnchorElement>) {
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
        if (href.startsWith('/')) {
          e.preventDefault()
          //router.push(href)
        }
      }
    } finally {
      setClicking(false)
    }
  }

  async function onButtonClick(e: MouseEvent<HTMLButtonElement>) {
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
    'typo-special',
    'action-theme-' + theme,
    styles['size--' + size],
    activated ? styles.active : undefined,
    block ? styles.block : undefined,
    disabled ? styles.disabled : undefined,
    clicking ? styles.active : undefined,
  ].join(' ')

  if (href) {
    return (
      <span className={styles.container}>
        <HoverShadow>
          <a
            className={buttonClass}
            href={href}
            onClick={onAnchorClick}
          >
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
