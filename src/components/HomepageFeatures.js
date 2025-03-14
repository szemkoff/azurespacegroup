import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Core Technology',
    icon: '🔬',
    description: (
      <>
        Our quantum propulsion system leverages tunneling, superposition, and entanglement 
        to achieve revolutionary space travel capabilities.
      </>
    ),
    link: '/docs/core-documentation/core-technology',
  },
  {
    title: 'Energy Systems',
    icon: '⚡',
    description: (
      <>
        Powered by quantum vacuum batteries and antimatter reaction chambers for
        sustainable, high-energy propulsion without traditional fuel.
      </>
    ),
    link: '/docs/core-documentation/energy-systems',
  },
  {
    title: 'Navigation Systems',
    icon: '🧭',
    description: (
      <>
        Advanced quantum sensors and predictive algorithms provide absolute positioning 
        with Planck-scale precision across vast interstellar distances.
      </>
    ),
    link: '/docs/core-documentation/propulsion-navigation',
  },
  {
    title: 'Research & Publications',
    icon: '📚',
    description: (
      <>
        Access our comprehensive quantum propulsion research paper documenting theoretical 
        models and experimental results that form the foundation of our technology.
      </>
    ),
    link: '/docs/research-documentation/quantum-battery-prototype',
  },
];

function Feature({title, description, icon, link}) {
  return (
    <div className={clsx('col col--3')}>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon}>{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>
        <Link className={styles.featureLink} to={link}>
          Learn more
        </Link>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
} 