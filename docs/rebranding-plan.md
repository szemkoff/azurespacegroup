---
id: rebranding-plan
title: Rebranding from InstaForce to Azure Space Group
sidebar_label: Rebranding Plan
description: Comprehensive plan for transitioning from InstaForce to Azure Space Group brand
---

# Rebranding Plan: InstaForce to Azure Space Group

This document outlines our comprehensive plan for rebranding from InstaForce to Azure Space Group, including all technical changes required, content modifications, visual asset updates, and implementation steps.

## Executive Summary

The rebranding from InstaForce to Azure Space Group represents a strategic repositioning of our organization to better align with our focus on advanced space technologies and quantum navigation systems. This document provides a detailed implementation plan to ensure a smooth transition with minimal disruption to our users, collaborators, and stakeholders.

## 1. Technical Configuration Changes

### Core Configuration Files

#### docusaurus.config.js

```js
// FROM
title: 'InstaForce Technologies',
tagline: 'Revolutionary Quantum Propulsion Systems',
favicon: 'img/favicon.svg',
url: 'https://szemkoff.github.io',
baseUrl: '/InstaForce/',
organizationName: 'szemkoff',
projectName: 'InstaForce',

// TO
title: 'Azure Space Group',
tagline: 'Advanced Quantum Navigation & Propulsion',
favicon: 'img/azure-favicon.svg',
url: 'https://szemkoff.github.io',
baseUrl: '/AzureSpaceGroup/',
organizationName: 'szemkoff',
projectName: 'AzureSpaceGroup',
```

Additional changes required in this file:
- Update navbar title and logo references
- Modify footer copyright text
- Update GitHub repository links
- Revise routing paths as needed

#### package.json

```json
// FROM
"name": "instaforce-docs",
"version": "0.1.0",

// TO
"name": "azure-space-group-docs",
"version": "1.0.0",
```

Also update repository URLs and description in this file.

#### sidebars.js

No structural changes needed, but verify that all document IDs remain valid after content changes.

### GitHub Configuration

- Rename GitHub repository from "InstaForce" to "AzureSpaceGroup"
- Update repository description and topics
- Update GitHub Pages deployment branch configuration

## 2. Content Modifications

### Systematic Search and Replace

A systematic search and replace operation will be performed across all content files with the following terms:

| From | To |
|------|-----|
| InstaForce | Azure Space Group |
| instaforce | azure-space-group |
| INSTAFORCE | AZURE SPACE GROUP |
| /InstaForce/ | /AzureSpaceGroup/ |

### Priority Content Files

These files require careful review beyond simple search and replace:

#### docs/intro.md
- Update project introduction and mission statement
- Revise overview to align with new branding

#### src/pages/index.js
- Update hero section with new brand messaging
- Modify feature descriptions if they contain brand references

#### src/pages/project-status.js
- Update project status headers and references
- Revise any branding-specific content

### Content Requiring Special Attention

- All code examples that include InstaForce as part of variable names or paths
- API endpoints or URLs that incorporate the InstaForce name
- Configuration examples that reference the old brand name
- Historical references that should maintain the InstaForce name with clarification about the rebranding

## 3. Visual Asset Updates

### Logo and Identity Files

| Asset | Current Location | Action Required |
|-------|-----------------|-----------------|
| Primary Logo | static/img/logo.svg | Replace with Azure Space Group logo |
| Favicon | static/img/favicon.svg | Replace with Azure Space Group favicon |
| Social Card | static/img/instaforce-social-card.jpg | Replace and rename to azure-space-group-social-card.jpg |

### Diagrams and Technical Illustrations

Review and update all diagrams that contain the InstaForce name or logo:

- quantum-propulsion-concept.svg
- system-architecture.svg
- navigation-logic-flow.svg
- And others as identified

### CSS and Theme Updates

- Review src/css/custom.css for brand-specific color definitions
- Update primary and secondary colors if they are tied to InstaForce branding
- Modify any custom component styles that reference the old brand

## 4. URL Structure and Routing

### Base URL Changes

- Update all internal links from `/InstaForce/` to `/AzureSpaceGroup/`
- Implement redirects from old URLs to new URLs
- Update canonical URLs in page metadata

### External Link Management

Develop a strategy for external links pointing to our documentation:
- Consider maintaining redirects long-term
- Reach out to key partners to update their links
- Monitor 404 errors to catch any missed redirects

## 5. Implementation Plan

### Phase 1: Preparation (Week 1)

1. **Create New Visual Assets**
   - Design new logo and favicon
   - Prepare updated social media cards and images
   - Create brand style guide for Azure Space Group

