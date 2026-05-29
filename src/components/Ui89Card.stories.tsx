import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { expect, within } from "storybook/test"

import { Ui89Card } from "./Ui89Card"
import { SceneDecorator } from "../storybook/SceneDecorator"
import { Ui89CardHorizontalConnection } from "./Ui89CardHorizontalConnection"
import { Ui89Hr } from "./Ui89Hr"
import { Ui89TitleBox } from "./Ui89TitleBox"
import { Ui89HighlightText } from "./Ui89HighlightText"

const meta: Meta<typeof Ui89Card> = {
  component: Ui89Card,
  tags: ["autodocs"],
  decorators: [SceneDecorator],
}

export default meta

type Story = StoryObj<typeof meta>

export const Content: Story = {
  args: {
    children: "Content goes here",
  },
}

export const ThemePrimary: Story = {
  args: { theme: "primary", children: "Content goes here" },
}
export const ThemeSecondary: Story = {
  args: { theme: "secondary", children: "Content goes here" },
}
export const ThemeInfo: Story = {
  args: { theme: "info", children: "Content goes here" },
}
export const ThemeSuccess: Story = {
  args: { theme: "success", children: "Content goes here" },
}
export const ThemeWarning: Story = {
  args: { theme: "warning", children: "Content goes here" },
}
export const ThemeDanger: Story = {
  args: { theme: "danger", children: "Content goes here" },
}

export const PaletteBlack: Story = {
  args: { theme: "black", children: "Content goes here" },
}
export const PaletteDarkBlue: Story = {
  args: { theme: "darkBlue", children: "Content goes here" },
}
export const PaletteDarkGreen: Story = {
  args: { theme: "darkGreen", children: "Content goes here" },
}
export const PaletteDarkCyan: Story = {
  args: { theme: "darkCyan", children: "Content goes here" },
}
export const PaletteDarkRed: Story = {
  args: { theme: "darkRed", children: "Content goes here" },
}
export const PaletteDarkPink: Story = {
  args: { theme: "darkPink", children: "Content goes here" },
}
export const PaletteDarkYellow: Story = {
  args: { theme: "darkYellow", children: "Content goes here" },
}
export const PaletteLightGray: Story = {
  args: { theme: "lightGray", children: "Content goes here" },
}
export const PaletteDarkGray: Story = {
  args: { theme: "darkGray", children: "Content goes here" },
}
export const PaletteLightBlue: Story = {
  args: { theme: "lightBlue", children: "Content goes here" },
}
export const PaletteLightGreen: Story = {
  args: { theme: "lightGreen", children: "Content goes here" },
}
export const PaletteLightCyan: Story = {
  args: { theme: "lightCyan", children: "Content goes here" },
}
export const PaletteLightRed: Story = {
  args: { theme: "lightRed", children: "Content goes here" },
}
export const PaletteLightPink: Story = {
  args: { theme: "lightPink", children: "Content goes here" },
}
export const PaletteLightYellow: Story = {
  args: { theme: "lightYellow", children: "Content goes here" },
}
export const PaletteWhite: Story = {
  args: { theme: "white", children: "Content goes here" },
}

