import React, { useEffect, useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, screen, userEvent } from "@storybook/test"

import { Ui89DigitalTime } from "./Ui89DigitalTime"
import { SceneDecorator } from "../storybook/SceneDecorator"

const meta: Meta<typeof Ui89DigitalTime> = {
  component: Ui89DigitalTime,
  tags: ["autodocs"],
  decorators: [SceneDecorator],
}

export default meta

type Story = StoryObj<typeof meta>

export const Time: Story = {}
