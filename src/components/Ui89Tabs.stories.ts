import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"

import { Ui89Tabs } from "./Ui89Tabs"
import { SceneDecorator } from "../storybook/SceneDecorator"
import { ActionPropUpdate } from "../storybook/ActionPropUpdate"

const optionsSampleTwo = [
  {
    value: "1",
    label: "One",
  },
  {
    value: "2",
    label: "Two",
  },
]

const optionsSampleTo20 = Array.from({ length: 20 }, (_, i) => ({
  value: i + 1,
  label: `Option ${i + 1}`,
}))

const meta: Meta<typeof Ui89Tabs> = {
  component: Ui89Tabs,
  tags: ["autodocs"],
  decorators: [
    SceneDecorator,
    ActionPropUpdate({
      directLink: {
        onChange: "selected",
      },
    }),
  ],
}

export default meta

type Story = StoryObj<typeof meta>

export const NothingSelected: Story = {
  args: {
    options: optionsSampleTwo,
  },
}

export const Selected: Story = {
  args: {
    options: optionsSampleTwo,
    selected: "1",
  },
}

export const Stretch: Story = {
  args: {
    options: optionsSampleTwo,
    selected: "1",
    stretch: true,
  },
}

export const WrapToMultipleRows: Story = {
  args: {
    options: optionsSampleTo20,
    selected: "2",
  },
}

export const WrapToMultipleRowsAndStretch: Story = {
  args: {
    options: optionsSampleTo20,
    selected: "2",
    stretch: true,
  },
}
