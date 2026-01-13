import React, { useEffect, useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, screen, userEvent } from "storybook/test"

import { Ui89Breadcrumbs, Ui89BreadcrumbsPropsItem } from "./Ui89Breadcrumbs"
import { SceneDecorator } from "../storybook/SceneDecorator"
import { Ui89Provider, Ui89OverrideProps } from "../Ui89Provider"
import { sleep } from "../promise-utils"

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

interface CustomItem {
  id: number
  name: string
  link: string
}

const customItems: CustomItem[] = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Section", link: "/section" },
  { id: 3, name: "Page", link: "/section/page" },
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

export const NewItemAnimation: StoryObj = {
  render: (args, context) => {
    const [items, setItems] = useState(itemsSampleTwoCrumbs)

    useEffect(() => {
      let timeoutId = setTimeout(() => {
        setItems(
          items.concat([
            {
              label: "Appear",
              url: "/appear",
            },
          ]),
        )
      }, 500)

      return () => clearTimeout(timeoutId)
    }, [])

    return <Ui89Breadcrumbs items={items} />
  },
}

export const RemoveItemAnimation: StoryObj = {
  render: (args, context) => {
    const [items, setItems] = useState(itemsSampleTwoCrumbs)

    useEffect(() => {
      let timeoutId = setTimeout(() => {
        setItems(items.slice(0, 1))
      }, 500)

      return () => clearTimeout(timeoutId)
    }, [])

    return <Ui89Breadcrumbs items={items} />
  },
}

export const OverrideRouterPush: StoryObj<Ui89OverrideProps> = {
  args: {
    routerPush: fn(),
  },

  render: (args, context) => (
    <Ui89Provider routerPush={args.routerPush}>
      <Ui89Breadcrumbs items={itemsSampleTwoCrumbs} />
    </Ui89Provider>
  ),

  async play(context) {
    const firstLink = await screen.findByRole("link", {
      name: "First",
    })

    await userEvent.click(firstLink)

    expect(context.args.routerPush).toHaveBeenCalledWith("/first")
  },
}

export const GenericItems: StoryObj<Ui89OverrideProps> = {
  args: {
    routerPush: fn(),
  },

  render: (args, context) => (
    <Ui89Provider routerPush={args.routerPush}>
      <Ui89Breadcrumbs
        items={customItems}
        getLabel={(item: CustomItem) => item.name}
        getUrl={(item: CustomItem) => item.link}
      />
    </Ui89Provider>
  ),

  async play(context) {
    const link = await screen.findByRole("link", {
      name: "Section",
    })

    await userEvent.click(link)

    expect(context.args.routerPush).toHaveBeenCalledWith("/section")
  },
}

export const OnSelect: Story = {
  args: {
    items: itemsSampleTwoCrumbs,
    onSelect: fn(),
  },

  async play(context) {
    const firstLink = await screen.findByRole("link", {
      name: "First",
    })

    await userEvent.click(firstLink)

    expect(context.args.onSelect).toHaveBeenCalledWith(itemsSampleTwoCrumbs[0])
  },
}

export const OnSelectOverridesLink: StoryObj<{
  routerPush: any
  onSelect: any
}> = {
  args: {
    routerPush: fn(),
    onSelect: fn(),
  },

  render: (args, context) => (
    <Ui89Provider routerPush={args.routerPush}>
      <Ui89Breadcrumbs items={itemsSampleTwoCrumbs} onSelect={args.onSelect} />
    </Ui89Provider>
  ),

  async play(context) {
    const firstLink = await screen.findByRole("link", {
      name: "First",
    })

    await userEvent.click(firstLink)

    expect(context.args.routerPush).not.toHaveBeenCalled()
    expect(context.args.onSelect).toHaveBeenCalledWith(itemsSampleTwoCrumbs[0])
  },
}
