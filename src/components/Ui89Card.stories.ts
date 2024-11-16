import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"

import { Ui89Card } from "./Ui89Card"
import { SceneDecorator } from "../storybook/SceneDecorator"

const meta: Meta<typeof Ui89Card> = {
  component: Ui89Card,
  tags: ["autodocs"],
  decorators: [SceneDecorator],
}

export default meta

type Story = StoryObj<typeof meta>

export const Content: Story = {
  args: {
    children: "Content goes here",
  },
}
