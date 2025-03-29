import React, { useCallback, useMemo, useState } from "react"
import {
  useFloating,
  autoUpdate,
  size,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingFocusManager,
} from "@floating-ui/react"

import "./Ui89InputSelect.css"
import "../style/input-box.css"
import "../style/text.css"
import {
  Ui89VirtualList,
  Ui89VirtualListPropsRenderRowProps,
} from "./Ui89VirtualList"

export interface Ui89InputSelectProps<T> {
  /**
   * Available options.
   */
  options?: T[]

  /**
   * Option height. Options list uses a technique called DOM virtualization.
   */
  optionHeight?: number

  /**
   * The selected option.
   */
  value?: T

  /**
   * Called whenever an option is selected.
   */
  onChange?: (option: T) => void

  /**
   * Retrieves the value that uniquely identifies the option. This is what is
   * used to determine which option is currently selected.
   */
  getOptionKey?: (option: T) => any

  /**
   * Customize how an option should be rendered.
   */
  renderOption?: (option: T) => any
}

/**
 * This is a very performant and customizable dropdown selector that
 * allows you to choose from a list of options.
 */
export function Ui89InputSelect<T>(props: Ui89InputSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false)
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      size({
        apply({ availableWidth, availableHeight, elements }) {
          let width = elements.reference.getBoundingClientRect().width
          // Change styles, e.g.
          Object.assign(elements.floating.style, {
            width: `${width}px`,
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

  const getOptionKey = useMemo(() => {
    return props.getOptionKey ?? ((option: any) => option)
  }, [props.getOptionKey])

  const options = useMemo(() => {
    if (props.options === undefined) {
      return []
    }

    return props.options
  }, [props.options])

  const optionsMap = useMemo(() => {
    return new Map(options.map((option) => [getOptionKey(option), option]))
  }, [options])

  function isOptionSelected(option: T) {
    if (props.value === undefined) {
      // Definitely not selected.
      return false
    }

    return getOptionKey(option) === getOptionKey(props.value)
  }

  function optionTitle(option: T) {
    return String(option)
  }

  const selectOption = useCallback(
    (option: T) => {
      if (props.onChange !== undefined) {
        props.onChange(option)
      }

      setIsOpen(false)
    },
    [props.onChange],
  )

  const renderOption = useCallback(
    ({ row }: Ui89VirtualListPropsRenderRowProps<T>) => {
      const isSelected = isOptionSelected(row)

      return (
        <div
          className={[
            "ui89-input-select__menu__item",
            isSelected ? "ui89-input-select__menu__item--selected" : null,
          ].join(" ")}
          title={optionTitle(row)}
          key={getOptionKey(row)}
          onClick={() => selectOption(row)}
        >
          {props.renderOption !== undefined ? props.renderOption(row) : row}
        </div>
      )
    },
    [options, selectOption],
  )

  return (
    <div className="ui89-input-select">
      <div
        ref={refs.setReference}
        className={[
          "ui89-input-box",
          "ui89-input-box--unselectable",
          "ui89-input-box--clickable",
          "ui89-text-single-line",
        ].join(" ")}
        tabIndex={0}
        title={props.value !== undefined ? optionTitle(props.value) : undefined}
        {...getReferenceProps()}
      >
        {props.value !== undefined ? (
          <>
            {props.renderOption !== undefined
              ? props.renderOption(props.value)
              : props.value}
          </>
        ) : (
          <>Select...</>
        )}
      </div>

      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            ref={refs.setFloating}
            className="ui89-input-select__menu"
            tabIndex={0}
            style={floatingStyles}
          >
            {options.length > 0 ? (
              <Ui89VirtualList
                maxHeight="300px"
                rowHeight={props.optionHeight ?? 32}
                rows={options}
                renderRow={renderOption}
              />
            ) : (
              <div
                className={[
                  "ui89-input-select__menu__item",
                  "ui89-input-select__menu__item--disabled",
                ].join(" ")}
              >
                &lt;empty&gt;
              </div>
            )}
          </div>
        </FloatingFocusManager>
      )}
    </div>
  )
}
