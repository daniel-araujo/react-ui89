import React from "react"
import { useMemo } from "react"

import { Ui89InputTextNumber } from "./Ui89InputTextNumber"

export interface Ui89InputNumberProps {
  emptyValue?: any
  value?: any
  min?: number
  max?: number
  disabled?: boolean
  onChange?: (value: any) => void
  precision?: number
}

export function Ui89InputNumber(props: Ui89InputNumberProps) {
  const wrappedValue = useMemo(() => {
    if (props.value !== undefined && props.value !== null) {
      return Number(props.value)
    } else {
      return undefined
    }
  }, [props.value])

  function wrappedOnChange(value: any) {
    if (props.onChange === undefined) {
      return
    }

    if (value === props.emptyValue) {
      // Pass along.
      props.onChange(value)
    } else {
      if (value !== undefined && value !== null) {
        props.onChange(Number(value))
      } else {
        props.onChange(null)
      }
    }
  }

  return (
    <Ui89InputTextNumber
      emptyValue={props.emptyValue}
      value={wrappedValue}
      onChange={wrappedOnChange}
      min={props.min}
      max={props.max}
      disabled={props.disabled}
      precision={props.precision}
    />
  )
}
