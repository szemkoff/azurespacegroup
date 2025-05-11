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
  favicon: 'img/azure_corp_mark_black.png',

  // Set the production url of your site here
  url: 'https://szemkoff.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/azurespacegroup/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'szemkoff', // Usually your GitHub org/user name.
  projectName: 'azurespacegroup', // Usually your repo name.
  deploymentBranch: 'gh-pages', // Use gh-pages branch for deployment
  trailingSlash: true,

  // Restore normal behavior for broken links after we've fixed the diagram URLs
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Enable static directory to be properly copied to build directory
  staticDirectories: ['static', 'public'],
  
  // Custom plugin to handle logo files
  plugins: [
    function (context, options) {
      return {
        name: 'copy-logo-files',
        async loadContent() {
          return null;
        },
        async contentLoaded({content, actions}) {
          // No additional processing needed
        },
        async postBuild({siteConfig, routesPaths, outDir}) {
          const fs = require('fs-extra');
          
          // Create all possible img directories
          await fs.ensureDir(path.join(outDir, 'img'));
          await fs.ensureDir(path.join(outDir, 'azurespacegroup', 'img'));
          
          // Copy logo files to all possible locations
          const logoFiles = ['azure_corp_mark_black.png'];
          for (const file of logoFiles) {
            const sourcePath = path.join(__dirname, 'static', 'img', file);
            
            // Copy to /img/
            await fs.copy(
              sourcePath,
              path.join(outDir, 'img', file)
            );
            
            // Copy to /azurespacegroup/img/
            await fs.copy(
              sourcePath,
              path.join(outDir, 'azurespacegroup', 'img', file)
            );
          }
          
          console.log('Logo files copied to all possible locations');
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
    image: 'img/azure_corp_mark_black.png',
    navbar: {
      title: 'Azure Space Group',
      logo: {
        alt: 'Azure Corp Logo',
        src: 'img/azure_corp_mark_black.png',
        srcDark: 'img/azure_corp_mark_black.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          to: '/docs/investment/',
          position: 'left',
          label: 'Investment',
        },
        {
          type: 'dropdown',
          label: 'Grant Programs',
          position: 'left',
          items: [
            {
              label: 'Grant Programs Directory',
              to: '/docs/investment-opportunities/',
            },
            {
              label: 'Quantum-SCI',
              to: '/docs/investment-opportunities/quantum-sci/',
            },
            {
              label: 'UConn Quantum',
              to: '/docs/investment-opportunities/uconn-quantum/',
            },
            {
              label: 'NSF Expand',
              to: '/docs/investment-opportunities/nsf-expand/',
            },
            {
              label: 'ARPA-E OPEN',
              to: '/docs/investment-opportunities/arpae-open/',
            },
            {
              label: 'DOE Quantum',
              to: '/docs/investment-opportunities/doe-quantum/',
            },
            {
              label: 'NASA NIAC',
              to: '/docs/investment-opportunities/nasa-niac/',
            },
            {
              label: 'AFOSR Basic',
              to: '/docs/investment-opportunities/afosr-basic/',
            },
          ],
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {to: '/project-status', label: 'Project Status', position: 'left'},
        {
          href: 'https://github.com/szemkoff/azurespacegroup',
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
              href: 'https://github.com/szemkoff/azurespacegroup',
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
          editUrl: 'https://github.com/szemkoff/azurespacegroup/tree/main/',
        },
        blog: {
          onInlineAuthors: 'ignore',
          onUntruncatedBlogPosts: 'ignore',
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/szemkoff/azurespacegroup/tree/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
};

export default config; 