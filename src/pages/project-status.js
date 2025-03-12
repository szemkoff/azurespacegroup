import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

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
    color: "#0d904f",
    fontSize: "11px", // 30% smaller text
    width: "85px", // Fixed width for all status indicators
    fontWeight: "500",
    whiteSpace: "nowrap"
  }}>
    <svg width="16" height="16" viewBox="0 0 16 16" style={{ marginRight: "4px" }}>
      <path fill="#0d904f" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm3.78-9.72a.75.75 0 0 0-1.06-1.06L6.75 9.19 5.28 7.72a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l4.5-4.5z" />
    </svg> Done
  </div>
);

const StatusInProgress = () => (
  <div style={{ 
    display: "inline-flex",
    alignItems: "center", 
    color: "#0969da",
    fontSize: "11px", // 30% smaller text
    width: "85px", // Fixed width for all status indicators
    fontWeight: "500",
    whiteSpace: "nowrap"
  }}>
    <svg width="16" height="16" viewBox="0 0 16 16" style={{ marginRight: "4px" }}>
      <path fill="#0969da" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.25-11.25v4.5L12 12l-.75.664-3.5-3.5V4.75z" />
    </svg> In Progress
  </div>
);

const StatusPlanned = () => (
  <div style={{ 
    display: "inline-flex",
    alignItems: "center", 
    color: "#9a6700",
    fontSize: "11px", // 30% smaller text
    width: "85px", // Fixed width for all status indicators
    fontWeight: "500",
    whiteSpace: "nowrap"
  }}>
    <svg width="16" height="16" viewBox="0 0 16 16" style={{ marginRight: "4px" }}>
      <path fill="#9a6700" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm2-4.25a.75.75 0 0 1-1.5 0v-1.5h-1.5a.75.75 0 0 1 0-1.5h1.5v-1.5a.75.75 0 0 1 1.5 0v1.5h1.5a.75.75 0 0 1 0 1.5h-1.5z" />
    </svg> Planned
  </div>
);

function ProjectStatusHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">Project Status</h1>
        <p className="hero__subtitle">Current development status of IntstelForce components</p>
      </div>
    </header>
  );
}

