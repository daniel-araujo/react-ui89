import React from "react"
import { Decorator } from "@storybook/react/*"

import { Ui89Scene } from "../components/Ui89Scene"

export const SceneDecorator: Decorator = (Story) => {
  return (
    <div className="scene-decorator">
      <Ui89Scene>
        <Story />
      </Ui89Scene>

      <style>{`
        .scene-decorator {
          display: grid;
          height: 100vh;
        }

        .scene-decorator > * {
          min-width: 0;
        }

        .sb-show-main.sb-main-padded {
          /* No padding. */
          padding: 0;
        }
      `}</style>
    </div>
  )
}
