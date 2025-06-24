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
