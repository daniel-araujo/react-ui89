import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"

import { Ui89TabbedCard } from "./Ui89TabbedCard"
import { BackgroundDecorator } from "../storybook/BackgroundDecorator"

const meta: Meta<typeof Ui89TabbedCard> = {
  component: Ui89TabbedCard,
  tags: ["autodocs"],
  decorators: [BackgroundDecorator],
}

export default meta

type Story = StoryObj<typeof meta>

export const NothingSelected: Story = {
  args: {
    items: [
      {
        value: "1",
        label: "One",
        render: () => <>First</>,
      },
      {
        value: "2",
        label: "Two",
        render: () => <>Second</>,
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
        render: () => <>First</>,
      },
      {
        value: "2",
        label: "Two",
        render: () => <>Second</>,
      },
    ],
    selected: "1",
  },
}
