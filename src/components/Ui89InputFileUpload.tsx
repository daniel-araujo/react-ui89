import React, { useRef } from "react"

import "./Ui89InputFileUpload.css"
import "../style/typo.css"
import "../style/text.css"
import { Ui89Button } from "./Ui89Button"

export interface Ui89InputFileUploadProps {
  value?: any
  onChange?: (value: File | null) => void
}

export function Ui89InputFileUpload({
  value,
  onChange,
}: Ui89InputFileUploadProps) {
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
        className="ui89-typo-special"
        type="file"
        onChange={implOnChange}
        hidden
      />

      {value ? (
        <div className="ui89-input-file-upload">
          <Ui89Button onClick={onClick}>Change</Ui89Button>
          <span
            className={`ui89-input-file-upload__info ui89-text-single-line ui89-text-single-line--ellipsis-left`}
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
