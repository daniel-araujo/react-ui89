import React, { useRef } from "react"

import styles from "./Ui89InputFileUpload.module.css"
import typoStyles from "../style/typo.module.css"
import textStyles from "../style/text.module.css"
import { Ui89Button } from "./Ui89Button"

export function Ui89InputFileUpload({
  value,
  onChange,
}: {
  value?: any
  onChange?: (value: File | null) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  function implOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!onChange) {
      return
    }

    if (e.target.files === null) {
      onChange(null)
      return
    }

    if (e.target.files.length === 0) {
      onChange(null)
      return
    }

    onChange(e.target.files[0])
  }

  function onClick() {
    if (inputRef.current === null) {
      return
    }

    inputRef.current.click()
  }

  return (
    <div>
      <input
        ref={inputRef}
        className={typoStyles.special}
        type="file"
        onChange={implOnChange}
        hidden
      />

      {value ? (
        <div className={styles.inputFileUpload}>
          <Ui89Button onClick={onClick}>Change</Ui89Button>
          <span
            className={`${styles.inputFileUpload__info} ${textStyles.singleLine} ${textStyles["singleLine--ellipsisLeft"]}`}
            title={value.name}
          >
            {value.name}
          </span>
        </div>
      ) : (
        <Ui89Button onClick={onClick}>Upload</Ui89Button>
      )}
    </div>
  )
}
