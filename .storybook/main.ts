import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  stories: ["../src/components/**/*.stories.tsx"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-links"],
};

export default config;
