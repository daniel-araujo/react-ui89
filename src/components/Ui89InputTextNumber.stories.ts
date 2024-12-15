import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, screen, userEvent } from "@storybook/test"

import { Ui89InputTextNumber } from "./Ui89InputTextNumber"
import { SceneDecorator } from "../storybook/SceneDecorator"
import { ActionPropUpdate } from "../storybook/ActionPropUpdate"

const meta: Meta<typeof Ui89InputTextNumber> = {
  component: Ui89InputTextNumber,
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

export const OnChangeSendsEmptyValueWhenInputIsEmptied: Story = {
  args: {
    value: "3",
    emptyValue: "0",
    onChange: fn(),
  },

  async play(context) {
    const textbox = await screen.findByRole("textbox")

    await userEvent.clear(textbox)

    await new Promise((resolve) => setTimeout(resolve, 200))

    expect(context.args.onChange).toHaveBeenCalledWith("0")
  },
}

export const BecomesEmptyWhenTypingInEmptyValue: Story = {
  args: {
    value: "3",
    emptyValue: "0",
    onChange: fn(),
  },

  async play(context) {
    const textbox = await screen.findByRole<HTMLInputElement>("textbox")

    await userEvent.clear(textbox)
    await userEvent.type(textbox, "0")

    expect(textbox.value).toEqual("0")

    textbox.blur()
    await new Promise((resolve) => setTimeout(resolve, 200))

    expect(textbox.value).toEqual("")
  },
}

export const TrimsWhitespaceAtBeginningAndEnd: Story = {
  args: {
    onChange: fn(),
  },

  async play(context) {
    const textbox = await screen.findByRole("textbox")

    await userEvent.type(textbox, " 3.14 ")

    await new Promise((resolve) => setTimeout(resolve, 200))

    expect(context.args.onChange).toHaveBeenCalledWith("3.14")
  },
}

export const RemoveWhitespaceBetweenNumbers: Story = {
  args: {
    onChange: fn(),
  },

  async play(context) {
    const textbox = await screen.findByRole("textbox")

    await userEvent.type(textbox, "3 . 1 4")

    await new Promise((resolve) => setTimeout(resolve, 200))

    expect(context.args.onChange).toHaveBeenCalledWith("3.14")
  },
}