2. **Backup and Version Control**
   - Create a complete backup of the current site
   - Create a dedicated git branch for the rebranding work
   - Set up test deployment environment

3. **Audit Content**
   - Generate complete list of files containing "InstaForce"
   - Identify complex changes requiring manual intervention
   - Document external dependencies that need updating

### Phase 2: Core Changes (Week 2)

1. **Update Configuration Files**
   - Modify docusaurus.config.js
   - Update package.json and other npm configuration
   - Adjust GitHub workflows and deployment settings

2. **Replace Visual Assets**
   - Deploy new logo, favicon, and images
   - Update theme colors and styling
   - Replace brand references in diagrams

3. **Content Changes**
   - Perform global search and replace operations
   - Make manual updates to complex content
   - Update code examples and configuration snippets

### Phase 3: Testing and Refinement (Week 3)

1. **Build and Test**
   - Generate test build of the updated site
   - Validate all internal links
   - Test responsive design and appearance
   - Verify all functionality remains intact

2. **Link and Path Validation**
   - Automated testing of all internal links
   - Manual review of critical sections
   - Cross-browser and device testing

3. **Refinement**
   - Address issues identified during testing
   - Optimize performance
   - Make final adjustments to content and styling

### Phase 4: Deployment (Week 4)

1. **Preparation**
   - Notify stakeholders of upcoming changes
   - Schedule deployment during low-traffic period
   - Prepare announcement materials

2. **Repository Update**
   - Rename GitHub repository
   - Update deployment settings
   - Merge rebranding branch to main

3. **Go Live**
   - Deploy to production
   - Verify redirects are working
   - Monitor analytics and error logs
   - Announce rebranding officially

4. **Post-Launch**
   - Address any reported issues
   - Update external services and partners
   - Monitor site performance and user feedback

## 6. File-by-File Changes

Below is a comprehensive list of files requiring updates:

### Configuration Files
- [x] docusaurus.config.js
- [x] package.json
- [x] sidebars.js
- [x] .github/workflows/deploy.yml

### Core Content
- [x] docs/intro.md
- [x] docs/contributing.md
- [x] docs/research-documentation/research-development.md
- [x] docs/research-documentation/prototype-designs.md
- [x] docs/core-documentation/quantum-position-determination.md
- [x] docs/core-documentation/propulsion-navigation.md
- [x] docs/core-documentation/core-technology.md

### Blog Posts
- [x] All files in the blog directory
- [x] blog/authors.yml

### Components
- [x] src/pages/index.js
- [x] src/pages/project-status.js
- [x] src/components/MermaidChart.js

### Assets
- [x] static/img/logo.svg
- [x] static/img/favicon.svg
- [x] static/img/instaforce-social-card.jpg

## 7. Risk Assessment and Mitigation

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Broken internal links | High | Medium | Automated testing and redirects |
| Missed brand references | Medium | Low | Multiple review passes |
| External link breakage | High | Medium | Communication and long-term redirects |
| User confusion | Medium | Medium | Clear announcements and documentation |
| SEO impact | Medium | High | Proper redirects and sitemap updates |

## 8. Success Metrics

We will measure the success of the rebranding through:

1. **Technical Metrics**
   - Zero critical errors post-launch
   - Bounce rate comparison before and after
   - Page load performance maintained or improved

2. **User Experience Metrics**
   - User feedback survey
   - Support ticket volume related to rebranding
   - Time on site metrics comparison

3. **Brand Impact Metrics**
   - Social media mentions and sentiment
   - Press coverage of the rebranding
   - Partner and stakeholder feedback

## Conclusion

This rebranding plan provides a structured approach to transitioning from InstaForce to Azure Space Group. By following this detailed plan, we aim to ensure a smooth transition that preserves our technical content while enhancing our brand identity. The rebranding represents not just a name change, but a strategic evolution that better positions us in the quantum navigation and advanced space technology sectors.

## Appendix: Command Reference

### Finding InstaForce References

```bash
# Find all instances of InstaForce in code files
grep -r "InstaForce" --include="*.js" --include="*.md" --include="*.html" . > rename_occurrences.txt

# Find all instances of lowercase instaforce
grep -r "instaforce" --include="*.js" --include="*.md" --include="*.html" . > rename_occurrences_lowercase.txt
```

### Batch Replacement Examples

```bash
# Replace in JavaScript files
find . -name "*.js" -type f -exec sed -i 's/InstaForce/Azure Space Group/g' {} \;

# Replace in Markdown files
find . -name "*.md" -type f -exec sed -i 's/InstaForce/Azure Space Group/g' {} \;

# Replace URLs in all files
find . -type f -exec sed -i 's/\/InstaForce\//\/AzureSpaceGroup\//g' {} \;
``` 