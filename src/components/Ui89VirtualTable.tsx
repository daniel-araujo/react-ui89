import React, { forwardRef, useMemo } from "react"
// @ts-ignore
import { VariableSizeGrid } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"
import "./Ui89VirtualTable.css"
import "../style/typo.css"
import { Ui89TagBox } from "./Ui89TagBox"

const HEADER_HEIGHT = 30

interface VariableSizeGridProps {
  columnIndex: number
  rowIndex: number
  style: React.CSSProperties
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
  renderHeader?: React.FC<Ui89VirtualTablePropsColumnRenderHeaderParams<T>>
  renderBody: React.FC<Ui89VirtualTablePropsColumnRenderBodyParams<T>>
}

export interface Ui89VirtualTableProps<T> {
  rows?: T[]
  columns?: Ui89VirtualTablePropsColumn<T>[]
  rowHeight?: number
}

export function Ui89VirtualTable<T>(props: Ui89VirtualTableProps<T>) {
  const rows = useMemo(() => {
    return props.rows !== undefined ? props.rows : []
  }, [props.rows])

  const columns = useMemo(() => {
    return props.columns !== undefined ? props.columns : []
  }, [props.columns])

  function getRowHeight(index: number): number {
    if (index === 0) {
      // Header.
      return HEADER_HEIGHT
    } else {
      // Body
      return props.rowHeight ?? 50
    }
  }

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

  function getColumnClass(columnIndex: number, rowIndex: number): string {
    const classes = ["ui89-virtual-table__cell"]

    if (rowIndex === 0) {
      classes.push("ui89-virtual-table__cell--row-first")
    }

    if (rowIndex === rows.length) {
      classes.push("ui89-virtual-table__cell--row-last")
    }

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

  // This is the secret to having sticky headers.
  const innerElementType = forwardRef(({ children, ...rest }: any, ref) => (
    <div ref={ref} {...rest}>
      <div className="ui89-virtual-table__header">
        {columns.map((column, index) => (
          <div
            key={index}
            className={[getColumnClass(index, 0), "ui89-typo-normal-bold"].join(
              " ",
            )}
            style={{
              left: getColumnHorizontalOffset(index),
              width: getColumnWidth(index) + "px",
              height: getRowHeight(0) + "px",
            }}
          >
            {column.renderHeader !== undefined && (
              <column.renderHeader index={index} column={column} />
            )}
          </div>
        ))}

        <div
          className="ui89-virtual-table__row-border"
          style={{ top: 0, transform: `translateY(${getRowHeight(0) + "px"})` }}
        ></div>
      </div>

      {children}
    </div>
  ))

  function renderRowBorder(columnIndex: number, style: React.CSSProperties) {
    if (!isLastColumn(columnIndex)) {
      // Do nothing.
      return
    }

    let rowBorderStyle = {
      ...style,

      // Will want to stretch width.
      left: 0,
      right: 0,
      width: undefined,
    }

    return <div className="ui89-virtual-table__row-border" style={rowBorderStyle}></div>
  }

  return (
    <div className="ui89-virtual-table">
      {rows.length > 0 ? (
        <div className="ui89-virtual-table__body">
          <AutoSizer>
            {({ height, width }) => (
              <VariableSizeGrid
                columnCount={columns.length}
                columnWidth={getColumnWidth}
                rowCount={rows.length + 1}
                rowHeight={getRowHeight}
                width={width}
                height={height}
                innerElementType={innerElementType}
              >
                {({ columnIndex, rowIndex, style }: VariableSizeGridProps) => (
                  <>
                    <div
                      className={getColumnClass(columnIndex, rowIndex)}
                      style={style}
                    >
                      {/* We do not render the first column. That space is reserved for the header */}
                      {rowIndex !== 0 &&
                        [columns[columnIndex].renderBody].map((BodyContent) => (
                          <BodyContent
                            key={rowIndex}
                            index={rowIndex - 1}
                            row={rows[rowIndex - 1]}
                          />
                        ))}
                    </div>

                    {renderRowBorder(columnIndex, style)}
                  </>
                )}
              </VariableSizeGrid>
            )}
          </AutoSizer>
        </div>
      ) : (
        <div className="ui89-virtual-table__empty">
          <Ui89TagBox theme="warning">Empty</Ui89TagBox>
        </div>
      )}
    </div>
  )
}
