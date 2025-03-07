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

export const EmptyWithColumns: Story = {
  args: {
    columns: [
      {
        renderHeader: () => <>Header #1</>,
        renderBody: ({ index }) => <>Row #{index}</>,
      },
      {
        width: 300,
        renderHeader: () => <>Header #2</>,
        renderBody: () => <>Second column</>,
      },
    ],
  },
}

export const TwoColumns: Story = {
  args: {
    rows: new Array(2),
    columns: [
      {
        renderHeader: () => <>Header #1</>,
        renderBody: ({ index }) => <>Row #{index}</>,
      },
      {
        width: 300,
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
        width: 300,
        renderHeader: () => <>Header #2</>,
        renderBody: () => <>Secondcolumn</>,
      },
      {
        width: 500,
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
        width: 300,
        renderHeader: () => <>Header #2</>,
        renderBody: () => <>Second column</>,
      },
      {
        width: 500,
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
        width: 300,
        renderHeader: () => <>Header #2</>,
        renderBody: () => <>Second column</>,
      },
      {
        width: 300,
        renderHeader: () => <>Header #3</>,
        renderBody: () => <>Third column.</>,
      },
    ],
  },
}

export const HorizontalScrolling: Story = {
  args: {
    rows: new Array(2),
    columns: [
      {
        width: 400,
        renderHeader: () => <>Header #1</>,
        renderBody: ({ index }) => <>Row #{index}</>,
      },
      {
        width: 800,
        renderHeader: () => <>Header #2</>,
        renderBody: () => <>Second column</>,
      },
      {
        width: 400,
        renderHeader: () => <>Header #3</>,
        renderBody: () => <>Third column.</>,
      },
      {
        width: 400,
        renderHeader: () => <>Header #4</>,
        renderBody: () => <>Fourth column.</>,
      },
      {
        width: 400,
        renderHeader: () => <>Header #5</>,
        renderBody: () => <>Fifth column.</>,
      },
    ],
  },
}

export const NotEnoughColumnsAndRows: Story = {
  args: {
    rows: new Array(2),
    columns: [
      {
        renderHeader: () => <>Header #1</>,
        renderBody: ({ index }) => <>Row #{index}</>,
      },
      {
        width: 300,
        renderHeader: () => <>Header #2</>,
        renderBody: () => <>Second column</>,
      },
    ],
  },
}
