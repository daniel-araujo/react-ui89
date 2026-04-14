import React, { useState } from "react"
import { Ui89Popover } from "./Ui89Popover"
import { Ui89Card } from "./Ui89Card"
import { Ui89BoxShadow } from "./Ui89BoxShadow"
import { Ui89InputCheckList } from "./Ui89InputCheckList"
import "../style/input-box.css"

export interface Ui89InputSelectMultiTagPropsRenderOption<T> {
  option: T
  index: number
}

export interface Ui89InputSelectMultiTagProps<T> {
  value: T[]
  onChange?: (value: T[]) => void
  options: T[]
  getValueKey?: (row: T) => string
  renderOption?: (
    props: Ui89InputSelectMultiTagPropsRenderOption<T>,
  ) => React.ReactNode
  renderTag?: (option: T) => React.ReactNode
  placeholder?: string
  maxHeight?: string
  optionHeight?: number
}

export function Ui89InputSelectMultiTag<T>(
  props: Ui89InputSelectMultiTagProps<T>,
) {
  const [open, setOpen] = useState(false)

  function getValueKey(value: T) {
    return props.getValueKey !== undefined
      ? props.getValueKey(value)
      : String(value)
  }

  function removeTag(e: React.MouseEvent, tagToRemove: T) {
    // Prevents the menu from opening again
    e.stopPropagation()

    if (props.onChange) {
      const keyToRemove = getValueKey(tagToRemove)
      props.onChange(props.value.filter((v) => getValueKey(v) !== keyToRemove))
    }
  }

  return (
    <Ui89Popover
      open={open}
      onOpenChange={setOpen}
      popoverOverflowForce
      renderContainer={({ setRef, props: popoverProps }) => (
        <div
          ref={setRef}
          {...popoverProps}
          onClick={() => setOpen(true)}
          className={[
            "ui89-input-box",
            "ui89-input-box--unselectable",
            "ui89-input-box--clickable",
          ].join(" ")}
          style={{
            cursor: "pointer",
            minHeight: "40px",
            display: "flex",
            flexWrap: "wrap",
            gap: "calc(var(--ui89-safe-space) * 1)",
            alignItems: "center",
            paddingTop: "calc(var(--ui89-safe-space) * 0.5)",
            paddingBottom: "calc(var(--ui89-safe-space) * 0.5)",
          }}
        >
          {props.value.length === 0 && props.placeholder && (
            <span>{props.placeholder}</span>
          )}
          {props.value.map((tag) => (
            <div
              key={getValueKey(tag)}
              style={{
                display: "flex",
                alignItems: "center",
                border: "2px solid",
                padding: "2px calc(var(--ui89-safe-space) * 1)",
                gap: "calc(var(--ui89-safe-space) * 1)",
              }}
            >
              <span>
                {props.renderTag !== undefined
                  ? props.renderTag(tag)
                  : String(tag)}
              </span>
              <div
                onClick={(e) => removeTag(e, tag)}
                style={{
                  cursor: "pointer",
                }}
              >
                [X]
              </div>
            </div>
          ))}
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
