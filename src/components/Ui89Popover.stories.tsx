import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, screen, userEvent } from "storybook/test"

import { Ui89Popover, Ui89PopoverPropsPlacement } from "./Ui89Popover"
import { SceneDecorator } from "../storybook/SceneDecorator"
import { ActionPropUpdate } from "../storybook/ActionPropUpdate"
import { Ui89Card } from "./Ui89Card"
import { Ui89ThemeBackground } from "./Ui89ThemeBackground"

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
export const PopoverMaxOverflowWidthNotDefined: Story = {
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
    const container = await screen.findByText(
      "Click this to toggle the visibility of the card",
    )
    const popover = await screen.findByText("This is the card")

    const containerWidth = container.offsetWidth
    const popoverWidth = popover.offsetWidth

    const errorMargin = 20
    expect(Math.abs(popoverWidth - containerWidth)).toBeLessThanOrEqual(
      errorMargin,
    )
  },
}

export const PopoverMaxOverflowWidthSmallerThanContainer: Story = {
  args: {
    open: true,
  },

  render: (args, context) => (
    <>
      <Ui89Popover
        {...args}
        popoverOverflowMaxWidth={100}
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
    const container = await screen.findByText(
      "Click this to toggle the visibility of the card",
    )
    const popover = await screen.findByText("This is the card")

    const containerWidth = container.offsetWidth
    const popoverWidth = popover.offsetWidth

    const errorMargin = 20
    expect(Math.abs(popoverWidth - containerWidth)).toBeLessThanOrEqual(
      errorMargin,
    )
  },
}

export const PopoverMaxOverflowWidthLargerThanContainer: Story = {
  args: {
    open: true,
  },

  render: (args, context) => (
    <>
      <Ui89Popover
        {...args}
        popoverOverflowMaxWidth={1000}
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
    const container = await screen.findByText(
      "Click this to toggle the visibility of the card",
    )
    const popover = await screen.findByText("This is the card")

    const containerWidth = container.offsetWidth
    const popoverWidth = popover.offsetWidth

    expect(popoverWidth).toBeGreaterThan(containerWidth)
  },
}

export const PlacementBottomRightCorner: Story = {
  args: {
    open: true,
    placement: Ui89PopoverPropsPlacement.bottomEnd,
    popoverOverflowMaxWidth: 300,
  },

  render: (args, context) => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Ui89Popover
        {...args}
        renderContainer={(props) => (
          <span
            ref={props.setRef}
            {...props.props}
            style={{ cursor: "pointer" }}
          >
            Container
          </span>
        )}
        renderPopover={() => (
          <Ui89ThemeBackground theme="danger">Popover</Ui89ThemeBackground>
        )}
      />
    </div>
  ),

  async play(context) {
    const container = await screen.findByText("Container")
    const popover = await screen.findByText("Popover")

    const containerRect = container.getBoundingClientRect()
    const popoverRect = popover.getBoundingClientRect()

    // The popover should be below the container.
    expect(popoverRect.top).toBeCloseTo(containerRect.bottom)

    // The popover's left should be aligned with the container's left.
    expect(popoverRect.right).toBeCloseTo(containerRect.right, 0)
  },
}
