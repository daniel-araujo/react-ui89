import React, { useEffect, useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, screen, userEvent } from "storybook/test"

import { Ui89DigitalClock } from "./Ui89DigitalClock"
import { SceneDecorator } from "../storybook/SceneDecorator"

const meta: Meta<typeof Ui89DigitalClock> = {
  component: Ui89DigitalClock,
  tags: ["autodocs"],
  decorators: [SceneDecorator],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithAllPlaceholders: Story = {
  args: {
    format: "MM/DD/YYYY hh:mm:ss A",
  },
}
