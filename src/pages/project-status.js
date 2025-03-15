import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import MermaidChart from '@site/src/components/MermaidChart';

// Define custom CSS for the status icons
const statusStyles = {
  done: {
    backgroundColor: '#d4f7e7',
    color: '#0d904f',
    padding: '4px 8px',
    borderRadius: '4px',
    fontWeight: 'bold',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
  },
  inProgress: {
    backgroundColor: '#e9f5fe',
    color: '#0969da',
    padding: '4px 8px',
    borderRadius: '4px',
    fontWeight: 'bold',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
  },
  planned: {
    backgroundColor: '#fef5e7',
    color: '#9a6700',
    padding: '4px 8px',
    borderRadius: '4px',
    fontWeight: 'bold',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
  },
  tableStyles: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0',
    marginBottom: '2rem',
  },
  tableHeader: {
    backgroundColor: '#f6f8fa',
    borderBottom: '2px solid #ddd',
  },
};

// Status components with icons
const StatusDone = () => (
  <div style={{ 
    display: "inline-flex",
    alignItems: "center", 
    color: "#1a7f37",
    fontSize: "11px",
    fontWeight: "500",
  }}>
    <svg width="16" height="16" viewBox="0 0 16 16" style={{ marginRight: "4px" }}>
      <path fill="#1a7f37" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm3.78-9.72a.75.75 0 0 0-1.06-1.06L6.75 9.19 5.28 7.72a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l4.5-4.5z" />
    </svg> Done
  </div>
);

const StatusInProgress = () => (
  <div style={{ 
    display: "inline-flex",
    alignItems: "center", 
    color: "#bc4c00",
    fontSize: "11px",
    fontWeight: "500",
  }}>
    <svg width="16" height="16" viewBox="0 0 16 16" style={{ marginRight: "4px" }}>
      <path fill="#bc4c00" d="M8 0a8 8 0 100 16A8 8 0 008 0zm-.5 4.75V8H5a.75.75 0 000 1.5h3.25v3.25a.75.75 0 001.5 0V9.5H13a.75.75 0 000-1.5H9.75V4.75a.75.75 0 00-1.5 0z" />
    </svg> In Progress
  </div>
);

const StatusPlanned = () => (
  <div style={{ 
    display: "inline-flex",
    alignItems: "center", 
    color: "#6e7781",
    fontSize: "11px",
    fontWeight: "500",
  }}>
    <svg width="16" height="16" viewBox="0 0 16 16" style={{ marginRight: "4px" }}>
      <path fill="#6e7781" d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z" />
    </svg> Planned
  </div>
);

// Research status indicators
const StatusTheoreticalResearch = () => (
  <div style={{ 
    display: "inline-flex",
    alignItems: "center", 
    color: "#6f42c1",
    fontSize: "11px",
    width: "145px",
    fontWeight: "500",
    whiteSpace: "nowrap"
  }}>
    <svg width="16" height="16" viewBox="0 0 16 16" style={{ marginRight: "4px" }}>
      <path fill="#6f42c1" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.25-11.25v4.5L12 12l-.75.664-3.5-3.5V4.75z" />
    </svg> Theoretical Research
  </div>
);

const StatusConceptPaper = () => (
  <div style={{ 
    display: "inline-flex",
    alignItems: "center", 
    color: "#5a32a3",
    fontSize: "11px",
    width: "145px",
    fontWeight: "500",
    whiteSpace: "nowrap"
  }}>
    <svg width="16" height="16" viewBox="0 0 16 16" style={{ marginRight: "4px" }}>
      <path fill="#5a32a3" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.25-11.25v4.5L12 12l-.75.664-3.5-3.5V4.75z" />
    </svg> Concept Paper
  </div>
);

const StatusLiteratureReview = () => (
  <div style={{ 
    display: "inline-flex",
    alignItems: "center", 
    color: "#0075ca",
    fontSize: "11px",
    width: "145px",
    fontWeight: "500",
    whiteSpace: "nowrap"
  }}>
    <svg width="16" height="16" viewBox="0 0 16 16" style={{ marginRight: "4px" }}>
      <path fill="#0075ca" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.25-11.25v4.5L12 12l-.75.664-3.5-3.5V4.75z" />
    </svg> Literature Review
  </div>
);

