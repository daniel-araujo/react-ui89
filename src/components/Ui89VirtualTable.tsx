import React, { forwardRef, useMemo } from "react"
import "./Ui89VirtualTable.css"
import "../style/typo.css"
import { Ui89TagBox } from "./Ui89TagBox"
import { VirtualList } from "./private/VirtualList"

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

export interface Ui89VirtualTablePropsColumn<T> {
  width?: number
  halign?: keyof typeof Ui89VirtualTablePropsColumnAlign
  renderHeader?: (
    props: Ui89VirtualTablePropsColumnRenderHeaderParams<T>,
  ) => React.ReactNode
  renderBody: (
    props: Ui89VirtualTablePropsColumnRenderBodyParams<T>,
  ) => React.ReactNode
}

export interface Ui89VirtualTableProps<T> {
  rows?: T[]
  columns?: Ui89VirtualTablePropsColumn<T>[]
  rowHeight?: number
}

export function Ui89VirtualTable<T>(props: Ui89VirtualTableProps<T>) {
  const rows = useMemo<(T | undefined)[]>(() => {
    let rows: any[] = props.rows !== undefined ? props.rows.slice() : []

    rows.unshift(undefined)

    return rows
  }, [props.rows])

  const columns = useMemo(() => {
    return props.columns !== undefined ? props.columns : []
  }, [props.columns])

  const rowHeight = props.rowHeight ?? 20

  function getColumnWidth(index: number): number {
    return columns[index].width ?? 100
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
      classes.push("ui89-virtual-table__cell--row-first")
      classes.push("ui89-typo-normal-bold")
    }

    if (rowIndex === rows.length) {
      classes.push("ui89-virtual-table__cell--row-last")
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

  return (
    <div className="ui89-virtual-table">
      {rows.length > 1 ? (
        <VirtualList rows={rows} rowHeight={rowHeight}>
          {({ index, row }) => {
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
                            index: index,
                            row: row as T,
                          })}
                    </div>
                  )
                })}
              </div>
            )
          }}
        </VirtualList>
      ) : (
        <div className="ui89-virtual-table__empty">
          <Ui89TagBox theme="warning">Empty</Ui89TagBox>
        </div>
      )}
    </div>
  )
}
