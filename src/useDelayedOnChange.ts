import { useEffect, useRef, useState } from "react"
import { throttledTimeout } from "./timeout"

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
  const onChangeRef = useRef(props.onChange)

  useEffect(() => {
    onChangeRef.current = props.onChange
  }, [props.onChange])

  const [intermediateValue, setIntermediateValue] = useState<any>(
    props.defaultValue || props.value,
  )

  useEffect(() => {
    stateRef.current.setValue(props.value)
  }, [props.value])

  class StateUnknown implements UseDelayedOnChangeState {
    state = "unknown"

    value: any

    throttledTimeout: any

    constructor() {
      this.throttledTimeout = throttledTimeout()
    }

    setValue(newVal: any) {
      if (props.filter !== undefined) {
        newVal = props.filter(newVal)
      }

      if (newVal === stateRef.current.value) {
        // Same value.
        return
      }

      setIntermediateValue(newVal)
    }

    onChange(newVal: any) {
      setIntermediateValue(newVal)
      stateRef.current.throttledTimeout.call(300, () => {
        onChangeRef.current?.call(null, stateRef.current.value)
      })
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
      stateRef.current.throttledTimeout.call(300, () => {
        onChangeRef.current?.call(null, stateRef.current.value)
      })
    }

    onFocus() {}

    onBlur() {
      let newVal = stateRef.current.value

      if (props.filter !== undefined) {
        newVal = props.filter(newVal)
      }

      if (newVal === stateRef.current.value) {
        // Same value.
        return
      }

      onChangeRef.current?.call(null, newVal)
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

  const stateRef = useRef(state)

  useEffect(() => {
    stateRef.current = state
  }, [state])

  stateRef.current.value = intermediateValue

  return state
}
