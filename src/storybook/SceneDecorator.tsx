import React from "react"
import { Decorator } from "@storybook/react/*"

import { Ui89Scene } from "../components/Ui89Scene"

export const SceneDecorator: Decorator = (Story) => {
  return (
    <div
      style={{
        display: "grid",
        height: "100vh",
      }}
    >
      <Ui89Scene>
        <Story />
      </Ui89Scene>

      <style>{`
        .sb-show-main.sb-main-padded {
          /* No padding. */
          padding: 0;
        }
      `}</style>
    </div>
  )
}
