// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import { themes } from 'prism-react-renderer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Azure Space Group',
  tagline: 'Advanced Quantum Navigation & Propulsion',
  favicon: 'img/azure_corp_mark_black.svg',

  // Set the production url of your site here
  url: 'https://szemkoff.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/AzureSpaceGroup/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'szemkoff', // Usually your GitHub org/user name.
  projectName: 'AzureSpaceGroup', // Usually your repo name.
  deploymentBranch: 'gh-pages', // Use gh-pages branch for deployment
  trailingSlash: false,

  // Restore normal behavior for broken links after we've fixed the diagram URLs
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Enable static directory to be properly copied to build directory
  staticDirectories: ['static', 'public'],
  
  // Configure custom rewrites to fix diagram URLs
  plugins: [
    function (context, options) {
      return {
        name: 'resolve-html-diagrams',
        configureWebpack(config, isServer, utils) {
          return {
            resolve: {
              alias: {
                '/AzureSpaceGroup/img/diagrams': path.resolve(__dirname, 'static/img/diagrams'),
              },
            },
          };
        },
        // Copy diagrams to both locations to ensure they're accessible
        async postBuild({ outDir }) {
          const fs = require('fs-extra');
          const path = require('path');
          
          // Create the target directory if it doesn't exist
          const targetDir = path.join(outDir, 'AzureSpaceGroup', 'img', 'diagrams');
          await fs.ensureDir(targetDir);
          
          // Copy all HTML diagrams to the target directory
          const sourceDir = path.join(outDir, 'img', 'diagrams');
          const files = await fs.readdir(sourceDir);
          for (const file of files) {
            if (file.endsWith('.html')) {
              await fs.copy(
                path.join(sourceDir, file),
                path.join(targetDir, file)
              );
            }
          }
        },
      };
    },
  ],

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Enable Mermaid diagram support
  markdown: {
    mermaid: true,
  },
  
  themes: ['@docusaurus/theme-mermaid'],

  // Configure Mermaid globals
  themeConfig: {
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    mermaid: {
      theme: {
        light: 'neutral',
        dark: 'forest',
      },
      options: {
        fontFamily: 'Arial',
        flowchart: {
          useMaxWidth: false,
          htmlLabels: true,
          padding: 10,
        },
        graph: {
          useMaxWidth: false,
          htmlLabels: true,
          padding: 10,
        },
        themeVariables: {
          edgeLabelBackground: '#ffffff',
          tertiaryColor: '#f9f9f9',
        },
        diagramPadding: 8,
        gantt: {
          titleTopMargin: 25,
          barHeight: 20,
          barGap: 4,
          topPadding: 10,
          sidePadding: 50,
        },
        securityLevel: 'loose',
      },
    },
    // Replace with your project's social card
    image: 'img/azure_corp_mark_black.svg',
    navbar: {
      title: 'Azure Space Group',
      logo: {
        alt: 'Azure Corp Logo',
        src: 'img/azure_corp_mark_black.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {to: '/project-status', label: 'Project Status', position: 'left'},
        {
          href: 'https://github.com/szemkoff/AzureSpaceGroup',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Core Technology',
              to: '/docs/core-documentation/core-technology',
            },
            {
              label: 'Energy Systems',
              to: '/docs/core-documentation/energy-systems',
            },
            {
              label: 'Propulsion & Navigation',
              to: '/docs/core-documentation/propulsion-navigation',
            },
            {
              label: 'Communication Systems',
              to: '/docs/core-documentation/communication-systems',
            },
          ],
        },
        {
          title: 'More Documentation',
          items: [
            {
              label: 'Support Systems',
              to: '/docs/infrastructure-documentation/support-systems',
            },
            {
              label: 'Human-Centric Design',
              to: '/docs/infrastructure-documentation/human-centric-design',
            },
            {
              label: 'R&D Infrastructure',
              to: '/docs/research-documentation/research-development',
            },
            {
              label: 'Legal Framework',
              to: '/docs/research-documentation/legal-regulatory',
            },
          ],
        },
        {
          title: 'Community & Funding',
          items: [
            {
              label: 'Contributing',
              to: '/docs/contributing',
            },
            {
              label: 'Tokenization Strategy',
              to: '/docs/tokenization-strategy',
            },
            {
              label: 'Game-Based Research',
              to: '/docs/research-documentation/game-based-research-platform',
            },
            {
              label: 'Investment',
              to: '/docs/investment',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Contributing',
              to: '/docs/contributing',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/szemkoff/AzureSpaceGroup',
            },
            {
              label: 'Contact Us',
              href: 'mailto:irnbrue@gmail.com',
            },
          ],
        },
      ],
      copyright: `Copyright © 2025 Azure Space Group. Built with Docusaurus.`,
    },
    prism: {
      theme: themes.github,
      darkTheme: themes.vsDark,
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: path.resolve(__dirname, './sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/szemkoff/AzureSpaceGroup/tree/main/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/szemkoff/AzureSpaceGroup/tree/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
};

export default config; 