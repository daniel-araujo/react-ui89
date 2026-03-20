import React from "react"
import type { Meta, StoryObj } from "@storybook/react"

import { Ui89BoxShadow } from "./Ui89BoxShadow"
import { SceneDecorator } from "../storybook/SceneDecorator"
import { Ui89SpacePadding } from "./Ui89SpacePadding"
import { Ui89Card } from "./Ui89Card"
import { Ui89TitleBox } from "./Ui89TitleBox"

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

// Shall not care what the display is. The box takes up the entire width.
export const DisplayInlineBlockChild: Story = {
  args: {
    children: (
      <Ui89BoxShadow>
        <Ui89TitleBox>Nested box shadow</Ui89TitleBox>
      </Ui89BoxShadow>
    ),
  },
}

export const WithRowGap: Story = {
  args: {
    rowGap: 2,
    children: <Ui89Card>Row gap: 2</Ui89Card>,
  },
}

export const WithColumnGap: Story = {
  args: {
    columnGap: 2,
    children: <Ui89Card>Column gap: 2</Ui89Card>,
  },
}

export const WithRowAndColumnGap: Story = {
  args: {
    rowGap: 3,
    columnGap: 2,
    children: <Ui89Card>Row gap: 3, Column gap: 2</Ui89Card>,
  },
}
