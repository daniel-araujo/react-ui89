import React, { createContext, useContext, ReactNode, useState } from "react"

type RouterPush = (url: string) => void | Promise<void>

interface Ui89OverrideType {
  routerPush?: RouterPush
  currentZIndex: number
  nextZIndex: () => number
}

export interface Ui89OverrideProps {
  children?: ReactNode
  routerPush?: RouterPush
}

const Ui89Context = createContext<Ui89OverrideType>({
  currentZIndex: 1,
  nextZIndex: () => 1,
})

export const Ui89Provider: React.FC<Ui89OverrideProps> = ({
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
    <Ui89Context.Provider
      value={{ routerPush, currentZIndex: zIndex, nextZIndex }}
    >
      {children}
    </Ui89Context.Provider>
  )
}

export const useUi89 = (): Ui89OverrideType => {
  return useContext(Ui89Context)
}
