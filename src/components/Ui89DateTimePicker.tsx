import React from "react"
import DatePicker from "react-datepicker"

import "../../node_modules/react-datepicker/dist/react-datepicker.css"
import "./Ui89DateTimePicker.css"

import inputBoxStyles from "../style/input-box.module.css"
import typoStyles from "../style/typo.module.css"

export interface Ui89DateTimePickerProps {
  value?: Date | null
  onChange?: (value: Date | null) => void
}

export function Ui89DateTimePicker(props: Ui89DateTimePickerProps) {
  function datepickerOnChange(value: Date | null) {
    if (props.onChange) {
      props.onChange(value)
    }
  }

  return (
    <span className="ui89-date-time-picker">
      <DatePicker
        className={[inputBoxStyles.inputBox, typoStyles.normal].join(" ")}
        calendarClassName={typoStyles.normal}
        showTimeSelect
        dateFormat="MM/dd/yyyy HH:mm:ss"
        timeFormat="HH:mm"
        selected={props.value}
        onChange={datepickerOnChange}
        popperPlacement="bottom-start"
      />
    </span>
  )
}
