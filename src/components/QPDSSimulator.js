import React, { useState, useRef, useEffect } from 'react';
import styles from './QPDSSimulator.module.css';

export default function QPDSSimulator() {
  const [environment, setEnvironment] = useState('TUNNEL');
  const [duration, setDuration] = useState(60);
  const [sensorNoise, setSensorNoise] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState(null);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef(null);

  const environments = {
    SURFACE: { label: 'Harbor/Surface', noiseRange: [5, 8], quality: 0.95 },
    UNDERWATER: { label: 'Underwater', noiseRange: [15, 20], quality: 0.85 },
    UNDERGROUND: { label: 'Underground/Tunnel', noiseRange: [10, 15], quality: 0.75 },
    URBAN: { label: 'Urban Canyon', noiseRange: [10, 15], quality: 0.70 },
  };

  // Simplified simulation algorithm (JavaScript version)
  const runSimulation = async () => {
    setIsRunning(true);
    setProgress(0);
    setResults(null);

    // Simulate computation with progress updates
    const measurements = [];
    const updateRate = 10; // Hz
    const numUpdates = Math.floor(duration * updateRate);
    let cumulativeError = 0;
    let maxError = 0;
    let minError = Infinity;

    for (let i = 0; i < numUpdates; i++) {
      // Simulate measurement with decreasing accuracy over time
      const timeRatio = i / numUpdates;
      const baseDrift = timeRatio * 5; // Drift increases over time
      const sensorError = (Math.random() - 0.5) * sensorNoise;
      const thermalError = Math.sin(timeRatio * Math.PI * 2) * 2; // Thermal cycles
      const totalError = Math.sqrt(
        Math.pow(baseDrift + sensorError + thermalError, 2)
      );

      cumulativeError += totalError;
      maxError = Math.max(maxError, totalError);
      minError = Math.min(minError, totalError);

      measurements.push({
        timestamp: (i / updateRate).toFixed(2),
        error: totalError.toFixed(2),
      });

      // Update progress
      setProgress(Math.floor((i / numUpdates) * 100));

      // Allow UI to update
      if (i % 10 === 0) {
        await new Promise((resolve) => setTimeout(resolve, 10));
      }
    }

    const meanError = (cumulativeError / numUpdates).toFixed(2);

    const simulationResults = {
      scenario: `${environments[environment].label} - ${duration}s`,
      duration,
      environment,
      measurements_count: numUpdates,
      mean_position_error_m: parseFloat(meanError),
      max_position_error_m: maxError.toFixed(2),
      min_position_error_m: minError.toFixed(2),
      measurements: measurements.slice(0, Math.min(100, measurements.length)), // Store first 100 for display
    };

    setResults(simulationResults);
    setProgress(100);
    setIsRunning(false);

    // Draw chart
    drawChart(measurements);
  };

  const drawChart = (measurements) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;

    // Clear canvas
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, width, height);

    // Find max error for scaling
    const maxErr = Math.max(...measurements.map((m) => parseFloat(m.error)));

    // Draw axes
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(padding, padding);
    ctx.stroke();

    // Draw axis labels
    ctx.fillStyle = '#666';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Time (s)', width / 2, height - 10);
    ctx.save();
    ctx.translate(15, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Position Error (m)', 0, 0);
    ctx.restore();

    // Draw data points
    ctx.strokeStyle = '#1565c0';
    ctx.lineWidth = 2;
    ctx.beginPath();

    measurements.forEach((m, i) => {
      const x = padding + ((i / measurements.length) * (width - 2 * padding));
      const y = height - padding - ((parseFloat(m.error) / maxErr) * (height - 2 * padding));

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw grid
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      const y = height - padding - ((i / 10) * (height - 2 * padding));
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.controlPanel}>
        <h3>QPDS Simulation Controls</h3>

        <div className={styles.control}>
          <label>Environment:</label>
          <select
            value={environment}
            onChange={(e) => setEnvironment(e.target.value)}
            disabled={isRunning}
          >
            {Object.entries(environments).map(([key, val]) => (
              <option key={key} value={key}>
                {val.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.control}>
          <label>Duration (seconds): {duration}s</label>
          <input
            type="range"
            min="10"
            max="300"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            disabled={isRunning}
          />
        </div>

        <div className={styles.control}>
          <label>Sensor Noise Level: {sensorNoise} pT</label>
          <input
            type="range"
            min="5"
            max="30"
            value={sensorNoise}
            onChange={(e) => setSensorNoise(parseInt(e.target.value))}
            disabled={isRunning}
          />
        </div>

        <button
          className={styles.runButton}
          onClick={runSimulation}
          disabled={isRunning}
        >
          {isRunning ? `Running... ${progress}%` : 'Run Simulation'}
        </button>

        {isRunning && (
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </div>

      {results && (
        <div className={styles.results}>
          <h3>Simulation Results</h3>
          <div className={styles.resultGrid}>
            <div className={styles.resultItem}>
              <span className={styles.label}>Scenario:</span>
              <span className={styles.value}>{results.scenario}</span>
            </div>
            <div className={styles.resultItem}>
              <span className={styles.label}>Measurements:</span>
              <span className={styles.value}>{results.measurements_count}</span>
            </div>
            <div className={styles.resultItem}>
              <span className={styles.label}>Mean Error:</span>
              <span className={styles.value}>
                {results.mean_position_error_m.toFixed(2)} m
              </span>
            </div>
            <div className={styles.resultItem}>
              <span className={styles.label}>Max Error:</span>
              <span className={styles.value}>{results.max_position_error_m} m</span>
            </div>
            <div className={styles.resultItem}>
              <span className={styles.label}>Min Error:</span>
              <span className={styles.value}>{results.min_position_error_m} m</span>
            </div>
          </div>

          <div className={styles.chartContainer}>
            <h4>Position Error Over Time</h4>
            <canvas ref={canvasRef} width={600} height={300}></canvas>
          </div>

          <div className={styles.dataTable}>
            <h4>Sample Measurements (first 10)</h4>
            <table>
              <thead>
                <tr>
                  <th>Time (s)</th>
                  <th>Error (m)</th>
                </tr>
              </thead>
              <tbody>
                {results.measurements.slice(0, 10).map((m, i) => (
                  <tr key={i}>
                    <td>{m.timestamp}</td>
                    <td>{m.error}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
