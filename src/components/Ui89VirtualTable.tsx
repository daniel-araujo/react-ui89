import React, { useCallback, useMemo, useState } from "react"
import "./Ui89VirtualTable.css"
import "../style/typo.css"
import { Ui89TagBox } from "./Ui89TagBox"
import {
  Ui89VirtualList,
  Ui89VirtualListPropsRenderRowProps,
} from "./Ui89VirtualList"

export enum Ui89VirtualTablePropsColumnAlign {
  left = "left",
  right = "right",
  center = "center",
}

export interface Ui89VirtualTablePropsColumnRenderHeaderParams<T> {
  index: number
  column: Ui89VirtualTablePropsColumn<T>
}

export interface Ui89VirtualTablePropsColumnRenderBodyParams<T> {
  index: number
  row: T
}

export interface Ui89VirtualTablePropsColumnWidth {
  stretch?: {
    min: number
  }
}

export interface Ui89VirtualTablePropsColumn<T> {
  width?: number | Ui89VirtualTablePropsColumnWidth
  halign?: keyof typeof Ui89VirtualTablePropsColumnAlign
  renderHeader?: (
    props: Ui89VirtualTablePropsColumnRenderHeaderParams<T>,
  ) => React.ReactNode
  renderBody: (
    props: Ui89VirtualTablePropsColumnRenderBodyParams<T>,
  ) => React.ReactNode
}

export interface Ui89VirtualTableProps<T> {
  maxHeight?: string
  rows?: T[]
  columns?: Ui89VirtualTablePropsColumn<T>[]
  rowHeight?: number
}

export const Ui89VirtualTable = React.memo(
  <T,>(props: Ui89VirtualTableProps<T>) => {
    const rows = useMemo<(T | undefined)[]>(() => {
      let rows: any[] = props.rows !== undefined ? props.rows.slice() : []

      rows.unshift(undefined)

      return rows
    }, [props.rows])

    const columns = useMemo(() => {
      return props.columns !== undefined ? props.columns : []
    }, [props.columns])

    const rowHeight = props.rowHeight ?? 20

    const [containerWidth, setContainerWidth] = useState(0)

    // The list reports its viewport width, which already excludes the vertical
    // scrollbar, so stretch columns leave room for it instead of overflowing
    // horizontally.
    const handleResize = useCallback(
      (size: { width: number; height: number }) => setContainerWidth(size.width),
      [],
    )

    const columnWidths = useMemo<number[]>(() => {
      const widths = new Array<number>(columns.length)
      const stretchIndices: number[] = []
      let fixedTotal = 0

      for (let i = 0; i < columns.length; i++) {
        const width = columns[i].width
        if (typeof width === "object" && width !== null && width.stretch) {
          widths[i] = width.stretch.min
          stretchIndices.push(i)
        } else if (typeof width === "number") {
          widths[i] = width
        } else {
          widths[i] = 100
        }
        fixedTotal += widths[i]
      }

      if (stretchIndices.length > 0 && containerWidth > fixedTotal) {
        const extra = Math.floor(
          (containerWidth - fixedTotal) / stretchIndices.length,
        )
        for (const i of stretchIndices) {
          widths[i] += extra
        }
      }

      return widths
    }, [columns, containerWidth])

    function getColumnWidth(index: number): number {
      return columnWidths[index]
    }

    function getColumnHorizontalOffset(columnIndex: number) {
      let offset = 0

      for (let i = 0; i < columnIndex; i++) {
        offset += getColumnWidth(i)
      }

      return offset
    }

    function isLastColumn(columnIndex: number): boolean {
      return columnIndex === columns.length - 1
    }

    function getRowClass(rowIndex: number): string {
      const classes = ["ui89-virtual-table__row"]

      if (rowIndex === 0) {
        classes.push("ui89-virtual-table__row--first")
        classes.push("ui89-typo-normal-bold")
      }

      if (rowIndex === rows.length) {
        classes.push("ui89-virtual-table__row--last")
      }

      return classes.join(" ")
    }

    function getColumnClass(columnIndex: number): string {
      const halign = columns[columnIndex].halign ?? "left"

      const classes = [
        "ui89-virtual-table__cell",
        `ui89-virtual-table__cell--halign-${halign}`,
      ]

      if (columnIndex === 0) {
        classes.push("ui89-virtual-table__cell--column-first")
      }

      if (isLastColumn(columnIndex)) {
        classes.push("ui89-virtual-table__cell--column-last")
      }

      return classes.join(" ")
    }

    /**
     * The width of an entire row.
     */
    function rowWidth() {
      return getColumnHorizontalOffset(columns.length)
    }

    const renderRow = useCallback(
      ({ index, row }: Ui89VirtualListPropsRenderRowProps<T>) => {
        return (
          <div
            className={getRowClass(index)}
            style={{ minWidth: rowWidth() + "px", height: "100%" }}
          >
            {columns.map((column, columnIndex) => {
              return (
                <div
                  key={columnIndex}
                  className={getColumnClass(columnIndex)}
                  style={{
                    top: 0,
                    height: "100%",
                    width: getColumnWidth(columnIndex) + "px",
                    left: getColumnHorizontalOffset(columnIndex) + "px",
                  }}
                >
                  {index === 0
                    ? columns[columnIndex].renderHeader
                      ? columns[columnIndex].renderHeader({
                          index: columnIndex,
                          column: column,
                        })
                      : ""
                    : columns[columnIndex].renderBody({
                        index: index - 1,
                        row: row,
                      })}
                </div>
              )
            })}
          </div>
        )
      },
      [columns, rowHeight, columnWidths],
    )

    return (
      <div>
        {rows.length > 1 ? (
          <Ui89VirtualList
            maxHeight={props.maxHeight}
            rows={rows as T[]}
            rowHeight={rowHeight}
            renderRow={renderRow}
            onResize={handleResize}
          />
        ) : (
          <div className="ui89-virtual-table__empty">
            <Ui89TagBox theme="warning">Empty</Ui89TagBox>
          </div>
        )}
      </div>
    )
  },
) as <T>(props: Ui89VirtualTableProps<T>) => JSX.Element
