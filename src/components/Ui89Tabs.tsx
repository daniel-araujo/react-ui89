import React from "react"

import styles from "./Ui89Tabs.module.css"
import typoStyles from "../style/typo.module.css"
import chosenThemeStyles from "../style/chosen-theme.module.css"

export function Ui89Tabs({
  selected,
  onChange = () => {},
  items = [],
}: {
  selected?: string
  onChange?: (value: string) => void
  items?: {
    value: string
    label: string
  }[]
}) {
  function handleOnChange(value: string) {
    onChange(value)
  }

  return (
    <div className={styles.navigation}>
      {items.map((item) => (
        <div
          className={[
            styles.navigationItem,
            typoStyles.smallBold,
            selected === item.value ? styles.navigationItemSelected : "",
          ].join(" ")}
          key={item.value}
          onClick={() => handleOnChange(item.value)}
        >
          {item.label}
        </div>
      ))}
    </div>
  )
}
