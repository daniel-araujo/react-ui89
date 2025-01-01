import React, { useMemo } from "react"
import { useState, useEffect, useRef } from "react"
import { throttledTimeout } from "../timeout"

import inputBoxStyles from "../style/input-box.module.css"
import typoStyles from "../style/typo.module.css"

const THROTTLE_DELAY = 200

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
  const [intermediateValue, setIntermediateValue] = useState(value)
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
    if (isTyping === null) {
      return
    }

    if (!isTyping) {
      // Lets show the user what is actually the value.
      setIntermediateValue(value)
    }
  }, [isTyping, value])

  function implOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!onChange) {
      return
    }

    let newVal = e.target.value

    setIntermediateValue(newVal)

    if (autoTrim) {
      // Must trim after setting intermediate value. Do not want to disturb
      // user.
      newVal = newVal.replace(/\s+/g, " ").trim()
    }

    onChangeThrottled.call(THROTTLE_DELAY, () => {
      onChange(newVal)
    })
  }

  return (
    <div>
      <input
        ref={inputRef}
        className={`${inputBoxStyles.inputBox} ${typoStyles.special}`}
        type="text"
        value={intermediateValue}
        onChange={implOnChange}
        placeholder={placeholder}
      />
    </div>
  )
}
