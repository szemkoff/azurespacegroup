import React from 'react';
import styles from './styles.module.css';

export function QuantumVisualization() {
  return (
    <div className={styles.visualizationContainer} style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '30px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      margin: '30px 0'
    }}>
      <h2 style={{
        color: '#333',
        textAlign: 'center',
        padding: '10px 0 20px',
        margin: '0 0 30px 0',
        borderBottom: '2px solid #eee',
        fontSize: '24px',
        lineHeight: '1.4'
      }}>
        Quantum Propulsion System Components
      </h2>
      
      <div style={{
        margin: '20px 0 40px',
        padding: '10px'
      }}>
        <iframe 
          src="/Azure Space Group/img/diagrams/quantum-research-fig1-system-components.svg" 
          width="100%" 
          height="650px" 
          frameBorder="0"
          title="SVG Visualization of Quantum Propulsion System Components"
          style={{
            maxWidth: '100%',
            display: 'block',
            margin: '0 auto'
          }}
        />
      </div>
      
      <div style={{
        marginTop: '30px',
        textAlign: 'center',
        color: '#666',
        fontStyle: 'italic',
        fontSize: '16px',
        lineHeight: '1.6',
        padding: '15px',
        backgroundColor: '#f9f9f9',
        border: '1px solid #eee',
        borderRadius: '4px'
      }}>
        Figure 1: Cross-section view of the primary quantum propulsion system components.
      </div>
    </div>
  );
}

export default QuantumVisualization; 