export default function ProjectStatus() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Project Status"
      description="IntstelForce Project Status - Current development progress and roadmap">
      <ProjectStatusHeader />
      <main>
        <div className="container margin-top--lg">
          <div className="row">
            <div className="col col--10 col--offset-1">
              <h2>Current Project Status</h2>
              <p>
                This page provides a comprehensive overview of the current development status 
                of all IntstelForce Project components.
              </p>
              
              <div className="margin-bottom--lg" style={{
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap',
                padding: '16px',
                backgroundColor: '#f6f8fa',
                borderRadius: '8px',
              }}>
                <StatusDone />
                <StatusInProgress />
                <StatusPlanned />
              </div>

              <h3>Foundation Components</h3>
              <table style={statusStyles.tableStyles}>
                <thead style={statusStyles.tableHeader}>
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

              <h3>Core Technology Components</h3>
              <table style={statusStyles.tableStyles}>
                <thead style={statusStyles.tableHeader}>
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

              <h3>Supporting Systems</h3>
              <table style={statusStyles.tableStyles}>
                <thead style={statusStyles.tableHeader}>
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

              <h3>Supplementary Documentation</h3>
              <table style={statusStyles.tableStyles}>
                <thead style={statusStyles.tableHeader}>
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

              <h3>Strategic Roadmap</h3>
              <p>
                Our current development focus prioritizes core infrastructure and fundamental
                technologies that will enable more advanced systems in future development phases.
                This approach ensures we build a solid foundation before moving to more 
                speculative technologies.
              </p>
              
              <h4>Development Phases</h4>
              <table style={statusStyles.tableStyles}>
                <thead style={statusStyles.tableHeader}>
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
                      <ul style={{margin: 0, paddingLeft: '20px'}}>
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
                      <ul style={{margin: 0, paddingLeft: '20px'}}>
                        <li>Quantum vacuum prototype</li>
                        <li>Energy efficiency validation</li>
                        <li>Small-scale propulsion test</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>Phase 3: Integration & Systems Testing</td>
                    <td>Development of integrated propulsion, navigation, and support systems</td>
                    <td><StatusPlanned /></td>
                    <td>
                      <ul style={{margin: 0, paddingLeft: '20px'}}>
                        <li>Systems integration framework</li>
                        <li>Human-machine interface development</li>
                        <li>Quantum shielding implementation</li>
                        <li>Communication systems integration</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>Phase 4: Prototype Vehicle Development</td>
                    <td>Construction of full-scale prototype craft with complete systems</td>
                    <td><StatusPlanned /></td>
                    <td>
                      <ul style={{margin: 0, paddingLeft: '20px'}}>
                        <li>Propulsion system assembly</li>
                        <li>Navigation system deployment</li>
                        <li>Life support system implementation</li>
                        <li>Telepathic interface integration</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>Phase 5: Operational Implementation</td>
                    <td>Final refinement, crew training, and mission preparation</td>
                    <td><StatusPlanned /></td>
                    <td>
                      <ul style={{margin: 0, paddingLeft: '20px'}}>
                        <li>Crew selection and training</li>
                        <li>Mission protocol development</li>
                        <li>Interstellar communication establishment</li>
                        <li>Launch preparation</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
              
              <h4>Technology Development Tracks</h4>
              <table style={statusStyles.tableStyles}>
                <thead style={statusStyles.tableHeader}>
                  <tr>
                    <th>Technology Track</th>
                    <th>Current Focus</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Quantum Propulsion</td>
                    <td>Quantum Drive Core development and Gravitational Wave Manipulation</td>
                    <td><StatusInProgress /></td>
                  </tr>
                  <tr>
                    <td>Energy Systems</td>
                    <td>Quantum Vacuum Energy Harvesting and Antimatter Reaction Chamber</td>
                    <td><StatusInProgress /></td>
                  </tr>
                  <tr>
                    <td>Navigation Systems</td>
                    <td>Quantum Field Sensors and Spatial Frequency Mapping</td>
                    <td><StatusInProgress /></td>
                  </tr>
                  <tr>
                    <td>Communication Systems</td>
                    <td>Quantum Communication Networks and Schumann Resonance Carrier</td>
                    <td><StatusInProgress /></td>
                  </tr>
                  <tr>
                    <td>Human Integration</td>
                    <td>Neural Interface Technology and Telepathic Control Systems</td>
                    <td><StatusPlanned /></td>
                  </tr>
                  <tr>
                    <td>Support Systems</td>
                    <td>Self-healing materials and Quantum Shielding Technology</td>
                    <td><StatusPlanned /></td>
                  </tr>
                </tbody>
              </table>
              
              <h4>Research Priorities</h4>
              <table style={statusStyles.tableStyles}>
                <thead style={statusStyles.tableHeader}>
                  <tr>
                    <th>Research Area</th>
                    <th>Key Objectives</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Quantum Field Manipulation</td>
                    <td>Increasing efficiency of energy extraction from quantum vacuum</td>
                    <td><StatusInProgress /></td>
                  </tr>
                  <tr>
                    <td>Consciousness-Technology Interface</td>
                    <td>Development of direct neural feedback systems for craft control</td>
                    <td><StatusPlanned /></td>
                  </tr>
                  <tr>
                    <td>Interstellar Navigation</td>
                    <td>Mapping of quantum field disturbances for precision navigation</td>
                    <td><StatusInProgress /></td>
                  </tr>
                  <tr>
                    <td>Legal & Regulatory Framework</td>
                    <td>Development of governance structures for quantum technology</td>
                    <td><StatusPlanned /></td>
                  </tr>
                </tbody>
              </table>
              
              <p>
                The project team meets weekly to assess progress and adjust priorities as needed.
                This status board is updated after each major milestone completion.
              </p>
              
              <h3>Upcoming Milestones and Timeline</h3>
              <p>
                The following Gantt chart provides an overview of our near-term milestones 
                and their expected timelines. This visual representation helps track progress
                and dependencies between key project tasks.
              </p>
              
              <ProjectTimeline />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

