import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "storybook/test"

import { Ui89HighlightText } from "./Ui89HighlightText"
import { SceneDecorator } from "../storybook/SceneDecorator"

const meta: Meta<typeof Ui89HighlightText> = {
  component: Ui89HighlightText,
  tags: ["autodocs"],
  decorators: [SceneDecorator],
}

export default meta

type Story = StoryObj<typeof meta>

export const PrimaryTheme: Story = {
  args: {
    theme: "primary",
    children: "Content goes here",
  },
}

export const SecondaryTheme: Story = {
  args: {
    theme: "secondary",
    children: "Content goes here",
  },
}

export const InfoTheme: Story = {
  args: {
    theme: "info",
    children: "Content goes here",
  },
}

export const SuccessTheme: Story = {
  args: {
    theme: "success",
    children: "Content goes here",
  },
}

export const WarningTheme: Story = {
  args: {
    theme: "warning",
    children: "Content goes here",
  },
}

export const DangerTheme: Story = {
  args: {
    theme: "danger",
    children: "Content goes here",
  },
}

export const Block: Story = {
  args: {
    theme: "danger",
    block: true,
    children: "Content goes here",
  },
}

export const BlockPrimary: Story = {
  args: {
    theme: "primary",
    block: true,
    children: "Content goes here",
  },
}

export const MultilineInline: Story = {
  args: {
    theme: "warning",
    children:
      "A longer passage of content that will wrap across multiple lines so the inline highlight rendering can be inspected at word boundaries.",
  },
}

export const MultilineBlock: Story = {
  args: {
    theme: "info",
    block: true,
    children:
      "A longer passage of content that will wrap across multiple lines so the block highlight rendering can be inspected.",
  },
}

export const PaletteBlack: Story = {
  args: { theme: "black", children: "Content goes here" },
}

export const PaletteDarkBlue: Story = {
  args: { theme: "darkBlue", children: "Content goes here" },
}

export const PaletteDarkGreen: Story = {
  args: { theme: "darkGreen", children: "Content goes here" },
}

export const PaletteDarkCyan: Story = {
  args: { theme: "darkCyan", children: "Content goes here" },
}

export const PaletteDarkRed: Story = {
  args: { theme: "darkRed", children: "Content goes here" },
}

export const PaletteDarkPink: Story = {
  args: { theme: "darkPink", children: "Content goes here" },
}

export const PaletteDarkYellow: Story = {
  args: { theme: "darkYellow", children: "Content goes here" },
}

export const PaletteLightGray: Story = {
  args: { theme: "lightGray", children: "Content goes here" },
}

export const PaletteDarkGray: Story = {
  args: { theme: "darkGray", children: "Content goes here" },
}

export const PaletteLightBlue: Story = {
  args: { theme: "lightBlue", children: "Content goes here" },
}

export const PaletteLightGreen: Story = {
  args: { theme: "lightGreen", children: "Content goes here" },
}

export const PaletteLightCyan: Story = {
  args: { theme: "lightCyan", children: "Content goes here" },
}

export const PaletteLightRed: Story = {
  args: { theme: "lightRed", children: "Content goes here" },
}

export const PaletteLightPink: Story = {
  args: { theme: "lightPink", children: "Content goes here" },
}

export const PaletteLightYellow: Story = {
  args: { theme: "lightYellow", children: "Content goes here" },
}

export const PaletteWhite: Story = {
  args: { theme: "white", children: "Content goes here" },
}
