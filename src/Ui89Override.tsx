import React, { createContext, useContext, ReactNode } from "react"

type RouterPush = (url: string) => void | Promise<void>

interface Ui89OverrideContextType {
  routerPush?: RouterPush
}

export interface Ui89OverrideProviderProps {
  children?: ReactNode
  routerPush?: RouterPush
}

const Ui89OverrideContext = createContext<Ui89OverrideContextType>({})

export const Ui89OverrideProvider: React.FC<Ui89OverrideProviderProps> = ({
  routerPush,
  children,
}) => {
  return (
    <Ui89OverrideContext.Provider value={{ routerPush }}>
      {children}
    </Ui89OverrideContext.Provider>
  )
}

export const useUi89Overrides = (): Ui89OverrideContextType => {
  const context = useContext(Ui89OverrideContext)

  if (context === undefined) {
    throw new Error(
      "useUi89Overrides must be used within a Ui89OverrideProvider",
    )
  }

  return context
}
