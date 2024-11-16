import { Ui89Card } from "./Ui89Card"
import { Ui89Tabs } from "./Ui89Tabs"
import React, { useCallback, useMemo } from "react"

export interface Ui89TabbedCardProps {
  selected?: string
  onChange?: (value: string) => void
  items?: Ui89TabbedCardPropsItem[]
}

export interface Ui89TabbedCardPropsItem {
  value: string
  label: string
  render: () => React.JSX.Element
}

export function Ui89TabbedCard({
  selected,
  onChange = () => {},
  items = [],
}: Ui89TabbedCardProps) {
  const selectedItem = useMemo<Ui89TabbedCardPropsItem | null>(() => {
    return items.find((item) => item.value === selected) ?? null
  }, [selected, items])

  const Content = useMemo(() => {
    return selectedItem !== null ? selectedItem.render : () => <></>
  }, [selectedItem])

  return (
    <Ui89Card
      topCenter={
        <Ui89Tabs selected={selected} items={items} onChange={onChange} />
      }
    >
      <Content />
    </Ui89Card>
  )
}
