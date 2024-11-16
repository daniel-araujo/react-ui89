import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"

import { Ui89ModalDialog } from "./Ui89ModalDialog"
import { SceneDecorator } from "../storybook/SceneDecorator"

const meta: Meta<typeof Ui89ModalDialog> = {
  component: Ui89ModalDialog,
  tags: ["autodocs"],
  decorators: [SceneDecorator],
}

export default meta

type Story = StoryObj<typeof meta>

export const Open: Story = {
  args: {
    open: true,
    children: "Content goes here",
  },
}

export const VerticalScroll: Story = {
  args: {
    open: true,
    children: "Content goes here\n".repeat(100),
  },
}
