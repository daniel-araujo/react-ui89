import React, { useMemo, useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, userEvent, waitFor, within } from "storybook/test"
import { useArgs } from "storybook/preview-api"

import {
  Ui89VirtualTable,
  Ui89VirtualTablePropsColumn,
} from "./Ui89VirtualTable"
import { SceneDecorator } from "../storybook/SceneDecorator"
import RenderCounter from "./private/RenderCounter"
import { Ui89Button } from "./Ui89Button"

const meta: Meta<typeof Ui89VirtualTable> = {
  component: Ui89VirtualTable,
  tags: ["autodocs"],
  decorators: [SceneDecorator],
}

export default meta

type Story = StoryObj<typeof meta>

export const Empty: Story = {}

export const EmptyWithColumns: Story = {
  args: {
    maxHeight: "500px",
    columns: [
      {
        renderHeader: () => <>Header #1</>,
        renderBody: ({ index }) => <>Row #{index}</>,
      },
      {
        width: 300,
        renderHeader: () => <>Header #2</>,
        renderBody: () => <>Second column</>,
      },
    ],
  },
}

export const TwoColumns: Story = {
  args: {
    maxHeight: "500px",
    rows: new Array(2),
    columns: [
      {
        renderHeader: () => <>Header #1</>,
        renderBody: ({ index }) => <>Row #{index}</>,
      },
      {
        width: 300,
        renderHeader: () => <>Header #2</>,
        renderBody: () => <>Second column</>,
      },
    ],
  },
}

export const ColumnHorizontalOverflow: Story = {
  args: {
    maxHeight: "500px",
    rows: new Array(2),
    columns: [
      {
        renderHeader: () => <>Header #1</>,
        renderBody: ({ index }) => <>Row #{index}</>,
      },
      {
        width: 300,
        renderHeader: () => <>Header #2</>,
        renderBody: () => <>Secondcolumn</>,
      },
      {
        width: 500,
        renderHeader: () => <>Header #3</>,
        renderBody: () => <>Thirdcolumn.Third column.Third column</>,
      },
    ],
  },
}

export const ColumnVerticalOverflow: Story = {
  args: {
    maxHeight: "500px",
    rows: new Array(2),
    columns: [
      {
        renderHeader: () => <>Header #1</>,
        renderBody: ({ index }) => <>Row #{index}</>,
      },
      {
        width: 300,
        renderHeader: () => <>Header #2</>,
        renderBody: () => <>Second column</>,
      },
      {
        width: 500,
        renderHeader: () => <>Header #3</>,
        renderBody: () => <>Third column. Third column. Third column</>,
      },
    ],
  },
}

export const VerticalScrolling: Story = {
  args: {
    maxHeight: "500px",
    rows: new Array(200),
    columns: [
      {
        renderHeader: () => <>Header #1</>,
        renderBody: ({ index }) => <>Row #{index}</>,
      },
      {
        width: 300,
        renderHeader: () => <>Header #2</>,
        renderBody: () => <>Second column</>,
      },
      {
        width: 300,
        renderHeader: () => <>Header #3</>,
        renderBody: () => <>Third column.</>,
      },
    ],
  },
}

function getCellByText(
  canvas: ReturnType<typeof within>,
  text: string,
): HTMLElement {
  const element = canvas.getByText(text)
  const cell = element.closest(".ui89-virtual-table__cell") as HTMLElement
  if (!cell) throw new Error(`No cell found for text "${text}"`)
  return cell
}

