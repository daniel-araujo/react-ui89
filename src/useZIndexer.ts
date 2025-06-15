import { useEffect, useState } from "react"
import { useUi89 } from "./Ui89Provider"

interface ZIndexer {
  value: number
}

export function useZIndexer(open: boolean): ZIndexer {
  const overrides = useUi89()
  const [value, setValue] = useState<number>(overrides.currentZIndex)

  useEffect(() => {
    if (open) {
      setValue(overrides.nextZIndex())
    }
  }, [open])

  return {
    value,
  }
}
