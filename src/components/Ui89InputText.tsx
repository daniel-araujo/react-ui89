import React, { useMemo } from "react"
import { useState, useEffect, useRef } from "react"
import { throttledTimeout } from "../timeout"

import "../style/input-box.css"
import "../style/typo.css"
import { useDelayedOnChange } from "../useDelayedOnChange"

const THROTTLE_DELAY = 200

export interface Ui89InputTextProps {
  value?: any
  placeholder?: string
  autoTrim?: boolean
  onChange?: (value: any) => void
  onTyping?: (value: boolean) => void
  onFocus?: () => void
  onBlur?: () => void
}

function convertAnyToText(value: any) {
  return value ?? ""
}

export function Ui89InputText({
  value,
  placeholder,
  autoTrim = true,
  onChange,
  onTyping,
  onFocus,
  onBlur,
}: Ui89InputTextProps) {
  const delayedState = useDelayedOnChange({
    defaultValue: "",
    value,
    onChange,
    filter(value: any) {
      if (autoTrim) {
        if (typeof value === 'string') {
          value = value.replace(/\s+/g, " ").trim()
        }
      }

      return value
    },
  })

  return (
    <div>
      <input
        className={`ui89-input-box ui89-typo-special`}
        type="text"
        value={delayedState.value}
        onChange={(e) => delayedState.onChange(e.target.value)}
        onBlur={delayedState.onBlur}
        onFocus={delayedState.onFocus}
        placeholder={placeholder}
      />
    </div>
  )
}
