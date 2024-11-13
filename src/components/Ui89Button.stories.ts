import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"

import Ui89Button from "./Ui89Button"

const meta: Meta<typeof Ui89Button> = {
  component: Ui89Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof meta>

export const ThemePrimary: Story = {
  args: {
    theme: "primary",
    children: "Label",
  },
}

export const ThemeSecondary: Story = {
  args: {
    theme: "secondary",
    children: "Label",
  },
}

export const ThemeSuccess: Story = {
  args: {
    theme: "success",
    children: "Label",
  },
}

export const ThemeDanger: Story = {
  args: {
    theme: "danger",
    children: "Label",
  },
}

export const ThemeInfo: Story = {
  args: {
    theme: "info",
    children: "Label",
  },
}

export const ThemeWarning: Story = {
  args: {
    theme: "warning",
    children: "Label",
  },
}
