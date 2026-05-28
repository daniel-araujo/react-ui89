import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "storybook/test"

import { Ui89TagBox } from "./Ui89TagBox"
import { SceneDecorator } from "../storybook/SceneDecorator"

const meta: Meta<typeof Ui89TagBox> = {
  component: Ui89TagBox,
  tags: ["autodocs"],
  decorators: [SceneDecorator],
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

export const PaletteBlack: Story = {
  args: {
    theme: "black",
    children: "Label",
  },
}

export const PaletteDarkBlue: Story = {
  args: {
    theme: "darkBlue",
    children: "Label",
  },
}

export const PaletteDarkGreen: Story = {
  args: {
    theme: "darkGreen",
    children: "Label",
  },
}

export const PaletteDarkCyan: Story = {
  args: {
    theme: "darkCyan",
    children: "Label",
  },
}

export const PaletteDarkRed: Story = {
  args: {
    theme: "darkRed",
    children: "Label",
  },
}

export const PaletteDarkPink: Story = {
  args: {
    theme: "darkPink",
    children: "Label",
  },
}

export const PaletteDarkYellow: Story = {
  args: {
    theme: "darkYellow",
    children: "Label",
  },
}

export const PaletteLightGray: Story = {
  args: {
    theme: "lightGray",
    children: "Label",
  },
}

export const PaletteDarkGray: Story = {
  args: {
    theme: "darkGray",
    children: "Label",
  },
}

export const PaletteLightBlue: Story = {
  args: {
    theme: "lightBlue",
    children: "Label",
  },
}

export const PaletteLightGreen: Story = {
  args: {
    theme: "lightGreen",
    children: "Label",
  },
}

export const PaletteLightCyan: Story = {
  args: {
    theme: "lightCyan",
    children: "Label",
  },
}

export const PaletteLightRed: Story = {
  args: {
    theme: "lightRed",
    children: "Label",
  },
}

export const PaletteLightPink: Story = {
  args: {
    theme: "lightPink",
    children: "Label",
  },
}

export const PaletteLightYellow: Story = {
  args: {
    theme: "lightYellow",
    children: "Label",
  },
}

export const PaletteWhite: Story = {
  args: {
    theme: "white",
    children: "Label",
  },
}

export const VariantSolid: Story = {
  args: {
    theme: "primary",
    variant: "solid",
    children: "Label",
  },
}

export const VariantOutline: Story = {
  args: {
    theme: "primary",
    variant: "outline",
    children: "Label",
  },
}

export const VariantGhost: Story = {
  args: {
    theme: "primary",
    variant: "ghost",
    children: "Label",
  },
}

export const VariantSoft: Story = {
  args: {
    theme: "primary",
    variant: "soft",
    children: "Label",
  },
}

export const VariantDot: Story = {
  args: {
    theme: "primary",
    variant: "dot",
    children: "Label",
  },
}

export const VariantGradient: Story = {
  args: {
    theme: "primary",
    variant: "gradient",
    children: "Label",
  },
}

export const VariantUnderline: Story = {
  args: {
    theme: "primary",
    variant: "underline",
    children: "Label",
  },
}
