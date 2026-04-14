import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, screen, userEvent, waitFor } from "storybook/test"

import { Ui89InputSelectMultiCheck } from "./Ui89InputSelectMultiCheck"
import { SceneDecorator } from "../storybook/SceneDecorator"
import { ActionPropUpdate } from "../storybook/ActionPropUpdate"

const meta: Meta<typeof Ui89InputSelectMultiCheck> = {
  component: Ui89InputSelectMultiCheck,
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

export const NoneSelected: Story = {
  args: {
    value: [],
    options: ["Apple", "Banana", "Cherry"],
    placeholder: "Select fruits...",
  },

  async play(context) {
    const input = await screen.findByRole("textbox")

    expect(input).toHaveDisplayValue("")
  },
}

export const OneSelected: Story = {
  args: {
    value: ["Banana"],
    options: ["Apple", "Banana", "Cherry"],
  },

  async play(context) {
    const input = await screen.findByRole("textbox")

    expect(input).toHaveDisplayValue("Banana")
  },
}

export const MultipleSelected: Story = {
  args: {
    value: ["Apple", "Cherry"],
    options: ["Apple", "Banana", "Cherry"],
  },

  async play(context) {
    const input = await screen.findByRole("textbox")

    expect(input).toHaveDisplayValue("Apple, Cherry")
  },
}

export const CustomDisplayValue: Story = {
  args: {
    value: ["Apple", "Banana"],
    options: ["Apple", "Banana", "Cherry"],
    renderDisplay: ({ value: val }) => `${val.length} selected`,
  },

  async play(context) {
    const input = await screen.findByRole("textbox")

    expect(input).toHaveDisplayValue("2 selected")
  },
}

export const OpensPopoverAndSelects: Story = {
  args: {
    value: [],
    options: ["Apple", "Banana", "Cherry"],
    onChange: fn(),
  },

  async play(context) {
    const trigger = await screen.findByRole("textbox")
    await userEvent.click(trigger)

    const checkboxes = await waitFor(() => screen.getAllByRole("checkbox"))
    await userEvent.click(checkboxes[1])

    expect(context.args.onChange).toHaveBeenCalledWith(["Banana"])
  },
}

export const With1000Options: Story = {
  args: {
    value: [],
    options: Array.from({ length: 1000 }, (_, i) => `Option ${i + 1}`),
  },

  async play(context) {
    const trigger = await screen.findByRole("textbox")
    await userEvent.click(trigger)

    await screen.findByText("Option 1")
  },
}
