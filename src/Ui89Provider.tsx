import React, { createContext, useContext, ReactNode, useState } from "react"
import { createPortal as domCreatePortal } from "react-dom"

type RouterPush = (url: string) => void | Promise<void>
type CreatePortal = typeof domCreatePortal

interface Ui89OverrideType {
  routerPush?: RouterPush
  currentZIndex: number
  nextZIndex: () => number
  createPortal: CreatePortal
}

export interface Ui89OverrideProps {
  children?: ReactNode
  routerPush?: RouterPush
  createPortal?: CreatePortal
}

const Ui89Context = createContext<Ui89OverrideType>({
  currentZIndex: 1,
  nextZIndex: () => 1,
  createPortal: domCreatePortal,
})

export const Ui89Provider: React.FC<Ui89OverrideProps> = ({
  routerPush,
  children,
  createPortal = domCreatePortal,
}) => {
  const [zIndex, setZIndex] = useState<number>(1)

  function nextZIndex() {
    const next = zIndex + 1
    setZIndex(next)
    return next
  }

  return (
    <Ui89Context.Provider
      value={{ routerPush, currentZIndex: zIndex, nextZIndex, createPortal }}
    >
      {children}
    </Ui89Context.Provider>
  )
}

export const useUi89 = (): Ui89OverrideType => {
  return useContext(Ui89Context)
}
