import React, { useMemo } from "react"
import { useState, useEffect, useRef } from "react"
import { throttledTimeout } from "../timeout"

import inputBoxStyles from "../style/input-box.module.css"
import typoStyles from "../style/typo.module.css"

const THROTTLE_DELAY = 200

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
}: {
  value?: any
  placeholder?: string
  autoTrim?: boolean
  onChange?: (value: any) => void
  onTyping?: (value: boolean) => void
  onFocus?: () => void
  onBlur?: () => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isTyping, setIsTyping] = useState(false)
  const onChangeThrottled = useMemo(() => throttledTimeout(), [])

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
    if (inputRef.current === null) {
      return
    }

    if (!isTyping) {
      onChangeThrottled.abort()
      update()
    }
  }, [isTyping])

  useEffect(() => {
    if (!isTyping) {
      // Lets show the user what the actual value is.
      onChangeThrottled.call(THROTTLE_DELAY, () => {
        if (inputRef.current === null) {
          return
        }

        inputRef.current.value = convertAnyToText(value)
      })
    }
  }, [isTyping, value])

  function implOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChangeThrottled.call(THROTTLE_DELAY, update)
  }

  function update() {
    if (!onChange) {
      return
    }

    if (inputRef.current === null) {
      return
    }

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

    onChange(newVal)
  }

  return (
    <div>
      <input
        ref={inputRef}
        className={`${inputBoxStyles.inputBox} ${typoStyles.special}`}
        type="text"
        onChange={implOnChange}
        placeholder={placeholder}
      />
    </div>
  )
}
