import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"

import { Ui89Card } from "./Ui89Card"

const meta: Meta<typeof Ui89Card> = {
  component: Ui89Card,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof meta>

export const Content: Story = {
  args: {
    children: "Content goes here",
  },
}
