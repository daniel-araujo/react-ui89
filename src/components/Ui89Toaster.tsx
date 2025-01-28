import React from "react"
import { ToastContainer, toast } from "react-toastify"

import "./Ui89Toaster.css"
import "../style/typo.css"
import "../style/chosen-theme.css"
import { Ui89Theme } from "../theme"

export interface Ui89ToasterOptions {
  theme?: Ui89Theme | keyof typeof Ui89Theme
  autoClose?: boolean
  duration?: number
}

export function useUi89Toaster() {
  return {
    toast(
      content: React.ReactNode,
      options: Ui89ToasterOptions = { theme: Ui89Theme.primary },
    ) {
      const classNames = ["ui89-toaster", "ui89-typo-normal"]

      if (options.theme !== undefined) {
        classNames.push(`ui89-chosen-theme-${options.theme}`)
      }

      let autoClose: boolean | number = 5000

      if (options.duration !== undefined) {
        autoClose = options.duration
      }

      if (options.autoClose !== undefined) {
        if (!options.autoClose) {
          autoClose = false
        }
      }

      return toast(() => content, {
        className: classNames.join(" "),
        type: "default",
        autoClose,
        closeButton: false,
        hideProgressBar: true,
        closeOnClick: true,
      })
    },
  }
}

export function Ui89Toaster() {
  return <ToastContainer />
}
