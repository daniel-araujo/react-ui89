import styles from "./Ui89ModalDialog.module.css"
import React, { useMemo } from "react"
import { createPortal } from "react-dom"
import { Ui89Card } from "./Ui89Card"
import HoverShadow from "./HoverShadow"
import { Ui89Scene } from "./Ui89Scene"
import GridExpandTrick from "./GridExpandTrick"
import ScrollContainer from "./ScrollContainer"

const portalRoot: HTMLElement | null =
  typeof document !== "undefined" ? document.body : null

export function Ui89ModalDialog({
  open,
  size = "medium",
  children,
  topCenter,
  onRequestClose,
}: {
  open: boolean
  size?: string
  children?: React.ReactNode
  topCenter?: React.ReactNode
  onRequestClose?: () => void
}) {
  const dialogClass = useMemo(() => {
    return [styles.dialog, open ? styles["dialog--open"] : ""].join(" ")
  }, [size, open])

  const dialogBoxClass = useMemo(() => {
    return [styles.dialogBox, styles[`dialogBox--size-${size}`]].join(" ")
  }, [size, open])

  function onClickBackdrop() {
    if (onRequestClose !== undefined) {
      onRequestClose()
    }
  }

  const vdom = (
    <div className={dialogClass} role="dialog">
      <div
        className={styles.dialogBackdrop}
        role="presentation"
        onClick={onClickBackdrop}
      ></div>

      <div className={dialogBoxClass}>
        <div className={styles.spacer}></div>

        <HoverShadow>
          <GridExpandTrick>
            <Ui89Scene look="side">
              <Ui89Card topCenter={topCenter}>
                <ScrollContainer>{children}</ScrollContainer>
              </Ui89Card>
            </Ui89Scene>
          </GridExpandTrick>
        </HoverShadow>
      </div>
    </div>
  )

  return portalRoot !== null ? createPortal(vdom, portalRoot) : vdom
}
