import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, screen, userEvent } from "storybook/test"

import { Ui89DateTimePicker } from "./Ui89DateTimePicker"
import { SceneDecorator } from "../storybook/SceneDecorator"
import { ActionPropUpdate } from "../storybook/ActionPropUpdate"

const meta: Meta<typeof Ui89DateTimePicker> = {
  component: Ui89DateTimePicker,
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

export const NoDateSelected: Story = {
  async play(context) {
    const input = await screen.findByRole("textbox")

    expect(input).toHaveDisplayValue("")
  },
}

export const DateSelected: Story = {
  args: {
    value: new Date("2025-01-05T12:30:00.000"),
  },

  async play(context) {
    await screen.findByDisplayValue("2025/01/05 12:30:00")
  },
}

export const ChangesSelectedDateWhenTyping: Story = {
  args: {
    value: new Date("2025-01-05T12:30:00.000"),
    onChange: fn(),
  },

  async play(context) {
    const input = await screen.findByRole("textbox")

    await userEvent.clear(input)
    await userEvent.type(input, "2025/05/02 12:40:00\n")

    expect(context.args.onChange).toHaveBeenCalledWith(
      new Date("2025-05-02T12:40:00.000"),
    )
  },
}

export const CustomDateFormat: Story = {
  args: {
    value: new Date("2025-01-05T12:30:00.000"),
    dateFormat: "MM/yyyy mm:ss",
  },

  async play(context) {
    await screen.findByDisplayValue("01/2025 30:00")
  },
}
