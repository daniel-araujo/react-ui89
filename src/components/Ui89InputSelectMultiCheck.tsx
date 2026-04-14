import React, { useState } from "react"
import { Ui89Popover } from "./Ui89Popover"
import { Ui89Card } from "./Ui89Card"
import { Ui89BoxShadow } from "./Ui89BoxShadow"
import { Ui89InputCheckList } from "./Ui89InputCheckList"
import { Ui89InputText } from "./Ui89InputText"

export interface Ui89InputSelectMultiCheckPropsRenderOption<T> {
  option: T
  index: number
}

export interface Ui89InputSelectMultiCheckProps<T> {
  value: T[]
  onChange?: (value: T[]) => void
  options: T[]
  getValueKey?: (row: T) => string
  renderOption?: (
    props: Ui89InputSelectMultiCheckPropsRenderOption<T>,
  ) => React.ReactNode
  placeholder?: string
  renderDisplay?: (props: { value: T[] }) => string
  maxHeight?: string
  optionHeight?: number
}

export function Ui89InputSelectMultiCheck<T>(
  props: Ui89InputSelectMultiCheckProps<T>,
) {
  const [open, setOpen] = useState(false)

  const displayValue = props.renderDisplay
    ? props.renderDisplay({ value: props.value })
    : props.value.map((v) => String(v)).join(", ")

  return (
    <Ui89Popover
      open={open}
      popoverOverflowForce
      onOpenChange={setOpen}
      renderContainer={({ setRef, props: popoverProps }) => (
        <div
          ref={setRef}
          {...popoverProps}
          onClick={() => setOpen(true)}
          style={{ cursor: "pointer", position: "relative" }}
        >
          <div style={{ pointerEvents: "none" }}>
            <Ui89InputText
              value={displayValue}
              onChange={() => {}}
              placeholder={props.placeholder}
            />
          </div>
        </div>
      )}
      renderPopover={() => (
        <Ui89BoxShadow>
          <Ui89Card>
            <Ui89InputCheckList
              value={props.value}
              onChange={props.onChange}
              options={props.options}
              getValueKey={props.getValueKey}
              renderOption={props.renderOption}
              maxHeight={props.maxHeight ?? "300px"}
              optionHeight={props.optionHeight}
            />
          </Ui89Card>
        </Ui89BoxShadow>
      )}
    />
  )
}
