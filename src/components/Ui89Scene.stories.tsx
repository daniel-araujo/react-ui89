import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"

import { Ui89Scene } from "./Ui89Scene"

const meta: Meta<typeof Ui89Scene> = {
  component: Ui89Scene,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof meta>

export const LookMain: Story = {
  args: {
    look: "main",
    children: "Content goes here",
  },
}

export const LookSide: Story = {
  args: {
    look: "side",
    children: "Content goes here",
  },
}

export const VerticalOverflow: Story = {
  args: {
    look: "main",
    children: "Content goes here\n".repeat(1000),
  },
  render: (args, context) => (
    <>
      <div className="container">
        <Ui89Scene {...args} />

        <style>{`
          .container {
            display: grid;
            height: 100vh;
          }

          .container > * {
            min-width: 0;
            min-width: 0;
          }
        `}</style>
      </div>
    </>
  ),
}

export const HorizontalOverflow: Story = {
  args: {
    look: "main",
    children: "Contentgoeshere".repeat(100),
  },
  render: (args, context) => (
    <>
      <div className="container">
        <Ui89Scene {...args} />

        <style>{`
          .container {
            display: grid;
            height: 100vh;
          }

          .container > * {
            min-width: 0;
            min-width: 0;
          }
        `}</style>
      </div>
    </>
  ),
}

export const CustomizesScrollbarsInside: Story = {
  args: {
    look: "main",
  },
  render: (args, context) => (
    <Ui89Scene {...args}>
      <div className="container">
        {"asdasdasdasd".repeat(50)}
        {"asdasdasdasd\n".repeat(50)}
      </div>

      <style>{`
        .container {
          width: 200px;
          height: 200px;
          overflow: auto;
        }
      `}</style>
    </Ui89Scene>
  ),
}
