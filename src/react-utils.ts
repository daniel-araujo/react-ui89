import { useRef } from "react";

/**
 * Runs the function the moment that this function is called.
 * 
 * Sounds similar to useEffect(cb, []) but it actually is not. Unlike
 * useEffect, this function will be called immediately.
 */
export function useOnce(cb: () => void) {
  const first = useRef(true)

  if (first.current) {
    cb()
    first.current = false
  }
}
