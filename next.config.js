import withNextra from "nextra";

const nextraConfig = withNextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
});

export default {
  ...nextraConfig,
  images: {
    unoptimized: true,
  },
  output: "export"
};
