import React from "react"
import { useState, useEffect } from "react"
import { Ui89InputText } from "./Ui89InputText"
import { stringRemoveAllWhitespace } from "../text-utils"

export function isTextNumber(text: string): boolean {
  return /\b\d+(\.\d+)?\b/.test(text)
}

function displayText(value: any, emptyValue: any) {
  if (value === undefined) {
    // No idea how to display this.
    return ""
  } else if (value === emptyValue) {
    // Display emptiness.
    return ""
  } else if (isNaN(value)) {
    // No idea what to display.
    return ""
  }

  return value.toString()
}

export function Ui89InputTextNumber({
  /**
   * The value that is emitted when the input is emptied.
   */
  emptyValue = null,
  value,
  min,
  max,
  onChange,
  precision,
}: {
  emptyValue?: any
  value?: any
  min?: number
  max?: number
  onChange?: (value: any) => void
  precision?: number
}) {
  const [intermediateValue, setIntermediateValue] = useState(
    displayText(value, emptyValue),
  )

  useEffect(() => {
    setIntermediateValue(displayText(value, emptyValue))
  }, [value])

  function implOnChange(value: string) {
    if (onChange === undefined) {
      return
    }

    if (value === "") {
      // Use empty value.
      onChange(emptyValue)
      return
    }

    value = stringRemoveAllWhitespace(value)

    if (!isTextNumber(value)) {
      // We end here.
      return
    }

    const numberValue = Number(value)

    if (min !== undefined) {
      if (numberValue <= min) {
        value = String(min)
      }
    }

    if (max !== undefined) {
      if (numberValue >= max) {
        value = String(max)
      }
    }

    onChange(value)
  }

  function onTyping(isTyping: boolean) {
    if (!isTyping) {
      // Correct display value.
      setIntermediateValue(displayText(value, emptyValue))
    }
  }

  return (
    <Ui89InputText
      value={intermediateValue}
      onChange={implOnChange}
      onTyping={onTyping}
    />
  )
}
