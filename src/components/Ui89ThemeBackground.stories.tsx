import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"

import { Ui89ThemeBackground } from "./Ui89ThemeBackground"
import { SceneDecorator } from "../storybook/SceneDecorator"
import { Ui89Card } from "./Ui89Card"
import { Ui89SpacePadding } from "./Ui89SpacePadding"

const meta: Meta<typeof Ui89ThemeBackground> = {
  component: Ui89ThemeBackground,
  tags: ["autodocs"],
  decorators: [SceneDecorator],
}

export default meta

type Story = StoryObj<typeof meta>

export const ThemePrimary: Story = {
  args: {
    theme: "primary",
    children: "Content",
  },
}

export const ThemeSecondary: Story = {
  args: {
    theme: "secondary",
    children: "Content",
  },
}

export const ThemeSuccess: Story = {
  args: {
    theme: "success",
    children: "Content",
  },
}

export const ThemeDanger: Story = {
  args: {
    theme: "danger",
    children: "Content",
  },
}

export const ThemeInfo: Story = {
  args: {
    theme: "info",
    children: "Content",
  },
}

export const ThemeWarning: Story = {
  args: {
    theme: "warning",
    children: "Content",
  },
}

export const ChangesCardBackground: Story = {
  args: {
    theme: "warning",
  },

  render: (args, context) => (
    <Ui89ThemeBackground {...args}>
      <Ui89SpacePadding>
        <Ui89Card>Card Content</Ui89Card>
      </Ui89SpacePadding>
    </Ui89ThemeBackground>
  ),
}
