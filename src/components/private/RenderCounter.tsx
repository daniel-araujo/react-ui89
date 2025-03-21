import React, { useRef } from "react"

export default function RenderCounter() {
  const count = useRef(0)

  count.current += 1

  return <span>{count.current}</span>
}
