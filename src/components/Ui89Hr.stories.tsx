import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"

import { Ui89Hr } from "./Ui89Hr"
import { SceneDecorator } from "../storybook/SceneDecorator"
import { Ui89SpaceVertical } from "./Ui89SpaceVertical"

const meta: Meta<typeof Ui89Hr> = {
  component: Ui89Hr,
  tags: ["autodocs"],
  decorators: [SceneDecorator],
}

export default meta

type Story = StoryObj<typeof meta>

export const Straight: Story = {
  args: {
    look: "straight",
  },

  render: (args, context) => (
    <>
      <Ui89SpaceVertical />
      <Ui89Hr {...args} />
    </>
  ),
}

export const Dotted: Story = {
  args: {
    look: "dotted",
  },

  render: Straight.render,
}

export const Dashed: Story = {
  args: {
    look: "dashed",
  },

  render: Straight.render,
}

export const Double: Story = {
  args: {
    look: "double",
  },

  render: Straight.render,
}

export const ThemePrimary: Story = {
  args: {
    look: "double",
    theme: "primary",
  },

  render: Straight.render,
}
