import React from "react"
import DatePicker from "react-datepicker"

import "../../node_modules/react-datepicker/dist/react-datepicker.css"
import "./Ui89DateTimePicker.css"

import "../style/input-box.css"
import "../style/typo.css"

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
        className={["ui89-input-box", "ui89-typo-normal"].join(" ")}
        calendarClassName="ui89-typo-normal"
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
