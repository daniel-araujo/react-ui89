import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, screen, userEvent, waitFor } from "storybook/test"

import { Ui89InputSelectMultiTag } from "./Ui89InputSelectMultiTag"
import { SceneDecorator } from "../storybook/SceneDecorator"
import { ActionPropUpdate } from "../storybook/ActionPropUpdate"

const meta: Meta<typeof Ui89InputSelectMultiTag> = {
  component: Ui89InputSelectMultiTag,
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
    const input = await screen.findByText("Select fruits...")
    expect(input).toBeInTheDocument()
  },
}

export const OneSelected: Story = {
  args: {
    value: ["Banana"],
    options: ["Apple", "Banana", "Cherry"],
  },

  async play(context) {
    const tag = await screen.findByText("Banana")
    expect(tag).toBeInTheDocument()
  },
}

export const MultipleSelected: Story = {
  args: {
    value: ["Apple", "Cherry"],
    options: ["Apple", "Banana", "Cherry"],
  },

  async play(context) {
    await screen.findByText("Apple")
    await screen.findByText("Cherry")
  },
}

export const OpensPopoverAndSelects: Story = {
  args: {
    value: [],
    options: ["Apple", "Banana", "Cherry"],
    placeholder: "Select fruits...",
    onChange: fn(),
  },

  async play(context) {
    const trigger = await screen.findByText("Select fruits...")
    await userEvent.click(trigger)

    const checkboxes = await waitFor(() => screen.getAllByRole("checkbox"))
    await userEvent.click(checkboxes[1])

    expect(context.args.onChange).toHaveBeenCalledWith(["Banana"])
  },
}

export const RemovesTagWhenClickingX: Story = {
  args: {
    value: ["Apple", "Cherry"],
    options: ["Apple", "Banana", "Cherry"],
    onChange: fn(),
  },

  async play(context) {
    const closeButtons = await screen.findAllByText("[X]")
    await userEvent.click(closeButtons[0])

    expect(context.args.onChange).toHaveBeenCalledWith(["Cherry"])
  },
}

export const HundredSelected: Story = {
  args: {
    value: Array.from({ length: 100 }, (_, i) => `Option ${i + 1}`),
    options: Array.from({ length: 100 }, (_, i) => `Option ${i + 1}`),
  },
}
