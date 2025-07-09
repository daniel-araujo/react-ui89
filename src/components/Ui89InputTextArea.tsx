import React from "react"

import "../style/input-box.css"
import "../style/typo.css"
import { useDelayedOnChange } from "../useDelayedOnChange"

export interface Ui89InputTextAreaProps {
  rows?: number
  value?: any
  placeholder?: string
  autoTrim?: boolean
  onChange?: (value: any) => void
  onTyping?: (value: boolean) => void
  onFocus?: () => void
  onBlur?: () => void
}

export function Ui89InputTextArea(props: Ui89InputTextAreaProps) {
  const delayedState = useDelayedOnChange({
    defaultValue: "",
    value: props.value,
    onChange: props.onChange,
    filter(value: any) {
      if (props.autoTrim) {
        if (typeof value === "string") {
          value = value.replace(/\s+/g, " ").trim()
        }
      }

      return value
    },
  })

  return (
    <div>
      <textarea
        className={`ui89-input-box ui89-input-box--resizable ui89-typo-special`}
        value={delayedState.value}
        onChange={(e) => delayedState.onChange(e.target.value)}
        onBlur={delayedState.onBlur}
        onFocus={delayedState.onFocus}
        rows={props.rows ?? 4}
        placeholder={props.placeholder}
      />
    </div>
  )
}
