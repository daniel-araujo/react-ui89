import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "storybook/test"

import { Ui89SpaceVertical } from "../components/Ui89SpaceVertical"
import { Ui89Card } from "../components/Ui89Card"
import { Ui89Button } from "../components/Ui89Button"
import { SceneDecorator } from "../storybook/SceneDecorator"
import { Ui89TitleBox } from "../components/Ui89TitleBox"

const meta: Meta = {
  decorators: [SceneDecorator],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args, context) => (
    <>
      <div
        style={{
          margin: "auto",
          width: "400px",
          padding: "40px",
        }}
      >
        <Ui89Card topCenter={<Ui89TitleBox>Proposition</Ui89TitleBox>}>
          <Ui89SpaceVertical gap={1} />
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
