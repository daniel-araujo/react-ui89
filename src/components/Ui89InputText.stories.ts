import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, screen, userEvent } from "@storybook/test"

import { Ui89InputText } from "./Ui89InputText"
import { SceneDecorator } from "../storybook/SceneDecorator"

const meta: Meta<typeof Ui89InputText> = {
  component: Ui89InputText,
  tags: ["autodocs"],
  decorators: [SceneDecorator],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const TypingEmitsOnChange: Story = {
  args: {
    onChange: fn(),
  },

  async play(context) {
    const backdrop = await screen.findByRole("textbox")

    await userEvent.type(backdrop, "A")

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
    const backdrop = await screen.findByRole("textbox")

    await userEvent.type(backdrop, "A")

    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(context.args.onChange).not.toHaveBeenCalled()

    await userEvent.type(backdrop, "a")

    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(context.args.onChange).not.toHaveBeenCalled()

    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(context.args.onChange).toHaveBeenCalledWith("Aa")
  },
}
