import React, { useState, useEffect, useRef, useMemo } from "react"

import "./VirtualList.css"
import { useResizeObserver } from "../../useResizeObserver"
import { useScrollYPosition } from "../../useScrollYPosition"

export interface VirtualListPropsChildrenProps<T> {
  index: number
  row: T
}

export interface VirtualListProps<T> {
  rows: T[]
  rowHeight?: number
  children: (props: VirtualListPropsChildrenProps<T>) => React.ReactNode
  getRowKey?: (row: T) => string
}

interface VisibleRow {
  key: string
  render: React.ReactNode
  style: React.CSSProperties
}

/**
 * Virtualization at row level. Great for long lists and tables with few
 * columns.
 */
export function VirtualList<T>(props: VirtualListProps<T>) {
  const scrollContainer = useRef<HTMLDivElement>(null)
  const scrollAreaContainer = useRef<HTMLDivElement>(null)

  const { size } = useResizeObserver(scrollContainer)

  const rowHeight = props.rowHeight ?? 50

  const totalHeight = rowHeight * props.rows.length

  const scrollY = useScrollYPosition(scrollContainer)

  const visibleRows = useMemo<VisibleRow[]>(() => {
    if (size.height === 0) {
      return []
    }

    let firstIndex = Math.max(0, Math.floor(scrollY / rowHeight) - 1)
    let length = Math.min(
      props.rows.length,
      Math.ceil(size.height / rowHeight) + 2,
    )

    let visibleRows = Array(length)

    for (let index = firstIndex; index < firstIndex + length; index++) {
      let visibleIndex = index - firstIndex
      let row = props.rows[index]

      visibleRows[visibleIndex] = {
        key: props.getRowKey ? props.getRowKey(row) : index,
        render: props.children({
          index,
          row,
        }),
        style: {
          transform: `translateY(${index * rowHeight}px)`,
          height: rowHeight + "px",
        },
      }
    }

    return visibleRows
  }, [props.rows, scrollY, size.height])

  return (
    <div ref={scrollContainer} className="ui89-virtual-list">
      <div
        ref={scrollAreaContainer}
        className="ui89-virtual-list__scroll-area"
        style={{ height: `${totalHeight}px` }}
      >
        {visibleRows.map((visibleRow) => (
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
}
