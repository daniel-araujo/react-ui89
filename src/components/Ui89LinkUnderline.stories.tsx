import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, screen, userEvent } from "@storybook/test"

import { Ui89LinkUnderline } from "./Ui89LinkUnderline"
import { SceneDecorator } from "../storybook/SceneDecorator"
import {
  Ui89OverrideProvider,
  Ui89OverrideProviderProps,
} from "../Ui89Override"

const meta: Meta<typeof Ui89LinkUnderline> = {
  component: Ui89LinkUnderline,
  tags: ["autodocs"],
  decorators: [SceneDecorator],
}

export default meta

type Story = StoryObj<typeof meta>

export const NoLink: Story = {
  args: {
    children: "This link does not have a url or a click event handler",
  },
}

export const OverrideRouterPush: StoryObj<Ui89OverrideProviderProps> = {
  args: {
    routerPush: fn(),
  },

  render: (args, context) => (
    <Ui89OverrideProvider routerPush={args.routerPush}>
      <Ui89LinkUnderline href="/link">Link</Ui89LinkUnderline>
    </Ui89OverrideProvider>
  ),

  async play(context) {
    const link = await screen.findByRole("link")

    await userEvent.click(link)

    expect(context.args.routerPush).toHaveBeenCalledWith("/link")
  },
}

export const CallsClickEventHandler: StoryObj<{
  routerPush: any
  onClick: any
}> = {
  args: {
    routerPush: fn(),
    onClick: fn(),
  },

  render: (args, context) => (
    <Ui89OverrideProvider routerPush={args.routerPush}>
      <Ui89LinkUnderline onClick={args.onClick}>Link</Ui89LinkUnderline>
    </Ui89OverrideProvider>
  ),

  async play(context) {
    const link = await screen.findByRole("link")

    await userEvent.click(link)

    expect(context.args.onClick).toHaveBeenCalled()
    expect(context.args.routerPush).not.toHaveBeenCalled()
  },
}

export const IgnoresHrefWhenThereIsAClickEventHandler: StoryObj<{
  routerPush: any
  onClick: any
}> = {
  args: {
    routerPush: fn(),
    onClick: fn(),
  },

  render: (args, context) => (
    <Ui89OverrideProvider routerPush={args.routerPush}>
      <Ui89LinkUnderline href="/link" onClick={args.onClick}>
        Link
      </Ui89LinkUnderline>
    </Ui89OverrideProvider>
  ),

  async play(context) {
    const link = await screen.findByRole("link")

    await userEvent.click(link)

    expect(context.args.onClick).toHaveBeenCalled()
    expect(context.args.routerPush).not.toHaveBeenCalled()
  },
}
