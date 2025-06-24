import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, screen, userEvent } from "storybook/test"

import { Ui89InputNumber } from "./Ui89InputNumber"
import { SceneDecorator } from "../storybook/SceneDecorator"
import { ActionPropUpdate } from "../storybook/ActionPropUpdate"

const meta: Meta<typeof Ui89InputNumber> = {
  component: Ui89InputNumber,
  tags: ["autodocs"],
  decorators: [
    SceneDecorator,
    ActionPropUpdate({
      directLink: {
        onChange: "value",
      },
    }),
  ],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithValue: Story = {
  args: {
    value: 1,
  },

  async play(context) {
    const textbox = await screen.findByRole("textbox")

    expect(textbox).toHaveValue("1")
  },
}

export const CallsOnChange: Story = {
  args: {
    onChange: fn(),
  },

  async play(context) {
    const textbox = await screen.findByRole("textbox")

    await userEvent.type(textbox, "1")

    await new Promise((resolve) => setTimeout(resolve, 300))

    expect(context.args.onChange).toHaveBeenCalledWith(1)
  },
}

export const CanEdit: Story = {
  args: {
    value: 1,
    onChange: fn(),
  },

  async play(context) {
    const textbox = await screen.findByRole("textbox")

    await userEvent.type(textbox, "1")

    await new Promise((resolve) => setTimeout(resolve, 300))

    expect(context.args.onChange).toHaveBeenCalledWith(11)
  },
}
