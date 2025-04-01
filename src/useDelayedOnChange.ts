import { useEffect, useRef, useState } from "react"
import { throttledTimeout } from "./timeout"
import { useUpdatedRef } from "./useUpdatedRef"

interface UseDelayedOnChangeState {
  value: any
  setValue: (newVal: any) => void
  onChange: (newVal: any) => void
  onFocus: () => void
  onBlur: () => void
}

export function useDelayedOnChange(props: {
  defaultValue?: any
  value: any
  onChange?: (value: any) => void
  filter?: (value: any) => any
}): UseDelayedOnChangeState {
  console.log("useDelayedOnChange", props.value)
  const valueRef = useUpdatedRef(props.value)
  const onChangeRef = useUpdatedRef(props.onChange)

  const [intermediateValue, setIntermediateValue] = useState<any>(
    props.defaultValue || props.value,
  )

  useEffect(() => {
    stateRef.current.setValue(props.value)
  }, [props.value])

  function callOnChange() {
    let newVal = stateRef.current.value

    if (props.filter !== undefined) {
      newVal = props.filter(newVal)
    }

    if (newVal !== valueRef.current) {
      console.log(
        "callOnChange",
        newVal,
        valueRef.current,
        newVal !== valueRef.current,
      )
      onChangeRef.current?.call(null, newVal)
    }

    return newVal
  }

  class StateUnknown implements UseDelayedOnChangeState {
    state = "unknown"

    value: any

    throttledTimeout: any

    constructor() {
      this.throttledTimeout = throttledTimeout()
    }

    setValue(newVal: any) {
      setIntermediateValue(newVal)
    }

    onChange(newVal: any) {
      setIntermediateValue(newVal)
      stateRef.current.throttledTimeout.call(300, callOnChange)
    }

    onFocus() {
      let newState = new StateFocus()
      newState.value = stateRef.current.value
      setState(newState)
    }

    onBlur() {}
  }

  class StateFocus implements UseDelayedOnChangeState {
    state = "focus"

    value: any

    throttledTimeout: any

    constructor() {
      this.throttledTimeout = throttledTimeout()
    }

    setValue(newVal: any) {
      // Ignore.
    }

    onChange(newVal: any) {
      setIntermediateValue(newVal)
      stateRef.current.throttledTimeout.call(300, callOnChange)
    }

    onFocus() {}

    onBlur() {
      let newVal = callOnChange()
      setIntermediateValue(newVal)
      let newState = new StateUnknown()
      newState.value = newVal
      setState(newState)
    }
  }

  const [state, setState] = useState<UseDelayedOnChangeState>(() => {
    let newState = new StateUnknown()
    newState.value = intermediateValue
    return newState
  })

  const stateRef = useUpdatedRef(state)

  stateRef.current.value = intermediateValue

  return state
}
