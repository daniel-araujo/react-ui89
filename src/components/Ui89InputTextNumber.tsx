import React, { useMemo } from "react"
import { useState, useEffect } from "react"
import { Ui89InputText } from "./Ui89InputText"
import { stringRemoveAllWhitespace } from "../text-utils"

export interface Ui89InputTextNumberProps {
  emptyValue?: any
  value?: any
  min?: number
  max?: number
  onChange?: (value: any) => void
  precision?: number
}

export function isTextNumber(text: string): boolean {
  return /^\d+(\.\d+)?$/.test(text)
}

function displayText(value: any) {
  if (value === undefined) {
    // No idea how to display this.
    return ""
  } else if (isNaN(value)) {
    // No idea what to display.
    return ""
  }

  return value.toString()
}

function dotsMakeMoreSense(value: string) {
  return value.replaceAll(",", ".")
}

export function Ui89InputTextNumber(props: Ui89InputTextNumberProps) {
  const wrappedValue = useMemo(() => {
    return displayText(props.value)
  }, [props.value])

  function implOnChange(value: string) {
    if (props.onChange === undefined) {
      return
    }

    if (value === "") {
      // Use empty value.
      props.onChange(props.emptyValue)
      return
    }

    value = stringRemoveAllWhitespace(value)
    value = dotsMakeMoreSense(value)

    if (!isTextNumber(value)) {
      // We end here.
      return
    }

    const numberValue = Number(value)

    if (props.min !== undefined) {
      if (numberValue <= props.min) {
        value = String(props.min)
      }
    }

    if (props.max !== undefined) {
      if (numberValue >= props.max) {
        value = String(props.max)
      }
    }

    props.onChange(value)
  }

  return <Ui89InputText value={wrappedValue} onChange={implOnChange} />
}
