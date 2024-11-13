import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"

import { Ui89Shortcut } from "./Ui89Shortcut"

const meta: Meta<typeof Ui89Shortcut> = {
  component: Ui89Shortcut,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Label goes here'
  }
}
