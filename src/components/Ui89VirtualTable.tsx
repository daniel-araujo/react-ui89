import React, { forwardRef, useMemo } from "react"
// @ts-ignore
import { VariableSizeGrid } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"
import styles from "./Ui89VirtualTable.module.css"
import { Ui89TagBox } from "./Ui89TagBox"

const HEADER_HEIGHT = 30

interface VariableSizeGridProps {
  columnIndex: number
  rowIndex: number
  style: React.CSSProperties
}

export interface Ui89VirtualTableColumnRenderHeaderParams<T> {
  index: number
  column: Ui89VirtualTableColumn<T>
}

export interface Ui89VirtualTableColumnRenderBodyParams<T> {
  index: number
  row: T
}

export interface Ui89VirtualTableColumn<T> {
  width?: number
  renderHeader?: React.FC<Ui89VirtualTableColumnRenderHeaderParams<T>>
  renderBody: React.FC<Ui89VirtualTableColumnRenderBodyParams<T>>
}

export interface Ui89VirtualTableProps<T> {
  rows?: T[]
  columns?: Ui89VirtualTableColumn<T>[]
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
      offset += getColumnWidth(columnIndex)
    }

    return offset
  }

  function getColumnClass(columnIndex: number, rowIndex: number): string {
    const classes = [styles.cell]

    if (rowIndex === 0) {
      classes.push(styles["cell--header"])
    }

    if (columnIndex === 0) {
      classes.push(styles["cell--column-first"])
    }

    if (columnIndex === columns.length - 1) {
      classes.push(styles["cell--column-last"])
    }

    return classes.join(" ")
  }

  // This is the secret to having sticky headers.
  const innerElementType = forwardRef(({ children, ...rest }: any, ref) => (
    <div ref={ref} {...rest}>
      <div className={styles.tableHeader}>
        {columns.map((column, index) => (
          <div
            className={getColumnClass(index, 0)}
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
      </div>

      {children}
    </div>
  ))

  return (
    <div className={styles.table}>
      {rows.length > 0 ? (
        <div className={styles.tableBody}>
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
                  <div
                    className={getColumnClass(columnIndex, rowIndex)}
                    style={style}
                  >
                    {/* We do not render the first column. That space is reserved for the header */}
                    {rowIndex !== 0 &&
                      [columns[columnIndex].renderBody].map((BodyContent) => (
                        <BodyContent
                          index={rowIndex - 1}
                          row={rows[rowIndex - 1]}
                        />
                      ))}
                  </div>
                )}
              </VariableSizeGrid>
            )}
          </AutoSizer>
        </div>
      ) : (
        <div className={styles.empty}>
          <Ui89TagBox theme="warn">Empty</Ui89TagBox>
        </div>
      )}
    </div>
  )
}
