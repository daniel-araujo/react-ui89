import React, { useEffect, useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, screen, userEvent } from "@storybook/test"

import { Ui89DigitalTimeClock } from "./Ui89DigitalTimeClock"
import { SceneDecorator } from "../storybook/SceneDecorator"

const meta: Meta<typeof Ui89DigitalTimeClock> = {
  component: Ui89DigitalTimeClock,
  tags: ["autodocs"],
  decorators: [SceneDecorator],
}

export default meta

type Story = StoryObj<typeof meta>

export const Time: Story = {}
