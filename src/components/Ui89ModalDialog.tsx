import React, { useMemo } from "react"
import { createPortal } from "react-dom"
import { Ui89Card } from "./Ui89Card"
import HoverShadow from "./HoverShadow"
import { Ui89Scene } from "./Ui89Scene"
import GridExpandTrick from "./GridExpandTrick"
import ScrollContainer from "./ScrollContainer"

import "./Ui89ModalDialog.css"

export interface Ui89ModalDialogProps {
  open: boolean
  size?: string
  children?: React.ReactNode
  topCenter?: React.ReactNode
  onRequestClose?: () => void
}

const portalRoot: HTMLElement | null =
  typeof document !== "undefined" ? document.body : null

export function Ui89ModalDialog({
  open,
  size = "medium",
  children,
  topCenter,
  onRequestClose,
}: Ui89ModalDialogProps) {
  const dialogClass = useMemo(() => {
    return ["ui89-modal-dialog", open ? "ui89-modal-dialog--open" : ""].join(
      " ",
    )
  }, [size, open])

  const dialogBoxClass = useMemo(() => {
    return [
      "ui89-modal-dialog__box",
      `ui89-modal-dialog__box--size-${size}`,
    ].join(" ")
  }, [size, open])

  function onClickBackdrop() {
    if (onRequestClose !== undefined) {
      onRequestClose()
    }
  }

  const vdom = (
    <div className={dialogClass} role="dialog" style={{ zIndex: 1 }}>
      <div
        className="ui89-modal-dialog__backdrop"
        role="presentation"
        onClick={onClickBackdrop}
      ></div>

      <div className={dialogBoxClass}>
        <div className="ui89-modal-dialog__spacer"></div>

        <HoverShadow>
          <GridExpandTrick>
            <Ui89Scene>
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
