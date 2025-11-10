import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, screen, userEvent } from "storybook/test"

import { Ui89Button } from "./Ui89Button"
import { SceneDecorator } from "../storybook/SceneDecorator"
import { Ui89Provider, Ui89OverrideProps } from "../Ui89Provider"
import { useUi89Toaster } from "./Ui89Toaster"
import { Ui89Theme } from "../theme"
import { sleep } from "../promise-utils"

const meta: Meta<typeof Ui89Button> = {
  component: Ui89Button,
  tags: ["autodocs"],
  decorators: [SceneDecorator],
}

export default meta

type Story = StoryObj<typeof meta>

export const ThemePrimary: Story = {
  args: {
    theme: "primary",
    children: "Label",
  },
}

export const ThemeSecondary: Story = {
  args: {
    theme: "secondary",
    children: "Label",
  },
}

export const ThemeSuccess: Story = {
  args: {
    theme: "success",
    children: "Label",
  },
}

export const ThemeDanger: Story = {
  args: {
    theme: "danger",
    children: "Label",
  },
}

export const ThemeInfo: Story = {
  args: {
    theme: "info",
    children: "Label",
  },
}

export const ThemeWarning: Story = {
  args: {
    theme: "warning",
    children: "Label",
  },
}

export const SizeStandard: Story = {
  args: {
    size: "standard",
    children: "Label",
  },
}

export const SizeStandardGrowsHorizontallyWithFlexGrow: Story = {
  render: (args, context) => (
    <div className="flexContainer">
      <style>{`
        .flexContainer {
          display: flex;
        }
        .flexContainer > * {
          flex-grow: 1;
        }
      `}</style>
      <Ui89Button size="standard" href="/link">
        Button
      </Ui89Button>
    </div>
  ),
}

export const SizeStandardDoesNotGrowVerticallyWithFlexGrow: Story = {
  render: (args, context) => (
    <div className="flexContainer">
      <style>{`
        .flexContainer {
          display: inline-flex;
          height: 100px;
        }
        .flexContainer > * {
          flex-grow: 1;
        }
      `}</style>
      <Ui89Button size="standard" href="/link">
        Button
      </Ui89Button>
    </div>
  ),
}

export const SizeSquare: Story = {
  args: {
    theme: "danger",
    size: "square",
    children: "X",
  },
}

export const SizeSquareDoesNotGrowWithFlexGrow: Story = {
  render: (args, context) => (
    <div className="flexContainer">
      <style>{`
        .flexContainer {
          display: flex;
          height: 100px;
        }
        .flexContainer > * {
          flex-grow: 1;
        }
      `}</style>
      <Ui89Button size="square" href="/link">
        Button
      </Ui89Button>
    </div>
  ),
}

export const SizeSquareOverflow: Story = {
  args: {
    theme: "danger",
    size: "square",
    children: "XXXXX",
  },
}

export const Disabled: Story = {
  args: {
    children: "XXXXX",
    disabled: true,
  },
}

export const ClickPromise: Story = {
  args: {
    children: "XXXXX",
    disabled: true,
    onClick: () => new Promise(() => {}),
  },

  async play(context) {
    const button = await screen.findByRole("button")

    await userEvent.click(button)
  },
}

export const OverrideRouterPush: StoryObj<Ui89OverrideProps> = {
  args: {
    routerPush: fn(),
  },

  render: (args, context) => (
    <Ui89Provider routerPush={args.routerPush}>
      <Ui89Button href="/link">Button</Ui89Button>
    </Ui89Provider>
  ),

  async play(context) {
    const button = await screen.findByRole("button")

    await userEvent.click(button)

    expect(context.args.routerPush).toHaveBeenCalledWith("/link")
  },
}

export const OverrideRouterPushActiveState: StoryObj<Ui89OverrideProps> = {
  args: {
    routerPush: fn(async () => {
      await sleep(10)
    }),
  },

  render: (args, context) => (
    <Ui89Provider routerPush={args.routerPush}>
      <Ui89Button href="/link">Button</Ui89Button>
    </Ui89Provider>
  ),

  async play(context) {
    const button = await screen.findByRole("button")

    await userEvent.click(button)

    await sleep(5)

    expect(button.querySelector(".ui89-button__button--active")).not.toBeNull()

    await sleep(5)

    expect(button.querySelector(".ui89-button__button--active")).toBeNull()
  },
}

export const ClickArea: Story = {
  args: {
    children: "Button",
    onClick: fn(),
  },

  render: (args, context) => {
    return <Ui89Button {...args} />
  },
}

export const WhiteSpaceNoWrap: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },

  args: {
    children: "This is text should not wrap to a second line",
    onClick: fn(),
  },

  render: (args, context) => {
    return <Ui89Button {...args} />
  },
}

export const FlexLayoutTakesUpMinimumContent: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },

  render: (args, context) => (
    <div className="flexContainer">
      <style>{`
        .flexContainer {
          display: flex;
          height: 100px;
          gap: 16px;
        }
        .flexContainer > * {
          flex-grow: 1;
        }
      `}</style>
      <Ui89Button href="/link">Long text here</Ui89Button>
      <div>Descriptive text next to button</div>
    </div>
  ),
}
