import React, { useCallback, useEffect, useMemo, useState } from "react"
import {
  useFloating,
  autoUpdate,
  size,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingFocusManager,
  FloatingPortal,
  ReferenceType,
} from "@floating-ui/react"
import "../../style/text.css"
import { Ui89Scene } from "../Ui89Scene"
import { useZIndexer } from "../../useZIndexer"

export interface DropdownContainerPropsRenderContainerProps {
  props: React.HTMLProps<Element>
  setRef: (ref: any) => void
}

export interface DropdownContainerProps<T> {
  open: boolean
  onOpenChange: (value: boolean) => void
  renderContainer: (
    props: DropdownContainerPropsRenderContainerProps,
  ) => React.ReactNode
  renderDropdown: () => React.ReactNode
}

/**
 * This is a very performant and customizable dropdown selector that
 * allows you to choose from a list of options.
 */
export function DropdownContainer<T>(props: DropdownContainerProps<T>) {
  const zIndexer = useZIndexer(props.open)
  const { refs, floatingStyles, context } = useFloating({
    open: props.open,
    onOpenChange: props.onOpenChange,
    middleware: [
      size({
        apply({ availableWidth, availableHeight, elements }) {
          let width = elements.reference.getBoundingClientRect().width
          // Change styles, e.g.
          Object.assign(elements.floating.style, {
            width: `${availableWidth}px`,
            maxWidth: `${width}px`,
            maxHeight: `${Math.max(0, availableHeight)}px`,
          })
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
    placement: "bottom-start",
    strategy: "fixed",
  })

  const click = useClick(context)
  const dismiss = useDismiss(context)
  const role = useRole(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ])

  return (
    <>
      {props.renderContainer({
        setRef: refs.setReference,
        props: getReferenceProps(),
      })}
      {props.open && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <Ui89Scene>
              <div
                ref={refs.setFloating}
                style={{
                  ...floatingStyles,
                  zIndex: zIndexer.value,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {props.renderDropdown()}
              </div>
            </Ui89Scene>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  )
}
