import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"

import Ui89Background from "./Ui89Background"

const meta: Meta<typeof Ui89Background> = {
  component: Ui89Background,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof meta>

export const LookMain: Story = {
  args: {
    look: "main",
    children: "Content goes here",
  },
}

export const LookSide: Story = {
  args: {
    look: "side",
    children: "Content goes here",
  },
}
