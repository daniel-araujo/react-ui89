import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { fn, screen, userEvent } from "@storybook/test"

import { Ui89InputSelect } from "./Ui89InputSelect"
import { SceneDecorator } from "../storybook/SceneDecorator"
import { ActionPropUpdate } from "../storybook/ActionPropUpdate"
import { Ui89ModalDialog } from "./Ui89ModalDialog"
import { Ui89SpaceVertical } from "./Ui89SpaceVertical"
import { Ui89ThemeBackground } from "./Ui89ThemeBackground"
import { Ui89Theme } from "../theme"

const optionsSampleTo100 = Array.from({ length: 100 }, (_, i) => ({
  value: i + 1,
  label: `Option ${i + 1}`,
}))

function getOptionKeyValue(option: any) {
  return option.value
}

function renderOptionLabel(option: any) {
  return option.label
}

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
    value:
      "Very long string of text that should overflow but not be visible unless you trigger the tooltip",
    options: [
      "Very long string of text that should overflow but not be visible unless you trigger the tooltip",
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
    getOptionKey: getOptionKeyValue,
    renderOption: renderOptionLabel,
  },
}

export const MenuItemOverflowButOnlyOne: Story = {
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
    ].concat(optionsSampleTo100),
    getOptionKey: getOptionKeyValue,
    renderOption: renderOptionLabel,
  },
}

export const MenuVerticalOverflow: Story = {
  args: {
    options: optionsSampleTo100,
    getOptionKey: getOptionKeyValue,
    renderOption: renderOptionLabel,
  },
}

export const OptionHeight: Story = {
  args: {
    options: optionsSampleTo100,
    optionHeight: 100,
    getOptionKey: getOptionKeyValue,
    renderOption: renderOptionLabel,
  },

  async play(context) {
    const box = await screen.findByText("Select...")

    await userEvent.click(box)
  },
}

export const ModalDialog: Story = {
  args: {
    options: optionsSampleTo100,
    getOptionKey: getOptionKeyValue,
    renderOption: renderOptionLabel,
  },

  render: (args, context) => (
    <Ui89ModalDialog open={true}>
      <Ui89InputSelect {...args} />
    </Ui89ModalDialog>
  ),
}
