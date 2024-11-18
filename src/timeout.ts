import Timeout from "smart-timeout"

let uniqueId = 0

export function throttledTimeout() {
  const id = String(uniqueId++)
  let callback: () => void

  return {
    call(delay: number, f: () => void) {
      callback = f

      if (Timeout.pending(id)) {
        Timeout.restart(id)
      } else {
        Timeout.set(id, () => callback(), delay)
      }
    },
  }
}

export function spacedTimeout() {
  const id = String(uniqueId++)
  let callback: () => void

  return {
    call(delay: number, f: () => void) {
      callback = f

      if (!Timeout.pending(id)) {
        Timeout.set(id, () => callback(), delay)
      }
    },
  }
}
