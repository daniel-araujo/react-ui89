import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, screen, userEvent } from "@storybook/test"

import { Ui89Button } from "./Ui89Button"
import { SceneDecorator } from "../storybook/SceneDecorator"
import {
  Ui89OverrideProvider,
  Ui89OverrideProviderProps,
} from "../Ui89Override"

const meta: Meta<typeof Ui89Button> = {
  component: Ui89Button,
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

export const OverrideRouterPush: StoryObj<Ui89OverrideProviderProps> = {
  args: {
    routerPush: fn(),
  },

  render: (args, context) => (
    <Ui89OverrideProvider routerPush={args.routerPush}>
      <Ui89Button href="/link">Button</Ui89Button>
    </Ui89OverrideProvider>
  ),

  async play(context) {
    const button = await screen.findByRole("button")

    await userEvent.click(button)

    expect(context.args.routerPush).toHaveBeenCalledWith("/link")
  },
}