export const StretchColumnFillsRemainingSpace: Story = {
  render: () => {
    const columns = useMemo<Ui89VirtualTablePropsColumn<any>[]>(
      () => [
        {
          width: 200,
          renderHeader: () => <>FixedLeft</>,
          renderBody: ({ index }) => <>Row #{index}</>,
        },
        {
          width: { stretch: { min: 100 } },
          renderHeader: () => <>StretchHeader</>,
          renderBody: () => <>Stretchy body</>,
        },
        {
          width: 200,
          renderHeader: () => <>FixedRight</>,
          renderBody: () => <>Last column</>,
        },
      ],
      [],
    )

    return (
      <div style={{ width: "1000px" }}>
        <Ui89VirtualTable
          maxHeight="500px"
          rows={new Array(3)}
          columns={columns}
        />
      </div>
    )
  },

  play: async (context) => {
    const canvas = within(context.canvasElement)

    await waitFor(() => {
      const stretchCell = getCellByText(canvas, "StretchHeader")
      const fixedLeft = getCellByText(canvas, "FixedLeft")
      const fixedRight = getCellByText(canvas, "FixedRight")

      expect(fixedLeft.style.width).toBe("200px")
      expect(fixedRight.style.width).toBe("200px")
      // Container is 1000px, fixed columns take 400px, so stretch should
      // grow well beyond its 100px minimum.
      expect(stretchCell.offsetWidth).toBeGreaterThan(500)
    })
  },
}

export const StretchColumnRespectsMinWhenContainerTooNarrow: Story = {
  render: () => {
    const columns = useMemo<Ui89VirtualTablePropsColumn<any>[]>(
      () => [
        {
          width: 500,
          renderHeader: () => <>FixedLeft</>,
          renderBody: ({ index }) => <>Row #{index}</>,
        },
        {
          width: { stretch: { min: 150 } },
          renderHeader: () => <>StretchHeader</>,
          renderBody: () => <>Stretchy body</>,
        },
        {
          width: 500,
          renderHeader: () => <>FixedRight</>,
          renderBody: () => <>Last column</>,
        },
      ],
      [],
    )

    return (
      <div style={{ width: "300px" }}>
        <Ui89VirtualTable
          maxHeight="500px"
          rows={new Array(3)}
          columns={columns}
        />
      </div>
    )
  },

  play: async (context) => {
    const canvas = within(context.canvasElement)

    await waitFor(() => {
      const stretchCell = getCellByText(canvas, "StretchHeader")
      // Container is 300px but fixed columns alone need 1000px. Stretch
      // column must remain at its minimum (150px).
      expect(stretchCell.style.width).toBe("150px")
    })
  },
}

export const MultipleStretchColumnsShareRemainingSpace: Story = {
  render: () => {
    const columns = useMemo<Ui89VirtualTablePropsColumn<any>[]>(
      () => [
        {
          width: 200,
          renderHeader: () => <>Fixed</>,
          renderBody: ({ index }) => <>Row #{index}</>,
        },
        {
          width: { stretch: { min: 50 } },
          renderHeader: () => <>StretchA</>,
          renderBody: () => <>A</>,
        },
        {
          width: { stretch: { min: 50 } },
          renderHeader: () => <>StretchB</>,
          renderBody: () => <>B</>,
        },
      ],
      [],
    )

    return (
      <div style={{ width: "1000px" }}>
        <Ui89VirtualTable
          maxHeight="500px"
          rows={new Array(3)}
          columns={columns}
        />
      </div>
    )
  },

  play: async (context) => {
    const canvas = within(context.canvasElement)

    await waitFor(() => {
      const stretchA = getCellByText(canvas, "StretchA")
      const stretchB = getCellByText(canvas, "StretchB")

      // Both stretch columns should be expanded above min and approximately
      // equal in width.
      expect(stretchA.offsetWidth).toBeGreaterThan(300)
      expect(stretchB.offsetWidth).toBeGreaterThan(300)
      expect(
        Math.abs(stretchA.offsetWidth - stretchB.offsetWidth),
      ).toBeLessThan(2)
    })
  },
}

