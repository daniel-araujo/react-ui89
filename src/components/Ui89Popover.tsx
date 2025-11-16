import React from "react"
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
  Placement,
} from "@floating-ui/react"
import "../style/text.css"
import { Ui89Scene } from "./Ui89Scene"
import { useZIndexer } from "../useZIndexer"

export enum Ui89PopoverPropsPlacement {
  top = "top",
  topStart = "topStart",
  topEnd = "topEnd",
  right = "right",
  rightStart = "rightStart",
  rightEnd = "rightEnd",
  bottom = "bottom",
  bottomStart = "bottomStart",
  bottomEnd = "bottomEnd",
  left = "left",
  leftStart = "leftStart",
  leftEnd = "leftEnd",
}

export interface Ui89PopoverPropsRenderContainerProps {
  props: React.HTMLProps<Element>
  setRef: any
}

export interface Ui89PopoverProps<T> {
  open: boolean

  placement: Ui89PopoverPropsPlacement | keyof typeof Ui89PopoverPropsPlacement

  onOpenChange: (value: boolean) => void

  /**
   * How large the popover can be if there if the viewport is larger than the
   * width of the container.
   */
  popoverOverflowMaxWidth?: number

  renderContainer: (
    props: Ui89PopoverPropsRenderContainerProps,
  ) => React.ReactNode

  renderPopover: () => React.ReactNode
}

function toFloatingUiPlacement(
  placement: Ui89PopoverPropsPlacement | keyof typeof Ui89PopoverPropsPlacement,
): Placement {
  switch (placement) {
    case Ui89PopoverPropsPlacement.top:
      return "top"
    case Ui89PopoverPropsPlacement.topStart:
      return "top-start"
    case Ui89PopoverPropsPlacement.topEnd:
      return "top-end"
    case Ui89PopoverPropsPlacement.right:
      return "right"
    case Ui89PopoverPropsPlacement.rightStart:
      return "right-start"
    case Ui89PopoverPropsPlacement.rightEnd:
      return "right-end"
    case Ui89PopoverPropsPlacement.bottom:
      return "bottom"
    case Ui89PopoverPropsPlacement.bottomStart:
      return "bottom-start"
    case Ui89PopoverPropsPlacement.bottomEnd:
      return "bottom-end"
    case Ui89PopoverPropsPlacement.left:
      return "left"
    case Ui89PopoverPropsPlacement.leftStart:
      return "left-start"
    case Ui89PopoverPropsPlacement.leftEnd:
      return "left-end"
    default:
      throw new Error(`Unknown placement: ${placement}`)
  }
}

export function Ui89Popover<T>(props: Ui89PopoverProps<T>) {
  const zIndexer = useZIndexer(props.open)
  const { refs, floatingStyles, context } = useFloating({
    open: props.open,
    onOpenChange: props.onOpenChange,
    middleware: [
      size({
        apply({ availableWidth, availableHeight, elements }) {
          let width = elements.reference.getBoundingClientRect().width

          if (props.popoverOverflowMaxWidth !== undefined) {
            if (props.popoverOverflowMaxWidth > width) {
              width = props.popoverOverflowMaxWidth
            }
          }

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
    placement: toFloatingUiPlacement(
      props.placement ?? Ui89PopoverPropsPlacement.bottomStart,
    ),
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
                {props.renderPopover()}
              </div>
            </Ui89Scene>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  )
}
