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
          <Link
            className="button button--secondary button--lg"
            to="/docs/tokenization-strategy">
            Tokenization Strategy
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/research-documentation/game-based-research-platform">
            Game-Based Research
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
      description="InstaForce Project Documentation - Advanced Quantum Propulsion Research">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <div className="container margin-top--lg">
          <div className="row">
            <div className="col col--8 col--offset-2">
              <h2>Transforming Space Travel Through Quantum Technology</h2>
              <p className={styles.leadParagraph}>
                The InstaForce Project represents a revolutionary approach to space propulsion technology, 
                leveraging quantum mechanics principles to enable advanced space travel capabilities that 
                surpass conventional propulsion methods.
              </p>
              
              <div className={styles.featureCallout}>
                <h3>Our Mission</h3>
                <p>
                  We're dedicated to harnessing quantum phenomena such as tunneling, superposition, and entanglement 
                  to create a propulsion system that could potentially enable faster-than-light travel and 
                  drastically reduce resource consumption.
                </p>
              </div>
              
              <h3>Key Technologies</h3>
              <div className={styles.technologyGrid}>
                <div className={styles.technologyCard}>
                  <h4>Quantum Tunneling Propulsion</h4>
                  <p>Allowing matter to pass through energy barriers</p>
                  <Link className={styles.technologyLink} to="/docs/core-documentation/propulsion-navigation">Learn more →</Link>
                </div>
                <div className={styles.technologyCard}>
                  <h4>Superposition Drive Systems</h4>
                  <p>Translating quantum state fluctuations into momentum</p>
                  <Link className={styles.technologyLink} to="/docs/core-documentation/core-technology">Learn more →</Link>
                </div>
                <div className={styles.technologyCard}>
                  <h4>Entanglement Synchronization</h4>
                  <p>Perfect timing across all engine systems</p>
                  <Link className={styles.technologyLink} to="/docs/core-documentation/communication-systems">Learn more →</Link>
                </div>
                <div className={styles.technologyCard}>
                  <h4>Vacuum Energy Harvesting</h4>
                  <p>Drawing power directly from quantum vacuum fluctuations</p>
                  <Link className={styles.technologyLink} to="/docs/core-documentation/energy-systems">Learn more →</Link>
                </div>
              </div>
              
              <h3>Innovative Research Approaches</h3>
              <div className={styles.technologyGrid}>
                <div className={styles.technologyCard}>
                  <h4>Game-Based Research Platform</h4>
                  <p>Solving complex problems through interactive experiences</p>
                  <Link className={styles.technologyLink} to="/docs/research-documentation/game-based-research-platform">Learn more →</Link>
                </div>
                <div className={styles.technologyCard}>
                  <h4>Tokenization Strategy</h4>
                  <p>Token-based incentives for community research contributions</p>
                  <Link className={styles.technologyLink} to="/docs/tokenization-strategy">Learn more →</Link>
                </div>
                <div className={styles.technologyCard}>
                  <h4>Community Research Pool</h4>
                  <p>Rewarding valuable research from diverse contributors</p>
                  <Link className={styles.technologyLink} to="/docs/contributing">Learn more →</Link>
                </div>
                <div className={styles.technologyCard}>
                  <h4>Investment Opportunities</h4>
                  <p>Hybrid funding model combining equity and tokens</p>
                  <Link className={styles.technologyLink} to="/docs/investment">Learn more →</Link>
                </div>
              </div>
              
              <div className={styles.researchHighlight}>
                <h3>Latest Research Highlight</h3>
                <h4>Quantum Battery Prototype</h4>
                <p>
                  Our team has developed detailed specifications for a quantum battery prototype
                  that could revolutionize energy storage and generation for spacecraft systems.
                  This technology harnesses zero-point energy from the quantum vacuum to provide
                  unprecedented power density with minimal mass.
                </p>
                <Link
                  className="button button--secondary button--lg"
                  to="/docs/research-documentation/quantum-battery-prototype">
                  View Prototype Specifications
                </Link>
              </div>
              
              <h3>Development Status</h3>
              <p>
                The InstaForce Project is actively developing multiple technology tracks simultaneously.
                Many core components are in the theoretical research and mathematical modeling stages,
                with several proof-of-concept prototypes under development.
              </p>
              <div className={styles.ctaSection}>
                <Link
                  className="button button--secondary button--lg"
                  to="/project-status">
                  View Complete Project Status
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
} 