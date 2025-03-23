import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Scott Hoffmann",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "scotthoffmann.com",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Lora",
        body: "Cabin",
        code: "Source Code Pro",
      },
      colors: { // Palette sourced from Steph Ango's Flexoki (https://stephango.com/flexoki)
        lightMode: {
          light: "#FFFCF0", // paper - page background
          lightgray: "#E6E4D9", // base-100 - borders
          gray: "#F2F0E5", // base-50 - graph links, heavier borders
          darkgray: "#100F0F", // black - body text
          dark: "#6F6E69", // base-600 - header text and icons
          secondary: "#4385BE", // blue-400 - link colour, current graph node
          tertiary: "#205EA6", // blue-600 - hover states and visited graph nodes
          highlight: "#3AA99F", // cyan-400 - internal link background, highlighted text, highlighted lines of code
          textHighlight: "#24837B", // cyan-600 - markdown highlighted text background
        },
        darkMode: {
          light: "#100F0F", // black - page background
          lightgray: "#282726", // base-900 - borders
          gray: "#403E3C", // base-800 - graph links, heavier borders
          darkgray: "#CECDC3", // base-200 - body text
          dark: "#CECDC3", // base-200 - header text and icons
          secondary: "#4385BE", // blue-400 - link colour, current graph node
          tertiary: "#205EA6", // blue-600 - hover states and visited graph nodes
          highlight: "#3AA99F", // cyan-400 - internal link background, highlighted text, highlighted lines of code
          textHighlight: "#24837B", // cyan-600 - markdown highlighted text background
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
