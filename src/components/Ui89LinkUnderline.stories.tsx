import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, screen, userEvent } from "@storybook/test"

import { Ui89LinkUnderline } from "./Ui89LinkUnderline"
import { SceneDecorator } from "../storybook/SceneDecorator"
import { Ui89Provider, Ui89OverrideProps } from "../Ui89Provider"

const meta: Meta<typeof Ui89LinkUnderline> = {
  component: Ui89LinkUnderline,
  tags: ["autodocs"],
  decorators: [SceneDecorator],
}

export default meta

type Story = StoryObj<typeof meta>

export const Link: StoryObj<Ui89OverrideProps> = {
  args: {
    routerPush: fn(),
  },

  render: (args, context) => (
    <Ui89Provider routerPush={args.routerPush}>
      <Ui89LinkUnderline href="/link">Link</Ui89LinkUnderline>
    </Ui89Provider>
  ),

  async play(context) {
    const link = await screen.findByRole("link")

    await userEvent.click(link)

    expect(context.args.routerPush).toHaveBeenCalledWith("/link")
  },
}
