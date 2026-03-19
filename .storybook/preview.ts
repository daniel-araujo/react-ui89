import type { Preview } from "@storybook/react";

import '../src/style/global.css'

const preview: Preview = {
  parameters: {
    viewport: {},

    controls: {
    },
  },

  initialGlobals: {
    viewport: {
      value: 'desktop',
      isRotated: false
    }
  }
};

export default preview;
