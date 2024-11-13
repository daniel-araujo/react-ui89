import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"

import { Ui89SpaceVertical } from "./Ui89SpaceVertical"

const meta: Meta<typeof Ui89SpaceVertical> = {
  component: Ui89SpaceVertical,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof meta>

export const Space: Story = {}
