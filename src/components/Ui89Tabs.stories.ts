import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"

import { Ui89Tabs } from "./Ui89Tabs"
import { SceneDecorator } from "../storybook/SceneDecorator"

const meta: Meta<typeof Ui89Tabs> = {
  component: Ui89Tabs,
  tags: ["autodocs"],
  decorators: [SceneDecorator],
}

export default meta

type Story = StoryObj<typeof meta>

export const NothingSelected: Story = {
  args: {
    items: [
      {
        value: "1",
        label: "One",
      },
      {
        value: "2",
        label: "Two",
      },
    ],
  },
}

export const Selected: Story = {
  args: {
    items: [
      {
        value: "1",
        label: "One",
      },
      {
        value: "2",
        label: "Two",
      },
    ],
    selected: "1",
  },
}