export const StretchColumnAccountsForVerticalScrollbar: Story = {
  render: () => {
    const columns = useMemo<Ui89VirtualTablePropsColumn<any>[]>(
      () => [
        {
          width: 200,
          renderHeader: () => <>FixedLeft</>,
          renderBody: ({ index }) => <>Row #{index}</>,
        },
        {
          width: { stretch: { min: 100 } },
          renderHeader: () => <>StretchHeader</>,
          renderBody: () => <>Stretchy body</>,
        },
        {
          width: 200,
          renderHeader: () => <>FixedRight</>,
          renderBody: () => <>Last column</>,
        },
      ],
      [],
    )

    return (
      <div style={{ width: "1000px" }}>
        {/* Many rows so the list overflows vertically and grows a vertical
            scrollbar. The stretch column must shrink to leave room for it,
            otherwise a horizontal scrollbar appears. */}
        <Ui89VirtualTable
          maxHeight="200px"
          rows={new Array(500)}
          columns={columns}
        />
      </div>
    )
  },

  play: async (context) => {
    const scroller = context.canvasElement.querySelector(
      ".ui89-virtual-list",
    ) as HTMLElement

    await waitFor(() => {
      expect(scroller).toBeTruthy()

      // The vertical scrollbar must be present for this story to be
      // meaningful.
      expect(scroller.scrollHeight).toBeGreaterThan(scroller.clientHeight)

      // The content must fit horizontally within the scroll viewport. When
      // the vertical scrollbar is not accounted for, scrollWidth exceeds
      // clientWidth and a horizontal scrollbar appears.
      expect(scroller.scrollWidth).toBeLessThanOrEqual(scroller.clientWidth)
    })
  },
}

export const NumericWidthIsUnaffectedByStretchLogic: Story = {
  render: () => {
    const columns = useMemo<Ui89VirtualTablePropsColumn<any>[]>(
      () => [
        {
          width: 250,
          renderHeader: () => <>Header250</>,
          renderBody: ({ index }) => <>Row #{index}</>,
        },
        {
          width: 350,
          renderHeader: () => <>Header350</>,
          renderBody: () => <>Right</>,
        },
      ],
      [],
    )

    return (
      <div style={{ width: "1200px" }}>
        <Ui89VirtualTable
          maxHeight="500px"
          rows={new Array(3)}
          columns={columns}
        />
      </div>
    )
  },

  play: async (context) => {
    const canvas = within(context.canvasElement)

    await waitFor(() => {
      const a = getCellByText(canvas, "Header250")
      const b = getCellByText(canvas, "Header350")

      // With no stretch column, leftover space must not be redistributed.
      expect(a.style.width).toBe("250px")
      expect(b.style.width).toBe("350px")
    })
  },
}

export const HorizontalScrolling: Story = {
  args: {
    maxHeight: "500px",
    rows: new Array(2),
    columns: [
      {
        width: 400,
        renderHeader: () => <>Header #1</>,
        renderBody: ({ index }) => <>Row #{index}</>,
      },
      {
        width: 800,
        renderHeader: () => <>Header #2</>,
        renderBody: () => <>Second column</>,
      },
      {
        width: 400,
        renderHeader: () => <>Header #3</>,
        renderBody: () => <>Third column.</>,
      },
      {
        width: 400,
        renderHeader: () => <>Header #4</>,
        renderBody: () => <>Fourth column.</>,
      },
      {
        width: 400,
        renderHeader: () => <>Header #5</>,
        renderBody: () => <>Fifth column.</>,
      },
    ],
  },
}

export const AlignsColumnItemsVertically: Story = {
  args: {
    maxHeight: "500px",
    rows: new Array(200),
    rowHeight: 50,
    columns: [
      {
        width: 300,
        renderHeader: () => <>Header #1</>,
        renderBody: ({ index }) => (
          <>
            <div>Row #{index}</div>
            <div>Second line</div>
          </>
        ),
      },
      {
        width: 300,
        renderHeader: () => <>Header #2</>,
        renderBody: () => <>Second column</>,
      },
    ],
  },
}

