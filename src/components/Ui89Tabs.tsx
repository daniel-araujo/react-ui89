import React from "react"

import "./Ui89Tabs.css"
import "../style/typo.css"

export interface Ui89TabsPropsOption {
  value: string | number
  label: React.ReactNode
}

export interface Ui89TabsProps {
  selected?: any
  onChange?: (value: string | number) => void
  options?: Ui89TabsPropsOption[]

  /**
   * Stretch options such that they evenly take up the entire width.
   */
  stretch?: boolean
}

export function Ui89Tabs({
  selected,
  onChange = () => {},
  options = [],
  stretch,
}: Ui89TabsProps) {
  function handleOnChange(value: string | number) {
    onChange(value)
  }

  return (
    <div
      className={[
        "ui89-tabs",
        stretch ? "ui89-tabs--stretch" : "",
      ].join(" ")}
    >
      {options.map((option) => (
        <div
          className={[
            "ui89-tabs__item",
            "ui89-typo-small-bold",
            selected === option.value ? "ui89-tabs__item--selected" : "",
          ].join(" ")}
          key={option.value}
          onClick={() => handleOnChange(option.value)}
        >
          {option.label}
        </div>
      ))}
    </div>
  )
}
