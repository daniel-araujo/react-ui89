import type { Preview } from "@storybook/react";

import '../src/style/global.css'

const preview: Preview = {
  parameters: {
    viewport: {
      // Set a default viewport to prevent any story-specific viewport settings
      // from persisting across stories.
      defaultViewport: 'desktop',
    },

    controls: {
    },
  },
};

export default preview;
