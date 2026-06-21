import React, { useMemo, useEffect, useRef } from "react"
import { Ui89Card } from "./Ui89Card"
import { Ui89BoxShadow } from "./Ui89BoxShadow"
import { Ui89Scene } from "./Ui89Scene"
import GridExpandTrick from "./private/GridExpandTrick"
import ScrollContainer from "./private/ScrollContainer"

import "./Ui89ModalDialog.css"
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

export function Ui89ModalDialog({
  open,
  size,
  theme,
  children,
  topCenter,
  onRequestClose,
}: Ui89ModalDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open) {
      if (!dialog.open) dialog.showModal()
    } else {
      if (dialog.open) dialog.close()
    }
  }, [open])

  const dialogBoxClass = useMemo(() => {
    return [
      "ui89-modal-dialog__box",
      `ui89-modal-dialog__box--size-${size ?? "responsive"}`,
    ].join(" ")
  }, [size])

  function onClickContent(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      onRequestClose?.()
    }
  }

  function onKeyDownDialog(e: React.KeyboardEvent<HTMLDialogElement>) {
    if (e.key === "Escape") {
      e.preventDefault()
      onRequestClose?.()
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="ui89-modal-dialog"
      onKeyDown={onKeyDownDialog}
    >
      <div className="ui89-modal-dialog__content" onClick={onClickContent}>
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
    </dialog>
  )
}
