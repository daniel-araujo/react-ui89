import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, screen, userEvent } from "storybook/test"

import { Ui89LinkBase } from "./LinkBase"
import { SceneDecorator } from "../../storybook/SceneDecorator"
import { Ui89Provider, Ui89OverrideProps } from "../../Ui89Provider"

const meta: Meta<typeof Ui89LinkBase> = {
  component: Ui89LinkBase,
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

export const OverrideRouterPush: StoryObj<Ui89OverrideProps> = {
  args: {
    routerPush: fn(),
  },

  render: (args, context) => (
    <Ui89Provider routerPush={args.routerPush}>
      <Ui89LinkBase href="/link">Link</Ui89LinkBase>
    </Ui89Provider>
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
    <Ui89Provider routerPush={args.routerPush}>
      <Ui89LinkBase onClick={args.onClick}>Link</Ui89LinkBase>
    </Ui89Provider>
  ),

  async play(context) {
    const link = await screen.findByRole("link")

    await userEvent.click(link)

    expect(context.args.onClick).toHaveBeenCalled()
    expect(context.args.routerPush).not.toHaveBeenCalled()
  },
}

export const DoesNotCallRouterPushWhenDisabled: StoryObj<Ui89OverrideProps> = {
  args: {
    routerPush: fn(),
  },

  render: (args, context) => (
    <Ui89Provider routerPush={args.routerPush}>
      <Ui89LinkBase href="/link" disabled={true}>
        Link
      </Ui89LinkBase>
    </Ui89Provider>
  ),

  async play(context) {
    const link = await screen.findByRole("link")

    await userEvent.click(link)

    expect(context.args.routerPush).not.toHaveBeenCalled()
  },
}

export const DoesNotNavigateWhenDisabled: Story = {
  args: {
    href: "#should-not-navigate",
    disabled: true,
    children: "Link",
  },

  async play(context) {
    const initialHash = window.location.hash
    const link = await screen.findByRole("link")

    await userEvent.click(link)

    expect(window.location.hash).toBe(initialHash)
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
    <Ui89Provider routerPush={args.routerPush}>
      <Ui89LinkBase href="/link" onClick={args.onClick}>
        Link
      </Ui89LinkBase>
    </Ui89Provider>
  ),

  async play(context) {
    const link = await screen.findByRole("link")

    await userEvent.click(link)

    expect(context.args.onClick).toHaveBeenCalled()
    expect(context.args.routerPush).not.toHaveBeenCalled()
  },
}
