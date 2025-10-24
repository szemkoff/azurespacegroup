---
id: simulator
title: QPDS Simulator & Testing Framework
sidebar_label: Simulator & Testing
sidebar_position: 6
description: Python-based simulation framework for testing QPDS in GPS-denied environments
---

# QPDS Simulator & Testing Framework

## Overview

The **QPDS Simulator** is a production-ready Python framework for validating and testing Quantum Position Determination System algorithms in GPS-denied environments before hardware integration.

**Status**: TRL 5 (Software prototype, validated in simulation)  
**Language**: Python 3.7+  
**Dependencies**: NumPy  
**License**: Proprietary (Azure Space Group)

---

## What You Can Simulate

### Core Capabilities

✅ **Quantum Sensor Modeling**
- SQUID magnetometer (10 pT sensitivity)
- Gravitational gradiometer (5 pT/m sensitivity)
- Realistic noise characteristics

✅ **Geophysical Mapping**
- Pre-mapped magnetic field signatures
- Gravity anomaly databases
- Signature quality metrics (0-1 scale)

✅ **Sensor Fusion**
- Bayesian Kalman filtering
- INS dead-reckoning + quantum corrections
- Position uncertainty estimation

✅ **Environmental Scenarios**
- Surface/harbor navigation
- Underwater (oceans, lakes, rivers)
- Underground (tunnels, mines, caves)
- Urban (city environments)

✅ **Performance Analysis**
- Position accuracy metrics (CEP, mean error)
- Uncertainty quantification
- JSON output for analysis

---

## Quick Start (2 Minutes)

### Installation

```bash
# 1. Navigate to project root
cd /Users/stantheman/AndroidStudioProjects/NewEarthOrder

# 2. Install dependency
pip install numpy

# 3. Ready to go
```

### Run Default Scenario

```bash
python3 qpds_simulator.py
```

**Output:**
```
============================================================
QPDS (Quantum Position Determination System) Simulator
============================================================

Scenario: Harbor-to-Tunnel QPDS Demo
Duration: 60.0 seconds
Environment: tunnel

Running simulation...

Simulation Results:
------------------------------------------------------------
Mean Position Error: 154.91 m
Max Position Error:  559.03 m
Std Dev:             75.50 m
Total Measurements:  600

Results saved to: qpds_simulation_results.json
```

---

## Core Components

### 1. QuantumSensor Class

Simulates quantum magnetic and gravitational sensors.

```python
from qpds_simulator import QuantumSensor

# Create SQUID magnetometer
magnetometer = QuantumSensor("magnetometer", noise_level=10.0)

# Take measurement
measured_value = magnetometer.measure(
    true_value=48000,        # nanoTesla
    signature_quality=0.9    # 0-1 scale
)

# Get statistics
print(f"Measurements taken: {magnetometer.measurement_count}")
```

**Parameters:**
- `sensor_type`: "magnetometer" or "gradiometer"
- `noise_level`: Gaussian noise in picotesla (pT)
- `sensitivity`: Detection sensitivity (pT)

**TRL**: 4-5 (Lab-demonstrated, near-commercial)

**Realistic Noise Levels:**
| Environment | Magnetometer | Gradiometer |
|-------------|-------------|------------|
| Harbor | 5 pT | 2 pT/m |
| Open water | 10 pT | 5 pT/m |
| Underwater | 15-20 pT | 8-10 pT/m |
| Tunnel | 8-12 pT | 4-6 pT/m |

---

### 2. GeophysicalDatabase Class

Pre-mapped Earth magnetic and gravity signatures for map-matching.

```python
from qpds_simulator import GeophysicalDatabase, Position

# Create database (500m × 500m grid, 10m resolution)
geo_db = GeophysicalDatabase(grid_size=500, resolution=10.0)

# Look up signature at location
position = Position(x=100, y=50, z=-10)
signature = geo_db.lookup(position)

print(f"Magnetic field: {signature.magnetic_field} nT")
print(f"Gravity anomaly: {signature.gravity_anomaly} mGal")
print(f"Quality: {signature.signature_quality}")
```

**Data Included:**
- Magnetic field variations (realistic Earth field ±anomalies)
- Gravitational gradiometry data
- Signature quality metrics (higher = more distinctive)

**Customize:**
```python
# Load your own surveyed geophysical data
geo_db = GeophysicalDatabase(grid_size=1000, resolution=5.0)
# Then populate with your measured signatures
```

---

### 3. KalmanFilter Class

Optimal Bayesian sensor fusion combining INS with quantum measurements.

