import { Ui89Card } from "./Ui89Card"
import { Ui89Tabs } from "./Ui89Tabs"
import React from "react"

export default function Ui89TabbedCard({
  selected,
  onChange = () => {},
  items = [],
  children,
}: {
  selected?: string
  onChange?: (value: string) => void
  items?: {
    value: string
    label: string
  }[]
  children: React.ReactNode
}) {
  function handleOnChange(value: string) {
    onChange(value)
  }

  return (
    <Ui89Card
      topCenter={
        <Ui89Tabs selected={selected} items={items} onChange={onChange} />
      }
    >
      {children}
    </Ui89Card>
  )
}
