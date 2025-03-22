import React from "react"

import "./Ui89InputCheckText.css"

export interface Ui89InputCheckTextProps {
  value: any
  onChange?: (value: boolean) => void
}

export function Ui89InputCheckText(props: Ui89InputCheckTextProps) {
  function toggle() {
    if (props.onChange) {
      props.onChange(!props.value)
    }
  }

  return (
    <span className="ui89-input-check-text" onClick={toggle}>
      {props.value ? "[X]" : "[ ]"}
    </span>
  )
}
