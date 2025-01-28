import React from "react"
import { useState } from "react"

import "../style/input-box.css"
import "../style/typo.css"

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
        className={`ui89-input-box ui89-typo-special`}
        role="textbox"
        value={intermediateValue}
        onChange={implOnChange}
        placeholder={placeholder}
      />
    </div>
  )
}