export const ScrollbarPresence: Story = {
  args: {
    children: (
      <div style={{ padding: "8px" }}>
        <Ui89HighlightText theme="primary">Scrollable Area</Ui89HighlightText>
        <p>
          This content is designed to overflow the card when it is constrained
          to a fixed height, verifying internal scrollbar behavior.
        </p>
        {Array.from({ length: 30 }).map((_, i) => (
          <p key={i}>Scrolling content line {i + 1}...</p>
        ))}
      </div>
    ),
  },

  render: (args) => (
    <div
      style={{
        height: "200px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style>{`
        .scrollbar-test-container { display: flex; flex: 1; min-height: 0; }
        .scrollbar-test-container .ui89-card { flex: 1; display: flex; flex-direction: column; min-height: 0; }
        .scrollbar-test-container .ui89-card__inside { flex: 1; overflow-y: auto; }
      `}</style>
      <div className="scrollbar-test-container">
        <Ui89Card {...args}>{args.children}</Ui89Card>
      </div>
    </div>
  ),

  play: async ({ canvasElement }) => {
    const cardInside = canvasElement.querySelector(
      ".ui89-card__inside",
    ) as HTMLElement
    await expect(cardInside).toBeInTheDocument()
    await expect(cardInside.scrollHeight).toBeGreaterThan(
      cardInside.clientHeight,
    )
  },
}

export const HorizontalConnection: Story = {
  args: {
    children: "Content goes here",
  },

  render: (args, context) => (
    <Ui89Card {...args}>
      <Ui89CardHorizontalConnection>
        <Ui89Hr look="double" />
      </Ui89CardHorizontalConnection>

      {args.children}
    </Ui89Card>
  ),
}

export const HorizontalConnectionOverflow: Story = {
  args: {
    children: "Content goes here",
  },

  render: (args, context) => (
    <Ui89Card {...args}>
      <Ui89CardHorizontalConnection overflow>
        <Ui89Hr look="double" />
      </Ui89CardHorizontalConnection>

      {args.children}
    </Ui89Card>
  ),
}

export const TopLeftContent: Story = {
  args: {
    topLeft: <Ui89TitleBox>Title goes here</Ui89TitleBox>,
    children: "Content goes here",
  },

  render: (args, context) => <Ui89Card {...args}>{args.children}</Ui89Card>,
}

export const TopCenterContent: Story = {
  args: {
    topCenter: <Ui89TitleBox>Title goes here</Ui89TitleBox>,
    children: "Content goes here",
  },

  render: (args, context) => <Ui89Card {...args}>{args.children}</Ui89Card>,
}

export const TopCenterContentDoesNotOverflow: Story = {
  args: {
    topCenter: <Ui89TitleBox>{"Title goes here".repeat(20)}</Ui89TitleBox>,
    children: "Content goes here",
  },

  render: (args, context) => <Ui89Card {...args}>{args.children}</Ui89Card>,
}

export const TopRightContent: Story = {
  args: {
    topRight: <Ui89TitleBox>Title goes here</Ui89TitleBox>,
    children: "Content goes here",
  },

  render: (args, context) => <Ui89Card {...args}>{args.children}</Ui89Card>,
}

export const BottomLeftContent: Story = {
  args: {
    bottomLeft: <Ui89TitleBox>Status text</Ui89TitleBox>,
    children: "Content goes here",
  },

  render: (args, context) => <Ui89Card {...args}>{args.children}</Ui89Card>,
}

export const BottomCenterContent: Story = {
  args: {
    bottomCenter: <Ui89TitleBox>Status text</Ui89TitleBox>,
    children: "Content goes here",
  },

  render: (args, context) => <Ui89Card {...args}>{args.children}</Ui89Card>,
}

export const BottomCenterContentDoesNotOverflow: Story = {
  args: {
    bottomCenter: <Ui89TitleBox>{"Title goes here".repeat(20)}</Ui89TitleBox>,
    children: "Content goes here",
  },

  render: (args, context) => <Ui89Card {...args}>{args.children}</Ui89Card>,
}

export const BottomRightContent: Story = {
  args: {
    bottomRight: <Ui89TitleBox>Status text</Ui89TitleBox>,
    children: "Content goes here",
  },

  render: (args, context) => <Ui89Card {...args}>{args.children}</Ui89Card>,
}

export const StretchedContent: Story = {
  args: {
    children: (
      <div
        style={{
          background: "rgba(0, 255, 0, 0.5)",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        This child fills the card height
      </div>
    ),
  },

  render: (args) => (
    <div style={{ height: "200px", display: "flex" }}>
      <Ui89Card {...args}>{args.children}</Ui89Card>
    </div>
  ),

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const cardInside = canvasElement.querySelector(
      ".ui89-card__inside",
    ) as HTMLElement
    const child = canvas.getByText("This child fills the card height")

    await expect(cardInside).toBeInTheDocument()
    // Use an approximation to account for internal padding and borders
    await expect(child.clientHeight).toBeGreaterThanOrEqual(
      cardInside.clientHeight * 0.9,
    )
  },
}
