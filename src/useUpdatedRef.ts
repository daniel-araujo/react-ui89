import { useRef, useEffect, MutableRefObject } from "react"

export function useUpdatedRef<T>(value: T): MutableRefObject<T> {
  const valueRef = useRef<T>(value)

  useEffect(() => {
    valueRef.current = value
  }, [value])

  return valueRef
}
