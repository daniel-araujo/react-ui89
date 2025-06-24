import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, screen, userEvent } from "storybook/test"

import { Ui89NameValuePair } from "./Ui89NameValuePair"
import { SceneDecorator } from "../storybook/SceneDecorator"

const meta: Meta<typeof Ui89NameValuePair> = {
  parameters: {
    viewport: { defaultViewport: "desktop" },
  },
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

export const NameWithFixedWidth: Story = {
  args: {
    name: "First",
    value: "Second",
    leftMaxWidth: 500,
  },
  render: (args, context) => (
    <>
      <Ui89NameValuePair {...args} name="First" />
      <Ui89NameValuePair {...args} name="Second" value="Third" />
      <Ui89NameValuePair {...args} name="Six" value="One Hundred Ninety Four" />
      <Ui89NameValuePair
        {...args}
        name="Six"
        value="Two thousand and One Hundred and Ninety Four"
      />
      <Ui89NameValuePair {...args} name="Nine" value="Twenty four" />
    </>
  ),
}

export const TextWrap: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  args: {
    name: "First",
    value: "Second",
    leftMaxWidth: 500,
  },
  render: (args, context) => (
    <>
      <Ui89NameValuePair {...args} name="First" />
      <Ui89NameValuePair {...args} name="Second" value="Third" />
      <Ui89NameValuePair {...args} name="Six" value="One Hundred Ninety Four" />
      <Ui89NameValuePair {...args} name="Nine" value="Twenty four" />
    </>
  ),
}
