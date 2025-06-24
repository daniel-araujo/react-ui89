import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "storybook/test"

import { Ui89InputCheckBox } from "./Ui89InputCheckBox"
import { SceneDecorator } from "../storybook/SceneDecorator"
import { ActionPropUpdate } from "../storybook/ActionPropUpdate"

const meta: Meta<typeof Ui89InputCheckBox> = {
  component: Ui89InputCheckBox,
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
      <Ui89InputCheckBox {...args} /> This is a paragraph
    </p>
  ),
}

export const InheritsFont: Story = {
  args: {
    value: true,
  },

  render: (args, context) => (
    <b>
      <Ui89InputCheckBox {...args} /> This is bold
    </b>
  ),
}
