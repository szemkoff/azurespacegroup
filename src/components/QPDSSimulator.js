import React, { useState, useRef, useEffect } from 'react';
import styles from './QPDSSimulator.module.css';

export default function QPDSSimulator() {
  const [environment, setEnvironment] = useState('UNDERGROUND');
  const [duration, setDuration] = useState(60);
  const [sensorNoise, setSensorNoise] = useState(10);
  const [updateRate, setUpdateRate] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState(null);
  const [progress, setProgress] = useState(0);
  const [simTime, setSimTime] = useState(0);
  const canvasRef = useRef(null);
  const [activeTab, setActiveTab] = useState('controls');

  const environments = {
    SURFACE: {
      label: 'Harbor/Surface',
      noiseRange: [5, 8],
      quality: 0.95,
      insDrift: 0.001,
      description: 'GPS-available surface navigation with minimal interference'
    },
    UNDERWATER: {
      label: 'Underwater',
      noiseRange: [15, 20],
      quality: 0.85,
      insDrift: 0.01,
      description: 'Submarine/underwater vehicle navigation (50m depth)'
    },
    UNDERGROUND: {
      label: 'Underground/Tunnel',
      noiseRange: [10, 15],
      quality: 0.75,
      insDrift: 0.005,
      description: 'Mine or tunnel navigation with signal degradation'
    },
    URBAN: {
      label: 'Urban Canyon',
      noiseRange: [10, 15],
      quality: 0.70,
      insDrift: 0.008,
      description: 'Dense urban environment with multipath errors'
    },
  };

  // Improved Kalman Filter implementation
  class KalmanFilter {
    constructor(processNoise = 0.01, measurementNoise = 10.0) {
      this.Q = processNoise; // Process noise
      this.R = measurementNoise; // Measurement noise
      this.x = 0; // State (position error)
      this.P = 100; // Estimation error covariance
      this.dt = 0.1; // Time step
    }

    predict(velocity = 0) {
      // Predict state (position increases with velocity)
      this.x += velocity * this.dt;
      // Predict covariance (uncertainty grows)
      this.P += this.Q;
      return this.x;
    }

    update(measurement) {
      // Calculate Kalman gain
      const S = this.P + this.R;
      const K = this.P / S;
      // Update state estimate
      this.x = this.x + K * (measurement - this.x);
      // Update covariance
      this.P = (1 - K) * this.P;
      return this.x;
    }
  }

  // Comprehensive simulation algorithm
  const runSimulation = async () => {
    setIsRunning(true);
    setProgress(0);
    setResults(null);
    setActiveTab('progress');

    const env = environments[environment];
    const measurements = [];
    const numUpdates = Math.floor(duration * updateRate);
    const dt = 1 / updateRate;

    let totalError = 0;
    let maxError = 0;
    let minError = Infinity;
    const kf = new KalmanFilter(0.001, sensorNoise);

    // Geophysical signature variations
    const magneticFieldBase = 48000; // nanoTeslas
    const gravityBase = 9.81 * 1e5; // mGal

    for (let i = 0; i < numUpdates; i++) {
      const t = (i / updateRate);
      const timeRatio = i / numUpdates;

      // More realistic error model
      const thermalDrift = 0.5 * Math.sin((t / 10) * Math.PI * 2); // Slow thermal cycles
      const magneticVariation = 2 * Math.sin((t / 30) * Math.PI * 2); // Diurnal variation
      const gravityAnomaly = 0.3 * Math.sin((t / 20) * Math.PI * 2); // Local anomalies

      // INS drift accumulation
      const insDrift = env.insDrift * timeRatio * 100; // Grows linearly

      // Sensor noise (gaussian-like)
      const sensorError = (Math.random() - 0.5) * sensorNoise * 2;

      // Measurement from geophysical database (with noise)
      const magneticMeasurement = magneticFieldBase + magneticVariation + sensorError;
      const gravityMeasurement = gravityBase + gravityAnomaly + sensorError;

      // Map-matching error (simulates finding position from signatures)
      const mapMatchingError = Math.abs(magneticVariation - magneticMeasurement) / 100;

      // Kalman filter prediction and update
      kf.predict(insDrift);
      const estimatedError = kf.update(mapMatchingError);

      // Total position error
      const totalPositionError = Math.sqrt(
        Math.pow(insDrift, 2) +
        Math.pow(thermalDrift, 2) +
        Math.pow(estimatedError, 2)
      );

      totalError += totalPositionError;
      maxError = Math.max(maxError, totalPositionError);
      minError = Math.min(minError, totalPositionError);

      measurements.push({
        timestamp: t.toFixed(2),
        error: totalPositionError.toFixed(2),
        insError: insDrift.toFixed(2),
        sensorError: sensorError.toFixed(2),
        magneticField: magneticMeasurement.toFixed(0),
        gravity: gravityMeasurement.toFixed(2),
        kalmanEstimate: estimatedError.toFixed(3),
      });

      // Update progress - more granular
      const newProgress = Math.floor((i / numUpdates) * 95); // Leave 5% for finalization
      setProgress(newProgress);
      setSimTime(t.toFixed(1));

      // Non-blocking updates every 10 iterations
      if (i % 10 === 0) {
        await new Promise((resolve) => setTimeout(resolve, 5));
      }
    }

    // Calculate statistics
    const meanError = (totalError / numUpdates).toFixed(2);
    const stdDev = calculateStdDev(measurements.map(m => parseFloat(m.error)));
    const cep = parseFloat(meanError) * 1.25; // Circular Error Probable (rough estimate)

    const simulationResults = {
      scenario: `${env.label} - ${duration}s`,
      environment,
      duration,
      updateRate,
      measurements_count: numUpdates,
      mean_position_error_m: parseFloat(meanError),
      max_position_error_m: parseFloat(maxError.toFixed(2)),
      min_position_error_m: parseFloat(minError.toFixed(2)),
      std_dev_m: stdDev,
      cep_m: cep.toFixed(2),
      measurements: measurements,
      environmentInfo: env.description,
    };

    setResults(simulationResults);
    setProgress(100);
    setSimTime(duration.toFixed(1));
    setActiveTab('results');
    setIsRunning(false);

    // Draw comprehensive charts
    drawCharts(measurements, simulationResults);
  };

  const calculateStdDev = (values) => {
    if (values.length === 0) return 0;
    const mean = values.reduce((a, b) => a + b) / values.length;
    const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2)) / values.length;
    return Math.sqrt(variance).toFixed(2);
  };

  const drawCharts = (measurements, results) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const padding = 50;

    // Clear canvas
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, width, height);

    // Get data ranges
    const errors = measurements.map(m => parseFloat(m.error));
    const maxErr = Math.max(...errors);
    const times = measurements.map(m => parseFloat(m.timestamp));

    // Draw title
    ctx.fillStyle = '#1565c0';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Position Error Over Time', padding, 20);

    // Draw axes
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding); // X-axis
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(padding, padding); // Y-axis
    ctx.stroke();

    // Draw axis labels
    ctx.fillStyle = '#666';
    ctx.font = '11px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Time (seconds)', width / 2, height - 15);

    ctx.save();
    ctx.translate(15, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Position Error (meters)', 0, 0);
    ctx.restore();

    // Draw grid lines
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      const y = height - padding - ((i / 10) * (height - 2 * padding));
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();

      // Y-axis labels
      ctx.fillStyle = '#999';
      ctx.font = '10px Arial';
      ctx.textAlign = 'right';
      ctx.fillText((maxErr * (i / 10)).toFixed(0) + 'm', padding - 10, y + 3);
    }

    // Draw main error line
    ctx.strokeStyle = '#1565c0';
    ctx.lineWidth = 2.5;
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

    // Draw mean error line
    ctx.strokeStyle = '#ff9800';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    const meanY = height - padding - ((results.mean_position_error_m / maxErr) * (height - 2 * padding));
    ctx.beginPath();
    ctx.moveTo(padding, meanY);
    ctx.lineTo(width - padding, meanY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw legend
    ctx.font = '10px Arial';
    ctx.fillStyle = '#1565c0';
    ctx.fillRect(width - 180, padding + 10, 10, 10);
    ctx.fillStyle = '#333';
    ctx.textAlign = 'left';
    ctx.fillText('Position Error', width - 165, padding + 18);

    ctx.fillStyle = '#ff9800';
    ctx.fillRect(width - 180, padding + 30, 10, 10);
    ctx.fillStyle = '#333';
    ctx.fillText(`Mean: ${results.mean_position_error_m}m`, width - 165, padding + 38);
  };

  const exportData = () => {
    if (!results) return;
    const json = JSON.stringify(results, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qpds-simulation-${new Date().toISOString()}.json`;
    a.click();
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${activeTab === 'controls' ? styles.active : ''}`}
          onClick={() => setActiveTab('controls')}
        >
          ⚙️ Controls
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'progress' ? styles.active : ''}`}
          onClick={() => activeTab === 'progress' || setActiveTab('progress')}
          disabled={!isRunning && !results}
        >
          📊 Progress / Results
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'data' ? styles.active : ''}`}
          onClick={() => setActiveTab('data')}
          disabled={!results}
        >
          📋 Data
        </button>
      </div>

      {activeTab === 'controls' && (
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
            <small className={styles.hint}>{environments[environment].description}</small>
          </div>

          <div className={styles.control}>
            <label>Duration (seconds): {duration}s</label>
            <input
              type="range"
              min="10"
              max="600"
              step="10"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              disabled={isRunning}
            />
          </div>

          <div className={styles.control}>
            <label>Update Rate (Hz): {updateRate} Hz</label>
            <input
              type="range"
              min="1"
              max="50"
              value={updateRate}
              onChange={(e) => setUpdateRate(parseInt(e.target.value))}
              disabled={isRunning}
            />
            <small className={styles.hint}>Higher rates = more measurements but slower simulation</small>
          </div>

          <div className={styles.control}>
            <label>Sensor Noise Level: {sensorNoise} pT</label>
            <input
              type="range"
              min="1"
              max="50"
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
            {isRunning ? `Running... (${simTime}s / ${duration}s)` : '▶️ Run Simulation'}
          </button>
        </div>
      )}

      {(isRunning || results) && activeTab === 'progress' && (
        <div className={styles.progressSection}>
          {isRunning && (
            <>
              <div className={styles.progressHeader}>
                <h3>🔄 Simulation in Progress</h3>
                <span className={styles.progressPercent}>{progress}%</span>
              </div>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className={styles.simStatus}>
                Simulated Time: <strong>{simTime}s / {duration}s</strong>
              </div>
            </>
          )}

          {results && !isRunning && (
            <div className={styles.results}>
              <h3>✅ Simulation Complete</h3>
              <div className={styles.resultGrid}>
                <div className={styles.resultItem}>
                  <span className={styles.label}>Environment</span>
                  <span className={styles.value}>{results.scenario.split(' - ')[0]}</span>
                </div>
                <div className={styles.resultItem}>
                  <span className={styles.label}>Total Measurements</span>
                  <span className={styles.value}>{results.measurements_count}</span>
                </div>
                <div className={styles.resultItem}>
                  <span className={styles.label}>Mean Error</span>
                  <span className={styles.value}>{results.mean_position_error_m} m</span>
                </div>
                <div className={styles.resultItem}>
                  <span className={styles.label}>Max Error</span>
                  <span className={styles.value}>{results.max_position_error_m} m</span>
                </div>
                <div className={styles.resultItem}>
                  <span className={styles.label}>Min Error</span>
                  <span className={styles.value}>{results.min_position_error_m} m</span>
                </div>
                <div className={styles.resultItem}>
                  <span className={styles.label}>Std Dev</span>
                  <span className={styles.value}>{results.std_dev_m} m</span>
                </div>
                <div className={styles.resultItem}>
                  <span className={styles.label}>CEP (Circular Error Probable)</span>
                  <span className={styles.value}>{results.cep_m} m</span>
                </div>
                <div className={styles.resultItem}>
                  <span className={styles.label}>Update Rate</span>
                  <span className={styles.value}>{results.updateRate} Hz</span>
                </div>
              </div>

              <div className={styles.chartContainer}>
                <canvas ref={canvasRef} width={800} height={400}></canvas>
              </div>

              <button className={styles.exportButton} onClick={exportData}>
                💾 Export Results as JSON
              </button>
            </div>
          )}
        </div>
      )}

      {results && activeTab === 'data' && (
        <div className={styles.dataSection}>
          <h3>📊 Detailed Measurements</h3>
          <div className={styles.tableWrapper}>
            <table>
              <thead>
                <tr>
                  <th>Time (s)</th>
                  <th>Error (m)</th>
                  <th>INS Drift (m)</th>
                  <th>Sensor Error (pT)</th>
                  <th>Kalman Est.</th>
                  <th>Mag Field (nT)</th>
                  <th>Gravity (mGal)</th>
                </tr>
              </thead>
              <tbody>
                {results.measurements.slice(0, 50).map((m, i) => (
                  <tr key={i}>
                    <td>{m.timestamp}</td>
                    <td className={styles.errorCell}>{m.error}</td>
                    <td>{m.insError}</td>
                    <td>{m.sensorError}</td>
                    <td>{m.kalmanEstimate}</td>
                    <td>{m.magneticField}</td>
                    <td>{m.gravity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <small>Showing first 50 of {results.measurements.length} measurements</small>
          </div>
        </div>
      )}
    </div>
  );
}
