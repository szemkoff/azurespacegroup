# QPDS MATLAB Simulator - Comprehensive Documentation

## Overview

**QPDS Simulator for MATLAB** is a production-grade simulation framework for testing Quantum Position Determination System algorithms in GPS-denied environments. This simulator implements physics-based modeling of quantum sensors, inertial navigation systems (INS), and sensor fusion using Bayesian Kalman filtering.

**Version**: 1.0  
**Author**: Azure Space Group Research Team  
**Date**: October 2025  
**Status**: Ready for Research & Development  
**TRL**: 3-4 (Component/System Validation)

---

## Quick Start (5 Minutes)

### Installation & Execution

1. **Save the simulator file**:
   ```bash
   qpds_matlab_simulator.m
   ```

2. **Open in MATLAB**:
   ```matlab
   >> open qpds_matlab_simulator.m
   >> qpds_matlab_simulator
   ```

3. **Expected Output**:
   - Console output with simulation progress
   - 3 visualization figures with comprehensive plots
   - 4 CSV/JSON export files
   - Complete statistics and performance metrics

### Quick Example

```matlab
% Initialize simulator
sim = QPDSSimulator(environments);

% Create a custom scenario
scenario = sim.createCustomScenario('UNDERWATER', 60, 20);

% Run simulation
results = sim.run(scenario, 'sensorNoise', 15, 'verbose', true);

% Visualize
results.plotResults();

% Export
results.exportCSV('my_simulation.csv');
```

---

## Architecture Overview

### Core Components

#### 1. **KalmanFilterND Class**
Implements 3-dimensional Bayesian Kalman filter for sensor fusion.

**Properties**:
- `Q` - Process noise covariance matrix (3×3)
- `R` - Measurement noise variance (scalar)
- `x` - State vector [position_x, position_y, position_z]ᵀ
- `P` - Estimation error covariance matrix (3×3)
- `dt` - Time step (seconds)

**Methods**:
```matlab
kf = KalmanFilterND(processNoise, measurementNoise, dt);
kf = kf.predict(velocity);           % Prediction step
kf = kf.update(measurement);         % Update step
pos = kf.getPosition();              % Get current estimate
unc = kf.getUncertainty();           % Get position uncertainty
```

**Physics**:
- Process model: x(k+1) = x(k) + v(k) × dt
- Measurement model: z(k) = x(k) + noise
- Kalman gain: K(k) = P(k) / (P(k) + R)

#### 2. **QPDSSimulator Class**
Main orchestrator for simulation scenarios.

**Properties**:
- `magnetometer` - SQUID magnetometer sensor model (10 pT sensitivity)
- `gradiometer` - SQUID gradiometer sensor model (5 pT sensitivity)
- `geoDatabase` - Geophysical signature database (mag field, gravity)
- `environments` - Environment definitions (4 scenarios)

**Methods**:
```matlab
sim = QPDSSimulator(environments);
scenario = sim.createHarborToTunnelScenario();
scenario = sim.createCustomScenario(envName, duration, updateRate);
results = sim.run(scenario, 'sensorNoise', noise_pT, 'verbose', true);
```

#### 3. **QPDSSimulationResult Class**
Encapsulates results, statistics, and export functionality.

**Properties**:
- `scenario` - Scenario configuration
- `measurements` - Array of measurement structs
- `statistics` - Computed statistics (mean, std, CEP, RMS)
- `kalmanFilterParams` - Filter configuration
- `environmentInfo` - Environment parameters

**Methods**:
```matlab
results.plotResults();                      % Generate 6-panel figure
results.exportJSON('file.json');            % Export to JSON
results.exportCSV('file.csv');              % Export to CSV
```

---

## Environment Definitions

### 1. Harbor/Surface
- **Noise Level**: 5-8 pT
- **Quality**: 0.95 (excellent)
- **INS Drift**: 0.001 m/s²
- **Description**: GPS-available surface navigation with minimal multipath
- **Use Case**: Baseline, validation scenarios

