import React, { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, screen, userEvent, within } from "@storybook/test"

import {
  Ui89VirtualList,
  Ui89VirtualListPropsRenderRowProps,
} from "./Ui89VirtualList"
import { SceneDecorator } from "../storybook/SceneDecorator"
import RenderCounter from "./private/RenderCounter"
import { Ui89Button } from "./Ui89Button"

const meta: Meta<typeof Ui89VirtualList> = {
  component: Ui89VirtualList,
  tags: ["autodocs"],
  decorators: [SceneDecorator],
}

export default meta

type Story = StoryObj<typeof meta>

function renderAsIs({ row }: Ui89VirtualListPropsRenderRowProps<any>) {
  return row
}

export const Empty: Story = {
  args: {
    maxHeight: "500px",
    rows: [],
    renderRow: renderAsIs,
  },
}

export const SmallList: Story = {
  args: {
    maxHeight: "500px",
    rows: [1, 2, 3, 4, 5],
    renderRow: renderAsIs,
  },
}

export const BigList: Story = {
  args: {
    maxHeight: "500px",
    rows: Array.from({ length: 100 }, (_, i) => i + 1),
    renderRow: renderAsIs,
  },
}

export const CounterRender: Story = {
  args: {
    maxHeight: "500px",
    rows: Array.from({ length: 100 }, (_, i) => i + 1),
    renderRow: () => <RenderCounter />,
  },

  render: (args, context) => {
    return (
      <div style={{ height: "500px" }}>
        <Ui89VirtualList {...args} />
      </div>
    )
  },
}

export const UpdatesRowsWhenChanged: Story = {
  render: (args) => {
    const [rows, setRows] = useState<number[]>([1, 2, 3])

    function onClickRefresh() {
      let newRows = rows.slice()
      newRows[2] += 1
      setRows(newRows)
    }

    return (
      <>
        <Ui89Button onClick={onClickRefresh}>Refresh third row</Ui89Button>

        <div style={{ height: "500px" }}>
          <Ui89VirtualList rows={rows} renderRow={renderAsIs} />
        </div>
      </>
    )
  },

  play: async (context) => {
    const canvas = within(context.canvasElement)

    await new Promise((resolve) => setTimeout(resolve, 5))

    const button = canvas.getByRole("button", {
      name: "Refresh third row",
    })

    await userEvent.click(button)

    await canvas.findByText("4")
  },
}

export const RendersAllRowsAgain: Story = {
  render: (args) => {
    const [rows, setRows] = useState<number[]>([1, 2, 3])

    function onClickRefresh() {
      let newRows = rows.slice()
      newRows[2] += 1
      setRows(newRows)
    }

    function renderRow({ row }: any) {
      return (
        <>
          {row} (total: {rows.reduce((p, c) => c + p, 0)})
        </>
      )
    }

    return (
      <>
        <Ui89Button onClick={onClickRefresh}>Refresh third row</Ui89Button>

        <div style={{ height: "500px" }}>
          <Ui89VirtualList rows={rows} renderRow={renderRow} />
        </div>
      </>
    )
  },

  play: async (context) => {
    const canvas = within(context.canvasElement)

    await new Promise((resolve) => setTimeout(resolve, 5))

    const button = canvas.getByRole("button", {
      name: "Refresh third row",
    })

    await userEvent.click(button)

    await canvas.findByText("1 (total: 7)")
    await canvas.findByText("2 (total: 7)")
    await canvas.findByText("4 (total: 7)")
  },
}
