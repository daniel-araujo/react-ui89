import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, screen, userEvent } from "storybook/test"

import { Ui89Popover } from "./Ui89Popover"
import { SceneDecorator } from "../storybook/SceneDecorator"
import { ActionPropUpdate } from "../storybook/ActionPropUpdate"
import { Ui89Card } from "./Ui89Card"

const meta: Meta<typeof Ui89Popover> = {
  parameters: {
    viewport: { defaultViewport: "desktop" },
  },
  component: Ui89Popover,
  tags: ["autodocs"],
  decorators: [
    SceneDecorator,

    ActionPropUpdate({
      directLink: {
        onOpenChange: "open",
      },
    }),
  ],
}

export default meta

type Story = StoryObj<typeof meta>

export const CanBeOpenByDefault: Story = {
  args: {
    open: true,
  },

  render: (args, context) => (
    <>
      <Ui89Popover
        {...args}
        renderContainer={(props) => (
          <span
            ref={props.setRef}
            {...props.props}
            style={{ cursor: "pointer" }}
          >
            Click this to toggle the visibility of the card
          </span>
        )}
        renderPopover={() => <Ui89Card>This is the card</Ui89Card>}
      />
    </>
  ),

  async play(context) {
    const card = await screen.findByText("This is the card")
    expect(card).toBeVisible()
  },
}

export const OpenByClicking: Story = {
  args: {
    open: false,
  },

  render: (args, context) => (
    <>
      <Ui89Popover
        {...args}
        renderContainer={(props) => (
          <span
            ref={props.setRef}
            {...props.props}
            style={{ cursor: "pointer" }}
          >
            Click this to toggle the visibility of the card
          </span>
        )}
        renderPopover={() => <Ui89Card>This is the card</Ui89Card>}
      />
    </>
  ),

  async play(context) {
    const text = await screen.findByText(
      "Click this to toggle the visibility of the card",
    )
    await userEvent.click(text)

    const card = await screen.findByText("This is the card")
    expect(card).toBeVisible()
  },
}

export const PopoverCanBeSmallerThanContainer: Story = {
  args: {
    open: true,
  },

  render: (args, context) => (
    <>
      <Ui89Popover
        {...args}
        popoverWidth={100}
        renderContainer={(props) => (
          <span
            ref={props.setRef}
            {...props.props}
            style={{ cursor: "pointer" }}
          >
            Click this to toggle the visibility of the card
          </span>
        )}
        renderPopover={() => <Ui89Card>This is the card</Ui89Card>}
      />
    </>
  ),
}

export const PopoverCanBeLargerThanContainer: Story = {
  args: {
    open: true,
  },

  render: (args, context) => (
    <>
      <Ui89Popover
        {...args}
        popoverWidth={1000}
        renderContainer={(props) => (
          <span
            ref={props.setRef}
            {...props.props}
            style={{ cursor: "pointer" }}
          >
            Click this to toggle the visibility of the card
          </span>
        )}
        renderPopover={() => <Ui89Card>This is the card</Ui89Card>}
      />
    </>
  ),
}
