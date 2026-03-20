import React from "react"
import type { Meta, StoryObj } from "@storybook/react"

import { Ui89SpaceHorizontal } from "./Ui89SpaceHorizontal"
import { SceneDecorator } from "../storybook/SceneDecorator"

const meta: Meta<typeof Ui89SpaceHorizontal> = {
  component: Ui89SpaceHorizontal,
  tags: ["autodocs"],
  decorators: [SceneDecorator],
}

export default meta

type Story = StoryObj<typeof meta>

export const Gap: Story = {
  args: {
    gap: 12,
  },

  render: (args, context) => (
    <div>
      <span>First word.</span>
      <Ui89SpaceHorizontal {...args} />
      <span>Second word separated by a {args.gap} gap space.</span>
    </div>
  ),
}
