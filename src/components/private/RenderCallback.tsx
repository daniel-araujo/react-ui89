import React, { useEffect, useRef } from "react"

/**
 * Calls a callback when the component has rendered for the first time.
 *
 * This is useful for tests that need to wait for a component to render
 * before performing assertions.
 */
export default function RenderCallback(props: {
  /**
   * Called when the component has rendered for the first time.
   */
  onRender: () => void
}) {
  useEffect(() => {
    props.onRender()
  }, [])

  return <></>
}
