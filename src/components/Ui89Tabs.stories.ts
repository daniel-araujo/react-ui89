import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "storybook/test"

import { Ui89Tabs } from "./Ui89Tabs"
import { SceneDecorator } from "../storybook/SceneDecorator"
import { ActionPropUpdate } from "../storybook/ActionPropUpdate"

const optionsSampleTwo = [
  {
    value: "1",
    label: "One",
  },
  {
    value: "2",
    label: "Two",
  },
]

const optionsSampleTo20 = Array.from({ length: 20 }, (_, i) => ({
  value: i + 1,
  label: `Option ${i + 1}`,
}))

const meta: Meta<typeof Ui89Tabs> = {
  component: Ui89Tabs,
  tags: ["autodocs"],
  decorators: [
    SceneDecorator,
    ActionPropUpdate({
      directLink: {
        onChange: "selected",
      },
    }),
  ],
}

export default meta

type Story = StoryObj<typeof meta>

export const NothingSelected: Story = {
  args: {
    options: optionsSampleTwo,
  },
}

export const Selected: Story = {
  args: {
    options: optionsSampleTwo,
    selected: "1",
  },
}

export const Stretch: Story = {
  args: {
    options: optionsSampleTwo,
    selected: "1",
    stretch: true,
  },
}

export const WrapToMultipleRows: Story = {
  args: {
    options: optionsSampleTo20,
    selected: "2",
  },
}

export const WrapToMultipleRowsAndStretch: Story = {
  args: {
    options: optionsSampleTo20,
    selected: "2",
    stretch: true,
  },
}

export const ThemePrimary: Story = {
  args: { theme: "primary", options: optionsSampleTwo, selected: "1" },
}
export const ThemeSecondary: Story = {
  args: { theme: "secondary", options: optionsSampleTwo, selected: "1" },
}
export const ThemeInfo: Story = {
  args: { theme: "info", options: optionsSampleTwo, selected: "1" },
}
export const ThemeSuccess: Story = {
  args: { theme: "success", options: optionsSampleTwo, selected: "1" },
}
export const ThemeWarning: Story = {
  args: { theme: "warning", options: optionsSampleTwo, selected: "1" },
}
export const ThemeDanger: Story = {
  args: { theme: "danger", options: optionsSampleTwo, selected: "1" },
}

export const PaletteBlack: Story = {
  args: { theme: "black", options: optionsSampleTwo, selected: "1" },
}
export const PaletteDarkBlue: Story = {
  args: { theme: "darkBlue", options: optionsSampleTwo, selected: "1" },
}
export const PaletteDarkGreen: Story = {
  args: { theme: "darkGreen", options: optionsSampleTwo, selected: "1" },
}
export const PaletteDarkCyan: Story = {
  args: { theme: "darkCyan", options: optionsSampleTwo, selected: "1" },
}
export const PaletteDarkRed: Story = {
  args: { theme: "darkRed", options: optionsSampleTwo, selected: "1" },
}
export const PaletteDarkPink: Story = {
  args: { theme: "darkPink", options: optionsSampleTwo, selected: "1" },
}
export const PaletteDarkYellow: Story = {
  args: { theme: "darkYellow", options: optionsSampleTwo, selected: "1" },
}
export const PaletteLightGray: Story = {
  args: { theme: "lightGray", options: optionsSampleTwo, selected: "1" },
}
export const PaletteDarkGray: Story = {
  args: { theme: "darkGray", options: optionsSampleTwo, selected: "1" },
}
export const PaletteLightBlue: Story = {
  args: { theme: "lightBlue", options: optionsSampleTwo, selected: "1" },
}
export const PaletteLightGreen: Story = {
  args: { theme: "lightGreen", options: optionsSampleTwo, selected: "1" },
}
export const PaletteLightCyan: Story = {
  args: { theme: "lightCyan", options: optionsSampleTwo, selected: "1" },
}
export const PaletteLightRed: Story = {
  args: { theme: "lightRed", options: optionsSampleTwo, selected: "1" },
}
export const PaletteLightPink: Story = {
  args: { theme: "lightPink", options: optionsSampleTwo, selected: "1" },
}
export const PaletteLightYellow: Story = {
  args: { theme: "lightYellow", options: optionsSampleTwo, selected: "1" },
}
export const PaletteWhite: Story = {
  args: { theme: "white", options: optionsSampleTwo, selected: "1" },
}
