import React, { useState } from "react"

import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, screen, userEvent } from "storybook/test"

import { Ui89InputTextArea } from "./Ui89InputTextArea"
import { SceneDecorator } from "../storybook/SceneDecorator"
import { ActionPropUpdate } from "../storybook/ActionPropUpdate"

const meta: Meta<typeof Ui89InputTextArea> = {
  component: Ui89InputTextArea,
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

export const PreservesLineBreaks: Story = {
  args: {
    value: "",
    onChange: fn(),
  },

  async play(context) {
    const textbox = await screen.findByRole("textbox")

    await userEvent.type(
      textbox,
      `First sentences
second sentence
last sentence`,
    )

    await new Promise((resolve) => setTimeout(resolve, 300))

    expect(context.args.onChange).toHaveBeenCalledWith(`First sentences
second sentence
last sentence`)
  },
}

export const Disabled: Story = {
  args: {
    value: "Disabled content",
    disabled: true,
  },

  async play(context) {
    const textbox = await screen.findByRole("textbox")

    expect(textbox).toBeDisabled()
  },
}
