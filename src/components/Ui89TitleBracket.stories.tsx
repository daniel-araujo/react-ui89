import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "storybook/test"

import { Ui89TitleBracket } from "./Ui89TitleBracket"
import { SceneDecorator } from "../storybook/SceneDecorator"
import { Ui89ThemeBackground } from "./Ui89ThemeBackground"
import { Ui89Card } from "./Ui89Card"

const meta: Meta<typeof Ui89TitleBracket> = {
  component: Ui89TitleBracket,
  decorators: [SceneDecorator],
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Title goes here",
  },
}

export const Ellipsis: Story = {
  args: {
    children: "Title goes here".repeat(100),
  },
}

export const WithThemeBackground: Story = {
  args: {
    children: "Title goes here",
  },

  render: (args) => (
    <Ui89ThemeBackground theme="danger">
      <Ui89Card topLeft={<Ui89TitleBracket {...args} />}>
        Content inside card
      </Ui89Card>
    </Ui89ThemeBackground>
  ),
}

export const WithCard: Story = {
  args: {
    children: "Title goes here",
  },

  render: (args) => (
    <Ui89Card topLeft={<Ui89TitleBracket {...args} />}>
      Content inside card
    </Ui89Card>
  ),
}
