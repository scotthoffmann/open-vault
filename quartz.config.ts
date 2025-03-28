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
    baseUrl: "open.scotthoffmann.com",
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
          darkgray: "#1C1B1A", // base-950 - body text
          dark: "#100F0F", // black - header text and icons
          secondary: "#879A39", // green-400 - link colour, current graph node
          tertiary: "#66800B", // green-600 - hover states and visited graph nodes
          highlight: "#E6E4D9", // base-100 - internal link background, highlighted text, highlighted lines of code
          textHighlight: "#CECDC3", // base-200 - markdown highlighted text background
        },
        darkMode: {
          light: "#100F0F", // black - page background
          lightgray: "#282726", // base-900 - borders
          gray: "#403E3C", // base-800 - graph links, heavier borders
          darkgray: "#CECDC3", // base-200 - body text
          dark: "#CECDC3", // base-200 - header text and icons
          secondary: "#8B7EC8", // purple-400 - link colour, current graph node
          tertiary: "#5E409D", // purple-600 - hover states and visited graph nodes
          highlight: "#282726", // base-900 - internal link background, highlighted text, highlighted lines of code
          textHighlight: "#403E3C", // base-800 - markdown highlighted text background
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
