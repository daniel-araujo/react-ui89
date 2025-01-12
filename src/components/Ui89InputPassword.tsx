import React from "react"
import { useState } from "react"

import inputBoxStyles from "../style/input-box.module.css"
import typoStyles from "../style/typo.module.css"

export interface Ui89InputPasswordProps {
  value?: any
  placeholder?: string
  onChange?: (value: any) => void
}

export function Ui89InputPassword({
  value,
  placeholder,
  onChange,
}: Ui89InputPasswordProps) {
  const [intermediateValue, setIntermediateValue] = useState(value ?? "")

  const implOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = e.target.value

    setIntermediateValue(newValue)

    if (onChange) {
      onChange(newValue)
    }
  }

  return (
    <div>
      <input
        type="password"
        className={`${inputBoxStyles.inputBox} ${typoStyles.special}`}
        role="textbox"
        value={intermediateValue}
        onChange={implOnChange}
        placeholder={placeholder}
      />
    </div>
  )
}
