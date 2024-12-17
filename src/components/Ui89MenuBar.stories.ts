import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, screen, userEvent } from "@storybook/test"

import { Ui89MenuBar } from "./Ui89MenuBar"
import { SceneDecorator } from "../storybook/SceneDecorator"

const meta: Meta<typeof Ui89MenuBar> = {
  component: Ui89MenuBar,
  tags: ["autodocs"],
  decorators: [SceneDecorator],
}

export default meta

type Story = StoryObj<typeof meta>

export const Empty: Story = {
  args: {
    items: [],
  },
}

export const TwoItems: Story = {
  args: {
    items: [
      {
        label: "First",
        onClick: fn(),
      },
      {
        label: "Second",
        onClick: fn(),
      },
    ],
  },
}

export const ClickingOnItemCallsOnClick: Story = {
  args: {
    items: [
      {
        label: "First",
        onClick: fn(),
      },
    ],
  },

  async play(context) {
    const item = await screen.findByText("First")

    await userEvent.click(item)

    expect(context.args.items[0].onClick).toBeCalledTimes(1)
  },
}
