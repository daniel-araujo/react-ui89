import React, { createContext, useContext, ReactNode, useState } from "react"

type RouterPush = (url: string) => void | Promise<void>

interface Ui89OverrideContextType {
  routerPush?: RouterPush
  currentZIndex: number
  nextZIndex: () => number
}

export interface Ui89OverrideProviderProps {
  children?: ReactNode
  routerPush?: RouterPush
}

const Ui89OverrideContext = createContext<Ui89OverrideContextType>({
  currentZIndex: 1,
  nextZIndex: () => 1,
})

export const Ui89OverrideProvider: React.FC<Ui89OverrideProviderProps> = ({
  routerPush,
  children,
}) => {
  const [zIndex, setZIndex] = useState<number>(1)

  function nextZIndex() {
    const next = zIndex + 1
    setZIndex(next)
    return next
  }

  return (
    <Ui89OverrideContext.Provider
      value={{ routerPush, currentZIndex: zIndex, nextZIndex }}
    >
      {children}
    </Ui89OverrideContext.Provider>
  )
}

export const useUi89Overrides = (): Ui89OverrideContextType => {
  return useContext(Ui89OverrideContext)
}
