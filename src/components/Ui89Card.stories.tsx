import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "storybook/test"

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
