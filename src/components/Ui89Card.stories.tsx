import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"

import { Ui89Card } from "./Ui89Card"
import { SceneDecorator } from "../storybook/SceneDecorator"
import { Ui89CardHorizontalConnection } from "./Ui89CardHorizontalConnection"
import { Ui89Hr } from "./Ui89Hr"

const meta: Meta<typeof Ui89Card> = {
  component: Ui89Card,
  tags: ["autodocs"],
  decorators: [SceneDecorator],
}

export default meta

type Story = StoryObj<typeof meta>

export const Content: Story = {
  args: {
    children: "Content goes here",
  },
}

export const HorizontalConnection: Story = {
  args: {
    children: "Content goes here",
  },

  render: (args, context) => (
    <Ui89Card {...args}>
      <Ui89CardHorizontalConnection>
        <Ui89Hr look="double" />
      </Ui89CardHorizontalConnection>

      {args.children}
    </Ui89Card>
  ),
}

export const HorizontalConnectionOverflow: Story = {
  args: {
    children: "Content goes here",
  },

  render: (args, context) => (
    <Ui89Card {...args}>
      <Ui89CardHorizontalConnection overflow>
        <Ui89Hr look="double" />
      </Ui89CardHorizontalConnection>

      {args.children}
    </Ui89Card>
  ),
}
