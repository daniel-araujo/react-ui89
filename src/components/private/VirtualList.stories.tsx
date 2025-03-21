import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, screen, userEvent } from "@storybook/test"

import { VirtualList } from "./VirtualList"
import { SceneDecorator } from "../../storybook/SceneDecorator"
import RenderCounter from "./RenderCounter"

const meta: Meta<typeof VirtualList> = {
  component: VirtualList,
  tags: ["autodocs"],
  decorators: [SceneDecorator],
}

export default meta

type Story = StoryObj<typeof meta>

function renderAsIs({ row }) {
  return row
}

export const Empty: Story = {
  args: {
    rows: [],
  },

  render: (args, context) => {
    return (
      <div style={{ height: "500px" }}>
        <VirtualList {...args}>{renderAsIs}</VirtualList>
      </div>
    )
  },
}

export const SmallList: Story = {
  args: {
    rows: [1, 2, 3, 4, 5],
  },

  render: (args, context) => {
    return (
      <div style={{ height: "500px" }}>
        <VirtualList {...args}>{renderAsIs}</VirtualList>
      </div>
    )
  },
}

export const BigList: Story = {
  args: {
    rows: Array.from({ length: 100 }, (_, i) => i + 1),
  },

  render: (args, context) => {
    return (
      <div style={{ height: "500px" }}>
        <VirtualList {...args}>{renderAsIs}</VirtualList>
      </div>
    )
  },
}

export const CounterRender: Story = {
  args: {
    rows: Array.from({ length: 100 }, (_, i) => i + 1),
  },

  render: (args, context) => {
    return (
      <div style={{ height: "500px" }}>
        <VirtualList {...args}>{() => <RenderCounter />}</VirtualList>
      </div>
    )
  },
}
