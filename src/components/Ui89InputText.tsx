import React, { useMemo } from "react"
import { useState, useEffect, useRef } from "react"
import { throttledTimeout } from "../timeout"

import styles from "./Ui89InputText.module.css"
import typoStyles from "../style/typo.module.css"

const THROTTLE_DELAY = 200

export function Ui89InputText({
  value,
  defaultValue,
  onChange,
  placeholder,
  onTyping,
  onFocus,
  onBlur,
}: {
  value?: any
  defaultValue?: any
  onChange?: (value: any) => void
  placeholder?: string
  onTyping?: (value: boolean) => void
  onFocus?: () => void
  onBlur?: () => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [intermediateValue, setIntermediateValue] = useState(
    defaultValue !== undefined ? defaultValue : value,
  )
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
      setIntermediateValue(value)
    }
  }, [isTyping, value])

  function implOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!onChange) {
      return
    }

    let newVal = e.target.value
    setIntermediateValue(newVal)

    onChangeThrottled.call(THROTTLE_DELAY, () => {
      onChange(newVal)
    })
  }

  return (
    <div className={styles.inputText}>
      <input
        ref={inputRef}
        className={typoStyles.special}
        type="text"
        value={intermediateValue}
        onChange={implOnChange}
        placeholder={placeholder}
      />
    </div>
  )
}
