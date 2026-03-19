import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, screen } from "storybook/test"

import { Ui89MenuCard } from "./Ui89MenuCard"
import { SceneDecorator } from "../storybook/SceneDecorator"
import { Ui89ThemeBackground } from "./Ui89ThemeBackground"
import { Ui89SpacePadding } from "./Ui89SpacePadding"

const meta: Meta<typeof Ui89MenuCard> = {
  component: Ui89MenuCard,
  tags: ["autodocs"],
  decorators: [SceneDecorator],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options: [
      { label: "Option 1", onClick: fn() },
      { label: "Option 2", onClick: fn() },
      { label: "Option 3 (Disabled)", onClick: fn(), disabled: true },
    ],
  },
}

export const WithLinks: Story = {
  args: {
    options: [
      { label: "Go to Example.com", href: "https://example.com" },
      { label: "Go Home", href: "/" },
    ],
  },
  play: async () => {
    const exampleLink = await screen.findByRole("link", {
      name: "Go to Example.com",
    })
    expect(exampleLink).toHaveAttribute("href", "https://example.com")

    const homeLink = await screen.findByRole("link", { name: "Go Home" })
    expect(homeLink).toHaveAttribute("href", "/")
  },
}

export const WithSeparator: Story = {
  args: {
    options: [
      { label: "Option 1", onClick: fn() },
      { type: "separator" },
      { label: "Option 2", onClick: fn() },
    ],
  },
}

export const WithShortcuts: Story = {
  args: {
    options: [
      { label: "Cut", onClick: fn(), oppositeLabel: "Ctrl+X" },
      { label: "Copy", onClick: fn(), oppositeLabel: "Ctrl+C" },
      { label: "Paste", onClick: fn(), oppositeLabel: "Ctrl+V" },
    ],
  },
}

export const AffectedByUi89ThemeBackground: Story = {
  args: Default.args,

  render: (args, context) => (
    <Ui89ThemeBackground theme="danger">
      <Ui89SpacePadding>
        <Ui89MenuCard {...args}>Card Content</Ui89MenuCard>
      </Ui89SpacePadding>
    </Ui89ThemeBackground>
  ),
}
