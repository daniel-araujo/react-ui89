import { useState, useEffect, RefObject } from "react"

export const useScrollYPosition = (ref?: RefObject<HTMLElement>): number => {
  const [scrollY, setScrollY] = useState<number>(0)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = ref?.current
            ? ref.current.scrollTop
            : window.scrollY
          setScrollY(scrollTop)
          ticking = false
        })
        ticking = true
      }
    }

    const target = ref?.current || window
    target.addEventListener("scroll", handleScroll)

    return () => target.removeEventListener("scroll", handleScroll)
  }, [ref])

  return scrollY
}
