import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"

import { Ui89Scene } from "./Ui89Scene"

const meta: Meta<typeof Ui89Scene> = {
  component: Ui89Scene,
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
