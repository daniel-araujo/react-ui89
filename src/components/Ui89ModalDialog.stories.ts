import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, screen, userEvent } from "@storybook/test"

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
          console.log("test;")
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

export const VerticalScroll: Story = {
  args: {
    open: true,
    children: "Content goes here\n".repeat(100),
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
