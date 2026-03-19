import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "storybook/test"

import { Ui89SpaceVertical } from "../components/Ui89SpaceVertical"
import { Ui89Card } from "../components/Ui89Card"
import { Ui89Button } from "../components/Ui89Button"
import { SceneDecorator } from "../storybook/SceneDecorator"
import { Ui89TitleBox } from "../components/Ui89TitleBox"
import { Ui89Popover } from "../components/Ui89Popover"
import { Ui89MenuCard } from "../components/Ui89MenuCard"
import { Ui89MenuBar } from "../components/Ui89MenuBar"

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

export const WithPopover: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false)

    const options = [
      {
        label: "Option 1",
        onClick: () => setOpen(false),
      },
      { type: "separator" as const },
      {
        label: "Close",
        onClick: () => setOpen(false),
      },
    ]

    return (
      <div style={{ height: "200px" }}>
        <Ui89Popover
          open={open}
          onOpenChange={setOpen}
          renderContainer={(props) => (
            <span ref={props.setRef} {...props.props}>
              <Ui89Button>Open Menu</Ui89Button>
            </span>
          )}
          renderPopover={() => <Ui89MenuCard options={options} />}
        />
      </div>
    )
  },
}

export const MenuBarWithPopover: Story = {
  render: (args) => {
    function useMenuItem(
      label: string,
      options: React.ComponentProps<typeof Ui89MenuCard>["options"],
    ) {
      const [open, setOpen] = React.useState(false)

      return {
        label: (
          <Ui89Popover
            open={open}
            popoverOverflowForce={true}
            popoverOverflowMaxWidth={200}
            onOpenChange={setOpen}
            renderContainer={(props) => (
              <span ref={props.setRef} {...props.props} onClick={undefined}>
                {label}
              </span>
            )}
            renderPopover={() => <Ui89MenuCard options={options} />}
          />
        ),
        onClick: () => setOpen(!open),
      }
    }

    const items = [
      useMenuItem("File", [
        { label: "New", onClick: fn() },
        { label: "Open", onClick: fn() },
        { type: "separator" as const },
        { label: "Exit", onClick: fn() },
      ]),
      useMenuItem("Edit", [
        { label: "Cut", onClick: fn() },
        { label: "Copy", onClick: fn() },
        { label: "Paste", onClick: fn() },
      ]),
      {
        label: "Help",
        onClick: fn(),
      },
    ]

    return (
      <div style={{ height: "200px" }}>
        <Ui89MenuBar items={items} />
      </div>
    )
  },
}
