import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"

import { Ui89SpaceVertical } from "./Ui89SpaceVertical"
import { BackgroundDecorator } from "../storybook/BackgroundDecorator"

const meta: Meta<typeof Ui89SpaceVertical> = {
  component: Ui89SpaceVertical,
  tags: ["autodocs"],
  decorators: [BackgroundDecorator],
}

export default meta

type Story = StoryObj<typeof meta>

export const Space: Story = {}
