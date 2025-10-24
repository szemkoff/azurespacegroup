---
id: simulator
title: QPDS Simulator & Testing Framework
sidebar_label: Simulator & Testing
description: Python-based simulation framework for testing QPDS in GPS-denied environments
---

# QPDS Simulator & Testing Framework

## Overview

The **QPDS Simulator** is a production-ready Python framework for validating and testing Quantum Position Determination System algorithms in GPS-denied environments before hardware integration.

**Status**: TRL 5 (Software prototype)  
**Language**: Python 3.7+  
**Dependencies**: NumPy

---

## Quick Start (2 Minutes)

### Installation

```bash
pip install numpy
cd /Users/stantheman/AndroidStudioProjects/NewEarthOrder
python3 qpds_simulator.py
```

### Expected Output

```
QPDS (Quantum Position Determination System) Simulator
===============================================================
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

## What You Can Simulate

✅ **Quantum Sensor Modeling** - SQUID magnetometer + gradiometer  
✅ **Geophysical Mapping** - Pre-mapped magnetic/gravity signatures  
✅ **Sensor Fusion** - Bayesian Kalman filtering  
✅ **Scenarios** - Surface, underwater, underground, tunnel, urban  
✅ **Performance Analysis** - Position accuracy, CEP, uncertainty  

---

## Core Components

### 1. QuantumSensor

```python
from qpds_simulator import QuantumSensor

magnetometer = QuantumSensor("magnetometer", noise_level=10.0)
measured = magnetometer.measure(true_value=48000, signature_quality=0.9)
```

**TRL**: 4-5 (Lab-demonstrated, near-commercial)

### 2. GeophysicalDatabase

```python
from qpds_simulator import GeophysicalDatabase, Position

geo_db = GeophysicalDatabase(grid_size=500, resolution=10.0)
signature = geo_db.lookup(Position(x=100, y=50, z=-10))
```

### 3. KalmanFilter

```python
from qpds_simulator import KalmanFilter
import numpy as np

kf = KalmanFilter(process_noise=0.01, measurement_noise=10.0)
kf.predict(np.array([5.0, 0.5, -0.1]))  # velocity
kf.update(np.array([0.5, -0.3, -0.1]))  # measurement
position = kf.get_position()
```

### 4. QPDSSimulator

```python
from qpds_simulator import QPDSSimulator

sim = QPDSSimulator()
scenario = sim.create_harbor_to_tunnel_scenario()
results = sim.run(scenario)
print(results.summary())
```

---

## Built-In Scenarios

### Harbor-to-Tunnel Demo

5 phases over 60 seconds:

1. **Harbor** (0-10s) - Surface navigation, GPS available
2. **Water Transition** (10-20s) - Moving into GPS-denied zone
3. **Tunnel Entry** (20-40s) - Entering underground tunnel
4. **Underground Nav** (40-60s) - Deep navigation, no GPS
5. **Exit** (60s) - Return to surface

**Expected Results**: ~150-200m mean position error

---

## Custom Scenarios

Create your own:

```python
from qpds_simulator import (
    QPDSSimulator, 
    SimulationScenario, 
    Position, 
    EnvironmentType
)

trajectory = [
    Position(x=0, y=0, z=-10),
    Position(x=100, y=50, z=-20),
    Position(x=200, y=100, z=-30),
]

scenario = SimulationScenario(
    name="My Underwater Test",
    environment=EnvironmentType.UNDERWATER,
    true_trajectory=trajectory,
    initial_position=trajectory[0],
    sensor_noise_level=15.0,
    update_rate=10.0,
    duration=3.0
)

results = sim.run(scenario)
print(results.summary())
```

---

## Output Format

Results saved to `qpds_simulation_results.json`:

```json
{
  "scenario": "Harbor-to-Tunnel QPDS Demo",
  "summary": {
    "mean_position_error_m": 154.91,
    "max_position_error_m": 559.03,
    "std_position_error_m": 75.50,
    "measurements_count": 600
  },
  "measurements": [
    {
      "timestamp": 0.1,
      "true_pos": {"x": 0.5, "y": 0, "z": 0},
      "est_pos": {"x": 100.2, "y": 0.3, "z": -0.5},
      "error_m": 99.7
    }
  ]
}
```

---

## Supported Environments

| Environment | Use Case | Noise Level | Quality |
|-------------|----------|-------------|---------|
| **SURFACE** | Harbor, airport | 5-8 pT | 0.95 |
| **UNDERWATER** | Ocean, lake | 15-20 pT | 0.85 |
| **UNDERGROUND** | Mine, cave | 10-15 pT | 0.75 |
| **TUNNEL** | Subway, tunnel | 8-12 pT | 0.80 |
| **URBAN** | City | 10-15 pT | 0.70 |

---

## Advanced Usage

### Sensor Sensitivity Analysis

```python
for noise in [5, 10, 15, 20]:
    sim.magnetometer.noise_level = noise
    results = sim.run(scenario)
    print(f"{noise}pT: {results.summary()['mean_position_error_m']:.1f} m")
```

### Kalman Filter Tuning

```python
sim.kalman_filter = KalmanFilter(
    process_noise=0.001,   # Good INS
    measurement_noise=20.0 # Poor sensors
)
results = sim.run(scenario)
```

---

## Performance Targets

| Environment | Target CEP | Stretch Goal |
|-------------|---|---|
| Surface | 10 m | 5 m |
| Open water | 20 m | 10 m |
| Underwater (50m) | 30 m | 15 m |
| Underground/tunnel | 50 m | 25 m |

---

## Files

- `qpds_simulator.py` - Main code (436 lines)
- `QPDS_SIMULATOR_README.md` - Full technical docs
- `QPDS_SIMULATOR_QUICK_GUIDE.txt` - Quick reference
- `qpds_simulation_results.json` - Example output

---

**Version**: 1.0 | **Status**: Ready for testing  
**Contact**: research@azurespacegroup.org
