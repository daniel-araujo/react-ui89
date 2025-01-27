import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, screen, userEvent } from "@storybook/test"

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

export const NoDateSelected: Story = {}

export const DateSelected: Story = {
  args: {
    value: new Date("2025-01-05T12:30:00.000"),
  },

  async play(context) {
    await screen.findByDisplayValue("01/05/2025 12:30:00")
  },
}

export const ChangesSelectedDateWhenTyping: Story = {
  args: {
    value: new Date("2025-01-05T12:30:00.000"),
    onChange: fn(),
  },

  async play(context) {
    const input = await screen.findByDisplayValue("01/05/2025 12:30:00")

    await userEvent.clear(input)
    await userEvent.type(input, "02/05/2025 12:40:00\n")

    expect(context.args.onChange).toHaveBeenCalled()
  },
}
