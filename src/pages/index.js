import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Documentation
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="IntstelForce Project Documentation">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <div className="container margin-top--lg">
          <div className="row">
            <div className="col col--8 col--offset-2">
              <h2>Transforming Space Travel Through Quantum Technology</h2>
              <p>
                The InstaForce Project represents a revolutionary approach to space propulsion technology, 
                leveraging quantum mechanics principles to enable advanced space travel capabilities that 
                surpass conventional propulsion methods.
              </p>
              <p>
                Our mission is to harness quantum phenomena such as tunneling, superposition, and entanglement 
                to create a propulsion system that could potentially enable faster-than-light travel and 
                drastically reduce resource consumption.
              </p>
              <h3>Key Technologies</h3>
              <ul>
                <li><strong>Quantum Tunneling Propulsion</strong> - Allowing matter to pass through energy barriers</li>
                <li><strong>Superposition Drive Systems</strong> - Translating quantum state fluctuations into momentum</li>
                <li><strong>Entanglement Synchronization</strong> - Perfect timing across all engine systems</li>
                <li><strong>Vacuum Energy Harvesting</strong> - Drawing power directly from quantum vacuum fluctuations</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
} 