import React, { useState, useEffect } from "react"
import { Ui89Popover } from "./Ui89Popover"
import { Ui89Card } from "./Ui89Card"
import { Ui89Button, Ui89ButtonPropsSize } from "./Ui89Button"
import { dateFormat as formatDate } from "../date-utils"
import { Ui89InputText } from "./Ui89InputText"
import { Ui89InputTextNumber } from "./Ui89InputTextNumber"

import "./Ui89DateTimePicker.css"

import "../style/input-box.css"
import "../style/typo.css"
import HoverShadow from "./private/HoverShadow"

export interface Ui89DateTimePickerProps {
  value?: Date | null
  onChange?: (value: Date | null) => void
  dateFormat?: string
}

export function Ui89DateTimePicker(props: Ui89DateTimePickerProps) {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [viewDate, setViewDate] = useState(new Date())

  const dateFormat = props.dateFormat ?? "YYYY/MM/DD HH:mm:ss"

  useEffect(() => {
    if (props.value) {
      setInputValue(formatDate(props.value, dateFormat))
      setViewDate(props.value)
    } else {
      setInputValue("")
    }
  }, [props.value, dateFormat])

  function handleInputChange(val: string) {
    setInputValue(val)
    const date = new Date(val)
    if (!isNaN(date.getTime())) {
      if (props.onChange) props.onChange(date)
      setViewDate(date)
    } else if (val.trim() === "") {
      if (props.onChange) props.onChange(null)
    }
  }

  function adjustMonth(offset: number) {
    const newDate = new Date(viewDate)
    newDate.setMonth(newDate.getMonth() + offset)
    setViewDate(newDate)
  }

  function handleDayClick(day: Date) {
    const newDate = new Date(day)
    if (props.value) {
      newDate.setHours(props.value.getHours())
      newDate.setMinutes(props.value.getMinutes())
      newDate.setSeconds(props.value.getSeconds())
    } else {
      newDate.setHours(12, 0, 0, 0)
    }
    if (props.onChange) props.onChange(newDate)
  }

  function handleTimeChange(type: "h" | "m" | "s", val: any) {
    if (!props.value) return
    const num = parseInt(val, 10)
    if (isNaN(num)) return
    const newDate = new Date(props.value)
    if (type === "h") newDate.setHours(Math.min(23, Math.max(0, num)))
    if (type === "m") newDate.setMinutes(Math.min(59, Math.max(0, num)))
    if (type === "s") newDate.setSeconds(Math.min(59, Math.max(0, num)))
    if (props.onChange) props.onChange(newDate)
  }

  function renderCalendar() {
    const year = viewDate.getFullYear()
    const month = viewDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const startDay = firstDay.getDay()
    const startDate = new Date(year, month, 1 - startDay)

    const days = []
    const current = new Date(startDate)
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }

    return (
      <div style={{ width: "300px", padding: "10px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Ui89Button
            size={Ui89ButtonPropsSize.square}
            onClick={() => adjustMonth(-1)}
          >
            &lt;
          </Ui89Button>
          <div className="ui89-typo-normal">
            {formatDate(viewDate, "MM/YYYY")}
          </div>
          <Ui89Button
            size={Ui89ButtonPropsSize.square}
            onClick={() => adjustMonth(1)}
          >
            &gt;
          </Ui89Button>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "2px",
          }}
        >
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
            <div
              key={d}
              className="ui89-typo-small-bold"
              style={{ textAlign: "center", padding: "5px" }}
            >
              {d}
            </div>
          ))}
          {days.map((d, i) => {
            const isSelected =
              props.value &&
              d.getDate() === props.value.getDate() &&
              d.getMonth() === props.value.getMonth() &&
              d.getFullYear() === props.value.getFullYear()
            const isCurrentMonth = d.getMonth() === month

            return (
              <div
                key={i}
                className="ui89-typo-normal"
                onClick={() => handleDayClick(d)}
                style={{
                  textAlign: "center",
                  padding: "5px",
                  cursor: "pointer",
                  backgroundColor: isSelected
                    ? "var(--ui89-theme-primary-bg-color)"
                    : "transparent",
                  opacity: isCurrentMonth ? 1 : 0.3,
                }}
              >
                {d.getDate()}
              </div>
            )
          })}
        </div>
        {props.value && (
          <div
            style={{
              display: "flex",
              gap: "5px",
              marginTop: "10px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ width: "35px" }}>
              <Ui89InputTextNumber
                value={props.value.getHours()}
                onChange={(val) => handleTimeChange("h", val)}
                min={0}
                max={23}
                textAlign="right"
              />
            </div>
            :
            <div style={{ width: "35px" }}>
              <Ui89InputTextNumber
                value={props.value.getMinutes()}
                onChange={(val) => handleTimeChange("m", val)}
                min={0}
                max={59}
                textAlign="right"
              />
            </div>
            :
            <div style={{ width: "35px" }}>
              <Ui89InputTextNumber
                value={props.value.getSeconds()}
                onChange={(val) => handleTimeChange("s", val)}
                min={0}
                max={59}
                textAlign="right"
              />
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <Ui89Popover
      open={open}
      onOpenChange={setOpen}
      popoverOverflow={false}
      popoverOverflowMaxWidth={360}
      renderContainer={({ setRef, props: popoverProps }) => (
        <div className="ui89-date-time-picker" ref={setRef} {...popoverProps}>
          <Ui89InputText
            value={inputValue}
            onChange={handleInputChange}
            placeholder={dateFormat}
          />
        </div>
      )}
      renderPopover={() => (
        <div style={{ maxWidth: "360px" }}>
          <HoverShadow>
            <Ui89Card>{renderCalendar()}</Ui89Card>
          </HoverShadow>
        </div>
      )}
    />
  )
}
