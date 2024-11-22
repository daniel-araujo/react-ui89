// @ts-ignore
import ReactModal from "react-modal"
import styles from "./Ui89ModalDialog.module.css"
import React, { useMemo } from "react"
import { Ui89Card } from "./Ui89Card"
import HoverShadow from "./HoverShadow"
import { Ui89Scene } from "./Ui89Scene"
import GridExpandTrick from "./GridExpandTrick"
import ScrollContainer from "./ScrollContainer"

export function Ui89ModalDialog({
  open,
  size = "medium",
  children,
  topCenter,
  onClose,
  onRequestClose,
}: {
  open: boolean
  size?: string
  children?: React.ReactNode
  topCenter?: React.ReactNode
  onClose?: () => void
  onRequestClose?: () => void
}) {
  const className = useMemo(() => {
    return [styles.container, styles[`container--size-${size}`]].join(" ")
  }, [size])

  return (
    <ReactModal
      className={className}
      overlayClassName={styles.backdrop}
      isOpen={open}
      onAfterClose={onClose}
      onRequestClose={onRequestClose}
      // So it shuts up.
      ariaHideApp={false}
    >
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
    </ReactModal>
  )
}
