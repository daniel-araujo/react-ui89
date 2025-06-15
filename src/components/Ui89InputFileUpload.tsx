import React, { useRef } from "react"

import "./Ui89InputFileUpload.css"
import "../style/typo.css"
import "../style/text.css"
import { Ui89Button } from "./Ui89Button"

export interface Ui89InputFileUploadProps {
  /**
   * The file that is currently selected.
   */
  value?: any

  /**
   * Called when a new file is selected or when the currently selected file
   * is deselected.
   */
  onChange?: (value: File | null) => void

  /**
   * The `accept` attribute specifies the types of files that can be selected, using a
   * comma-separated list of file type specifiers. Valid values include:
   *
   * - File extensions (case-insensitive), beginning with a dot (e.g., `.jpg`, `.pdf`, `.doc`)
   * - MIME types (e.g., `application/pdf`, `image/png`)
   * - Wildcard types:
   *   - `audio/*` for any audio files
   *   - `video/*` for any video files
   *   - `image/*` for any image files
   */
  accept?: string
}

export function Ui89InputFileUpload(props: Ui89InputFileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  function implOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!props.onChange) {
      return
    }

    if (e.target.files === null) {
      props.onChange(null)
      return
    }

    if (e.target.files.length === 0) {
      props.onChange(null)
      return
    }

    props.onChange(e.target.files[0])

    // Reset the file input's value to allow selecting the same file again.
    e.target.value = ""
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
        accept={props.accept}
        hidden
      />

      {props.value ? (
        <div className="ui89-input-file-upload">
          <Ui89Button onClick={onClick}>Change</Ui89Button>
          <span
            className={`ui89-input-file-upload__info ui89-text-single-line ui89-text-single-line--ellipsis-left`}
            title={props.value.name}
          >
            {props.value.name}
          </span>
        </div>
      ) : (
        <Ui89Button onClick={onClick}>Upload</Ui89Button>
      )}
    </div>
  )
}
