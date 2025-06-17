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

    /**
     * If there is a call that has been scheduled, remove it from the queue.
     */
    abort() {
      Timeout.clear(id, true)
    },

    /**
     * Lets you know whether a call is pending.
     */
    isPending() {
      return Timeout.pending(id)
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
