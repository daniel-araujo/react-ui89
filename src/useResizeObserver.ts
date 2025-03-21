import { useState, useEffect, useRef } from "react"

type Size = { width: number; height: number }

interface UseResizeObserverResult {
  size: Size
}

export const useResizeObserver = <T extends HTMLElement>(
  ref: React.RefObject<T>,
): UseResizeObserverResult => {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 })

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setSize({
          width:
            entry.borderBoxSize?.[0]?.inlineSize ?? entry.contentRect.width,
          height:
            entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height,
        })
      }
    })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [ref.current])

  return {
    size,
  }
}