```python
from qpds_simulator import KalmanFilter
import numpy as np

# Initialize filter
kf = KalmanFilter(process_noise=0.01, measurement_noise=10.0)

# Prediction step (INS velocity input)
velocity = np.array([5.0, 0.5, -0.1])  # m/s
kf.predict(velocity)

# Update step (sensor measurement)
measurement = np.array([0.5, -0.3, -0.1])  # position deviation
kf.update(measurement, measurement_variance=0.8)

# Get result
position = kf.get_position()           # Position object
uncertainty = kf.get_uncertainty()     # Standard deviation (meters)

print(f"Position: {position}")
print(f"Uncertainty: ±{uncertainty:.2f} m")
```

**Tuning Parameters:**
- `process_noise`: INS error growth rate (Q matrix)
- `measurement_noise`: Sensor measurement uncertainty (R matrix)

**When to Adjust:**
- Good INS → Lower `process_noise` (0.001)
- Poor INS → Higher `process_noise` (0.05)
- Good sensors → Lower `measurement_noise` (5)
- Poor sensors → Higher `measurement_noise` (20)

---

### 4. QPDSSimulator Class

Main orchestrator running complete simulations.

```python
from qpds_simulator import QPDSSimulator

# Create simulator
sim = QPDSSimulator()

# Use pre-built scenario
scenario = sim.create_harbor_to_tunnel_scenario()

# Run simulation
results = sim.run(scenario)

# Analyze results
summary = results.summary()
print(f"Mean error: {summary['mean_position_error_m']:.2f} m")

# Export to JSON
json_data = results.to_json()
```

---

## Built-In Scenarios

### Harbor-to-Tunnel Demo

```python
scenario = sim.create_harbor_to_tunnel_scenario()
```

**Phases** (60 seconds total):

1. **Harbor** (0-10s)
   - Surface navigation with GPS truth
   - Environment: SURFACE
   - Signature quality: 0.95

2. **Water Transition** (10-20s)
   - Moving into GPS-denied zone
   - Environment: UNDERWATER
   - Depth: 5-10m

3. **Tunnel Entry** (20-40s)
   - Entering underground tunnel
   - Environment: TUNNEL
   - No GPS signal

4. **Underground Navigation** (40-60s)
   - Deep tunnel/underground navigation
   - Environment: UNDERGROUND
   - Depth: 10-20m

**Expected Results:**
- Mean position error: 150-200 meters
- Total measurements: 600 (10 Hz × 60 seconds)
- CEP (Circular Error Probable): ~180m

---

## Custom Scenarios

Create your own testing scenarios:

```python
from qpds_simulator import (
    QPDSSimulator, 
    SimulationScenario, 
    Position, 
    EnvironmentType
)

sim = QPDSSimulator()

# Define trajectory (list of positions)
trajectory = [
    Position(x=0, y=0, z=-10),       # Start underwater
    Position(x=100, y=50, z=-15),    # Moving deeper
    Position(x=200, y=100, z=-20),   # Deeper still
    Position(x=300, y=150, z=-25),   # Deep dive
]

# Create scenario
scenario = SimulationScenario(
    name="Deep Ocean Navigation Test",
    environment=EnvironmentType.UNDERWATER,
    true_trajectory=trajectory,
    initial_position=trajectory[0],
    sensor_noise_level=18.0,   # Higher underwater
    ins_drift_rate=0.02,       # Typical INS drift
    update_rate=10.0,          # 10 Hz measurements
    duration=len(trajectory) - 1
)

# Run and analyze
results = sim.run(scenario)
print(results.summary())
```

---

## Output Format

Results are saved to `qpds_simulation_results.json`:

```json
{
  "scenario": "Harbor-to-Tunnel QPDS Demo",
  "summary": {
    "duration_seconds": 60.0,
    "measurements_count": 600,
    "mean_position_error_m": 154.91,
    "max_position_error_m": 559.03,
    "min_position_error_m": 5.23,
    "std_position_error_m": 75.50,
    "timestamp": "2025-10-24T20:00:00"
  },
  "measurements": [
    {
      "timestamp": 0.1,
      "true_pos": {"x": 0.5, "y": 0, "z": 0},
      "est_pos": {"x": 100.2, "y": 0.3, "z": -0.5},
      "error_m": 99.7
    },
    ...
  ]
}
```

**Use for:**
- Performance analysis
- Validation reports
- Algorithm benchmarking
- Plotting/visualization

---

## Advanced Usage

### Sensor Sensitivity Analysis

