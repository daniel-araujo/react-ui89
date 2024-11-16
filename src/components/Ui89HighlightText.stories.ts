import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"

import { Ui89HighlightText } from "./Ui89HighlightText"
import { SceneDecorator } from "../storybook/SceneDecorator"

const meta: Meta<typeof Ui89HighlightText> = {
  component: Ui89HighlightText,
  tags: ["autodocs"],
  decorators: [SceneDecorator],
}

export default meta

type Story = StoryObj<typeof meta>

export const PrimaryTheme: Story = {
  args: {
    theme: "primary",
    children: "Content goes here",
  },
}

export const DangerTheme: Story = {
  args: {
    theme: "danger",
    children: "Content goes here",
  },
}

export const Block: Story = {
  args: {
    theme: "danger",
    block: true,
    children: "Content goes here",
  },
}
