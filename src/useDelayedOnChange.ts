import { useEffect, useRef, useState } from "react"
import { throttledTimeout } from "./timeout"
import { useUpdatedRef } from "./useUpdatedRef"

const OVERRIDEN_VALUE_UNDEFINED = Symbol("OVERRIDEN_VALUE_UNDEFINED")

interface UseDelayedOnChangeState {
  value: any
  setValue: (newVal: any) => void
  onChange: (newVal: any) => void
  onFocus: () => void
  onBlur: () => void
  onConfirm: () => void
}

export function useDelayedOnChange(props: {
  defaultValue?: any
  value: any
  onChange?: (value: any) => void
  filter?: (value: any) => any
}): UseDelayedOnChangeState {
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

    onConfirm() {
      callOnChange()
    }
  }

  class StateFocus implements UseDelayedOnChangeState {
    state = "focus"

    value: any

    /**
     * If we receive a new value, we keep track of it here. We set this to
     * OVERRIDEN_VALUE_UNDEFINED if the value is meant to be discarded.
     */
    overridenValue: any

    throttledTimeout: any

    constructor() {
      this.overridenValue = OVERRIDEN_VALUE_UNDEFINED
      this.throttledTimeout = throttledTimeout()
    }

    setValue(newVal: any) {
      // Not setting intermediate value. Do not bother user.
      stateRef.current.overridenValue = newVal
    }

    onChange(newVal: any) {
      // Discard last setValue call
      stateRef.current.overridenValue = OVERRIDEN_VALUE_UNDEFINED

      setIntermediateValue(newVal)
      stateRef.current.throttledTimeout.call(300, callOnChange)
    }

    onFocus() {}

    onBlur() {
      // We need to make sure that we emit immediately. Do not want to leave
      // user waiting.

      // We can cancel this one.
      stateRef.current.throttledTimeout.abort()

      if (stateRef.current.overridenValue !== OVERRIDEN_VALUE_UNDEFINED) {
        stateRef.current.value = stateRef.current.overridenValue
      }

      let newVal = callOnChange()

      setIntermediateValue(newVal)
      let newState = new StateUnknown()
      newState.value = newVal
      setState(newState)
    }

    onConfirm() {
      callOnChange()
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
