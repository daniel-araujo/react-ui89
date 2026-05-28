import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, screen, userEvent } from "storybook/test"

import { Ui89MenuBar } from "./Ui89MenuBar"
import { SceneDecorator } from "../storybook/SceneDecorator"

const meta: Meta<typeof Ui89MenuBar> = {
  component: Ui89MenuBar,
  tags: ["autodocs"],
  decorators: [SceneDecorator],
}

export default meta

type Story = StoryObj<typeof meta>

export const Empty: Story = {
  args: {
    items: [],
  },
}

const sampleItems = [
  { label: "First", onClick: fn() },
  { label: "Second", onClick: fn() },
]

export const TwoItems: Story = {
  args: {
    items: sampleItems,
  },
}

export const ThemePrimary: Story = {
  args: { theme: "primary", items: sampleItems },
}
export const ThemeSecondary: Story = {
  args: { theme: "secondary", items: sampleItems },
}
export const ThemeInfo: Story = {
  args: { theme: "info", items: sampleItems },
}
export const ThemeSuccess: Story = {
  args: { theme: "success", items: sampleItems },
}
export const ThemeWarning: Story = {
  args: { theme: "warning", items: sampleItems },
}
export const ThemeDanger: Story = {
  args: { theme: "danger", items: sampleItems },
}

export const PaletteBlack: Story = {
  args: { theme: "black", items: sampleItems },
}
export const PaletteDarkBlue: Story = {
  args: { theme: "darkBlue", items: sampleItems },
}
export const PaletteDarkGreen: Story = {
  args: { theme: "darkGreen", items: sampleItems },
}
export const PaletteDarkCyan: Story = {
  args: { theme: "darkCyan", items: sampleItems },
}
export const PaletteDarkRed: Story = {
  args: { theme: "darkRed", items: sampleItems },
}
export const PaletteDarkPink: Story = {
  args: { theme: "darkPink", items: sampleItems },
}
export const PaletteDarkYellow: Story = {
  args: { theme: "darkYellow", items: sampleItems },
}
export const PaletteLightGray: Story = {
  args: { theme: "lightGray", items: sampleItems },
}
export const PaletteDarkGray: Story = {
  args: { theme: "darkGray", items: sampleItems },
}
export const PaletteLightBlue: Story = {
  args: { theme: "lightBlue", items: sampleItems },
}
export const PaletteLightGreen: Story = {
  args: { theme: "lightGreen", items: sampleItems },
}
export const PaletteLightCyan: Story = {
  args: { theme: "lightCyan", items: sampleItems },
}
export const PaletteLightRed: Story = {
  args: { theme: "lightRed", items: sampleItems },
}
export const PaletteLightPink: Story = {
  args: { theme: "lightPink", items: sampleItems },
}
export const PaletteLightYellow: Story = {
  args: { theme: "lightYellow", items: sampleItems },
}
export const PaletteWhite: Story = {
  args: { theme: "white", items: sampleItems },
}

export const ClickingOnItemCallsOnClick: Story = {
  args: {
    items: [
      {
        label: "First",
        onClick: fn(),
      },
    ],
  },

  async play(context) {
    const item = await screen.findByText("First")

    await userEvent.click(item)

    expect(context.args.items[0].onClick).toBeCalledTimes(1)
  },
}
