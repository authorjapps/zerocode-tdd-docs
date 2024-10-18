import React from "react";
import { DocsThemeConfig, useConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: <span>Zerocode TDD Docs</span>,
  project: {
    link: "https://github.com/authorjapps/zerocode",
  },
  sidebar: {
    defaultMenuCollapseLevel: 1, // Set to 1 to collapse all folders by default
  },
  chat: {
    link: "https://zerocode-workspace.slack.com/join/shared_invite/enQtNzYxMDAwNTQ3MjY1LTA2YmJjODJhNzQ4ZjBiYTQwZDBmZmNkNmExYjA3ZDk2OGFiZWFmNWJlNGRkOTdiMDQ4ZmQyNzcyNzVjNWQ4ODQ#/shared-invite/email",
    icon:(
      <svg
      height={24}
      width={24}
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      enableBackground="new 0 0 270 270"
      version="1.1"
      viewBox="50 50 150 150"
      xmlSpace="preserve"
      fill="currentColor"
    >
      <path d="M99.4 151.2c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9c0-7.1 5.8-12.9 12.9-12.9h12.9v12.9zM105.9 151.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9v-32.3zM118.8 99.4c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9 12.9 5.8 12.9 12.9v12.9h-12.9zM118.8 105.9c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H86.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3z"></path>
      <g>
        <path d="M170.6 118.8c0-7.1 5.8-12.9 12.9-12.9 7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9h-12.9v-12.9zM164.1 118.8c0 7.1-5.8 12.9-12.9 12.9-7.1 0-12.9-5.8-12.9-12.9V86.5c0-7.1 5.8-12.9 12.9-12.9 7.1 0 12.9 5.8 12.9 12.9v32.3z"></path>
      </g>
      <g>
        <path d="M151.2 170.6c7.1 0 12.9 5.8 12.9 12.9 0 7.1-5.8 12.9-12.9 12.9-7.1 0-12.9-5.8-12.9-12.9v-12.9h12.9zM151.2 164.1c-7.1 0-12.9-5.8-12.9-12.9 0-7.1 5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9 0 7.1-5.8 12.9-12.9 12.9h-32.3z"></path>
      </g>
    </svg>
    )
  },
  docsRepositoryBase:
    "https://github.com/authorjapps/zerocode-tdd-docs/blob/main",
  footer: {
    content: <>Zerocode TDD Docs</>,
  },
  head: () => { 
    const { frontMatter } = useConfig()
 
    return (
      <>
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
        <meta name="msapplication-TileColor" content="#da532c"/>
        <meta name="theme-color" content="#ffffff" />

        <meta property="og:title" content={frontMatter.title || 'Zerocode TDD Docs'} />
        <meta
          property="og:description"
          content={frontMatter.description || 'Zerocode TDD Docs'}
        />

        <title>{frontMatter.title || 'Zerocode TDD Docs'}</title>
        <meta name="description" content={frontMatter.description || 'Zerocode TDD Docs'} />
      </>
    )
  }
};

export default config;
