import React from "react"

import "./Ui89InputCheckBox.css"

export interface Ui89InputCheckBoxProps {
  value: boolean
  onChange?: (value: boolean) => void
}

export function Ui89InputCheckBox(props: Ui89InputCheckBoxProps) {
  function toggle() {
    if (props.onChange) {
      props.onChange(!props.value)
    }
  }

  return (
    <span
      className="ui89-input-check-box"
      onClick={toggle}
      role="checkbox"
      aria-checked={props.value ? "true" : "false"}
    >
      <span className="ui89-input-check-box__x">
        {props.value ? <>X</> : <>&nbsp;</>}
      </span>
    </span>
  )
}
