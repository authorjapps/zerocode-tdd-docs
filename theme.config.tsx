import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: <span>Zerocode TDD Docs</span>,
  project: {
    link: "https://github.com/authorjapps/zerocode",
  },
  chat: {
    link: "https://discord.com",
  },
  docsRepositoryBase:
    "https://github.com/authorjapps/zerocode-tdd-docs/blob/main",
  footer: {
    text: "Nextra Docs Template",
  },
};

export default config;
