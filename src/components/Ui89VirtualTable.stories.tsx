import React, { useMemo, useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { fn, userEvent, within } from "@storybook/test"
import { useArgs } from "@storybook/preview-api"

import { Ui89VirtualTable } from "./Ui89VirtualTable"
import { SceneDecorator } from "../storybook/SceneDecorator"
import RenderCounter from "./RenderCounter"
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

export const HorizontalScrolling: Story = {
  args: {
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

    const columns = useMemo(() => {
      function onUpdate(index: number, event: any) {
        let newRows = rows.slice()

        newRows.splice(index, 1, String(event.target.value))

        setRows(newRows)
      }

      return [
        {
          renderHeader: () => <>Header</>,
          renderBody: (props) => {
            return (
              <input
                value={props.row}
                onChange={onUpdate.bind(null, props.index)}
              />
            )
          },
        },
      ]
    }, [rows])

    return <Ui89VirtualTable rows={rows} columns={columns} />
  },
}