function ProjectTimeline() {
  // Task data array with more detailed information
  const projectTasks = [
    { 
      id: 1,
      name: "Project Requirements Specification", 
      start: 0, 
      duration: 10, 
      status: "done",
      description: "Defining core project requirements and specifications",
      completion: 100,
      owner: "Stan Zemskoff"
    },
    { 
      id: 2,
      name: "Theoretical Model Refinement", 
      start: 5, 
      duration: 25, 
      status: "in-progress",
      description: "Refining mathematical models for quantum field manipulation",
      completion: 60,
      owner: "Stan Zemskoff"
    },
    { 
      id: 3,
      name: "Quantum Field Simulation", 
      start: 10, 
      duration: 20, 
      status: "in-progress",
      description: "Computer simulation of quantum field effects at macro scale",
      completion: 45,
      owner: "Stan Zemskoff"
    },
    { 
      id: 4,
      name: "Initial Framework Architecture", 
      start: 0, 
      duration: 15, 
      status: "done",
      description: "Establishing foundational architecture for quantum systems",
      completion: 100,
      owner: "Stan Zemskoff"
    },
    { 
      id: 5,
      name: "Telepathic Interface Research", 
      start: 0, 
      duration: 15, 
      status: "done",
      description: "Development of mind-machine interface for intuitive control",
      completion: 100,
      owner: "Stan Zemskoff"
    },
    { 
      id: 6,
      name: "Documentation Framework Setup", 
      start: 5, 
      duration: 10, 
      status: "done",
      description: "Implementation of Docusaurus for technical documentation",
      completion: 100,
      owner: "Stan Zemskoff"
    },
    { 
      id: 7,
      name: "Small-scale Prototype Development", 
      start: 25, 
      duration: 30, 
      status: "planned",
      description: "Building initial laboratory-scale prototypes",
      completion: 0,
      owner: "Stan Zemskoff"
    },
    { 
      id: 8,
      name: "Communication Systems Integration", 
      start: 35, 
      duration: 25, 
      status: "planned",
      description: "Integrating quantum entanglement-based communication",
      completion: 0,
      owner: "Stan Zemskoff"
    },
    { 
      id: 9,
      name: "Quantum Drive Core Assembly", 
      start: 45, 
      duration: 25, 
      status: "planned",
      description: "Assembly of the primary propulsion core components",
      completion: 0,
      owner: "Stan Zemskoff"
    },
    { 
      id: 10,
      name: "Initial System Integration Tests", 
      start: 60, 
      duration: 20, 
      status: "planned",
      description: "Testing integrated systems in controlled environment",
      completion: 0,
      owner: "Stan Zemskoff"
    }
  ];

  // State for tracking which task detail is visible
  const [selectedTask, setSelectedTask] = React.useState(null);
  
  // Handle click on a task bar
  const handleTaskClick = (taskId) => {
    if (selectedTask === taskId) {
      setSelectedTask(null); // Close if already open
    } else {
      setSelectedTask(taskId); // Open the clicked task
    }
  };

  return (
    <div className="container margin-top--md">
      <h2>Project Timeline Gantt Chart</h2>
      <p>This interactive chart provides a visual representation of key project milestones and their estimated timelines.</p>
      
      <div style={{ 
        marginTop: "20px", 
        marginBottom: "40px",
        position: "relative",
        overflowX: "auto" // Enable horizontal scrolling for mobile
      }}>
        {/* Timeline header */}
        <div style={{ 
          display: "flex", 
          marginBottom: "20px",
          minWidth: "900px" // Ensure minimum width for scrolling
        }}>
          <div style={{ width: "180px" }}></div>
          <div style={{ flex: 1, display: "flex" }}>
            <div style={{ flex: 1, textAlign: "center", fontWeight: "bold" }}>Q2 2025</div>
            <div style={{ flex: 1, textAlign: "center", fontWeight: "bold" }}>Q3 2025</div>
            <div style={{ flex: 1, textAlign: "center", fontWeight: "bold" }}>Q4 2025</div>
            <div style={{ flex: 1, textAlign: "center", fontWeight: "bold" }}>Q1 2026</div>
            <div style={{ flex: 1, textAlign: "center", fontWeight: "bold" }}>Q2 2026</div>
          </div>
        </div>
        
        {/* Month markers */}
        <div style={{ 
          display: "flex",
          marginBottom: "10px",
          borderBottom: "1px solid #ddd",
          minWidth: "900px"
        }}>
          <div style={{ width: "180px" }}></div>
          <div style={{ 
            flex: 1, 
            display: "flex", 
            position: "relative",
            height: "20px"
          }}>
            {/* Background grid lines */}
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} style={{
                position: "absolute",
                left: `${(i + 1) * (100 / 15)}%`,
                height: "100%",
                borderLeft: "1px dashed #ddd",
                top: 0,
                bottom: 0,
                zIndex: 1
              }} />
            ))}
            {/* Month labels */}
            {["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month, i) => (
              <div key={i} style={{
                position: "absolute",
                left: `${i * (100 / 15) + (100 / 30)}%`,
                fontSize: "11px",
                color: "#666"
              }}>
                {month}
              </div>
            ))}
          </div>
        </div>
        
        {/* Task bars */}
        <div style={{ minWidth: "900px" }}>
          {projectTasks.map((task) => (
            <div key={task.id}>
              <div 
                style={{ 
                  display: "flex", 
                  marginBottom: "10px", 
                  alignItems: "center",
                  cursor: "pointer",
                  backgroundColor: selectedTask === task.id ? "rgba(0,0,0,0.03)" : "transparent",
                  padding: "5px 0",
                  borderRadius: "4px"
                }}
                onClick={() => handleTaskClick(task.id)}
              >
                <div style={{ 
                  width: "180px", 
                  flexShrink: 0, 
                  display: "flex", 
                  alignItems: "center",
                  paddingLeft: "10px"
                }}>
                  <div style={{ marginRight: "5px" }}>
                    {task.status === "done" && <StatusDone />}
                    {task.status === "in-progress" && <StatusInProgress />}
                    {task.status === "planned" && <StatusPlanned />}
                  </div>
                  <div style={{ 
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontSize: "12px",
                    fontWeight: "500",
                    flex: 1
                  }}>
                    {task.name}
                  </div>
                </div>
                <div style={{ flex: 1, position: "relative", height: "30px" }}>
                  {/* Task bar */}
                  <div
                    style={{
                      position: "absolute",
                      left: `${task.start}%`,
                      width: `${task.duration}%`,
                      height: "100%",
                      backgroundColor: 
                        task.status === "done" ? "rgba(76, 175, 80, 0.2)" :
                        task.status === "in-progress" ? "rgba(33, 150, 243, 0.2)" :
                        "rgba(255, 152, 0, 0.2)",
                      borderRadius: "4px",
                      borderLeft: `4px solid ${
                        task.status === "done" ? "#4caf50" :
                        task.status === "in-progress" ? "#2196f3" :
                        "#ff9800"
                      }`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s ease",
                      overflow: "hidden"
                    }}
                  >
                    {/* Progress bar for in-progress tasks */}
                    {task.status === "in-progress" && (
                      <div style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: `${task.completion}%`,
                        backgroundColor: "rgba(33, 150, 243, 0.4)",
                        zIndex: 1
                      }} />
                    )}
                  </div>
                </div>
              </div>
              
              {/* Task details panel - shown when selected */}
              {selectedTask === task.id && (
                <div style={{
                  backgroundColor: "#f8f9fa",
                  padding: "15px",
                  marginBottom: "15px",
                  borderRadius: "4px",
                  marginLeft: "10px",
                  marginRight: "10px",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                  border: "1px solid #e9ecef",
                  transition: "all 0.3s ease",
                  animation: "fadeIn 0.3s"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                    <h3 style={{ margin: 0, fontSize: "16px" }}>{task.name}</h3>
                    <div>
                      <span style={{
                        display: "inline-block",
                        padding: "3px 8px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        fontWeight: "bold",
                        backgroundColor: 
                          task.status === "done" ? "#e8f5e9" :
                          task.status === "in-progress" ? "#e3f2fd" :
                          "#fff3e0",
                        color:
                          task.status === "done" ? "#2e7d32" :
                          task.status === "in-progress" ? "#1565c0" :
                          "#e65100"
                      }}>
                        {task.status === "done" ? "Completed" : 
                         task.status === "in-progress" ? "In Progress" : "Planned"}
                      </span>
                    </div>
                  </div>
                  
                  <p style={{ margin: "8px 0", fontSize: "14px" }}>{task.description}</p>
                  
                  <div style={{ display: "flex", marginTop: "15px", fontSize: "13px" }}>
                    <div style={{ marginRight: "20px" }}>
                      <strong>Owner:</strong> {task.owner}
                    </div>
                    {task.status === "in-progress" && (
                      <div>
                        <strong>Completion:</strong> {task.completion}%
                        <div style={{ 
                          width: "100px", 
                          height: "8px", 
                          backgroundColor: "#e0e0e0", 
                          borderRadius: "4px",
                          marginTop: "5px",
                          display: "inline-block",
                          marginLeft: "8px",
                          overflow: "hidden"
                        }}>
                          <div style={{
                            width: `${task.completion}%`,
                            height: "100%",
                            backgroundColor: "#2196f3",
                            borderRadius: "4px"
                          }} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="alert alert--info" role="alert">
        <p>
          <strong>Note:</strong> Timeline estimates may be adjusted based on research breakthroughs 
          and development challenges. Click on any task bar to see detailed information.
        </p>
      </div>
      
      {/* CSS for animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
} 