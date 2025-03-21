import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, screen, userEvent } from "@storybook/test"

import { VirtualList, VirtualListPropsRenderRowProps } from "./VirtualList"
import { SceneDecorator } from "../../storybook/SceneDecorator"
import RenderCounter from "./RenderCounter"

const meta: Meta<typeof VirtualList> = {
  component: VirtualList,
  tags: ["autodocs"],
  decorators: [SceneDecorator],
}

export default meta

type Story = StoryObj<typeof meta>

function renderAsIs({ row }: VirtualListPropsRenderRowProps<any>) {
  return row
}

export const Empty: Story = {
  args: {
    rows: [],
    renderRow: renderAsIs,
  },

  render: (args, context) => {
    return (
      <div style={{ height: "500px" }}>
        <VirtualList {...args} />
      </div>
    )
  },
}

export const SmallList: Story = {
  args: {
    rows: [1, 2, 3, 4, 5],
    renderRow: renderAsIs,
  },

  render: (args, context) => {
    return (
      <div style={{ height: "500px" }}>
        <VirtualList {...args} />
      </div>
    )
  },
}

export const BigList: Story = {
  args: {
    rows: Array.from({ length: 100 }, (_, i) => i + 1),
    renderRow: renderAsIs,
  },

  render: (args, context) => {
    return (
      <div style={{ height: "500px" }}>
        <VirtualList {...args} />
      </div>
    )
  },
}

export const CounterRender: Story = {
  args: {
    rows: Array.from({ length: 100 }, (_, i) => i + 1),
    renderRow: () => <RenderCounter />,
  },

  render: (args, context) => {
    return (
      <div style={{ height: "500px" }}>
        <VirtualList {...args} />
      </div>
    )
  },
}
