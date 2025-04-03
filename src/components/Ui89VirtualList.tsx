import React, { useState, useEffect, useRef, useMemo } from "react"

import "./Ui89VirtualList.css"
import { useResizeObserver } from "../useResizeObserver"
import { useScrollYPosition } from "../useScrollYPosition"

export interface Ui89VirtualListPropsRenderRowProps<T> {
  index: number
  row: T
}

export interface Ui89VirtualListProps<T> {
  maxHeight?: string
  rows: T[]
  rowHeight?: number
  renderRow: (props: Ui89VirtualListPropsRenderRowProps<T>) => React.ReactNode
  getRowKey?: (row: T) => string
}

interface VisibleRow<T> {
  userKey: string
  index: number
  row: T
  key: number
  render: React.ReactNode
  style: React.CSSProperties
}

function popAnyEntry<K, V>(map: Map<K, V>): V | undefined {
  const iterator = map.keys().next()
  if (!iterator.done) {
    const key = iterator.value
    const value = map.get(key)!
    map.delete(key)
    return value
  }
  return undefined
}

/**
 * Virtualization at row level. Great for long lists.
 *
 * Can be used to implement table components with few columns.
 */
export const Ui89VirtualList = React.memo(
  <T,>(props: Ui89VirtualListProps<T>) => {
    const keyCounter = useRef<number>(0)
    const scrollContainer = useRef<HTMLDivElement>(null)
    const scrollAreaContainer = useRef<HTMLDivElement>(null)

    const { size } = useResizeObserver(scrollContainer)
    const scrollY = useScrollYPosition(scrollContainer)

    const rowHeight = props.rowHeight ?? 50

    const totalHeight = rowHeight * props.rows.length

    const [visibleRows, setVisibleRows] = useState<Map<string, VisibleRow<T>>>(
      new Map(),
    )

    function updateVisibleRows(cache: Map<string, VisibleRow<T>>) {
      if (size.height === 0) {
        setVisibleRows(new Map())
        return
      }

      const firstIndex = Math.max(0, Math.floor(scrollY / rowHeight) - 1)
      const length = Math.min(
        props.rows.length - firstIndex,
        Math.ceil(size.height / rowHeight) + 2,
      )

      const deletedRows = new Map(cache)

      // Must find the ones that are no longer visible.
      for (let index = firstIndex; index < firstIndex + length; index++) {
        let row = props.rows[index]
        let key = props.getRowKey ? props.getRowKey(row) : String(index)
        deletedRows.delete(key)
      }

      const newVisibleRows = new Map<string, VisibleRow<T>>()

      for (let index = firstIndex; index < firstIndex + length; index++) {
        let row = props.rows[index]
        let key = props.getRowKey ? props.getRowKey(row) : String(index)

        let existingRow = cache.get(key)

        if (existingRow !== undefined) {
          if (existingRow.row === row) {
            // Data has technically not changed so we can reuse.
          } else {
            // Data has changed, must update render.
            existingRow.render = props.renderRow({ index, row })
          }

          newVisibleRows.set(key, existingRow)

          continue
        }

        let oldRow = popAnyEntry(deletedRows)

        if (oldRow !== undefined) {
          oldRow.index = index
          oldRow.row = row
          oldRow.userKey = key
          oldRow.render = props.renderRow({ index, row })
          oldRow.style = {
            transform: `translateY(${index * rowHeight}px)`,
            height: `${rowHeight}px`,
          }
          newVisibleRows.set(key, oldRow)
        } else {
          // New row.
          newVisibleRows.set(key, {
            index,
            row,
            key: keyCounter.current++,
            userKey: key,
            render: props.renderRow({ index, row }),
            style: {
              transform: `translateY(${index * rowHeight}px)`,
              height: `${rowHeight}px`,
            },
          })
        }
      }

      setVisibleRows(newVisibleRows)
    }

    useEffect(() => {
      // The renderRow function may have a reference to the rows array. if we
      // do not throw away our cache we risk leaving rows referencing
      // stale data.
      updateVisibleRows(new Map())
    }, [props.rows, props.renderRow])

    useEffect(() => {
      updateVisibleRows(visibleRows)
    }, [scrollY, size.height])

    const orderedVisibleRows = useMemo(() => {
      return Array.from(visibleRows.values()).sort((a, b) => a.index - b.index)
    }, [visibleRows])

    return (
      <div
        ref={scrollContainer}
        className="ui89-virtual-list"
        style={{ maxHeight: props.maxHeight }}
      >
        <div
          ref={scrollAreaContainer}
          className="ui89-virtual-list__scroll-area"
          style={{ height: `${totalHeight}px` }}
        >
          {orderedVisibleRows.map((visibleRow) => (
            <div
              key={visibleRow.userKey}
              className="ui89-virtual-list__row"
              style={visibleRow.style}
            >
              {visibleRow.render}
            </div>
          ))}
        </div>
      </div>
    )
  },
) as <T>(props: Ui89VirtualListProps<T>) => JSX.Element
