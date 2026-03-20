import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, screen, userEvent } from "storybook/test"

import { Ui89LinkBracket } from "./Ui89LinkBracket"
import { SceneDecorator } from "../storybook/SceneDecorator"
import { Ui89Provider, Ui89OverrideProps } from "../Ui89Provider"

const meta: Meta<typeof Ui89LinkBracket> = {
  component: Ui89LinkBracket,
  tags: ["autodocs"],
  decorators: [SceneDecorator],
  args: {
    onClick: fn(),
  },
}

export default meta

type Story = StoryObj<typeof Ui89LinkBracket>

export const Default: Story = {
  args: {
    children: "A bracket link",
  },
}

export const AsLink: StoryObj<Ui89OverrideProps> = {
  args: {
    routerPush: fn(),
    href: "/link",
    children: "Link",
  },

  render: (args) => (
    <Ui89Provider routerPush={args.routerPush}>
      <Ui89LinkBracket href={args.href}>{args.children}</Ui89LinkBracket>
    </Ui89Provider>
  ),

  async play({ args }) {
    const link = await screen.findByRole("link", { name: `[${args.children}]` })
    await userEvent.click(link)
    expect(args.routerPush).toHaveBeenCalledWith(args.href)
  },
}

export const AsButton: Story = {
  args: {
    children: "Click me",
  },
  async play({ args }) {
    const link = await screen.findByRole("link", { name: `[${args.children}]` })
    await userEvent.click(link)
    expect(args.onClick).toHaveBeenCalled()
  },
}

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
  },
  async play({ args }) {
    const link = await screen.findByRole("link", { name: `[${args.children}]` })
    // A disabled link is not focusable and not clickable.
    // userEvent.click on a disabled element doesn't fire click events.
    await userEvent.click(link)
    expect(args.onClick).not.toHaveBeenCalled()
    expect(link).toHaveAttribute("aria-disabled", "true")
  },
}
