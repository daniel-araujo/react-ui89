import React, { useImperativeHandle, useRef } from "react"

import "../style/input-box.css"
import "../style/typo.css"
import { useDelayedOnChange } from "../useDelayedOnChange"

export interface Ui89InputTextProps {
  value?: any
  placeholder?: string
  autoTrim?: boolean
  disabled?: boolean
  onChange?: (value: any) => void
  onTyping?: (value: boolean) => void
  onFocus?: () => void
  onBlur?: () => void
}

export interface Ui89InputTextRef {
  focus: () => void
}

export const Ui89InputText = React.forwardRef<
  Ui89InputTextRef,
  Ui89InputTextProps
>(function Ui89InputText(
  {
    value,
    placeholder,
    autoTrim = true,
    disabled,
    onChange,
    onTyping,
    onFocus,
    onBlur,
  },
  ref,
) {
  const inputRef = useRef<HTMLInputElement>(null)
  const delayedState = useDelayedOnChange({
    defaultValue: "",
    value,
    onChange,
    filter(value: any) {
      if (autoTrim) {
        if (typeof value === "string") {
          value = value.replace(/\s+/g, " ").trim()
        }
      }

      return value
    },
  })

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus()
    },
  }))

  return (
    <div>
      <input
        ref={inputRef}
        className={[
          "ui89-input-box",
          disabled ? "ui89-input-box--disabled" : "",
        ].join(" ")}
        type="text"
        disabled={disabled}
        value={delayedState.value}
        onChange={(e) => delayedState.onChange(e.target.value)}
        onBlur={delayedState.onBlur}
        onFocus={delayedState.onFocus}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            delayedState.onConfirm()
          }
        }}
        placeholder={placeholder}
      />
    </div>
  )
})
