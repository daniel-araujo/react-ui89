import React from "react"

import styles from "./Ui89Tabs.module.css"
import typoStyles from "../style/typo.module.css"
import chosenThemeStyles from "../style/chosen-theme.module.css"

export interface Ui89TabsPropsOption {
  value: string | number
  label: string
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
        styles.navigation,
        stretch ? styles["navigation--stretch"] : "",
      ].join(" ")}
    >
      {options.map((option) => (
        <div
          className={[
            styles.navigationItem,
            typoStyles.smallBold,
            selected === option.value ? styles.navigationItemSelected : "",
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
