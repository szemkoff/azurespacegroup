import React from 'react';
import Link from '@docusaurus/Link';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import { useThemeConfig } from '@docusaurus/theme-common';
import ThemedImage from '@theme/ThemedImage';
import styles from './styles.module.css';

export default function NavbarLogo() {
  const {
    navbar: { title, logo },
  } = useThemeConfig();
  const { withBaseUrl } = useBaseUrlUtils();
  
  // If no logo is defined, fallback to text
  if (!logo) {
    return <span>{title}</span>;
  }

  // Force the logo path to be absolute with the baseUrl
  const logoSrc = '/AzureSpaceGroup/img/azure_corp_mark_black.svg';
  const logoSrcDark = '/AzureSpaceGroup/img/azure_corp_mark_black.svg';

  return (
    <Link
      to="/"
      className={styles.navbarLogoLink}
      aria-label={`${title} home page`}>
      <div className={styles.navbarLogoContainer}>
        {logo.src && (
          <ThemedImage
            className={styles.navbarLogo}
            sources={{
              light: logoSrc,
              dark: logoSrcDark || logoSrc,
            }}
            alt={logo.alt || title}
            width={logo.width}
            height={logo.height}
            style={logo.style}
          />
        )}
        {title && <span className={styles.navbarTitle}>{title}</span>}
      </div>
    </Link>
  );
} 