const StatusMathematicalModel = () => (
  <div style={{ 
    display: "inline-flex",
    alignItems: "center", 
    color: "#1c7c4e",
    fontSize: "11px",
    width: "145px",
    fontWeight: "500",
    whiteSpace: "nowrap"
  }}>
    <svg width="16" height="16" viewBox="0 0 16 16" style={{ marginRight: "4px" }}>
      <path fill="#1c7c4e" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.25-11.25v4.5L12 12l-.75.664-3.5-3.5V4.75z" />
    </svg> Mathematical Model
  </div>
);

const StatusEarlyResearch = () => (
  <div style={{ 
    display: "inline-flex",
    alignItems: "center", 
    color: "#0550ae",
    fontSize: "11px",
    width: "145px",
    fontWeight: "500",
    whiteSpace: "nowrap"
  }}>
    <svg width="16" height="16" viewBox="0 0 16 16" style={{ marginRight: "4px" }}>
      <path fill="#0550ae" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.25-11.25v4.5L12 12l-.75.664-3.5-3.5V4.75z" />
    </svg> Early Research
  </div>
);

const StatusSpeculativeTheory = () => (
  <div style={{ 
    display: "inline-flex",
    alignItems: "center", 
    color: "#7d4e00",
    fontSize: "11px",
    width: "145px",
    fontWeight: "500",
    whiteSpace: "nowrap"
  }}>
    <svg width="16" height="16" viewBox="0 0 16 16" style={{ marginRight: "4px" }}>
      <path fill="#7d4e00" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.25-11.25v4.5L12 12l-.75.664-3.5-3.5V4.75z" />
    </svg> Speculative Theory
  </div>
);

function ProjectStatusHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">Project Status</h1>
        <p className="hero__subtitle">Current development status of InstaForce components</p>
      </div>
    </header>
  );
}