### 2. Underwater (50m Depth)
- **Noise Level**: 15-20 pT
- **Quality**: 0.85 (good)
- **INS Drift**: 0.01 m/s²
- **Description**: Submarine/UUV navigation with signal attenuation
- **Use Case**: Submarine positioning, underwater robotics

### 3. Underground/Tunnel
- **Noise Level**: 10-15 pT
- **Quality**: 0.75 (fair)
- **INS Drift**: 0.005 m/s²
- **Description**: Mine/tunnel navigation with severe signal degradation
- **Use Case**: Metro systems, mining operations, cave surveys

### 4. Urban Canyon
- **Noise Level**: 10-15 pT
- **Quality**: 0.70 (poor)
- **INS Drift**: 0.008 m/s²
- **Description**: Dense urban environment with multipath and reflection
- **Use Case**: Street-level navigation, urban search & rescue

---

## Built-In Scenarios

### Harbor-to-Tunnel Demo
A realistic 5-phase scenario demonstrating QPDS performance across multiple environments:

1. **Harbor (0-10s)**: Surface navigation (5 m/s forward)
2. **Water Transition (10-20s)**: Descent to -5 m depth
3. **Tunnel Entry (20-40s)**: Lateral movement into tunnel, depth -10 m
4. **Underground Nav (40-60s)**: Deep tunnel navigation, depth -16 m
5. **Exit (60s)**: Return sequence

**Parameters**:
- Duration: 60 seconds
- Update Rate: 10 Hz (600 measurements)
- Sensor Noise: 10 pT (default)
- Distance Traveled: ~460 meters

**Typical Results**:
- Mean Error: 120-200 m
- Max Error: 300-500 m
- CEP: 150-250 m
- Std Dev: 40-80 m

---

## Error Sources Modeled

### 1. Thermal Drift
```
thermalDrift(t) = 0.5 × sin(2π × t/10)
```
- Slow oscillation (10s period)
- Magnitude: ±0.5 m
- Physical basis: Temperature effects on sensor calibration

### 2. Geophysical Variations
**Magnetic Field**:
```
magneticVar(t) = 2 × sin(2π × t/30)
```
- Period: 30 seconds
- Magnitude: ±2 nT
- Physical basis: Diurnal magnetic variation, local anomalies

**Gravity Anomaly**:
```
gravityVar(t) = 0.3 × sin(2π × t/20)
```
- Period: 20 seconds
- Magnitude: ±0.3 mGal
- Physical basis: Local mass distributions, topography

### 3. INS Drift
```
insDrift(t) = insDriftRate × (t/tmax) × 100
```
- Accumulates linearly with time
- Environment-dependent rate (0.001-0.01 m/s²)
- Physical basis: Accelerometer bias, integration errors

### 4. Sensor Noise
```
sensorNoise = Gaussian(0, σ = sensorNoise_pT)
```
- White Gaussian noise
- Magnitude: configurable (default 10 pT)
- Physical basis: Quantum noise floor, SQUID electronics

### 5. Map-Matching Error
```
mapMatchError = |mag_signature_expected - mag_measured| / 100
```
- Simulates geophysical database lookup errors
- Depends on signature uniqueness (environment quality)
- Affects Kalman filter performance

---

## Using Custom Scenarios

### Create a Scenario Manually

```matlab
% Define custom scenario
scenario = struct();
scenario.name = 'My Custom Test';
scenario.environment = 'UNDERWATER';
scenario.duration = 120;              % seconds
scenario.updateRate = 20;             % Hz (more measurements)
scenario.trajectory = my_trajectory;  % Nx3 matrix [x, y, z]
scenario.description = 'Custom underwater survey';

% Run with custom parameters
results = sim.run(scenario, ...
    'sensorNoise', 18, ...    % Higher noise for underwater
    'verbose', true);

% Export results
results.exportCSV('custom_results.csv');
```

### Scenario Parameters

