import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"

import { Ui89SpacePadding } from "./Ui89SpacePadding"
import { SceneDecorator } from "../storybook/SceneDecorator"
import { Ui89ThemeBackground } from "./Ui89ThemeBackground"

const meta: Meta<typeof Ui89SpacePadding> = {
  component: Ui89SpacePadding,
  tags: ["autodocs"],
  decorators: [SceneDecorator],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},

  render: (args, context) => (
    <div style={{ display: "inline-block" }}>
      <Ui89ThemeBackground theme="danger">
        <Ui89SpacePadding {...args}>Content</Ui89SpacePadding>
      </Ui89ThemeBackground>
    </div>
  ),
}

export const Gap: Story = {
  args: {
    gap: 10,
  },

  render: Default.render,
}

export const GapHorizontal: Story = {
  args: {
    gapHorizontal: 10,
  },

  render: Default.render,
}

export const GapVertical: Story = {
  args: {
    gapVertical: 10,
  },

  render: Default.render,
}

export const Top: Story = {
  args: {
    gapTop: 10,
  },

  render: Default.render,
}

export const Right: Story = {
  args: {
    gapRight: 10,
  },

  render: Default.render,
}

export const Bottom: Story = {
  args: {
    gapBottom: 10,
  },

  render: Default.render,
}

export const Left: Story = {
  args: {
    gapLeft: 10,
  },

  render: Default.render,
}
