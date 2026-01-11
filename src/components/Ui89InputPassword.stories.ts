import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, screen, userEvent } from "storybook/test"

import { Ui89InputPassword } from "./Ui89InputPassword"
import { SceneDecorator } from "../storybook/SceneDecorator"
import { ActionPropUpdate } from "../storybook/ActionPropUpdate"

const meta: Meta<typeof Ui89InputPassword> = {
  component: Ui89InputPassword,
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

export const TypingEmitsOnChange: Story = {
  args: {
    value: "",
    onChange: fn(),
  },

  async play(context) {
    const textbox = await screen.findByRole("textbox")

    await userEvent.type(textbox, "A")

    expect(context.args.onChange).toHaveBeenCalledWith("A")
  },
}

export const DoesNotTrimWhitespaceAtTheBeginning: Story = {
  args: {
    value: "",
    onChange: fn(),
  },

  async play(context) {
    const textbox = await screen.findByRole("textbox")

    await userEvent.type(textbox, " A")

    expect(context.args.onChange).toHaveBeenCalledWith(" A")
  },
}

export const DoesNotRemoveWhitespaceAtTheEnd: Story = {
  args: {
    value: "",
    onChange: fn(),
  },

  async play(context) {
    const textbox = await screen.findByRole("textbox")

    await userEvent.type(textbox, "A ")

    expect(context.args.onChange).toHaveBeenCalledWith("A ")
  },
}

export const DoesNotRemoveExtraWhitespaceInTheMiddle: Story = {
  args: {
    value: "",
    onChange: fn(),
  },

  async play(context) {
    const textbox = await screen.findByRole("textbox")

    await userEvent.type(textbox, "A  A")

    expect(context.args.onChange).toHaveBeenCalledWith("A  A")
  },
}

export const Disabled: Story = {
  args: {
    value: "password",
    disabled: true,
  },
  async play(context) {
    const textbox = await screen.findByRole("textbox")
    expect(textbox).toBeDisabled()
  },
}
