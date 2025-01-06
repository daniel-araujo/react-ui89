import React from "react"
import { ToastContainer, toast } from "react-toastify"

import typoStyles from "../style/typo.module.css"
import chosenThemeStyles from "../style/chosen-theme.module.css"
import { Ui89Theme } from "../theme"

interface Ui89ToasterOptions {
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
      const classNames = ["ui89-toaster", typoStyles.normal]

      if (options.theme !== undefined) {
        classNames.push(chosenThemeStyles[options.theme])
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
