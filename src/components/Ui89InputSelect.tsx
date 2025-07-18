import React, { useCallback, useEffect, useMemo, useState } from "react"
import "./Ui89InputSelect.css"
import "../style/input-box.css"
import "../style/text.css"
import {
  Ui89VirtualList,
  Ui89VirtualListPropsRenderRowProps,
} from "./Ui89VirtualList"
import { Ui89Scene } from "./Ui89Scene"
import { Ui89InputText } from "./Ui89InputText"
import { Ui89Popover } from "./Ui89Popover"

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
   * Display search input.
   *
   * Does not search automatically. You must filter the options yourself.
   */
  search?: boolean

  /**
   * Called whenever an option is selected.
   */
  onChange?: (option: T) => void

  /**
   * A search term was provided.
   */
  onSearch?: (search: string) => void

  /**
   * Retrieves the value that uniquely identifies the option. This is what is
   * used to determine which option is currently selected.
   */
  getOptionKey?: (option: T) => any

  /**
   * Customize how an option should be rendered.
   */
  renderOption?: (option: T) => any

  /**
   * Width of the menu. The menu is still going to shrink if it can't fit in
   * the viewport.
   */
  menuWidth?: number
}

/**
 * This is a very performant and customizable dropdown selector that
 * allows you to choose from a list of options.
 */
export function Ui89InputSelect<T>(props: Ui89InputSelectProps<T>) {
  const [search, setSearch] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const getOptionKey = useMemo(() => {
    return props.getOptionKey ?? ((option: any) => option)
  }, [props.getOptionKey])

  const options = useMemo(() => {
    if (props.options === undefined) {
      return []
    }

    return props.options
  }, [props.options])

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

  useEffect(() => {
    if (isOpen) {
      setSearch("")
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      if (props.onSearch !== undefined) {
        props.onSearch(search)
      }
    }
  }, [search])

  return (
    <div className="ui89-input-select">
      <Ui89Popover
        open={isOpen}
        onOpenChange={setIsOpen}
        popoverWidth={props.menuWidth}
        renderContainer={(props2) => (
          <div
            ref={props2.setRef}
            className={[
              "ui89-input-box",
              "ui89-input-box--unselectable",
              "ui89-input-box--clickable",
              "ui89-text-single-line",
            ].join(" ")}
            tabIndex={0}
            title={
              props.value !== undefined ? optionTitle(props.value) : undefined
            }
            {...props2.props}
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
        )}
        renderPopover={() => (
          <div className="ui89-input-select__menu">
            {props.search && (
              <Ui89InputText
                placeholder="Search..."
                value={search}
                onChange={setSearch}
              />
            )}

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
        )}
      />
    </div>
  )
}
