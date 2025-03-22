import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"

import { Ui89InputCheckText } from "./Ui89InputCheckText"
import { SceneDecorator } from "../storybook/SceneDecorator"
import { ActionPropUpdate } from "../storybook/ActionPropUpdate"

const meta: Meta<typeof Ui89InputCheckText> = {
  component: Ui89InputCheckText,
  tags: ["autodocs"],
  decorators: [
    SceneDecorator,

    ActionPropUpdate({
      directLink: {
        onChange: "value",
      },
    }),
  ],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const InlineWithText: Story = {
  args: {
    value: true,
  },

  render: (args, context) => (
    <p>
      <Ui89InputCheckText {...args} /> This is a paragraph
    </p>
  ),
}

export const InheritsFont: Story = {
  args: {
    value: true,
  },

  render: (args, context) => (
    <b>
      <Ui89InputCheckText {...args} /> This is bold
    </b>
  ),
}