| Parameter | Type | Range | Description |
|-----------|------|-------|-------------|
| `name` | string | - | Scenario identifier |
| `environment` | string | SURFACE, UNDERWATER, UNDERGROUND, URBAN | Environment type |
| `duration` | numeric | 10-600 | Simulation time (seconds) |
| `updateRate` | numeric | 1-50 | Measurement frequency (Hz) |
| `trajectory` | Nx3 matrix | Any | Vehicle path [x,y,z] in meters |
| `description` | string | - | Scenario documentation |

---

## Output Data Format

### CSV Export Format

**Columns**:
1. `Time_s` - Elapsed time (seconds)
2. `TotalError_m` - Position error estimate (meters)
3. `INSDrift_m` - Accumulated INS drift (meters)
4. `SensorError_pT` - Quantum sensor noise (picotesla)
5. `MagneticField_nT` - Measured magnetic field (nanotesla)
6. `GravityAnomaly_mGal` - Measured gravity anomaly (milligal)
7. `KalmanEstimate_m` - Filter's error estimate (meters)

**Example Row**:
```
15.6,245.3,5.2,-3.1,48002.1,-981005.4,0.8
```

### JSON Export Format

```json
{
  "scenario": {
    "name": "Harbor-to-Tunnel QPDS Demo",
    "environment": "TUNNEL",
    "duration": 60,
    "updateRate": 10
  },
  "statistics": {
    "meanError": 154.92,
    "maxError": 559.03,
    "minError": 5.12,
    "stdDev": 75.50,
    "cep": 193.65,
    "rmsError": 161.23,
    "totalMeasurements": 600
  },
  "measurements": [
    {"time": 0.0, "totalError": 0.5, "insDrift": 0.0, ...},
    {"time": 0.1, "totalError": 1.2, "insDrift": 0.01, ...}
  ]
}
```

---

## Visualization Output

The `plotResults()` method generates a 6-panel figure:

### Panel 1: Position Error Over Time
- Blue line: Position error trajectory
- Red dashed line: Mean error reference
- Shows performance evolution

### Panel 2: INS Drift Accumulation
- Green line: Accumulated INS error
- Shows how error grows without Kalman filter correction

### Panel 3: Quantum Sensor Noise
- Red line: Raw sensor noise component
- Shows noise floor and variability

### Panel 4: Kalman Filter Performance
- Blue line: Actual total error
- Green dashed line: Filter's estimate
- Shows filter tracking accuracy

### Panel 5: Error Distribution Histogram
- Blue histogram: Error frequency distribution
- Red dashed line: Mean error
- Green dashed line: CEP (90% containment)

### Panel 6: Statistics Summary (Text)
- Environment name
- Duration, measurement count, update rate
- All statistical metrics (mean, max, min, std, CEP, RMS)

---

## Advanced Configuration

### Kalman Filter Parameters

Modify in code or via `run()` options:

```matlab
% Higher measurement noise = less trust in sensors
results = sim.run(scenario, 'sensorNoise', 25, 'verbose', true);

% For fine tuning, edit the KalmanFilterND constructor:
kf = KalmanFilterND(processNoise, measurementNoise, dt);
% - Increase processNoise: trust model more, adapt slowly
% - Increase measurementNoise: trust measurements less
```

### Batch Processing Multiple Scenarios

```matlab
% Define multiple scenarios
scenarios = {
    sim.createHarborToTunnelScenario(), ...
    sim.createCustomScenario('UNDERWATER', 30, 10), ...
    sim.createCustomScenario('URBAN', 45, 15)
};

noiseTests = [5, 10, 15, 20];

% Run matrix of experiments
results_all = {};
for i = 1:length(scenarios)
    for j = 1:length(noiseTests)
        idx = (i-1)*length(noiseTests) + j;
        results_all{idx} = sim.run(scenarios{i}, ...
            'sensorNoise', noiseTests(j), ...
            'verbose', false);
        
        % Export each result
        filename = sprintf('result_%d_%d.csv', i, noiseTests(j));
        results_all{idx}.exportCSV(filename);
    end
end

fprintf('Completed %d simulation runs\n', length(results_all));
```

