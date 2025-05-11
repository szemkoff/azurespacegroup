/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Project Overview',
    },
    {
      type: 'doc',
      id: 'about',
      label: 'About Us',
    },
    {
      type: 'category',
      label: 'Core Systems',
      items: [
        'core-documentation/core-technology',
        'core-documentation/system-dissection',
        'core-documentation/energy-systems',
        'core-documentation/propulsion-navigation',
        'core-documentation/quantum-position-determination',
        'core-documentation/communication-systems',
      ],
    },
    {
      type: 'category',
      label: 'Infrastructure & Human Factors',
      items: [
        'infrastructure-documentation/support-systems',
        'infrastructure-documentation/human-centric-design',
        'infrastructure-documentation/bio-resonance-habitat',
      ],
    },
    {
      type: 'category',
      label: 'Research & Compliance',
      items: [
        'research-documentation/research-development',
        'research-documentation/prototype-designs',
        'research-documentation/quantum-battery-prototype',
        'research-documentation/game-based-research-platform',
        'research-documentation/time-tacking',
        'research-documentation/quantum-propulsion-theoretical-revision',
        'research-documentation/advanced-materials-research',
        'research-documentation/quantum-communications',
        'research-documentation/legal-regulatory',
        'research-documentation/quantum-research-paper',
      ],
    },
    {
      type: 'doc',
      id: 'diagrams',
      label: 'Technical Schematics & Diagrams',
    },
    {
      type: 'doc',
      id: 'development-roadmap',
      label: 'Development Roadmap',
    },
    {
      type: 'category',
      label: 'Investment Opportunities',
      items: [
        'investment',
        'pitch-deck',
        'tokenization-strategy',
        {
          type: 'category',
          label: 'Grant Programs',
          items: [
            'investment-opportunities/quantum-sci',
            'investment-opportunities/uconn-quantum',
            'investment-opportunities/nsf-expand',
            'investment-opportunities/arpae-open',
            'investment-opportunities/doe-quantum',
            'investment-opportunities/nasa-niac',
            'investment-opportunities/afosr-basic',
          ],
        },
      ],
    },
    {
      type: 'doc',
      id: 'contributing',
      label: 'Contributing Guidelines',
    },
    {
      type: 'doc',
      id: 'careers',
      label: 'Careers',
    },
  ],
};

export default sidebars; 