import React, { useState } from "react"

import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, screen, userEvent } from "storybook/test"

import { Ui89InputText } from "./Ui89InputText"
import { SceneDecorator } from "../storybook/SceneDecorator"
import { ActionPropUpdate } from "../storybook/ActionPropUpdate"

const meta: Meta<typeof Ui89InputText> = {
  component: Ui89InputText,
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

export const Default: Story = {}

export const TypingEmitsOnChange: Story = {
  args: {
    value: "",
    onChange: fn(),
  },

  async play(context) {
    const textbox = await screen.findByRole("textbox")

    await userEvent.type(textbox, "A")

    await new Promise((resolve) => setTimeout(resolve, 200))

    expect(context.args.onChange).not.toHaveBeenCalled()

    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(context.args.onChange).toHaveBeenCalledOnce()
  },
}

export const TypingOnlyEmitsOnChangeWhenNoLongerTyping: Story = {
  args: {
    value: "",
    onChange: fn(),
  },

  async play(context) {
    const textbox = await screen.findByRole("textbox")

    await userEvent.type(textbox, "A")

    await new Promise((resolve) => setTimeout(resolve, 150))

    expect(context.args.onChange).not.toHaveBeenCalled()

    await userEvent.type(textbox, "a")

    await new Promise((resolve) => setTimeout(resolve, 150))

    expect(context.args.onChange).not.toHaveBeenCalled()

    await new Promise((resolve) => setTimeout(resolve, 300))

    expect(context.args.onChange).toHaveBeenCalledWith("Aa")
  },
}

export const DoesNotEmitOnChangeOnBlurIfValuesDidNotChange: Story = {
  args: {
    value: "A",
    onChange: fn(),
  },

  async play(context) {
    const textbox = await screen.findByRole("textbox")

    textbox.focus()

    await new Promise((resolve) => setTimeout(resolve, 50))

    textbox.blur()

    await new Promise((resolve) => setTimeout(resolve, 50))

    expect(context.args.onChange).not.toHaveBeenCalled()
  },
}

export const DoesNotEmitOnChangeTwiceBecauseOfBlur: Story = {
  args: {
    value: "",
    onChange: fn(),
  },

  async play(context) {
    const textbox = await screen.findByRole("textbox")

    textbox.focus()

    await new Promise((resolve) => setTimeout(resolve, 50))

    await userEvent.type(textbox, "A")

    textbox.blur()

    await new Promise((resolve) => setTimeout(resolve, 500))

    expect(context.args.onChange).toHaveBeenCalledTimes(1)
  },
}

export const RemovesWhitespaceAtTheBeginning: Story = {
  args: {
    value: "",
    onChange: fn(),
  },

  async play(context) {
    const textbox = await screen.findByRole("textbox")

    await userEvent.type(textbox, " A")

    textbox.blur()

    expect(context.args.onChange).toHaveBeenCalledWith("A")
  },
}

export const RemovesWhitespaceAtTheEnd: Story = {
  args: {
    value: "",
    onChange: fn(),
  },

  async play(context) {
    const textbox = await screen.findByRole("textbox")

    await userEvent.type(textbox, "A ")

    textbox.blur()

    expect(context.args.onChange).toHaveBeenCalledWith("A")
  },
}

export const RemovesExtraWhitespaceInTheMiddle: Story = {
  args: {
    value: "",
    onChange: fn(),
  },

  async play(context) {
    const textbox = await screen.findByRole("textbox")

    await userEvent.type(textbox, "A  A")

    textbox.blur()

    expect(context.args.onChange).toHaveBeenCalledWith("A A")
  },
}

export const CallsOnChangeWhenEnter: Story = {
  args: {
    value: "",
    onChange: fn(),
  },

  async play(context) {
    const textbox = await screen.findByRole("textbox")

    await userEvent.type(textbox, "A{Enter}")

    expect(context.args.onChange).toHaveBeenCalledWith("A")

    await userEvent.type(textbox, "A{Enter}")

    expect(context.args.onChange).toHaveBeenCalledWith("AA")
  },
}

export const EmitsWhatWasTypedWhenValueWasChangedBeforeLastKeyStroke: Story = {
  args: {
    value: "",
    onChange: fn(),
  },

  render: (args, context) => {
    const [value, setValue] = useState(args.value)

    context.storyGlobals.setValue = setValue
    args.onChange = fn(setValue)

    return (
      <Ui89InputText
        value={value}
        onChange={(a) => {
          context.storyGlobals.setValue(a)
          args.onChange?.(a)
        }}
      />
    )
  },

  async play(context) {
    const textbox = await screen.findByRole("textbox")

    textbox.focus()

    await new Promise((resolve) => setTimeout(resolve, 50))

    await userEvent.type(textbox, "A")

    await new Promise((resolve) => setTimeout(resolve, 400))

    context.storyGlobals.setValue("B")

    await new Promise((resolve) => setTimeout(resolve, 1))

    await userEvent.type(textbox, "C")

    textbox.blur()

    expect(context.args.onChange).toHaveBeenCalledWith("AC")
  },
}

export const DisplaysValueWhenContentHasNotChangedSinceFocus: Story = {
  args: {
    value: "A",
    onChange: fn(),
  },

  render: (args, context) => {
    const [value, setValue] = useState(args.value)

    context.storyGlobals.setValue = setValue
    args.onChange = fn(setValue)

    return (
      <Ui89InputText
        value={value}
        onChange={(a) => {
          context.storyGlobals.setValue(a)
          args.onChange?.(a)
        }}
      />
    )
  },

  async play(context) {
    const textbox = await screen.findByRole("textbox")

    textbox.focus()

    await new Promise((resolve) => setTimeout(resolve, 1))

    context.storyGlobals.setValue("B")

    await new Promise((resolve) => setTimeout(resolve, 1))

    expect(textbox).toHaveDisplayValue("B")
  },
}

export const DisplaysValueWhenContentHasOnlyChangedSinceLastFocusByADifferentValue: Story =
  {
    args: {
      value: "A",
      onChange: fn(),
    },

    render: (args, context) => {
      const [value, setValue] = useState(args.value)

      context.storyGlobals.setValue = setValue
      args.onChange = fn(setValue)

      return (
        <Ui89InputText
          value={value}
          onChange={(a) => {
            context.storyGlobals.setValue(a)
            args.onChange?.(a)
          }}
        />
      )
    },

    async play(context) {
      const textbox = await screen.findByRole("textbox")

      textbox.focus()

      await new Promise((resolve) => setTimeout(resolve, 1))

      context.storyGlobals.setValue("B")

      await new Promise((resolve) => setTimeout(resolve, 1))

      context.storyGlobals.setValue("C")

      await new Promise((resolve) => setTimeout(resolve, 1))

      expect(textbox).toHaveDisplayValue("C")
    },
  }

export const DoesNotDisplayValueWhenContentHasChangedSinceFocus: Story = {
  args: {
    value: "A",
    onChange: fn(),
  },

  render: (args, context) => {
    const [value, setValue] = useState(args.value)

    context.storyGlobals.setValue = setValue
    args.onChange = fn(setValue)

    return (
      <Ui89InputText
        value={value}
        onChange={(a) => {
          context.storyGlobals.setValue(a)
          args.onChange?.(a)
        }}
      />
    )
  },

  async play(context) {
    const textbox = await screen.findByRole("textbox")

    textbox.focus()

    await userEvent.type(textbox, "B")

    await new Promise((resolve) => setTimeout(resolve, 1))

    context.storyGlobals.setValue("C")

    await new Promise((resolve) => setTimeout(resolve, 1))

    expect(textbox).toHaveDisplayValue("AB")
  },
}

export const DoesNotEmitWhatWasTypedWhenValueIsChanged: Story = {
  args: {
    value: "",
    onChange: fn(),
  },

  render: (args, context) => {
    const [value, setValue] = useState(args.value)

    context.storyGlobals.setValue = setValue
    args.onChange = fn(setValue)

    return (
      <Ui89InputText
        value={value}
        onChange={(a) => {
          context.storyGlobals.setValue(a)
          args.onChange?.(a)
        }}
      />
    )
  },

  async play(context) {
    const textbox = await screen.findByRole("textbox")

    textbox.focus()

    await new Promise((resolve) => setTimeout(resolve, 50))

    await userEvent.type(textbox, "A")

    await new Promise((resolve) => setTimeout(resolve, 1))

    context.storyGlobals.setValue("B")

    await new Promise((resolve) => setTimeout(resolve, 1))

    textbox.blur()

    await new Promise((resolve) => setTimeout(resolve, 1))

    expect(context.args.onChange).not.toHaveBeenCalled()
  },
}
