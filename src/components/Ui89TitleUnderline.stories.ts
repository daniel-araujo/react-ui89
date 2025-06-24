import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "storybook/test"

import { Ui89TitleUnderline } from "./Ui89TitleUnderline"
import { SceneDecorator } from "../storybook/SceneDecorator"

const meta: Meta<typeof Ui89TitleUnderline> = {
  component: Ui89TitleUnderline,
  decorators: [SceneDecorator],
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Title goes here",
  },
}

export const Ellipsis: Story = {
  args: {
    children: "Title goes here".repeat(100),
  },
}
