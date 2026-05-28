import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "storybook/test"

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
  args: { look: "double", theme: "primary" },
  render: Straight.render,
}
export const ThemeSecondary: Story = {
  args: { look: "double", theme: "secondary" },
  render: Straight.render,
}
export const ThemeInfo: Story = {
  args: { look: "double", theme: "info" },
  render: Straight.render,
}
export const ThemeSuccess: Story = {
  args: { look: "double", theme: "success" },
  render: Straight.render,
}
export const ThemeWarning: Story = {
  args: { look: "double", theme: "warning" },
  render: Straight.render,
}
export const ThemeDanger: Story = {
  args: { look: "double", theme: "danger" },
  render: Straight.render,
}

export const PaletteBlack: Story = {
  args: { look: "double", theme: "black" },
  render: Straight.render,
}
export const PaletteDarkBlue: Story = {
  args: { look: "double", theme: "darkBlue" },
  render: Straight.render,
}
export const PaletteDarkGreen: Story = {
  args: { look: "double", theme: "darkGreen" },
  render: Straight.render,
}
export const PaletteDarkCyan: Story = {
  args: { look: "double", theme: "darkCyan" },
  render: Straight.render,
}
export const PaletteDarkRed: Story = {
  args: { look: "double", theme: "darkRed" },
  render: Straight.render,
}
export const PaletteDarkPink: Story = {
  args: { look: "double", theme: "darkPink" },
  render: Straight.render,
}
export const PaletteDarkYellow: Story = {
  args: { look: "double", theme: "darkYellow" },
  render: Straight.render,
}
export const PaletteLightGray: Story = {
  args: { look: "double", theme: "lightGray" },
  render: Straight.render,
}
export const PaletteDarkGray: Story = {
  args: { look: "double", theme: "darkGray" },
  render: Straight.render,
}
export const PaletteLightBlue: Story = {
  args: { look: "double", theme: "lightBlue" },
  render: Straight.render,
}
export const PaletteLightGreen: Story = {
  args: { look: "double", theme: "lightGreen" },
  render: Straight.render,
}
export const PaletteLightCyan: Story = {
  args: { look: "double", theme: "lightCyan" },
  render: Straight.render,
}
export const PaletteLightRed: Story = {
  args: { look: "double", theme: "lightRed" },
  render: Straight.render,
}
export const PaletteLightPink: Story = {
  args: { look: "double", theme: "lightPink" },
  render: Straight.render,
}
export const PaletteLightYellow: Story = {
  args: { look: "double", theme: "lightYellow" },
  render: Straight.render,
}
export const PaletteWhite: Story = {
  args: { look: "double", theme: "white" },
  render: Straight.render,
}
