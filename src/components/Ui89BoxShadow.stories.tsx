import React from "react"
import type { Meta, StoryObj } from "@storybook/react"

import { Ui89BoxShadow } from "./Ui89BoxShadow"
import { SceneDecorator } from "../storybook/SceneDecorator"
import { Ui89SpacePadding } from "./Ui89SpacePadding"
import { Ui89Card } from "./Ui89Card"

const meta: Meta<typeof Ui89BoxShadow> = {
  component: Ui89BoxShadow,
  tags: ["autodocs"],
  decorators: [SceneDecorator],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <Ui89Card>Content inside the box shadow</Ui89Card>,
  },
}

export const Nested: Story = {
  args: {
    children: (
      <Ui89BoxShadow>
        <Ui89Card>Nested box shadow</Ui89Card>
      </Ui89BoxShadow>
    ),
  },
}

export const WithRowGap: Story = {
  args: {
    rowGap: 32,
    children: <Ui89Card>Row gap: 32px</Ui89Card>,
  },
}

export const WithColumnGap: Story = {
  args: {
    columnGap: 32,
    children: <Ui89Card>Column gap: 32px</Ui89Card>,
  },
}

export const WithRowAndColumnGap: Story = {
  args: {
    rowGap: 16,
    columnGap: 32,
    children: <Ui89Card>Row gap: 16px, Column gap: 32px</Ui89Card>,
  },
}
