import React, { useMemo } from "react"
// @ts-ignore
import { VariableSizeGrid } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"
import styles from "./Ui89VirtualTable.module.css"
import { Ui89TagBox } from "./Ui89TagBox"

interface Ui89VirtualTableColumnRenderHeaderParams<T> {
  index: number
  column: Ui89VirtualTableColumn<T>
}

interface Ui89VirtualTableColumnRenderBodyParams<T> {
  index: number
  row: T
}

interface VariableSizeGridProps {
  columnIndex: number
  rowIndex: number
  style: React.CSSProperties
}

export interface Ui89VirtualTableColumn<T> {
  width?: number
  renderHeader: React.FC<Ui89VirtualTableColumnRenderHeaderParams<T>>
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
    return props.rowHeight ?? 50
  }

  function getColumnWidth(index: number): number {
    return columns[index].width ?? 100
  }

  function getColumnClass(columnIndex: number, rowIndex: number): string {
    const classes = [styles.cell]

    if (rowIndex === 0) {
      classes.push(styles["cell--row-first"])
    }

    if (columnIndex === 0) {
      classes.push(styles["cell--column-first"])
    }

    if (columnIndex === columns.length - 1) {
      classes.push(styles["cell--column-last"])
    }

    return classes.join(" ")
  }

  return (
    <div className={styles.table}>
      {columns.length > 0 && (
        <div className={styles.tableHeader}>
          {columns.map((column, index) => (
            <div
              key={index}
              className={getColumnClass(index, 0)}
              style={{ width: getColumnWidth(index) + "px" }}
            >
              <column.renderHeader index={index} column={column} />
            </div>
          ))}
        </div>
      )}

      {rows.length > 0 ? (
        <div className={styles.tableBody}>
          <AutoSizer>
            {({ height, width }) => (
              <VariableSizeGrid
                columnCount={columns.length}
                columnWidth={getColumnWidth}
                rowCount={rows.length}
                rowHeight={getRowHeight}
                width={width}
                height={height}
              >
                {({ columnIndex, rowIndex, style }: VariableSizeGridProps) => (
                  <div
                    className={getColumnClass(columnIndex, rowIndex)}
                    style={style}
                  >
                    {[columns[columnIndex].renderBody].map((BodyContent) => (
                      <BodyContent
                        key={columnIndex}
                        index={rowIndex}
                        row={rows[rowIndex]}
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
