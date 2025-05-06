import React from 'react';
import MermaidChart from '../components/MermaidChart';

function MasterGanttChart() {
  return (
    <>
      <h3 className="sectionTitle">Master Team Development Roadmap</h3>
      <p>
        The following comprehensive Gantt chart outlines our master team development timeline, 
        showing how all project components and activities will progress across every technology track and phase.
      </p>

      <div className="mermaidVisualization">
        <MermaidChart chart={`
gantt
  title Azure Space Group Master Team Gantt Chart
  dateFormat YYYY
  axisFormat %Y
  
  section Core Research
  Theoretical Validation :crit, done, 2023, 2y
  Quantum Field Modeling :active, 2024, 3y
  Quantum Field Interface Development :2024, 3y
  Nested Coherence Field Architecture :2024, 4y
  System Dissection Documentation :done, 2025, 1y
  Theoretical Revision - Time Tacking :done, 2025, 1y
  
  section Prototype Development
  QEINU (Quantum-Enhanced Inertial Navigation Unit) :active, 2025, 2y
  QFMT (Quantum Field Modulation Testbed) :2025, 2y
  ESPOC (Energy System Proof-of-Concept) :2025, 2y
  SFMD (Spatial Frequency Mapping Device) :2025, 2y
  Full Prototype Integration :2026, 3y
  
  section System Integration
  Phase 1: Validate Core Systems in Isolation :active, 2025, 2y
  Phase 2: Harmonic Integration Testing :2026, 2y
  Phase 3: Shield & Shape for Field Deployment :2027, 2y
  Diamond Lattice Phonon Insulator Development :2025, 2y
  Quantum-Locked Navigation Integration :2026, 2y
  Photonic CPU Mesh Architecture :2025, 3y
  
  section Vehicle Development
  Near-Term: Quantum Geophysical Navigation :active, 2025, 2y
  Medium-Term: Quantum Inertial Systems :2026, 2y
  Small-Scale Test Vehicles :2026, 4y
  Four-Seater Manned Vehicle :2028, 5y
  High-Capacity Transport :2033, 5y
  Interstellar Transport :2038, 5y
  
  section Energy Systems
  Quantum Vacuum Energy Harvesting :active, 2024, 3y
  Antimatter Reaction Chamber Design :2025, 3y
  Quantum-Classical Interface Converters :2026, 2y
  Quantum Battery Prototype :active, 2025, 2y
  Gravitational Potential Energy Harvesters :2026, 3y
  
  section Communication & Control
  Quantum Entanglement Network :active, 2024, 3y
  Optical/RF Hybrid Systems :2025, 2y
  Entanglement-Based Packet Transfer :2025, 3y
  Thermal Management Systems :active, 2024, 3y
  Oscillation Regulation Framework :2024, 3y
  Harmonics Dampening Technology :2025, 2y
  
  section Human Integration
  Augmented Cognitive Interfaces :active, 2025, 2y
  Neural Interface Command Center :2026, 3y
  Telepathic Control Systems :2027, 4y
  Crew Training Protocols :2028, 3y
  
  section Commercialization
  Strategic Partnerships :active, 2024, 6y
  Tokenization Strategy Implementation :active, 2025, 2y
  Game-Based Research Platform :active, 2025, 3y
  Satellite Launch Operations :2028, 10y
  Space Tourism Infrastructure :2033, 10y
  Industrial Mining Operations :2033, 10y
  Interstellar Exploration :2038, 10y
        `}/>
      </div>

      <div className="roadmapDisclaimer">
        <p>
          <strong>Note:</strong> This comprehensive master timeline integrates all project activities across every technology track and development phase. Timeline projections are based on current research progress and funding projections. Actual implementation dates may vary based on technological breakthroughs, research discoveries, and investment milestones.
        </p>
      </div>
    </>
  );
}

export default MasterGanttChart; 