import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, screen, userEvent } from "@storybook/test"

import { Ui89Breadcrumbs, Ui89BreadcrumbsPropsItem } from "./Ui89Breadcrumbs"
import { SceneDecorator } from "../storybook/SceneDecorator"

const itemsSampleOneCrumb: Ui89BreadcrumbsPropsItem[] = [
  {
    label: "First",
    url: "/first",
  },
]

const itemsSampleTwoCrumbs: Ui89BreadcrumbsPropsItem[] = [
  {
    label: "First",
    url: "/first",
  },
  {
    label: "Second",
    url: "/second",
  },
]

const itemsSampleFiveCrumbs: Ui89BreadcrumbsPropsItem[] = [
  {
    label: "First",
    url: "/first",
  },
  {
    label: "Second",
    url: "/second",
  },
  {
    label: "Three",
    url: "/three",
  },
  {
    label: "Four",
    url: "/four",
  },
  {
    label: "Five",
    url: "/five",
  },
]

const meta: Meta<typeof Ui89Breadcrumbs> = {
  component: Ui89Breadcrumbs,
  tags: ["autodocs"],
  decorators: [SceneDecorator],
}

export default meta

type Story = StoryObj<typeof meta>

export const Empty: Story = {
  args: {
    items: [],
  },
}
export const OneCrumb: Story = {
  args: {
    items: itemsSampleOneCrumb,
  },

  async play(context) {
    const firstLink = await screen.findByRole("link", {
      name: "First",
    })

    expect(firstLink).toHaveAttribute("href", "/first")
  },
}

export const TwoCrumbs: Story = {
  args: {
    items: itemsSampleTwoCrumbs,
  },

  async play(context) {
    const firstLink = await screen.findByRole("link", {
      name: "First",
    })

    expect(firstLink).toHaveAttribute("href", "/first")

    const secondLink = await screen.findByRole("link", {
      name: "Second",
    })

    expect(secondLink).toHaveAttribute("href", "/second")
  },
}

export const FiveCrumbs: Story = {
  args: {
    items: itemsSampleFiveCrumbs,
  },
}
