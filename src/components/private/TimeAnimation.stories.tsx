import React, { useEffect, useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, screen, userEvent } from "@storybook/test"

import { TimeAnimation } from "./TimeAnimation"
import { SceneDecorator } from "../../storybook/SceneDecorator"

const meta: Meta<typeof TimeAnimation> = {
  component: TimeAnimation,
  tags: ["autodocs"],
  decorators: [SceneDecorator],
}

export default meta

type Story = StoryObj<typeof meta>

export const Updates: Story = {
  render: (args, context) => {
    return <TimeAnimation>{({ now }) => now.toISOString()}</TimeAnimation>
  },
}
