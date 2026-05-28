import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "storybook/test"

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

export const PaletteBlack: Story = {
  args: { theme: "black", children: "Content" },
}
export const PaletteDarkBlue: Story = {
  args: { theme: "darkBlue", children: "Content" },
}
export const PaletteDarkGreen: Story = {
  args: { theme: "darkGreen", children: "Content" },
}
export const PaletteDarkCyan: Story = {
  args: { theme: "darkCyan", children: "Content" },
}
export const PaletteDarkRed: Story = {
  args: { theme: "darkRed", children: "Content" },
}
export const PaletteDarkPink: Story = {
  args: { theme: "darkPink", children: "Content" },
}
export const PaletteDarkYellow: Story = {
  args: { theme: "darkYellow", children: "Content" },
}
export const PaletteLightGray: Story = {
  args: { theme: "lightGray", children: "Content" },
}
export const PaletteDarkGray: Story = {
  args: { theme: "darkGray", children: "Content" },
}
export const PaletteLightBlue: Story = {
  args: { theme: "lightBlue", children: "Content" },
}
export const PaletteLightGreen: Story = {
  args: { theme: "lightGreen", children: "Content" },
}
export const PaletteLightCyan: Story = {
  args: { theme: "lightCyan", children: "Content" },
}
export const PaletteLightRed: Story = {
  args: { theme: "lightRed", children: "Content" },
}
export const PaletteLightPink: Story = {
  args: { theme: "lightPink", children: "Content" },
}
export const PaletteLightYellow: Story = {
  args: { theme: "lightYellow", children: "Content" },
}
export const PaletteWhite: Story = {
  args: { theme: "white", children: "Content" },
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
