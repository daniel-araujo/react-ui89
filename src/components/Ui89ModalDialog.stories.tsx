import React from "react"

import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, screen, userEvent } from "storybook/test"

import { Ui89ModalDialog } from "./Ui89ModalDialog"
import { SceneDecorator } from "../storybook/SceneDecorator"
import { ActionPropUpdate } from "../storybook/ActionPropUpdate"

const meta: Meta<typeof Ui89ModalDialog> = {
  component: Ui89ModalDialog,
  tags: ["autodocs"],
  decorators: [
    SceneDecorator,
    ActionPropUpdate({
      updateArgs: {
        onRequestClose: () => {
          return {
            open: false,
          }
        },
      },
    }),
  ],
}

export default meta

type Story = StoryObj<typeof meta>

export const Open: Story = {
  args: {
    open: true,
    children: "Content goes here",
  },
}

export const Themed: Story = {
  args: {
    open: true,
    theme: "danger",
    children: "Content goes here",
  },
}

export const FullWidth: Story = {
  args: {
    open: true,
    size: "full",
    children: "Content goes here",
  },
}

export const SmallWidth: Story = {
  args: {
    open: true,
    size: "small",
    children: "Content goes here",
  },
}

export const ResponsiveWidthIfOmitted: Story = {
  args: {
    open: true,
    children: "This content will determine the width of the dialog.",
  },
}

export const ResponsiveOverflow: Story = {
  args: {
    open: true,
    children:
      "This long content should cause the responsive dialog to expand to the maximum width. ".repeat(
        10,
      ),
  },

  async play(context) {
    const dialog = await screen.findByRole("dialog")
    const dialogBox = dialog.querySelector(".ui89-modal-dialog__box")

    if (!dialogBox) {
      throw new Error("Dialog box not found")
    }

    const dialogBoxRect = dialogBox.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const dialogStyle = window.getComputedStyle(dialog)
    const dialogPadding =
      parseInt(dialogStyle.paddingLeft, 10) +
      parseInt(dialogStyle.paddingRight, 10)

    expect(dialogBoxRect.width).toBeCloseTo(viewportWidth - dialogPadding, 0)
  },

  globals: {
    viewport: {
      value: "mobile1",
      isRotated: false,
    },
  },
}

export const VerticalScroll: Story = {
  args: {
    open: true,
    children: "Content goes here\n".repeat(200),
  },
}

export const RequestsToCloseWhenClickingOnTheBackdrop: Story = {
  args: {
    open: true,
    children: "Content goes here\n".repeat(100),
    onRequestClose: fn(),
  },

  async play(context) {
    const dialog = await screen.findByRole("dialog")

    dialog.dispatchEvent(new MouseEvent("click", { bubbles: true }))

    expect(context.args.onRequestClose).toHaveBeenCalledOnce()
  },
}

export const FocusesFirstInputOnOpen: Story = {
  args: {
    open: true,
    children: (
      <>
        <input placeholder="First input" />
        <input placeholder="Second input" />
      </>
    ),
  },

  async play() {
    const input = await screen.findByPlaceholderText("First input")

    expect(document.activeElement).toBe(input)
  },
}

export const RequestsToCloseWhenPressingEscape: Story = {
  args: {
    open: true,
    children: "Content goes here",
    onRequestClose: fn(),
  },

  async play(context) {
    await userEvent.keyboard("{Escape}")

    expect(context.args.onRequestClose).toHaveBeenCalledOnce()
  },
}
