import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"

import { Ui89InputFileUpload } from "./Ui89InputFileUpload"
import { SceneDecorator } from "../storybook/SceneDecorator"
import { ActionPropUpdate } from "../storybook/ActionPropUpdate"

function mockFile({ name }: { name: string }): File {
  return {
    name,
  } as File
}

const meta: Meta<typeof Ui89InputFileUpload> = {
  component: Ui89InputFileUpload,
  tags: ["autodocs"],
  decorators: [
    SceneDecorator,
    ActionPropUpdate({
      directLink: {
        onChange: "value",
      },
    }),
  ],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SelectedFile: Story = {
  args: {
    value: mockFile({
      name: "example_file.txt",
    }),
  },
}
export const SelectedFileNameOverflow: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  args: {
    value: {
      name: "example_file is super long and should cause ellipsis to appeasdr.txt",
    },
  },
}


export const SelectedFileNameOverflowWithBreakWord: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },

  args: {
    value: {
      name: "example_file is super long and should cause ellipsis to appeasdr.txt",
    },
  },

  render: (args, context) => (
    <div style={{ wordBreak: 'break-word' }}>
      <Ui89InputFileUpload {...args} />
    </div>
  ),
}
