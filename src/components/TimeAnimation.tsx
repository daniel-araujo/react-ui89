import React, { useState, useEffect } from "react"

interface TimeAnimationPropsChildrenProps {
  now: Date
}

interface TimeAnimationProps {
  children: (props: TimeAnimationPropsChildrenProps) => React.ReactNode
}

export const TimeAnimation: React.FC<TimeAnimationProps> = ({ children }) => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return <>{children({ now: currentTime })}</>
}
