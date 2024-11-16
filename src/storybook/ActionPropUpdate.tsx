import React, { useEffect } from "react"
import { Decorator } from "@storybook/react/*"
import { useArgs } from "@storybook/preview-api"

interface ActionPropUpdateOptions {
  directLink: {
    [actionName: string]: string
  }
}

export function ActionPropUpdate({
  directLink,
}: ActionPropUpdateOptions): Decorator {
  return (Story) => {
    const [args, setArgs] = useArgs()

    useEffect(() => {
      // Set up our functions.
      for (let actionName in directLink) {
        const propName = directLink[actionName]

        setArgs({
          [actionName]: (value: any) =>
            setArgs({
              [propName]: value,
            }),
        })
      }
    }, [])

    return <Story />
  }
}
