import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"

import { Ui89Shortcut } from "./Ui89Shortcut"
import { BackgroundDecorator } from "../storybook/BackgroundDecorator"

const meta: Meta<typeof Ui89Shortcut> = {
  component: Ui89Shortcut,
  tags: ["autodocs"],
  decorators: [BackgroundDecorator],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "Label goes here",
  },
}