export default function ProjectStatus() {
  const {siteConfig} = useDocusaurusContext();


  return (
    <Layout
      title="Project Status"
      description="InstaForce Project Status - Current development progress and roadmap">
      <ProjectStatusHeader />
      <main>
        <div className="container margin-top--lg">
          <div className="row">
            <div className="col col--10 col--offset-1">
              <h2>Current Project Status</h2>
              <p className={styles.leadParagraph}>
                This page provides a comprehensive overview of the current development status 
                of all InstaForce Project components and research initiatives.
              </p>
              
              <div className={styles.featureCallout}>
                <h3>Development Approach</h3>
                <p>
                  Our development methodology prioritizes theoretical research before practical implementation,
                  ensuring that all quantum technology concepts are mathematically sound and thoroughly
                  validated through simulation before moving to prototype development.
                </p>
              </div>
              
              <div className={styles.statusLegendContainer}>
                <h4>Project Status Legend:</h4>
                <div className={styles.statusLegendGrid}>
                  <StatusDone />
                  <StatusInProgress />
                  <StatusPlanned />
                </div>
                
                <div className={styles.legendDivider}></div>
                
                <h4>Research Status Legend:</h4>
                <div className={styles.statusLegendGrid}>
                  <StatusTheoreticalResearch />
                  <StatusConceptPaper />
                  <StatusLiteratureReview />
                  <StatusMathematicalModel />
                  <StatusEarlyResearch />
                  <StatusSpeculativeTheory />
                </div>
              </div>

              <h3 className={styles.sectionTitle}>Foundation Components</h3>
              <div className={styles.tableContainer}>
                <table className={styles.statusTable}>
                  <thead>
                    <tr>
                      <th>Component</th>
                      <th>Status</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Infrastructure Setup</td>
                      <td><StatusDone /></td>
                      <td>Base project infrastructure and documentation framework complete</td>
                    </tr>
                    <tr>
                      <td>Documentation Framework</td>
                      <td><StatusDone /></td>
                      <td>Docusaurus implementation with proper navigation structure</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className={styles.sectionTitle}>Technology Development Tracks</h3>
              <div className={styles.tableContainer}>
                <table className={styles.statusTable}>
                  <thead>
                    <tr>
                      <th>Track</th>
                      <th>Description</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Quantum Propulsion</td>
                      <td>Quantum Drive Core development and Gravitational Wave Manipulation</td>
                      <td><StatusTheoreticalResearch /></td>
                    </tr>
                    <tr>
                      <td>Energy Systems</td>
                      <td>Quantum Vacuum Energy Harvesting and Antimatter Reaction Chamber</td>
                      <td><StatusConceptPaper /></td>
                    </tr>
                    <tr>
                      <td>Navigation Systems</td>
                      <td>Quantum Field Sensors and Spatial Frequency Mapping</td>
                      <td><StatusMathematicalModel /></td>
                    </tr>
                    <tr>
                      <td>Communication Systems</td>
                      <td>Quantum Communication Networks and Schumann Resonance Carrier</td>
                      <td><StatusEarlyResearch /></td>
                    </tr>
                    <tr>
                      <td>Human Integration</td>
                      <td>Neural Interface Technology and Telepathic Control Systems</td>
                      <td><StatusLiteratureReview /></td>
                    </tr>
                    <tr>
                      <td>Support Systems</td>
                      <td>Self-healing materials and Quantum Shielding Technology</td>
                      <td><StatusSpeculativeTheory /></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className={styles.sectionTitle}>Core Technology Components</h3>
              <div className={styles.tableContainer}>
                <table className={styles.statusTable}>
                  <thead>
                    <tr>
                      <th>Component</th>
                      <th>Status</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Core Technology Documentation</td>
                      <td><StatusInProgress /></td>
                      <td>Basic documentation structure in place, expanding technical details</td>
                    </tr>
                    <tr>
                      <td>Energy Systems Integration</td>
                      <td><StatusInProgress /></td>
                      <td>Primary research on energy sourcing and distribution in progress</td>
                    </tr>
                    <tr>
                      <td>Propulsion Navigation</td>
                      <td><StatusInProgress /></td>
                      <td>Initial propulsion theory documentation nearly complete</td>
                    </tr>
                    <tr>
                      <td>Location Determination</td>
                      <td><StatusPlanned /></td>
                      <td>Spatial Frequency Map development scheduled to begin Q2</td>
                    </tr>
                    <tr>
                      <td>Motion Control Systems</td>
                      <td><StatusInProgress /></td>
                      <td>Quantum Drive and Frequency Shift theoretical framework in progress</td>
                    </tr>
                    <tr>
                      <td>Communication Systems</td>
                      <td><StatusInProgress /></td>
                      <td>Schumann Resonance carrier research underway</td>
                    </tr>
                    <tr>
                      <td>Telepathic Interface</td>
                      <td><StatusPlanned /></td>
                      <td>Initial research into pilot-ship consciousness integration</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className={styles.sectionTitle}>Supporting Systems</h3>
              <div className={styles.tableContainer}>
                <table className={styles.statusTable}>
                  <thead>
                    <tr>
                      <th>Component</th>
                      <th>Status</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Support Systems</td>
                      <td><StatusPlanned /></td>
                      <td>Life support and auxiliary systems documentation planned</td>
                    </tr>
                    <tr>
                      <td>Human-Centric Design</td>
                      <td><StatusPlanned /></td>
                      <td>Research on optimizing craft design for human operators</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className={styles.sectionTitle}>Supplementary Documentation</h3>
              <div className={styles.tableContainer}>
                <table className={styles.statusTable}>
                  <thead>
                    <tr>
                      <th>Component</th>
                      <th>Status</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Research & Development</td>
                      <td><StatusDone /></td>
                      <td>R&D workflow documentation and test lab diagrams now complete</td>
                    </tr>
                    <tr>
                      <td>Legal & Regulatory</td>
                      <td><StatusPlanned /></td>
                      <td>Assessment of legal implications pending</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className={styles.researchHighlight}>
                <h3>Strategic Roadmap</h3>
                <p>
                  Our current development focus prioritizes core infrastructure and fundamental
                  technologies that will enable more advanced systems in future development phases.
                  This approach ensures we build a solid foundation before moving to more 
                  complex implementation challenges.
                </p>
                
                <Link
                  className="button button--secondary button--lg"
                  to="/docs/research-documentation/quantum-battery-prototype">
                  View Quantum Battery Prototype
                </Link>
              </div>
              
              <h4 className={styles.sectionTitle}>Development Phases</h4>
              <div className={styles.tableContainer}>
                <table className={styles.statusTable}>
                  <thead>
                    <tr>
                      <th>Phase</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Key Milestones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Phase 1: Theoretical Refinement</td>
                      <td>Rigorous mathematical modeling of quantum field manipulation and completion of theoretical framework</td>
                      <td><StatusInProgress /></td>
                      <td>
                        <ul className={styles.milestonesList}>
                          <li>Mathematical model verification</li>
                          <li>Quantum field simulation</li>
                          <li>Theoretical framework documentation</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>Phase 2: Laboratory Scale Testing</td>
                      <td>Small-scale prototype development and controlled environment testing</td>
                      <td><StatusPlanned /></td>
                      <td>
                        <ul className={styles.milestonesList}>
                          <li>Quantum vacuum prototype</li>
                          <li>Energy efficiency validation</li>
                          <li>Small-scale propulsion test</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>Phase 3: Prototype Development</td>
                      <td>Full-scale prototype development and initial testing</td>
                      <td><StatusPlanned /></td>
                      <td>
                        <ul className={styles.milestonesList}>
                          <li>Full-scale prototype construction</li>
                          <li>Initial testing and performance evaluation</li>
                          <li>Prototype documentation</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>Phase 4: Field Testing</td>
                      <td>Large-scale field testing and performance validation</td>
                      <td><StatusPlanned /></td>
                      <td>
                        <ul className={styles.milestonesList}>
                          <li>Field testing infrastructure setup</li>
                          <li>Performance validation against theoretical predictions</li>
                          <li>Data collection and analysis</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>Phase 5: Commercial Applications</td>
                      <td>Development of high-capacity transport and industrial applications</td>
                      <td><StatusPlanned /></td>
                      <td>
                        <ul className={styles.milestonesList}>
                          <li>Satellite launch systems</li>
                          <li>Space tourism infrastructure</li>
                          <li>Asteroid mining operations</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>Phase 6: Interstellar Exploration</td>
                      <td>Development of long-range interstellar transport vehicles for deep space exploration</td>
                      <td><StatusPlanned /></td>
                      <td>
                        <ul className={styles.milestonesList}>
                          <li>Interstellar navigation systems</li>
                          <li>Long-term life support</li>
                          <li>Planetary colonization technology</li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className={styles.sectionTitle}>R&D Phase</h3>
              <div className={styles.tableContainer}>
                <table className={styles.statusTable}>
                  <thead>
                    <tr>
                      <th>Phase</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Start Date</th>
                      <th>Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Theoretical Validation</td>
                      <td>Rigorous mathematical modeling of quantum field manipulation and completion of theoretical framework</td>
                      <td><StatusDone /></td>
                      <td>2023</td>
                      <td>2 years</td>
                    </tr>
                    <tr>
                      <td>Quantum Field Modeling</td>
                      <td>Development of mathematical models and simulations for quantum field manipulation</td>
                      <td><StatusInProgress /></td>
                      <td>2024</td>
                      <td>3 years</td>
                    </tr>
                    <tr>
                      <td>Prototype Development</td>
                      <td>Full-scale prototype development and initial testing</td>
                      <td><StatusPlanned /></td>
                      <td>2025</td>
                      <td>5 years</td>
                    </tr>
                    <tr>
                      <td>Commercial Drone Adaptation</td>
                      <td>Development of high-capacity transport and industrial applications</td>
                      <td><StatusPlanned /></td>
                      <td>2028</td>
                      <td>5 years</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className={styles.sectionTitle}>Development Roadmap</h3>
              <p>
                The following Gantt chart outlines our long-term development timeline, 
                showing how various project components will progress from research 
                through prototyping and into full implementation.
              </p>

              <div className={styles.mermaidVisualization}>
                <MermaidChart chart={`
gantt
  title Quantum Propulsion Technology Development Roadmap
  dateFormat YYYY
  axisFormat %Y
  
  section R&D Phase
  Theoretical Validation :crit, active, 2023, 2y
  Quantum Field Modeling :active, 2024, 3y
  Prototype Development :2025, 5y
  Commercial Drone Adaptation :2028, 5y
  
  section Vehicle Development
  Small-Scale Test Vehicles :2026, 4y
  Four-Seater Manned Vehicle :2028, 5y
  High-Capacity Transport :2033, 5y
  Interstellar Transport :2038, 5y
  
  section Commercialization
  Strategic Partnerships :active, 2024, 6y
  Satellite Launch Operations :2028, 10y
  Space Tourism :2033, 10y
  Industrial Mining :2033, 10y
  Interstellar Exploration :2038, 10y
                `}/>
              </div>


              <div className={styles.roadmapDisclaimer}>
                <p>
                  <strong>Note:</strong> Timeline projections are based on current research progress and funding projections. 
                  Actual implementation dates may vary based on technological breakthroughs and investment milestones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
} 