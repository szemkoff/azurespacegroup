// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import { themes } from 'prism-react-renderer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'InstaForce Technologies',
  tagline: 'Revolutionary Quantum Propulsion Systems',
  favicon: 'img/favicon.svg',

  // Set the production url of your site here
  url: 'https://szemkoff.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/InstaForce/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'szemkoff', // Usually your GitHub org/user name.
  projectName: 'InstaForce', // Usually your repo name.
  deploymentBranch: 'docs-deployment', // Use our custom branch for deployment

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
                // Rewrite /InstaForce/img/diagrams/xxx.html to /img/diagrams/xxx.html
                '/InstaForce/img/diagrams': path.resolve(__dirname, 'static/img/diagrams'),
              },
            },
          };
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
    image: 'img/logo.svg',
    navbar: {
      title: 'InstaForce',
      logo: {
        alt: 'InstaForce Logo',
        src: 'img/logo.svg',
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
          href: 'https://github.com/szemkoff/InstaForce',
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
              href: 'https://github.com/szemkoff/InstaForce',
            },
            {
              label: 'Contact Us',
              href: 'mailto:irnbrue@gmail.com',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} InstaForce Technologies. Built with Docusaurus.`,
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
          editUrl:
            'https://github.com/szemkoff/InstaForce/tree/main/',
          rehypePlugins: [],
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/szemkoff/InstaForce/tree/main/',
          // Configure inline authors to be ignored to remove the warning
          onInlineAuthors: 'ignore',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],
};

export default config; 