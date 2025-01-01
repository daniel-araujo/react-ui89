import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"

import { Ui89InputSelect } from "./Ui89InputSelect"
import { SceneDecorator } from "../storybook/SceneDecorator"
import { ActionPropUpdate } from "../storybook/ActionPropUpdate"

const meta: Meta<typeof Ui89InputSelect> = {
  component: Ui89InputSelect,
  tags: ["autodocs"],
  decorators: [
    SceneDecorator,
    ActionPropUpdate({
      directLink: {
        onChange: "value",
      },
    }),
  ],
}

export default meta

type Story = StoryObj<typeof meta>

export const Empty: Story = {}

export const SelectedItemOverflow: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  args: {
    value: 1,
    options: [
      {
        value: 1,
        label:
          "Very long string of text that should overflow but not be visible unless you trigger the tooltip",
      },
    ],
  },
}

export const MenuItemOverflow: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  args: {
    options: [
      {
        value: 1,
        label:
          "Very long string of text that should overflow but still be visible",
      },
    ],
  },
}
