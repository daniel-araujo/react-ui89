import React from "react"
import { Decorator } from "@storybook/react/*"

import { Ui89Background } from "../components/Ui89Background"

export const BackgroundDecorator: Decorator = (Story) => {
  return (
    <div
      style={{
        display: 'grid',
        height: '100vh',
      }}
    >
      <Ui89Background>
        <Story />
      </Ui89Background>
    </div>
  )
}
