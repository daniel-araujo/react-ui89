import React from "react"
import type { Meta, StoryObj } from "@storybook/react"

import "./input-box.css"
import { SceneDecorator } from "../storybook/SceneDecorator"
import { Ui89SpaceVertical } from "../components/Ui89SpaceVertical"

const meta: Meta = {
  tags: ["autodocs"],
  decorators: [SceneDecorator],
}

export default meta

type Story = StoryObj<typeof meta>

export const CenterTextVertically: Story = {
  render: (args, context) => {
    return (
      <>
        <div>
          Input:
          <input className="ui89-input-box" value="text" />
        </div>
        <Ui89SpaceVertical />
        <div>
          Textarea:
          <textarea className="ui89-input-box">Text</textarea>
        </div>
        <Ui89SpaceVertical />
        <div>
          Textarea with two lines:
          <textarea className="ui89-input-box">
            {"First line\nSecond line"}
          </textarea>
        </div>
        <Ui89SpaceVertical />
        <div>
          Div:
          <div className="ui89-input-box">Text</div>
        </div>
        <Ui89SpaceVertical />
        <div>
          Div with two lines:
          <div className="ui89-input-box">
            First line
            <br />
            Second line
          </div>
        </div>
      </>
    )
  },
}
