import React, { useMemo, useState } from "react"

import "./Ui89InputSelect.css"
import "../style/input-box.css"
import "../style/text.css"

export interface Ui89InputSelectPropsOption {
  value: string | number
  label: React.ReactNode
}

export interface Ui89InputSelectProps {
  options?: (Ui89InputSelectPropsOption | string | number)[]
  value?: string | number
  onChange?: (value: string | number) => void
}

export function Ui89InputSelect({
  options,
  value,
  onChange,
}: Ui89InputSelectProps) {
  const realOptions = useMemo(() => {
    if (options === undefined) {
      return []
    }

    return options.map((option) => {
      if (typeof option !== "object") {
        return {
          value: option,
          label: String(option),
        }
      } else {
        return option
      }
    })
  }, [options])

  const selectedOption = useMemo(() => {
    return (
      realOptions.find((option) => {
        return option.value === value
      }) ?? null
    )
  }, [realOptions, value])

  function selectOption(option: Ui89InputSelectPropsOption) {
    if (onChange) {
      onChange(option.value)
    }

    if (document.activeElement !== null) {
      // @ts-expect-error
      document.activeElement.blur()
    }
  }

  function optionTitle(option: Ui89InputSelectPropsOption) {
    return typeof option.label === "string" ? option.label : undefined
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
        title={
          selectedOption !== null ? optionTitle(selectedOption) : undefined
        }
      >
        {selectedOption !== null ? <>{selectedOption.label}</> : <>Select...</>}
      </div>

      <div className="ui89-input-select__menu" tabIndex={0}>
        <div className="ui89-input-select__menu__content">
          {realOptions.length > 0 ? (
            realOptions.map((o) => {
              const isSelected =
                selectedOption && selectedOption.value === o.value

              return (
                <div
                  className={[
                    'ui89-input-select__menu__item',
                    isSelected ? 'ui89-input-select__menu__item--selected' : null,
                  ].join(" ")}
                  title={optionTitle(o)}
                  key={o.value}
                  onClick={() => selectOption(o)}
                >
                  {o.label}
                </div>
              )
            })
          ) : (
            <div
              className={['ui89-input-select__menu__item', 'ui89-input-select__menu__item--disabled'].join(
                " ",
              )}
            >
              &lt;empty&gt;
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
