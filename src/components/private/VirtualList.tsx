import React, { useState, useEffect, useRef, useMemo } from "react"

import "./VirtualList.css"
import { useResizeObserver } from "../../useResizeObserver"
import { useScrollYPosition } from "../../useScrollYPosition"

export interface VirtualListPropsRenderRowProps<T> {
  index: number
  row: T
}

export interface VirtualListProps<T> {
  rows: T[]
  rowHeight?: number
  renderRow: (props: VirtualListPropsRenderRowProps<T>) => React.ReactNode
  getRowKey?: (row: T) => string
}

interface VisibleRow<T> {
  index: number
  row: T
  key: string
  render: React.ReactNode
  style: React.CSSProperties
}

/**
 * Virtualization at row level. Great for long lists and tables with few
 * columns.
 */
export const VirtualList = React.memo(<T,>(props: VirtualListProps<T>) => {
  const scrollContainer = useRef<HTMLDivElement>(null)
  const scrollAreaContainer = useRef<HTMLDivElement>(null)

  const { size } = useResizeObserver(scrollContainer)
  const scrollY = useScrollYPosition(scrollContainer)

  const rowHeight = props.rowHeight ?? 50

  const totalHeight = rowHeight * props.rows.length

  const [visibleRows, setVisibleRows] = useState<Map<string, VisibleRow<T>>>(
    new Map(),
  )

  useEffect(() => {
    if (size.height === 0) {
      setVisibleRows(new Map())
      return
    }

    const firstIndex = Math.max(0, Math.floor(scrollY / rowHeight) - 1)
    const length = Math.min(
      props.rows.length - firstIndex,
      Math.ceil(size.height / rowHeight) + 2,
    )

    const newVisibleRows = new Map<string, VisibleRow<T>>()

    for (let index = firstIndex; index < firstIndex + length; index++) {
      let row = props.rows[index]
      let key = props.getRowKey ? props.getRowKey(row) : String(index)

      let existingRow = visibleRows.get(key)

      if (existingRow !== undefined) {
        if (existingRow.row === row) {
          // Data has technically not changed so we can reuse.
          newVisibleRows.set(key, existingRow)
          continue
        }
      }

      newVisibleRows.set(key, {
        index,
        row,
        key,
        render: props.renderRow({ index, row }),
        style: {
          transform: `translateY(${index * rowHeight}px)`,
          height: `${rowHeight}px`,
        },
      })
    }

    setVisibleRows(newVisibleRows)
  }, [props.rows, scrollY, size.height])

  const orderedVisibleRows = useMemo(() => {
    return Array.from(visibleRows.values()).sort((a, b) => a.index - b.index)
  }, [visibleRows])

  return (
    <div ref={scrollContainer} className="ui89-virtual-list">
      <div
        ref={scrollAreaContainer}
        className="ui89-virtual-list__scroll-area"
        style={{ height: `${totalHeight}px` }}
      >
        {orderedVisibleRows.map((visibleRow) => (
          <div
            key={visibleRow.key}
            className="ui89-virtual-list__row"
            style={visibleRow.style}
          >
            {visibleRow.render}
          </div>
        ))}
      </div>
    </div>
  )
}) as <T>(props: VirtualListProps<T>) => JSX.Element