export const AlignColumnsHorizontally: Story = {
  args: {
    maxHeight: "500px",
    rows: new Array(200),
    rowHeight: 50,
    columns: [
      {
        width: 300,
        renderHeader: () => <>Default</>,
        renderBody: ({ index }) => (
          <>
            <div>Row #{index}</div>
            <div>Second line</div>
          </>
        ),
      },
      {
        width: 300,
        halign: "left",
        renderHeader: () => <>Align left</>,
        renderBody: ({ index }) => (
          <>
            <div>Row #{index}</div>
            <div>Second line</div>
          </>
        ),
      },
      {
        width: 300,
        halign: "right",
        renderHeader: () => <>Align right</>,
        renderBody: ({ index }) => (
          <>
            <div>Row #{index}</div>
            <div>Second line</div>
          </>
        ),
      },
      {
        width: 300,
        halign: "center",
        renderHeader: () => <>Align Center</>,
        renderBody: ({ index }) => (
          <>
            <div>Row #{index}</div>
            <div>Second line</div>
          </>
        ),
      },
    ],
  },
}

export const NotEnoughColumnsAndRows: Story = {
  args: {
    maxHeight: "500px",
    rows: new Array(2),
    columns: [
      {
        renderHeader: () => <>Header #1</>,
        renderBody: ({ index }) => <>Row #{index}</>,
      },
      {
        width: 300,
        renderHeader: () => <>Header #2</>,
        renderBody: () => <>Second column</>,
      },
    ],
  },
}

export const BodyColumnsDoNotLoseState: Story = {
  args: {
    maxHeight: "500px",
    rows: new Array(200),
    columns: [
      {
        renderHeader: () => <>Header #1</>,
        renderBody: ({ index }) => <>Row #{index}</>,
      },
      {
        width: 300,
        renderHeader: () => <>Header #2</>,
        renderBody: () => <RenderCounter />,
      },
      {
        width: 300,
        renderHeader: () => <>Header #3</>,
        renderBody: () => <RenderCounter />,
      },
    ],
  },
}

export const DoesNotLoseStateAfterReplacingData: Story = {
  args: {
    maxHeight: "500px",
    rows: new Array(200),
    columns: [
      {
        renderHeader: () => <>Header</>,
        renderBody: () => <RenderCounter />,
      },
    ],
  },

  render: () => {
    const [args, updateArgs] = useArgs()

    function onClickRefresh() {
      updateArgs(args)
    }

    return (
      <>
        <Ui89Button onClick={onClickRefresh}>Refresh data</Ui89Button>
        <Ui89VirtualTable {...args} />
      </>
    )
  },

  play: async (context) => {
    const canvas = within(context.canvasElement)

    // TODO: Move scroll

    const button = canvas.getByRole("button", {
      name: "Refresh data",
    })

    await userEvent.click(button)
  },
}

export const CanTypeWithoutLosingFocusWhenUpdatingData: Story = {
  render: (args) => {
    const [rows, setRows] = useState(new Array(200))

    const columns = useMemo<Ui89VirtualTablePropsColumn<any>[]>(() => {
      function onUpdate(index: number, event: any) {
        let newRows = rows.slice()

        newRows.splice(index, 1, String(event.target.value))

        setRows(newRows)
      }

      return [
        {
          width: 300,
          renderHeader: () => <>Header</>,
          renderBody: (props) => {
            return (
              <div style={{ display: "flex" }}>
                <input
                  value={props.row}
                  onChange={onUpdate.bind(null, props.index)}
                />

                <RenderCounter />
              </div>
            )
          },
        },
      ]
    }, [rows])

    return <Ui89VirtualTable maxHeight="500px" rows={rows} columns={columns} />
  },
}

export const RenderBodyReceivesCorrespondingIndexAndRow: Story = {
  args: {
    maxHeight: "500px",
    rows: [1, 2, 3],
    columns: [
      {
        width: 500,
        renderHeader: () => <>Header</>,
        renderBody: fn((props) => {
          return <>{JSON.stringify(props)}</>
        }),
      },
    ],
  },

  play: async (context) => {
    await waitFor(() => {
      expect(context.args.columns![0].renderBody).toHaveBeenCalledWith({
        index: 0,
        row: 1,
      })
      expect(context.args.columns![0].renderBody).toHaveBeenCalledWith({
        index: 1,
        row: 2,
      })
      expect(context.args.columns![0].renderBody).toHaveBeenCalledWith({
        index: 2,
        row: 3,
      })
    })
  },
}
