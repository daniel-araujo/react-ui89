import React, { useMemo, useState } from "react"

import styles from "./Ui89InputSelect.module.css"
import inputBoxStyles from "../style/input-box.module.css"
import textStyles from "../style/text.module.css"

export interface Ui89InputSelectPropsOption {
  value: string | number
  label: string
}

export interface Ui89InputSelectProps {
  options: (Ui89InputSelectPropsOption | string | number)[]
  value: string | number
  onChange: (value: string | number) => void
}

export function Ui89InputSelect({
  options = [],
  value,
  onChange,
}: Ui89InputSelectProps) {
  const realOptions = useMemo(() => {
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

  return (
    <div className={`${styles.inputSelect}`}>
      <div
        className={[
          inputBoxStyles.inputBox,
          inputBoxStyles["inputBox--unselectable"],
          inputBoxStyles["inputBox--clickable"],
          textStyles.singleLine,
        ].join(" ")}
        tabIndex={0}
        title={selectedOption !== null ? selectedOption.label : undefined}
      >
        {selectedOption !== null ? <>{selectedOption.label}</> : <>Select...</>}
      </div>

      <div className={[styles.menu].join(" ")} tabIndex={0}>
        {realOptions.length > 0 ? (
          realOptions.map((o) => {
            const isSelected =
              selectedOption && selectedOption.value === o.value

            return (
              <div
                className={[
                  styles.menuItem,
                  isSelected ? styles.selected : null,
                ].join(" ")}
                key={o.value}
                onClick={() => selectOption(o)}
              >
                {o.label}
              </div>
            )
          })
        ) : (
          <div
            className={[styles.menuItem, styles["menuItem--disabled"]].join(
              " ",
            )}
          >
            &lt;empty&gt;
          </div>
        )}
      </div>
    </div>
  )
}