---

## Performance Benchmarks

### Computational Performance

| Scenario | Duration | Measurements | Compute Time | Visualization |
|----------|----------|--------------|--------------|----------------|
| Harbor-to-Tunnel | 60s | 600 | <1s | Instant |
| Underwater Long | 300s | 3000 | 2-3s | <1s |
| Urban High-Rate | 60s | 3000 | 2-3s | <1s |
| Extended Test | 600s | 30000 | 5-10s | 1-2s |

**System**: MATLAB R2023b, Intel i7, 16GB RAM

### Accuracy Benchmarks

| Environment | Mean Error | Std Dev | CEP (90%) | Comments |
|-------------|------------|---------|-----------|----------|
| Surface | 50-100 m | 10-20 m | 60-125 m | Best case, GPS-available |
| Underwater | 150-250 m | 30-60 m | 190-315 m | Good coherence, signal attenuation |
| Underground | 200-300 m | 50-100 m | 250-375 m | Poor signatures, high INS drift |
| Urban | 250-350 m | 60-120 m | 315-440 m | Multipath, signal blockage |

---

## Troubleshooting

### Issue: Slow Performance
**Solution**: Reduce update rate or duration
```matlab
scenario.updateRate = 5;  % From 10 Hz to 5 Hz
scenario.duration = 30;   % From 60s to 30s
```

### Issue: Unrealistic Errors
**Check**:
1. Sensor noise level (default 10 pT, reasonable)
2. Update rate (higher = more realistic)
3. Environment choice (underwater = larger errors)

### Issue: JSON Export Fails
**Solution**: Ensure MATLAB R2016b or later (jsonencode support)
```matlab
% Alternative: use writetable for CSV
results.exportCSV('fallback.csv');
```

### Issue: Visualizations Not Displaying
**Solution**: Check figure handle and display settings
```matlab
figure('Visible', 'on');
results.plotResults();
```

---

## Extension Points

### Add a New Environment

```matlab
environments.LUNAR = struct(...
    'label', 'Lunar Surface', ...
    'noiseLevel', [3, 5], ...
    'quality', 0.98, ...
    'insDriftRate', 0.0001, ...
    'description', 'Lunar rover navigation with minimal interference');
```

### Implement Custom Sensor Model

Modify the `QPDSSimulator` class:
```matlab
function magneticMeas = customSensorModel(obj, trueValue, t)
    % Add frequency-dependent response
    freqResponse = 1 - 0.5 * sin(2*pi * t / 5);
    magneticMeas = (obj.magnetometer.noiseLevel * freqResponse) + trueValue;
end
```

### Add State-of-Charge Tracking

Extend measurements struct:
```matlab
measurements(i).batterySOC = 100 * (1 - timeRatio);
```

---

## References & Credits

**MATLAB Toolboxes Used**:
- Statistics and Machine Learning Toolbox (std, histogram)
- Signal Processing Toolbox (signal generation)

**Physical Models**:
- Kalman filtering: Welch & Bishop, "An Introduction to the Kalman Filter", 2006
- Geophysical sensing: USGS Magnetic Field Survey documentation
- INS drift: IEEE/ION Standard 678-2015

**Related Azure Space Group Documentation**:
- `qpds_simulator.py` - Python reference implementation
- `docs/qpds/` - QPDS system documentation
- Interactive simulator at: https://szemkoff.github.io/azurespacegroup/docs/qpds/simulator/

---

## Support & Contact

**Questions or Issues**:
- File an issue in the internal repository
- Contact: research@azurespacegroup.org
- MATLAB Forum: Technical discussions
- Code Review: Submit pull requests for improvements

**Version History**:
- v1.0 (Oct 2025): Initial release with 4 environments, Kalman filter, CSV/JSON export

---

**Last Updated**: October 24, 2025  
**Maintained By**: Azure Space Group Research Team  
**License**: Internal Use Only (Not for Public Distribution)
