import React, { useMemo } from "react"
import {
  Ui89VirtualList,
  Ui89VirtualListPropsRenderRowProps,
} from "./Ui89VirtualList"
import { Ui89Card } from "./Ui89Card"
import { Ui89InputCheckBox } from "./Ui89InputCheckBox"
import "../style/text.css"

export interface Ui89InputCheckListPropsRenderOption<T> {
  option: T
  index: number
}

export interface Ui89InputCheckListProps<T> {
  value: T[]
  onChange?: (value: T[]) => void
  getValueKey?: (row: T) => string
  options: T[]
  renderOption?: (
    props: Ui89InputCheckListPropsRenderOption<T>,
  ) => React.ReactNode
  onSelect?: (option: T) => void
  onDeselect?: (option: T) => void
  optionHeight?: number
  maxHeight?: string
}

export function Ui89InputCheckList<T>(props: Ui89InputCheckListProps<T>) {
  function getValueKey(value: T) {
    return props.getValueKey !== undefined
      ? props.getValueKey(value)
      : String(value)
  }

  const valueSet = useMemo<Set<string>>(() => {
    const set = new Set<string>()
    for (const value of props.value) {
      set.add(getValueKey(value))
    }
    return set
  }, [props.value])

  const renderRow = (props2: Ui89VirtualListPropsRenderRowProps<T>) => {
    const key = getValueKey(props2.row)
    const value = valueSet.has(key)
    const label =
      props.renderOption !== undefined
        ? props.renderOption({ option: props2.row, index: props2.index })
        : String(props2.row)

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "calc(var(--ui89-safe-space) * 2)",
          height: "100%",
        }}
      >
        <Ui89InputCheckBox
          value={value}
          onChange={(value) => {
            if (value) {
              if (props.onSelect !== undefined) {
                props.onSelect(props2.row)
              }
            } else {
              if (props.onDeselect !== undefined) {
                props.onDeselect(props2.row)
              }
            }

            if (props.onChange !== undefined) {
              if (value) {
                props.onChange([...props.value, props2.row])
              } else {
                props.onChange(
                  props.value.filter((item) => getValueKey(item) !== key),
                )
              }
            }
          }}
        />
        <div className="ui89-text-ellipsis" style={{ minWidth: 0 }}>
          {label}
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxHeight: props.maxHeight,
      }}
    >
      <Ui89VirtualList
        rows={props.options}
        renderRow={renderRow}
        getRowKey={props.getValueKey}
        rowHeight={props.optionHeight ?? 40}
        maxHeight={"100%"}
      />
    </div>
  )
}

export default Ui89InputCheckList
