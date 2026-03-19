import React, { useState } from "react"
import { createPortal } from "react-dom"

import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, screen, userEvent } from "storybook/test"

import { Ui89ModalDialog } from "./Ui89ModalDialog"
import { SceneDecorator } from "../storybook/SceneDecorator"
import { ActionPropUpdate } from "../storybook/ActionPropUpdate"
import { Ui89Button } from "./Ui89Button"
import { Ui89SpaceVertical } from "./Ui89SpaceVertical"
import { Ui89Provider } from "../Ui89Provider"

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
      isRotated: false
    }
  }
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
    const backdrop = await screen.findByRole("presentation")

    await userEvent.click(backdrop)

    expect(context.args.onRequestClose).toHaveBeenCalledOnce()
  },
}
export const DoesNotIncreaseZIndexWithoutProvider: Story = {
  render: (args, context) => {
    const [open, setOpen] = useState(false)

    return (
      <>
        <Ui89ModalDialog open={open}>First dialog in the DOM</Ui89ModalDialog>

        <Ui89ModalDialog open={true}>
          <span>Second dialog in the DOM</span>

          <Ui89SpaceVertical />

          <Ui89Button onClick={() => setOpen(true)}>
            Open another dialog
          </Ui89Button>
        </Ui89ModalDialog>
      </>
    )
  },

  async play(context) {
    const button = await screen.findByRole("button")
    await userEvent.click(button)

    const firstDialogText = await screen.findByText("First dialog in the DOM")
    const secondDialogText = await screen.findByText("Second dialog in the DOM")

    const firstDialog = firstDialogText.closest('[role="dialog"]')
    const secondDialog = secondDialogText.closest('[role="dialog"]')

    if (firstDialog === null) {
      throw new Error("Could not find first dialog")
    }
    if (secondDialog === null) {
      throw new Error("Could not find second dialog")
    }

    const firstZIndex = window.getComputedStyle(firstDialog).zIndex
    const secondZIndex = window.getComputedStyle(secondDialog).zIndex

    const firstZ = parseInt(firstZIndex || "0", 10)
    const secondZ = parseInt(secondZIndex || "0", 10)

    expect(firstZ).toEqual(secondZ)
  },
}

export const IncreasesZIndexWhenOpenWithProvider: Story = {
  render: (args, context) => {
    const [open, setOpen] = useState(false)

    return (
      <Ui89Provider>
        <Ui89ModalDialog open={open}>First dialog in the DOM</Ui89ModalDialog>

        <Ui89ModalDialog open={true}>
          <span>Second dialog in the DOM</span>

          <Ui89SpaceVertical />

          <Ui89Button onClick={() => setOpen(true)}>
            Open another dialog
          </Ui89Button>
        </Ui89ModalDialog>
      </Ui89Provider>
    )
  },

  async play(context) {
    const button = await screen.findByRole("button")
    await userEvent.click(button)

    const firstDialogText = await screen.findByText("First dialog in the DOM")
    const secondDialogText = await screen.findByText("Second dialog in the DOM")

    const firstDialog = firstDialogText.closest('[role="dialog"]')
    const secondDialog = secondDialogText.closest('[role="dialog"]')

    if (firstDialog === null) {
      throw new Error("Could not find first dialog")
    }
    if (secondDialog === null) {
      throw new Error("Could not find second dialog")
    }

    const firstZIndex = window.getComputedStyle(firstDialog).zIndex
    const secondZIndex = window.getComputedStyle(secondDialog).zIndex

    const firstZ = parseInt(firstZIndex || "0", 10)
    const secondZ = parseInt(secondZIndex || "0", 10)

    expect(firstZ).toBeGreaterThan(secondZ)
  },
}

export const OverrideCreatePortal: Story = {
  render: (args, context) => {
    const [container, setContainer] = useState<HTMLDivElement | null>(null)

    return (
      <Ui89Provider
        createPortal={(children) => {
          if (!container) return null as any
          return createPortal(children, container)
        }}
      >
        <div
          ref={setContainer}
          data-testid="custom-portal-root"
          style={{
            position: "relative",
            height: "300px",
            border: "1px solid red",
            overflow: "hidden",
          }}
        />
        <Ui89ModalDialog open={true}>
          Content inside custom portal
        </Ui89ModalDialog>
      </Ui89Provider>
    )
  },

  async play(context) {
    const customRoot = await screen.findByTestId("custom-portal-root")
    const dialog = await screen.findByRole("dialog")

    if (!customRoot.contains(dialog)) {
      throw new Error("Dialog is not inside custom portal root")
    }
  },
}