```python
# Test different magnetometer noise levels
results_by_noise = {}
for noise_level in [5, 10, 15, 20]:
    sim.magnetometer.noise_level = noise_level
    results = sim.run(scenario)
    results_by_noise[f"{noise_level}pT"] = results.summary()

# Compare
for noise, summary in results_by_noise.items():
    print(f"{noise}: Mean error = {summary['mean_position_error_m']:.1f} m")
```

### Custom Kalman Filter Tuning

```python
# For specific environment (e.g., good INS, poor signatures)
sim.kalman_filter = KalmanFilter(
    process_noise=0.001,     # Very good INS
    measurement_noise=20.0   # Poor sensor environment
)
results = sim.run(scenario)
```

### Multi-Scenario Comparison

```python
scenarios = [
    sim.create_harbor_to_tunnel_scenario(),
    SimulationScenario(...),  # Your custom
    SimulationScenario(...),  # Your custom
]

for scenario in scenarios:
    results = sim.run(scenario)
    print(f"{scenario.name}: {results.summary()['mean_position_error_m']:.1f} m")
```

---

## Supported Environments

| Environment | Use Case | Noise Level | Signature Quality |
|-------------|----------|-------------|-------------------|
| **SURFACE** | Harbor, airport, desert | 5-8 pT | 0.95 |
| **UNDERWATER** | Ocean, lake, river | 15-20 pT | 0.85 |
| **UNDERGROUND** | Mine, cave, bunker | 10-15 pT | 0.75 |
| **TUNNEL** | Subway, road tunnel | 8-12 pT | 0.80 |
| **URBAN** | City, buildings | 10-15 pT | 0.70 |

---

## Integration with QPDS Hardware

### Simulation → Algorithm Development → Hardware Test

```
1. SIMULATE
   Use simulator to develop/test algorithms
   Validate sensor fusion logic
   Benchmark performance

2. DEVELOP
   Implement algorithms in your code
   Tune Kalman filter parameters
   Optimize for target environment

3. VALIDATE
   Test with real quantum sensors (TRL 5-6)
   Compare simulation vs. real-world
   Refine models as needed
```

---

## Performance Targets

### Position Accuracy (CEP - Circular Error Probable)

| Environment | Current Target | Stretch Goal |
|-------------|---|---|
| Surface/harbor | 10 m | 5 m |
| Open water | 20 m | 10 m |
| Underwater (50m) | 30 m | 15 m |
| Underground/tunnel | 50 m | 25 m |

### Update Rate
- Standard: 10 Hz (100 ms per measurement)
- Options: 1-100 Hz configurable

### Power Budget
- Quantum sensors: ~30-50W
- Electronics: ~10-20W
- Total: ~50-100W (targeted)

---

## Troubleshooting

### Issue: ImportError: No module named 'numpy'

**Solution:**
```bash
pip install numpy
```

### Issue: Position errors seem too large (>500m)

**Causes & Fixes:**
1. Signature quality too low → Use better surveyed area (quality > 0.8)
2. Sensor noise too high → Reduce `noise_level` parameter
3. INS drift too high → Reduce `ins_drift_rate`

### Issue: File not found error

**Solution:**
```bash
# Make sure you're in project root
cd /Users/stantheman/AndroidStudioProjects/NewEarthOrder
python3 qpds_simulator.py
```

---

## Next Steps

1. **Run the default demo**
   ```bash
   python3 qpds_simulator.py
   ```

2. **Read the technical guide**
   - See `QPDS_SIMULATOR_README.md` for full details

3. **Create a custom scenario**
   - Use the template in `QPDS_SIMULATOR_QUICK_GUIDE.txt`

4. **Integrate with your system**
   - Import classes into your algorithm
   - Validate with your sensor data

5. **Contribute improvements**
   - Enhanced sensor models
   - Better map-matching algorithms
   - Real geophysical databases

---

## Files & Resources

**Simulator Package:**
- `qpds_simulator.py` - Main code (436 lines)
- `QPDS_SIMULATOR_README.md` - Technical documentation
- `QPDS_SIMULATOR_QUICK_GUIDE.txt` - Quick reference
- `qpds_simulation_results.json` - Example output

**Related Documentation:**
- [QGN v0.1 Product Requirements](./qgn-v01-prd.md)
- [System Architecture](./system-architecture.md)
- [Field Test Protocol](./field-test-protocol.md)
- [Maritime Operations](./maritime-operations.md)

---

## Contact & Support

For questions or enhancements:
- **Email**: research@azurespacegroup.org
- **Documentation**: See `/docs/qpds/` directory
- **Issues**: Create a GitHub issue in the repository

---

**Version**: 1.0  
**Last Updated**: October 24, 2025  
**Status**: Ready for testing and integration
