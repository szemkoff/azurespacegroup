import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures/styles.module.css';

const FeatureList = [
  {
    title: 'Core Technology',
    description: (
      <>
        Our quantum propulsion system leverages tunneling, superposition, and entanglement 
        to achieve revolutionary space travel capabilities.
      </>
    ),
  },
  {
    title: 'Energy Systems',
    description: (
      <>
        Powered by quantum vacuum batteries and antimatter reaction chambers for
        sustainable, high-energy propulsion without traditional fuel.
      </>
    ),
  },
  {
    title: 'Navigation Systems',
    description: (
      <>
        Advanced quantum sensors and predictive algorithms provide absolute positioning 
        with Planck-scale precision across vast interstellar distances.
      </>
    ),
  },
  {
    title: 'Research & Publications',
    description: (
      <>
        Access our comprehensive quantum propulsion research paper documenting theoretical 
        models and experimental results that form the foundation of our technology.
      </>
    ),
  },
];

function Feature({title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
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