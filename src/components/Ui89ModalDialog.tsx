import React, { useMemo } from "react"
import { Ui89Card } from "./Ui89Card"
import { Ui89BoxShadow } from "./Ui89BoxShadow"
import { Ui89Scene } from "./Ui89Scene"
import GridExpandTrick from "./private/GridExpandTrick"
import ScrollContainer from "./private/ScrollContainer"

import "./Ui89ModalDialog.css"
import { useZIndexer } from "../useZIndexer"
import { useUi89 } from "../Ui89Provider"
import { Ui89Palette, Ui89Theme } from "../theme"

export interface Ui89ModalDialogProps {
  open: boolean
  size?: "small" | "medium" | "big" | "full"
  theme?:
    | Ui89Theme
    | keyof typeof Ui89Theme
    | Ui89Palette
    | keyof typeof Ui89Palette
  children?: React.ReactNode
  topCenter?: React.ReactNode
  onRequestClose?: () => void
}

const portalRoot: HTMLElement | null =
  typeof document !== "undefined" ? document.body : null

export function Ui89ModalDialog({
  open,
  size,
  theme,
  children,
  topCenter,
  onRequestClose,
}: Ui89ModalDialogProps) {
  const zIndexer = useZIndexer(open)
  const { createPortal } = useUi89()

  const dialogClass = useMemo(() => {
    return ["ui89-modal-dialog", open ? "ui89-modal-dialog--open" : ""].join(
      " ",
    )
  }, [open])

  const dialogBoxClass = useMemo(() => {
    return [
      "ui89-modal-dialog__box",
      `ui89-modal-dialog__box--size-${size ?? "responsive"}`,
    ].join(" ")
  }, [size])

  function onClickBackdrop() {
    if (onRequestClose !== undefined) {
      onRequestClose()
    }
  }

  const vdom = (
    <div
      className={dialogClass}
      role="dialog"
      style={{ zIndex: zIndexer.value }}
    >
      <div
        className="ui89-modal-dialog__backdrop"
        role="presentation"
        onClick={onClickBackdrop}
      ></div>

      <div className="ui89-modal-dialog__content">
        <div className="ui89-modal-dialog__spacer"></div>

        <div className={dialogBoxClass}>
          <Ui89BoxShadow>
            <GridExpandTrick>
              <Ui89Scene>
                <Ui89Card topCenter={topCenter} theme={theme}>
                  <ScrollContainer>{children}</ScrollContainer>
                </Ui89Card>
              </Ui89Scene>
            </GridExpandTrick>
          </Ui89BoxShadow>
        </div>
      </div>
    </div>
  )

  return portalRoot !== null ? createPortal(vdom, portalRoot) : vdom
}
