import { Ui89Card } from "./Ui89Card"
import { Ui89Tabs } from "./Ui89Tabs"
import React, { useCallback, useMemo } from "react"

export interface Ui89TabbedCardProps {
  selected?: any
  onChange?: (value: string | number) => void
  options?: Ui89TabbedCardPropsOption[]
}

export interface Ui89TabbedCardPropsOption {
  value: string | number
  label: string
  render: () => React.JSX.Element
}

export function Ui89TabbedCard({
  selected,
  onChange,
  options = [],
}: Ui89TabbedCardProps) {
  const selectedItem = useMemo<Ui89TabbedCardPropsOption | null>(() => {
    return options.find((item) => item.value === selected) ?? null
  }, [selected, options])

  const render = useMemo(() => {
    return selectedItem !== null ? selectedItem.render : () => <></>
  }, [selectedItem])

  const renderKey = useMemo(() => {
    return selectedItem !== null ? selectedItem.value : undefined
  }, [selectedItem])

  return (
    <Ui89Card
      topCenter={
        <Ui89Tabs selected={selected} options={options} onChange={onChange} />
      }
    >
      <React.Fragment key={renderKey}>{render()}</React.Fragment>
    </Ui89Card>
  )
}
