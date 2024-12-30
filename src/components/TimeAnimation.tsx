import React, { useState, useEffect } from "react"

export interface TimeAnimationPropsChildrenProps {
  now: Date
}

export interface TimeAnimationProps {
  children: (props: TimeAnimationPropsChildrenProps) => React.ReactNode
}

export const TimeAnimation: React.FC<TimeAnimationProps> = ({ children }) => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setCurrentTime(now)

      // Calculate time until the next exact second
      const msUntilNextSecond = 1000 - now.getMilliseconds()
      setTimeout(tick, msUntilNextSecond)
    }

    // Start the first tick
    const msUntilNextSecond = 1000 - currentTime.getMilliseconds()
    const timeoutId = setTimeout(tick, msUntilNextSecond)

    return () => clearTimeout(timeoutId)
  }, [])

  return <>{children({ now: currentTime })}</>
}
