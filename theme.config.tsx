import React from "react";
import { DocsThemeConfig, useConfig } from "nextra-theme-docs";
import { useRouter } from "next/router";

const config: DocsThemeConfig = {
  logo: <span>N Chandra</span>,
  project: {
    link: "https://github.com/nirmalchandra"
  },
  sidebar: {
    defaultMenuCollapseLevel: 1, // Set to 1 to collapse all folders by default
  },
  docsRepositoryBase:
    "https://github.com/authorjapps/zerocode-tdd-docs/blob/main",
  footer: {
    text: "N Chandra",
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

        <meta property="og:title" content={frontMatter.title || 'N Chandra'} />
        <meta
          property="og:description"
          content={frontMatter.description || 'N Chandra'}
        />

        <title>{frontMatter.title || 'N Chandra'}</title>
        <meta name="description" content={frontMatter.description || 'N Chandra'} />
      </>
    )
  }
};

export default config;
