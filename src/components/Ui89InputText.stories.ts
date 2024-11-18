import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, screen, userEvent } from "@storybook/test"

import { Ui89InputText } from "./Ui89InputText"
import { SceneDecorator } from "../storybook/SceneDecorator"
import { ActionPropUpdate } from "../storybook/ActionPropUpdate"

const meta: Meta<typeof Ui89InputText> = {
  component: Ui89InputText,
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
    onChange: fn(),
  },

  async play(context) {
    const textbox = await screen.findByRole("textbox")

    await userEvent.type(textbox, "A")

    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(context.args.onChange).not.toHaveBeenCalled()

    // Only after 200ms have passed
    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(context.args.onChange).toHaveBeenCalledOnce()
  },
}

export const TypingOnlyEmitsOnChangeWhenNoLongerTyping: Story = {
  args: {
    onChange: fn(),
  },

  async play(context) {
    const textbox = await screen.findByRole("textbox")

    await userEvent.type(textbox, "A")

    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(context.args.onChange).not.toHaveBeenCalled()

    await userEvent.type(textbox, "a")

    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(context.args.onChange).not.toHaveBeenCalled()

    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(context.args.onChange).toHaveBeenCalledWith("Aa")
  },
}

export const RemovesWhitespaceAtTheBeginning: Story = {
  args: {
    onChange: fn(),
  },

  async play(context) {
    const textbox = await screen.findByRole("textbox")

    await userEvent.type(textbox, " A")

    await new Promise((resolve) => setTimeout(resolve, 200))

    expect(context.args.onChange).toHaveBeenCalledWith("A")
  },
}

export const RemovesWhitespaceAtTheEnd: Story = {
  args: {
    onChange: fn(),
  },

  async play(context) {
    const textbox = await screen.findByRole("textbox")

    await userEvent.type(textbox, "A ")

    await new Promise((resolve) => setTimeout(resolve, 200))

    expect(context.args.onChange).toHaveBeenCalledWith("A")
  },
}

export const RemovesExtraWhitespaceInTheMiddle: Story = {
  args: {
    onChange: fn(),
  },

  async play(context) {
    const textbox = await screen.findByRole("textbox")

    await userEvent.type(textbox, "A  A")

    await new Promise((resolve) => setTimeout(resolve, 200))

    expect(context.args.onChange).toHaveBeenCalledWith("A A")
  },
}
