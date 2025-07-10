import React from "react"
import type { Meta, StoryObj } from "@storybook/react"

import { Ui89Indent } from "./Ui89Indent"
import { SceneDecorator } from "../storybook/SceneDecorator"

const meta: Meta<typeof Ui89Indent> = {
  component: Ui89Indent,
  tags: ["autodocs"],
  decorators: [SceneDecorator],
}

export default meta

type Story = StoryObj<typeof meta>

export const Comparison: Story = {
  args: {
    children: "Indented content goes here",
  },

  render: (args, context) => (
    <>
      Normal flow here.
      <Ui89Indent {...args} />
    </>
  ),
}

export const DefaultIndentation: Story = {
  args: {
    children: "Content goes here",
  },
}

export const IncreaseIndentation: Story = {
  args: {
    gap: 10,
    children: "Content goes here",
  },
}
