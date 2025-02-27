import React, { useMemo } from "react"
import { useState, useEffect, useRef } from "react"
import { throttledTimeout } from "../timeout"

import "../style/input-box.css"
import "../style/typo.css"

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
  const inputRef = useRef<HTMLInputElement>(null)
  const [intermediateValue, setIntermediateValue] = useState(value)
  const [isTyping, setIsTyping] = useState(false)
  const onChangeRef = useRef(onChange)
  const onChangeThrottled = useMemo(() => throttledTimeout(), [])

  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  useEffect(() => {
    if (inputRef.current === null) {
      return
    }

    inputRef.current.onfocus = () => {
      setIsTyping(true)

      if (onTyping) {
        onTyping(true)
      }

      if (onFocus) {
        onFocus()
      }
    }

    inputRef.current.onblur = () => {
      onChangeThrottled.abort()
      update()

      setIsTyping(false)

      if (onTyping) {
        onTyping(false)
      }

      if (onBlur) {
        onBlur()
      }
    }
  }, [inputRef.current, onBlur, onFocus])

  useEffect(() => {
    if (!isTyping) {
      // Lets show the user what the actual value is.
      onChangeThrottled.call(THROTTLE_DELAY, () => {
        setIntermediateValue(value)
      })
    }
  }, [value])

  function implOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIntermediateValue(e.target.value)
    onChangeThrottled.call(THROTTLE_DELAY, update)
  }

  function update() {
    if (!onChangeRef.current) {
      return
    }

    if (inputRef.current === null) {
      return
    }

    // We get the current value straight from the element because this function
    // may have been queued.
    let newVal = inputRef.current.value

    if (autoTrim) {
      // Must trim after setting intermediate value. Do not want to disturb
      // user.
      newVal = newVal.replace(/\s+/g, " ").trim()
    }

    if (newVal === value) {
      // Same value.
      return
    }

    onChangeRef.current(newVal)
  }

  return (
    <div>
      <input
        ref={inputRef}
        value={intermediateValue}
        className={`ui89-input-box ui89-typo-special`}
        type="text"
        onChange={implOnChange}
        placeholder={placeholder}
      />
    </div>
  )
}
