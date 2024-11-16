import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"

import { Ui89VirtualTable } from "./Ui89VirtualTable"
import { SceneDecorator } from "../storybook/SceneDecorator"

const meta: Meta<typeof Ui89VirtualTable> = {
  component: Ui89VirtualTable,
  tags: ["autodocs"],
  decorators: [SceneDecorator],
}

export default meta

type Story = StoryObj<typeof meta>

export const Empty: Story = {}

export const TwoColumns: Story = {
  args: {
    rows: new Array(2),
    columns: [
      {
        renderHeader: () => <>Header #1</>,
        renderBody: ({ index }) => <>Row #{index}</>,
      },
      {
        renderHeader: () => <>Header #2</>,
        renderBody: () => <>Second column</>,
      },
    ],
  },
}

export const ColumnHorizontalOverflow: Story = {
  args: {
    rows: new Array(2),
    columns: [
      {
        renderHeader: () => <>Header #1</>,
        renderBody: ({ index }) => <>Row #{index}</>,
      },
      {
        renderHeader: () => <>Header #2</>,
        renderBody: () => <>Secondcolumn</>,
      },
      {
        renderHeader: () => <>Header #3</>,
        renderBody: () => <>Thirdcolumn.Third column.Third column</>,
      },
    ],
  },
}

export const ColumnVerticalOverflow: Story = {
  args: {
    rows: new Array(2),
    columns: [
      {
        renderHeader: () => <>Header #1</>,
        renderBody: ({ index }) => <>Row #{index}</>,
      },
      {
        renderHeader: () => <>Header #2</>,
        renderBody: () => <>Second column</>,
      },
      {
        renderHeader: () => <>Header #3</>,
        renderBody: () => <>Third column. Third column. Third column</>,
      },
    ],
  },
}

export const VerticalScrolling: Story = {
  args: {
    rows: new Array(200),
    columns: [
      {
        renderHeader: () => <>Header #1</>,
        renderBody: ({ index }) => <>Row #{index}</>,
      },
      {
        renderHeader: () => <>Header #2</>,
        renderBody: () => <>Second column</>,
      },
      {
        renderHeader: () => <>Header #3</>,
        renderBody: () => <>Third column.</>,
      },
    ],
  },
}
