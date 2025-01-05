import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, screen, userEvent } from "@storybook/test"

import { Ui89NameValuePair } from "./Ui89NameValuePair"
import { SceneDecorator } from "../storybook/SceneDecorator"

const meta: Meta<typeof Ui89NameValuePair> = {
  component: Ui89NameValuePair,
  tags: ["autodocs"],
  decorators: [SceneDecorator],
}

export default meta

type Story = StoryObj<typeof meta>

export const Strings: Story = {
  args: {
    name: "First",
    value: "Second",
  },
}

export const Numbers: Story = {
  args: {
    name: 1,
    value: 2,
  },
}

export const Spaces: Story = {
  args: {
    name: "First sentence with spaces",
    value: "Second sentence with spaces",
  },
}
