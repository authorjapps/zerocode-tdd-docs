import nextra from 'nextra'
 
const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx'
  // ... your Nextra config
})

export default withNextra( {
  images: {
    unoptimized: true,
  },
  output: "export"
})