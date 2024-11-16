import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"

import { Ui89SpaceVertical } from "../components/Ui89SpaceVertical"
import { Ui89Card } from "../components/Ui89Card"
import { Ui89Button } from "../components/Ui89Button"
import { SceneDecorator } from "../storybook/SceneDecorator"

const meta: Meta = {
  decorators: [SceneDecorator],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args, context) => (
    <>
      <Ui89SpaceVertical gap={10} />

      <div
        style={{
          margin: "auto",
          width: "400px",
        }}
      >
        <Ui89Card>
          Welcome to the past.
          <Ui89SpaceVertical gap={1} />
          Do you accept?
          <Ui89SpaceVertical gap={2} />
          <Ui89Button theme="success">Yes</Ui89Button>
          <Ui89Button theme="danger">No</Ui89Button>
          <Ui89Button theme="warning">Yesn't</Ui89Button>
        </Ui89Card>
      </div>
    </>
  ),
}
