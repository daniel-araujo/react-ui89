import React from "react"
import type { Meta, StoryObj } from "@storybook/react"

import { Ui89TitleSideLine } from "./Ui89TitleSideLine"
import { SceneDecorator } from "../storybook/SceneDecorator"
import { Ui89ThemeBackground } from "./Ui89ThemeBackground"
import { Ui89Card } from "./Ui89Card"
import { Ui89CardHorizontalConnection } from "./Ui89CardHorizontalConnection"

const meta: Meta<typeof Ui89TitleSideLine> = {
  component: Ui89TitleSideLine,
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
      <Ui89Card>
        <Ui89TitleSideLine {...args} />
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
    <Ui89Card>
      <Ui89CardHorizontalConnection>
        <Ui89TitleSideLine {...args} />
      </Ui89CardHorizontalConnection>
      Content inside card
    </Ui89Card>
  ),
}
