import { useEffect, useState } from "react"
import { useUi89Overrides } from "./Ui89Override"

interface ZIndexer {
  value: number
}

export function useZIndexer(open: boolean): ZIndexer {
  const overrides = useUi89Overrides()
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
