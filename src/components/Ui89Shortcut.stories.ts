import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "storybook/test"

import { Ui89Shortcut } from "./Ui89Shortcut"
import { SceneDecorator } from "../storybook/SceneDecorator"

const meta: Meta<typeof Ui89Shortcut> = {
  component: Ui89Shortcut,
  tags: ["autodocs"],
  decorators: [SceneDecorator],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "Label goes here",
  },
}

export const LongLabel: Story = {
  args: {
    label:
      "This Label is very long and will most likely take up more than 1 line",
  },
}
