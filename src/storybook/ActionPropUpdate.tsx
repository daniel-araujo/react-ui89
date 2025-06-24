import React, { useEffect } from "react"
import { Decorator } from "@storybook/react/*"
import { useArgs } from "storybook/preview-api"
import { useOnce } from "../react-utils"

interface ActionPropUpdateOptions {
  directLink?: {
    [actionName: string]: string
  }
  updateArgs?: {
    [actionName: string]: (...args: any) =>
      | {
          [propName: string]: any
        }
      | undefined
  }
}

export function ActionPropUpdate({
  directLink,
  updateArgs,
}: ActionPropUpdateOptions): Decorator {
  return (Story) => {
    const [args, setArgs] = useArgs()

    useOnce(() => {
      // Set up our functions
      if (directLink !== undefined) {
        for (let actionName in directLink) {
          const propName = directLink[actionName]
          const originalAction = args[actionName]

          setArgs({
            [actionName]: (value: any) => {
              if (originalAction !== undefined) {
                originalAction(value)
              }

              setArgs({
                [propName]: value,
              })
            },
          })
        }
      }

      if (updateArgs !== undefined) {
        for (let actionName in updateArgs) {
          const handler = updateArgs[actionName]
          const originalAction = args[actionName]

          setArgs({
            [actionName]: (...args: any) => {
              if (originalAction !== undefined) {
                originalAction(...args)
              }

              const newArgs = handler(...args)

              if (newArgs !== undefined) {
                setArgs(newArgs)
              }
            },
          })
        }
      }
    })

    return <Story />
  }
}
