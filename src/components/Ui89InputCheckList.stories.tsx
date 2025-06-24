import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, screen, userEvent, waitFor } from "storybook/test"

import { Ui89InputCheckList } from "./Ui89InputCheckList"
import { SceneDecorator } from "../storybook/SceneDecorator"
import { ActionPropUpdate } from "../storybook/ActionPropUpdate"

const meta: Meta<typeof Ui89InputCheckList> = {
  component: Ui89InputCheckList,
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

export const NoneSelected: Story = {
  args: {
    value: [],
    options: [1, 2],
  },

  async play(context) {
    const checkboxes = await waitFor(() => screen.getAllByRole("checkbox"))

    expect(checkboxes[0]).not.toBeChecked()
    expect(checkboxes[1]).not.toBeChecked()
  },
}

export const OneSelected: Story = {
  args: {
    value: [1],
    options: [1, 2],
  },

  async play(context) {
    const checkboxes = await waitFor(() => screen.getAllByRole("checkbox"))

    expect(checkboxes[0]).toBeChecked()
    expect(checkboxes[1]).not.toBeChecked()
  },
}

export const LongText: Story = {
  args: {
    value: [],
    options: ["xxx".repeat(100), "yyy".repeat(100)],
  },
}

export const RenderOption: Story = {
  args: {
    value: [],
    options: [1, 2],
    renderOption(props) {
      if (props.option === 1) {
        return "one"
      } else if (props.option === 2) {
        return "two"
      } else {
        return "Unknown"
      }
    },
  },

  async play(context) {
    await screen.findByText("one")
    await screen.findByText("two")
  },
}

export const CallsOnChangeWhenClickingCheckbox: Story = {
  args: {
    value: [],
    options: ["one", "two"],
    onChange: fn(),
  },

  async play(context) {
    const checkboxes = await waitFor(() => screen.getAllByRole("checkbox"))

    await userEvent.click(checkboxes[1])

    expect(context.args.onChange).toHaveBeenCalledWith(["two"])
  },
}

export const CallsOnChangeWhenClickingLabel: Story = {
  args: {
    value: [],
    options: ["one", "two"],
    onChange: fn(),
  },

  async play(context) {
    const label = await screen.findByText("one")

    await userEvent.click(label)

    expect(context.args.onChange).toHaveBeenCalledWith(["one"])
  },
}

export const CallsOnSelectWhenSelectingAnOption: Story = {
  args: {
    value: [],
    options: ["one", "two"],
    onSelect: fn(),
    onDeselect: fn(),
  },

  async play(context) {
    const checkboxes = await waitFor(() => screen.getAllByRole("checkbox"))

    await userEvent.click(checkboxes[1])

    expect(context.args.onSelect).toHaveBeenCalledWith("two")
    expect(context.args.onDeselect).not.toHaveBeenCalled()
  },
}

export const CallsOnDeselectWhenSelectingAnOption: Story = {
  args: {
    value: ["two"],
    options: ["one", "two"],
    onSelect: fn(),
    onDeselect: fn(),
  },

  async play(context) {
    const checkboxes = await waitFor(() => screen.getAllByRole("checkbox"))

    await userEvent.click(checkboxes[1])

    expect(context.args.onSelect).not.toHaveBeenCalled()
    expect(context.args.onDeselect).toHaveBeenCalledWith("two")
  },
}

export const MaxHeightPx: Story = {
  args: {
    value: [],
    options: Array(100),
    maxHeight: "100px",
  },
}

export const MaxHeightPercentage: Story = {
  args: {
    value: [],
    options: Array(100),
    maxHeight: "50%",
  },

  render: (args, context) => (
    <div style={{ height: "200px" }}>
      <Ui89InputCheckList {...args} />
    </div>
  ),
}
