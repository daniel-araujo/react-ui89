import React, { useMemo, useState } from "react"

import "./Ui89InputSelect.css"
import "../style/input-box.css"
import "../style/text.css"

export interface Ui89InputSelectProps<T> {
  /**
   * Available options.
   */
  options?: T[]

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

  function selectOption(option: T) {
    if (props.onChange !== undefined) {
      props.onChange(option)
    }

    if (document.activeElement !== null) {
      // @ts-expect-error
      document.activeElement.blur()
    }
  }

  function optionTitle(option: T) {
    return String(option)
  }

  return (
    <div className="ui89-input-select">
      <div
        className={[
          "ui89-input-box",
          "ui89-input-box--unselectable",
          "ui89-input-box--clickable",
          "ui89-text-single-line",
        ].join(" ")}
        tabIndex={0}
        title={props.value !== undefined ? optionTitle(props.value) : undefined}
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

      <div className="ui89-input-select__menu" tabIndex={0}>
        <div className="ui89-input-select__menu__content">
          {options.length > 0 ? (
            options.map((o) => {
              const isSelected = isOptionSelected(o)

              return (
                <div
                  className={[
                    "ui89-input-select__menu__item",
                    isSelected
                      ? "ui89-input-select__menu__item--selected"
                      : null,
                  ].join(" ")}
                  title={optionTitle(o)}
                  key={getOptionKey(o)}
                  onClick={() => selectOption(o)}
                >
                  {props.renderOption !== undefined ? props.renderOption(o) : o}
                </div>
              )
            })
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
      </div>
    </div>
  )
}
