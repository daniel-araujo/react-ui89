import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"

import { Ui89SpaceVertical } from "./Ui89SpaceVertical"
import { BackgroundDecorator } from "../storybook/BackgroundDecorator"

const meta: Meta<typeof Ui89SpaceVertical> = {
  component: Ui89SpaceVertical,
  tags: ["autodocs"],
  decorators: [BackgroundDecorator],
}

export default meta

type Story = StoryObj<typeof meta>

export const Gap: Story = {
  args: {
    gap: 1,
  },

  render: (args, context) => (
    <>
      First paragraph.
      <Ui89SpaceVertical gap={args.gap} />
      Second paragraph separated by a {args.gap} gap space.
    </>
  ),
}
