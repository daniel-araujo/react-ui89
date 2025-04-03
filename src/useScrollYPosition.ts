import { useState, useEffect, useRef, RefObject } from "react"

export const useScrollYPosition = (ref: RefObject<HTMLElement>): number => {
  const [scrollY, setScrollY] = useState(0)
  const ticking = useRef(false)
  const observer = useRef<MutationObserver | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleScroll = () => {
      if (!ticking.current) {
        ticking.current = true
        requestAnimationFrame(() => {
          setScrollY(element.scrollTop)
          ticking.current = false
        })
      }
    }

    element.addEventListener("scroll", handleScroll, { passive: true })

    observer.current = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "childList" && ref.current !== element) {
          element.removeEventListener("scroll", handleScroll)
          ref.current?.addEventListener("scroll", handleScroll, {
            passive: true,
          })
        }
      }
    })

    observer.current.observe(document.body, { childList: true, subtree: true })

    return () => {
      element.removeEventListener("scroll", handleScroll)
      observer.current?.disconnect()
      observer.current = null
    }
  }, [ref])

  return scrollY
}
