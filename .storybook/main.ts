import type { StorybookConfig } from "@storybook/react-vite";
import svgr from "vite-plugin-svgr";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  addons: [
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/addon-docs"
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  viteFinal: (config) => {
    config.plugins = config.plugins || [];
    config.plugins.push(
      // We want to mimic the rollup implementation.
      svgr({
        include: "**/*.svg",
      })
    );
    return config;
  },

  docs: {},

  typescript: {
    reactDocgen: "react-docgen-typescript"
  }
};
export default config;
