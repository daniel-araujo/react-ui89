import React, { useMemo } from "react"
// @ts-ignore
import { VariableSizeGrid } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"
import styles from "./Ui89VirtualTable.module.css"
import { Ui89TagBox } from "./Ui89TagBox"

interface Ui89VirtualTableColumnRenderParams<T> {
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
  renderHeader: React.FC<Ui89VirtualTableColumnRenderParams<T>>
  renderBody: React.FC<Ui89VirtualTableColumnRenderParams<T>>
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

  function getColumnClass(index: number): string {
    const classes = [styles.cell]

    if (index === 0) {
      classes.push(styles["cell--first"])
    }

    if (index === columns.length - 1) {
      classes.push(styles["cell--last"])
    }

    return classes.join(" ")
  }

  return (
    <div className={styles.container}>
      {rows.length > 0 ? (
        <div className={styles.tableWrapper}>
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
                  <div className={getColumnClass(columnIndex)} style={style}>
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
