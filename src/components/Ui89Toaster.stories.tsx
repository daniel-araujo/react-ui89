import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { fn, screen, userEvent } from "storybook/test"

import { Ui89Toaster, useUi89Toaster } from "./Ui89Toaster"
import { SceneDecorator } from "../storybook/SceneDecorator"
import { Ui89InputSelect } from "./Ui89InputSelect"
import { Ui89Theme } from "../theme"

const meta: Meta<typeof Ui89Toaster> = {
  component: Ui89Toaster,
  decorators: [SceneDecorator],
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: "Title goes here",
  },

  async play(context) {
    const toaster = useUi89Toaster()

    toaster.toast("This is a test", {
      theme: Ui89Theme.primary,
      autoClose: false,
    })

    await screen.findByText("This is a test")
  },
}

export const Secondary: Story = {
  args: {
    children: "Title goes here",
  },

  async play(context) {
    const toaster = useUi89Toaster()

    toaster.toast("This is a test", {
      theme: Ui89Theme.secondary,
      autoClose: false,
    })

    await screen.findByText("This is a test")
  },
}

export const Success: Story = {
  args: {
    children: "Title goes here",
  },

  async play(context) {
    const toaster = useUi89Toaster()

    toaster.toast("This is a test", {
      theme: Ui89Theme.success,
      autoClose: false,
    })

    await screen.findByText("This is a test")
  },
}

export const Danger: Story = {
  args: {
    children: "Title goes here",
  },

  async play(context) {
    const toaster = useUi89Toaster()

    toaster.toast("This is a test", {
      theme: Ui89Theme.danger,
      autoClose: false,
    })

    await screen.findByText("This is a test")
  },
}

export const Warning: Story = {
  args: {
    children: "Title goes here",
  },

  async play(context) {
    const toaster = useUi89Toaster()

    toaster.toast("This is a test", {
      theme: Ui89Theme.warning,
      autoClose: false,
    })

    await screen.findByText("This is a test")
  },
}

export const Info: Story = {
  args: {
    children: "Title goes here",
  },

  async play(context) {
    const toaster = useUi89Toaster()

    toaster.toast("This is a test", {
      theme: Ui89Theme.info,
      autoClose: false,
    })

    await screen.findByText("This is a test")
  },
}

function makePaletteStory(theme: string): Story {
  return {
    args: { children: "Title goes here" },
    async play(context) {
      const toaster = useUi89Toaster()
      toaster.toast("This is a test", { theme: theme as any, autoClose: false })
      await screen.findByText("This is a test")
    },
  }
}

export const PaletteBlack = makePaletteStory("black")
export const PaletteDarkBlue = makePaletteStory("darkBlue")
export const PaletteDarkGreen = makePaletteStory("darkGreen")
export const PaletteDarkCyan = makePaletteStory("darkCyan")
export const PaletteDarkRed = makePaletteStory("darkRed")
export const PaletteDarkPink = makePaletteStory("darkPink")
export const PaletteDarkYellow = makePaletteStory("darkYellow")
export const PaletteLightGray = makePaletteStory("lightGray")
export const PaletteDarkGray = makePaletteStory("darkGray")
export const PaletteLightBlue = makePaletteStory("lightBlue")
export const PaletteLightGreen = makePaletteStory("lightGreen")
export const PaletteLightCyan = makePaletteStory("lightCyan")
export const PaletteLightRed = makePaletteStory("lightRed")
export const PaletteLightPink = makePaletteStory("lightPink")
export const PaletteLightYellow = makePaletteStory("lightYellow")
export const PaletteWhite = makePaletteStory("white")

export const ShowText: Story = {
  args: {
    children: "Title goes here",
  },

  async play(context) {
    const toaster = useUi89Toaster()

    toaster.toast("This is a test")

    await screen.findByText("This is a test")
  },
}

export const ShowComponent: Story = {
  args: {
    children: "Title goes here",
  },

  async play(context) {
    const toaster = useUi89Toaster()

    toaster.toast(<Ui89InputSelect />)

    await screen.findByText("Select...")
  },
}

export const TwoToasts: Story = {
  args: {
    children: "Title goes here",
  },

  async play(context) {
    const toaster = useUi89Toaster()

    toaster.toast("This is a test 1")
    toaster.toast("This is a test 2")

    await screen.findByText("This is a test 1")
    await screen.findByText("This is a test 2")
  },
}
