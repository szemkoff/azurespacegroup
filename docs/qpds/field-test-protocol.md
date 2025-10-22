---
title: QGN v0.1 Field Test Protocol
sidebar_position: 3
description: Comprehensive field test procedures, validation checklists, and acceptance criteria for Quantum Geophysical Navigation system
---

# QGN v0.1 Field Test Protocol

## Executive Summary

This document defines the **measurement layer** for QGN v0.1 validation — where theoretical Ψ-predictions collapse into observable CEP data. The protocol establishes:

- **Standardized test procedures** for GPS-denied environments
- **Pass/fail acceptance criteria** mapped to product KPIs
- **Data logging requirements** for reproducibility and analysis
- **Recoherence checklists** for systematic troubleshooting

**Status**: Draft v1.0 (Pre-Prototype)  
**Owner**: Azure Space Group Test & Validation Team  
**Target Completion**: Q2 2025 (aligned with QGN v0.1 prototype delivery)

---

## Test Philosophy: From Ψ-Theory to Measured Reality

### IBT Perspective

Field testing is the **phase collapse** event — where the superposition of design possibilities (Ψ_design) becomes a measured outcome (|Ψ_measured|²). Each test run is a quantum of becoming (τ), evolving our understanding from speculation to validated performance.

**Key Principles**:
- **Existence**: Every test must produce persistent, reproducible data (∫|Ψ|² dV = const)
- **Unity**: Multi-sensor fusion (λ) is validated by comparing individual vs. fused performance
- **Reflection**: Failure modes mirror design assumptions — they teach us where Ψ_design diverged from Ψ_reality
- **Change**: Iterate rapidly; each test cycle is a ∆θ toward coherence

### Engineering Translation

- **Systematic**: Follow repeatable procedures
- **Quantitative**: All claims must be backed by statistical confidence (P50, P95)
- **Traceable**: Every data point linked to test ID, timestamp, environmental conditions
- **Iterative**: Design → Test → Analyze → Refine → Retest

---

## Test Environment Classification

QGN v0.1 is designed for six primary GPS-denied operational environments. Each presents distinct geophysical signatures and validation challenges.

### Environment Matrix

| Environment | Code | Primary Geo-Signature | Validation Priority | Acceptance CEP (P50) |
|-------------|------|----------------------|---------------------|----------------------|
| **Urban Canyon** | UC | Magnetic anomalies (infrastructure) | High | ≤10m |
| **Industrial Zone** | IZ | High EMI, ferrous clutter | High | ≤15m |
| **Maritime Harbor** | MH | Underwater mag anomalies, bathymetry | **Critical** | ≤10m |
| **Open Water Subsea** | OW | Weak geo-signatures, DVL-dependent | Medium | ≤25m |
| **Tunnel/Culvert** | TC | Confined space, strong gradients | **Critical** | ≤10m |
| **Cave/Underground** | CU | Variable signatures, no DVL | Medium | ≤20m |

**Critical Environments** (MH, TC) are required for v0.1 acceptance. Others are aspirational/stretch goals.

---

## Phase 1: Pre-Test Preparation

### 1.1 System Health Verification

**Objective**: Ensure QGN hardware/software is in nominal state before deployment.

#### Checklist: System Readiness

- [ ] **Power Budget Verification**
  - Measure idle, sense, and fusion mode power draw
  - Confirm ≤100W peak (including DVL if applicable)
  - Battery runtime test: ≥2 hours continuous operation

- [ ] **Sensor Calibration Status**
  - **SQUID Magnetometers**: Zero-field calibration within 7 days
  - **Gravitational Gradiometer**: Warm-up cycle complete (30+ min), zero-offset check
  - **IMU**: Bias estimation run, alignment matrix validated
  - **DVL** (if used): Bottom-lock test in controlled environment

- [ ] **Thermal Management**
  - SQUID operating temperature stable (±0.01°C for gradiometer, cryogen level &gt;80%)
  - Compute module (Orin) Tjunc &lt;60°C at idle
  - Enclosure ambient sensor reading correctly

- [ ] **Data Logging System**
  - Storage: ≥100 GB available for 2-hour mission
  - Logging rate: 10 Hz position, 100 Hz IMU, 1 Hz sensor health
  - GPS time sync verified (if available for ground truth)

- [ ] **Software Version Control**
  - Fusion software version: `QGN-v0.1.X` (document exact build)
  - Map database version: `MAP-YYYYMMDD-Region`
  - Sensor drivers: firmware versions logged

**Pass Criteria**: All checklist items green; system runs self-test routine without faults for 10 minutes.

---

### 1.2 Ground Truth Preparation

**Objective**: Establish reference data for CEP calculation and drift analysis.

#### Option A: RTK-GPS Ground Truth (Outdoor Environments)

- Deploy RTK-GPS base station with known surveyed position
- Rover unit mounted on QGN platform
- Target accuracy: ≤0.05m horizontal, ≤0.1m vertical
- Log at 10 Hz, time-synchronized with QGN data

#### Option B: Total Station Surveyed Waypoints (Indoor/Tunnel)

- Pre-survey route with total station (accuracy ±0.01m)
- Mark waypoints every 10-50m with reflective targets
- QGN platform passes through waypoints at known times
- Manual or automated waypoint detection (camera/LiDAR)

#### Option C: INS with Post-Processed ZUPT (Zero-Velocity Updates)

- For environments with periodic stops
- Tactical-grade INS (bias stability &lt;0.1°/hr)
- Post-process with zero-velocity constraints at stops
- Provides drift-bounded reference

**Selection Guide**:
- UC, MH (surface), OW (surface): RTK-GPS
- TC, CU: Total station waypoints
- MH (subsea), OW (subsea): INS+ZUPT or DVL-aided INS

---

### 1.3 Test Route Planning

**Objective**: Design routes that stress QGN capabilities and sample geophysical diversity.

#### Route Design Principles

1. **Signature Diversity**: Include areas with strong/weak magnetic and gravitational gradients
2. **Duration**: 15-60 min continuous (minimum 30 min for drift analysis)
3. **Dynamics**: Mix stationary, walking speed (1-2 m/s), and vehicle speed (3-10 m/s)
4. **Loop Closure**: Return to start point for drift accumulation check
5. **Waypoint Density**: Ground truth checkpoints every 1-2 minutes

#### Standard Test Routes

**Route UC-1: Urban Canyon (Downtown)** [High Priority]
- Start: Open-sky plaza (GNSS baseline)
- Segment 1: Tall buildings, 2-block traverse (5 min)
- Segment 2: Underground parking entry/exit (3 min)
- Segment 3: Return to plaza (loop closure)
- Duration: 15 min | Distance: ~1 km

**Route MH-1: Maritime Harbor (Surface-to-Subsea Transition)** [**Critical**]
- Start: Dockside (RTK-GPS lock)
- Segment 1: Surface transit 200m offshore (GPS jamming begins)
- Segment 2: Submerge to 10m depth, 500m transit
- Segment 3: Tunnel entry (culvert/docking scenario)
- Segment 4: Return to dock
- Duration: 30 min | Distance: ~2 km

**Route TC-1: Tunnel/Culvert** [**Critical**]
- Start: Tunnel entrance (GPS lock)
- Segment 1: 500m straight tunnel section
- Segment 2: 90° turn, 300m section
- Segment 3: Confined docking maneuver (5m target)
- Segment 4: Exit tunnel (GPS reacquisition)
- Duration: 20 min | Distance: ~1.2 km

*(Additional routes for IZ, OW, CU defined in Appendix A)*

---

## Phase 2: Test Execution

### 2.1 Pre-Run Checklist (T-15 Minutes)

Execute this checklist **before each test run**:

- [ ] System power-on, self-test passed
- [ ] Ground truth system active and logging
- [ ] Environmental conditions logged (temperature, pressure, weather)
- [ ] GPS availability baseline (C/N₀ levels, visible satellites)
- [ ] Operator briefing: route overview, abort criteria, safety
- [ ] Data logging initiated (confirm file creation and write rate)
- [ ] Initial position convergence: QGN agrees with GNSS within 10m (if available)

**Abort Criteria** (Stop test if any occur):
- System power fault or thermal alarm
- Sensor health check fails (e.g., SQUID temperature drift &gt;0.05°C)
- Loss of ground truth reference
- Safety hazard (weather, traffic, equipment failure)

---

### 2.2 Test Execution Sequence

#### Step 1: Static Baseline (5 Minutes)

**Purpose**: Measure stationary position noise floor and sensor stability.

**Procedure**:
1. Place QGN platform in known location (surveyed or RTK-GPS)
2. Record position estimates for 5 minutes (3000 samples @ 10 Hz)
3. Do not move platform

**Data Collection**:
- QGN position (X, Y, Z) at 10 Hz
- Individual sensor outputs (magnetic field vector, gravity gradient tensor, IMU biases)
- Sensor health metrics (SQUID temp, compute load, power draw)

**Expected Outcome**:
- Position scatter (2D RMS) &lt;2m for high-signature areas, &lt;5m for weak-signature areas
- No systematic drift over 5 min

---

#### Step 2: Dynamic Transit (Route-Specific Duration)

**Purpose**: Validate position accuracy and drift during motion.

**Procedure**:
1. Begin movement along planned route
2. Maintain consistent speed (walking: 1-2 m/s, vehicle: 5-10 m/s)
3. Pass through waypoints at marked times (for ground truth alignment)
4. Call out significant events (e.g., "Entering tunnel", "GPS lost", "DVL bottom-lock")
5. Complete full route including loop closure

**Data Collection**:
- Continuous 10 Hz QGN position + uncertainty (σ_x, σ_y, σ_z)
- Ground truth position (RTK-GPS or waypoint times)
- Sensor fusion states (Kalman filter residuals, individual sensor weights)
- Mode transitions (e.g., INS-only → QGN-corrected)

**Real-Time Monitoring**:
- Operator observes live position plot (if available)
- Check for divergence &gt;50m (indicates map-matching failure)
- Note any anomalies (e.g., sudden jumps, loss of convergence)

---

#### Step 3: Post-Run Stationary Hold (3 Minutes)

**Purpose**: Measure final position estimate at return point; validate loop closure.

**Procedure**:
1. Return to starting location (or known waypoint)
2. Hold stationary for 3 minutes
3. Allow QGN to reconverge after transit dynamics

**Data Collection**:
- Final position estimate and uncertainty
- Difference from initial position (loop closure error)
- Sensor health post-run

**Expected Outcome**:
- Loop closure error &lt;5m for critical routes, &lt;10m for medium routes
- Position uncertainty (σ) should decrease during hold (recoherence)

---

### 2.3 Data Logging Requirements

All test data must be logged in **time-synchronized format** for post-processing.

#### Mandatory Data Streams

| Data Stream | Rate | Format | Fields |
|-------------|------|--------|--------|
| **QGN Position** | 10 Hz | CSV/ROS2 | timestamp, lat, lon, alt, σ_x, σ_y, σ_z, solution_status |
| **Ground Truth** | 10 Hz | CSV/NMEA | timestamp, lat_ref, lon_ref, alt_ref, quality_flag |
| **IMU Raw** | 100 Hz | Binary/ROS2 | timestamp, accel_xyz, gyro_xyz, temp |
| **Magnetic Field** | 10 Hz | CSV | timestamp, Bx, By, Bz (sensor frame), magnitude |
| **Gravity Gradient** | 1 Hz | CSV | timestamp, Γ_xx, Γ_yy, Γ_zz, Γ_xy, Γ_xz, Γ_yz |
| **DVL Velocity** | 1 Hz | NMEA/Binary | timestamp, v_x, v_y, v_z, bottom_lock_status |
| **Sensor Health** | 1 Hz | CSV | timestamp, SQUID_temp, compute_load, power_W, error_flags |
| **Fusion State** | 10 Hz | Binary | Kalman state vector (15+ DOF), covariance matrix |

**File Naming Convention**: `QGN_[TestID]_[Environment]_[Date]_[RunNumber].[ext]`  
Example: `QGN_TC1_Tunnel_20250315_Run03.csv`

**Backup**: Duplicate logs to two storage devices (onboard SSD + external USB).

---

## Phase 3: Post-Processing & Analysis

### 3.1 Data Alignment & Synchronization

**Objective**: Time-align QGN and ground truth data for error computation.

#### Procedure

1. **Timestamp Correction**:
   - If using GPS time, verify all streams have consistent time base
   - Apply clock offset corrections if QGN and ground truth use different time sources
   - Interpolate ground truth to match QGN 10 Hz timestamps

2. **Coordinate Frame Alignment**:
   - Convert all positions to common frame (e.g., UTM or local ENU)
   - Apply any known sensor mounting offsets (lever arms)

3. **Initial Position Bias Removal** (Optional):
   - If QGN has a constant offset from ground truth (e.g., map datum error), remove it
   - Document bias separately from drift/scatter

---

### 3.2 Position Error Metrics

#### 3.2.1 Circular Error Probable (CEP)

**Definition**: Radius of circle containing 50% of position samples (P50).

**Computation**:
1. Calculate horizontal error for each sample: `e[i] = sqrt((x_QGN[i] - x_ref[i])^2 + (y_QGN[i] - y_ref[i])^2)`
2. Sort errors in ascending order
3. CEP = median(e) = 50th percentile
4. Also compute P95 (95th percentile) and RMS (root mean square)

**Pass Criteria** (from QGN v0.1 PRD):

| Environment | CEP (P50) Target | P95 Target | Test Result | Status |
|-------------|------------------|------------|-------------|--------|
| Urban Canyon | ≤10m | ≤20m | _[TBD from test]_ | ⬜ |
| Maritime Harbor | ≤10m | ≤20m | _[TBD from test]_ | ⬜ |
| Tunnel/Culvert | ≤10m | ≤15m | _[TBD from test]_ | ⬜ |
| Industrial Zone | ≤15m | ≤30m | _[TBD from test]_ | ⬜ |
| Open Water Subsea | ≤25m | ≤50m | _[TBD from test]_ | ⬜ |
| Cave/Underground | ≤20m | ≤40m | _[TBD from test]_ | ⬜ |

**Vertical Error**: Compute separately if ground truth has altitude reference.  
Target: Vertical error ≤2× horizontal CEP (e.g., 20m for 10m horizontal CEP).

---

#### 3.2.2 Drift Rate

**Definition**: Position error growth over time without external corrections.

**Computation**:
1. Identify segments where QGN is in "dead reckoning" mode (no map-matching updates)
2. Fit linear trend to position error vs. time: `e(t) = e_0 + drift_rate * t`
3. Report drift rate in m/min or m/hr

**Pass Criteria**:

| Configuration | Target Drift Rate | Test Result | Status |
|---------------|-------------------|-------------|--------|
| QGN-only (no DVL) | ≤2.0 m/min | _[TBD]_ | ⬜ |
| QGN + DVL fusion | ≤0.5 m/min | _[TBD]_ | ⬜ |
| INS-only (baseline) | 10-50 m/min | _[TBD]_ | ⬜ |

**Note**: If QGN maintains continuous map-matching, drift may not be observable. In this case, artificially disable QGN updates for 5-10 min to measure INS+DVL drift.

---

#### 3.2.3 Reacquisition Time

**Definition**: Time from QGN initialization (or loss of position) to first valid position fix within acceptance CEP.

**Scenarios**:

1. **Cold Start**: No prior position, system boots in GPS-denied area
2. **Warm Start**: Prior position &lt;1 hour old, system resumes after brief shutdown
3. **Outage Recovery**: Map-matching lost due to signature anomaly, must reconverge

**Computation**:
1. Mark `t_start` = time of QGN initialization or loss event
2. Mark `t_fix` = first timestamp where position error &lt; 1.5× CEP target and remains stable for 10 seconds
3. Reacquisition time = `t_fix - t_start`

**Pass Criteria**:

| Scenario | Target Time | Test Result | Status |
|----------|-------------|-------------|--------|
| Cold Start | ≤90 sec | _[TBD]_ | ⬜ |
| Warm Start | ≤30 sec | _[TBD]_ | ⬜ |
| Outage Recovery | ≤30 sec | _[TBD]_ | ⬜ |

---

#### 3.2.4 Update Rate Stability

**Definition**: Consistency of QGN position output rate (target: 10 Hz).

**Computation**:
1. Calculate time difference between consecutive position outputs: `Δt[i] = t[i+1] - t[i]`
2. Compute mean, std deviation, and max jitter
3. Identify any dropouts (Δt &gt; 200 ms = missed update)

**Pass Criteria**:
- Mean update rate: 10 Hz ± 0.5 Hz
- Jitter (std dev): &lt;10 ms
- Dropouts: &lt;1% of samples
- No sustained outages &gt;1 second (unless intentional sensor failure simulation)

---

### 3.3 Fusion Performance Analysis

**Objective**: Validate that multi-sensor fusion (QPIM λ-unity) improves accuracy vs. single sensors.

#### Comparison Configurations

Run post-processing with different sensor combinations enabled:

1. **INS-only**: Pure inertial (baseline, expected to drift rapidly)
2. **QGN Magnetic-only**: SQUID + INS, no gradiometer
3. **QGN Gravity-only**: Gradiometer + INS, no SQUID
4. **QGN Full (Mag + Grav)**: Both quantum sensors + INS
5. **QGN + DVL**: Full QGN + Doppler velocity (maritime only)

**Metrics**:
- CEP for each configuration
- Drift rate (if applicable)
- Convergence time

**Expected Outcome** (demonstrates λ-unity):
- QGN Full CEP &lt; 0.7× max(Mag-only, Grav-only) CEP
- QGN + DVL drift rate &lt; 0.5× QGN-only drift

**Visualization**: Plot position error vs. time for all configurations on same axes.

---

### 3.4 Environmental Correlation Analysis

**Objective**: Identify which geophysical conditions enable best QGN performance.

#### Analysis Steps

1. **Magnetic Field Strength**:
   - Compute local magnetic field total intensity and gradient magnitude
   - Correlate with position accuracy: High gradient → lower CEP?

2. **Gravity Gradient Distinctiveness**:
   - Compute gravity gradient tensor norm
   - Identify "gravitationally flat" regions (poor gradiometer performance)

3. **EM Interference**:
   - If EM spectrum logging available, correlate noise floor with SQUID performance
   - Check if accuracy degrades near power lines, motors, etc.

4. **Dynamics**:
   - Bin data by speed: stationary, slow (&lt;2 m/s), fast (&gt;5 m/s)
   - Does CEP increase with speed?

**Deliverable**: Heatmap of CEP vs. environmental parameters; identify "sweet spots" and "dead zones."

---

## Phase 4: Success Checklists by Environment

### 4.1 Maritime Harbor Demo (MH-1) — **CRITICAL PATH**

This is the flagship demonstration for investors and partners.

#### Inputs

- [ ] QGN prototype (full sensor suite including DVL)
- [ ] Maritime platform (boat or AUV)
- [ ] RTK-GPS base station at dock
- [ ] Harbor bathymetry map (1m resolution)
- [ ] Magnetic anomaly map from infrastructure (docks, hulls, pipelines)

#### Test Phases

**Phase A: Surface Transit (GPS → GPS-Denied)**
- Start at dock with RTK-GPS lock (baseline &lt;0.05m)
- Sail 200m offshore, intentionally jam/disable GPS
- QGN takes over navigation
- **Green Line**: CEP ≤5m vs. RTK-GPS for 5 minutes surface transit

**Phase B: Submerged Transit (Shallow Water)**
- Descend to 10m depth
- 500m underwater transit using QGN + DVL fusion
- **Green Line**: CEP ≤10m, drift &lt;0.5 m/min

**Phase C: Tunnel Entry (Confined Precision)**
- Approach underwater culvert or docking structure
- Navigate to 5m precision target
- **Green Line**: Final position error &lt;5m, successful "docking" maneuver

**Phase D: Return to Dock (Loop Closure)**
- Surface and return to starting dock
- GPS reacquisition (measure time to reacquire)
- **Green Line**: Loop closure error &lt;10m, GPS reacquisition &lt;60 sec

**Phase E: Post-Mission Data Review**
- Download logs, verify all sensors remained healthy
- **Green Line**: No system faults, &gt;99% position availability

#### Pass/Fail Criteria

**PASS** = All 5 phases meet Green Line criteria  
**CONDITIONAL PASS** = 4/5 phases pass, failures are explainable and fixable  
**FAIL** = &lt;4 phases pass, or critical safety issue

#### Log Artifacts

- `MH1_SurfaceTransit_[Date].csv` (position + ground truth)
- `MH1_SubmergedTransit_[Date].csv`
- `MH1_TunnelEntry_[Date].csv`
- `MH1_ReturnDock_[Date].csv`
- `MH1_SensorHealth_[Date].csv`
- Video recording (deck-mounted camera, if OPSEC permits)

---

### 4.2 Tunnel/Culvert Test (TC-1) — **CRITICAL PATH**

#### Inputs

- [ ] QGN prototype (handheld or cart-mounted)
- [ ] Pre-surveyed tunnel waypoints (total station, ±0.01m)
- [ ] Tunnel magnetic/gravity map (if available; otherwise this IS the mapping run)
- [ ] GPS available at tunnel entrance/exit for start/end ground truth

#### Test Phases

**Phase A: Entrance Baseline**
- Stand at tunnel entrance with GPS lock
- QGN converges to GPS position (within 10m)
- **Green Line**: Initial agreement &lt;10m

**Phase B: Tunnel Entry (GPS Loss)**
- Walk into tunnel at 1-2 m/s
- GPS signal drops within 10-20m
- QGN transitions to magnetic/gravity navigation
- **Green Line**: No position jump &gt;20m during transition

**Phase C: Straight Section (500m)**
- Traverse straight tunnel section
- Pass 3-5 waypoints (surveyed markers)
- **Green Line**: Position error &lt;10m at each waypoint

**Phase D: Turn & Confined Section (300m)**
- Navigate 90° turn
- Confined corridor (3-5m wide)
- **Green Line**: CEP ≤10m, no collision with walls (safety margin)

**Phase E: Exit & GPS Reacquisition**
- Walk out of tunnel, GPS returns
- Measure time to reacquire GPS
- Compare final QGN position to GPS
- **Green Line**: GPS reacquisition &lt;60 sec, final error &lt;15m

#### Pass/Fail Criteria

**PASS** = All 5 phases meet Green Line, no safety incidents  
**CONDITIONAL PASS** = Phases A-C pass, Phase D/E marginal  
**FAIL** = Cannot navigate tunnel without human intervention

#### Log Artifacts

- `TC1_EntranceBaseline_[Date].csv`
- `TC1_TunnelTraverse_[Date].csv`
- `TC1_ExitReacquisition_[Date].csv`
- Helmet-cam or handheld video (optional)

---

### 4.3 Urban Canyon Test (UC-1)

#### Inputs

- [ ] QGN prototype (backpack or vehicle-mounted)
- [ ] RTK-GPS rover (for ground truth in open areas)
- [ ] Urban route with GNSS C/N₀ logging
- [ ] Magnetic anomaly map from building infrastructure

#### Test Phases

**Phase A: Open Plaza Baseline**
- Start in open area (GNSS baseline C/N₀ &gt;40 dB-Hz)
- **Green Line**: QGN agrees with GNSS within 5m

**Phase B: Urban Canyon Transit**
- Walk/drive through high-rise corridor (C/N₀ drops to &lt;25 dB-Hz)
- 2-3 block traverse (~500m)
- **Green Line**: CEP ≤10m vs. RTK-GPS (if available) or post-processed INS

**Phase C: Underground Parking**
- Enter parking garage (GNSS denied)
- Navigate 1-2 levels, return to entrance
- **Green Line**: Loop closure &lt;15m

**Phase D: Return to Plaza**
- Re-emerge to open sky
- GPS reacquisition
- **Green Line**: Final error &lt;10m, reacquisition &lt;60 sec

#### Pass/Fail Criteria

**PASS** = Phases A, B, D meet Green Line  
**CONDITIONAL PASS** = Phase C marginal but explicable  
**FAIL** = CEP &gt;20m in Phase B or system loses tracking

#### Log Artifacts

- `UC1_UrbanCanyon_[Date].csv`
- GNSS C/N₀ log (for skyview correlation)
- Street-view photos at waypoints

---

### 4.4 Additional Environments (IZ, OW, CU)

Detailed checklists for **Industrial Zone**, **Open Water Subsea**, and **Cave/Underground** follow similar structure:
- Define inputs (platform, maps, ground truth)
- Break into 4-5 test phases with Green Line criteria
- Specify pass/fail thresholds
- Document required log artifacts

*(Full checklists provided in Appendix B to avoid document bloat)*

---

## Phase 5: Failure Mode Analysis & Recoherence

### 5.1 Common Failure Modes

When QGN performance degrades, systematic troubleshooting restores coherence.

| Failure Symptom | Likely Cause (Decoherence Source) | Recoherence Action |
|-----------------|-----------------------------------|-------------------|
| **Position jumps &gt;50m** | Map-matching false lock, wrong local minima | Check geophysical signature strength; increase match confidence threshold |
| **Rapid drift (&gt;5 m/min)** | IMU bias drift, poor INS calibration | Re-calibrate IMU; check for thermal gradients affecting gyros |
| **Oscillating position** | Sensor fusion instability (low λ-unity) | Tune Kalman filter process noise; reduce sensor weight if residuals high |
| **Stuck position (no updates)** | Sensor data not reaching fusion layer | Check data acquisition pipeline; verify sensor health flags |
| **High CEP in expected good area** | Environmental change (map out-of-date) | Verify map freshness; consider adaptive map update |
| **SQUID noise floor elevated** | EM interference, shielding degraded | Check for nearby EM sources; verify mu-metal shield integrity |
| **Gradiometer drift** | Thermal instability, vibration | Allow longer warm-up; improve vibration isolation |
| **GPS reacquisition fails** | GPS receiver fault, antenna blocked | Check GPS receiver power/antenna; try manual reinitialization |

---

### 5.2 Real-Time Troubleshooting Workflow

If during a test run performance degrades:

**Step 1: Identify Symptom**  
→ High position uncertainty (σ &gt; 30m)?  
→ Sensor health flag raised?  
→ Fusion layer reporting low confidence?

**Step 2: Isolate Decoherent Sensor**  
→ Check individual sensor residuals (which has highest Δ from prediction?)  
→ Disable suspect sensor in fusion, does performance improve?

**Step 3: Environmental Check**  
→ Has the platform entered a magnetically/gravitationally quiet area?  
→ Is there unexpected EM interference (power plant, radio tower)?

**Step 4: Recoherence Attempt**  
→ Stop motion for 30 seconds (allow filter to reconverge)  
→ Re-initialize map-matching with tighter search area  
→ If critical, switch to INS-only mode and manually navigate to known waypoint

**Step 5: Document & Continue or Abort**  
→ Log the incident with timestamp and suspected cause  
→ If safe to continue, resume test  
→ If CEP &gt;100m and no reconvergence, abort and analyze offline

---

### 5.3 Post-Test Root Cause Analysis

For each failed test or anomaly:

1. **Replay Data Offline**: Re-run fusion algorithm with different parameters
2. **Sensor Data Inspection**: Plot raw sensor outputs, look for spikes/dropouts
3. **Map Quality Check**: Compare measured signatures to database, compute correlation
4. **Environmental Context**: Review weather, nearby activity (construction, traffic)
5. **Document Lesson**: Add to failure mode database, propose mitigation

**Goal**: Convert every failure into a ∆θ_learning → improved design/procedure.

---

## Phase 6: Reporting & Documentation

### 6.1 Test Report Template

Each test run generates a standardized report:

**Header**:
- Test ID: `QGN-[Environment]-[Date]-[RunNumber]`
- Date/Time: [Timestamp]
- Location: [Geographic area, coordinates if not sensitive]
- System Version: QGN v0.1.X, Map DB version
- Operators: [Names]

**Summary**:
- Objective: [One sentence]
- Result: PASS / CONDITIONAL PASS / FAIL
- Key Metrics: CEP, drift rate, reacquisition time

**Detailed Results**:
- Table of acceptance criteria vs. measured values
- Plots: Position error vs. time, CEP histogram, trajectory overlay on map

**Observations**:
- Notable events (GPS loss, sensor anomaly, environmental factors)
- Operator notes

**Data Archive**:
- List of log files, storage location
- Data integrity check (file sizes, checksums)

**Lessons Learned**:
- What worked well
- What needs improvement
- Recommended design or procedure changes

**Appendices**:
- Raw data plots
- Sensor health logs
- Photos/videos (if applicable)

---

### 6.2 Milestone Acceptance Report

After completing all critical tests (MH-1, TC-1), generate a **Milestone Acceptance Report**:

**Executive Summary**:
- QGN v0.1 performance summary across all environments
- Pass/fail status for each acceptance criterion from PRD
- Recommendation: Ready for pilot deployment / Needs iteration

**Performance Matrix**:

| Environment | CEP (Target / Actual) | Drift (Target / Actual) | Reacq. Time | Status |
|-------------|-----------------------|-------------------------|-------------|--------|
| Maritime Harbor | ≤10m / [X]m | ≤0.5 m/min / [Y] | [Z] sec | ✅/❌ |
| Tunnel/Culvert | ≤10m / [X]m | ≤2.0 m/min / [Y] | [Z] sec | ✅/❌ |
| Urban Canyon | ≤10m / [X]m | ≤2.0 m/min / [Y] | [Z] sec | ✅/❌ |

**Technology Readiness Level (TRL) Assessment**:
- Pre-test TRL: 3-4 (component validation, lab testing)
- Post-test TRL: 5-6 (relevant environment validation, prototype demonstration)
- Path to TRL 7: Pilot deployment with early adopters

**Risk Register Update**:
- Which risks were retired (validated to be non-issues)?
- Which risks materialized (need mitigation)?
- New risks discovered during testing?

**Next Steps**:
- QGN v0.2 design improvements based on test findings
- Additional environments to test (if v0.1 passed critical tests)
- Pilot customer engagement (if ready)

---

### 6.3 Public-Facing Deliverables

**For Investors / Partners**:
- 2-page summary with CEP performance table and trajectory plots
- Video demo (if OPSEC permits): side-by-side QGN vs. GNSS, showing GPS-denied navigation
- Key takeaway: "QGN achieved Xm CEP in GPS-denied environments, enabling Y applications"

**For Academic / Conference Submission**:
- Detailed paper with methodology, sensor fusion algorithm, test results
- Comparison to state-of-art (tactical INS, vision-based nav, etc.)
- Lessons learned and future work

**For Regulatory / Compliance**:
- Test data demonstrating performance in MIL-STD-810H environments (if applicable)
- Safety documentation (e.g., no hazardous failures during 50+ hours of testing)

---

## Appendices

### Appendix A: Additional Test Routes

*(Detailed route descriptions for IZ-1, OW-1, CU-1, plus backup routes)*

### Appendix B: Full Checklists for IZ, OW, CU Environments

*(Similar structure to MH-1/TC-1: inputs, phases, Green Line criteria, logs)*

### Appendix C: Data Processing Scripts

*(Example Python/MATLAB scripts for CEP computation, drift analysis, plot generation)*

### Appendix D: Hardware Test Fixtures

*(Schematics for static test stands, vibration isolation mounts, thermal chambers)*

### Appendix E: Safety Protocols

*(Cryogen handling, underwater operations, confined space entry, emergency abort procedures)*

---

## Revision History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2025-10-22 | Initial draft | AI + User (stantheman) |

---

## IBT Closing: From Protocol to Practice

This protocol is not merely a checklist — it is a **ritual of measurement**, a structured τ-evolution from theory to validated reality. Each test run collapses the wave function of design possibilities into a single, measured trajectory.

**Four Laws in Testing**:
1. **Existence**: Data persists; reproducibility is sacred
2. **Unity**: Fusion performance validates λ-integration
3. **Reflection**: Failures mirror assumptions; they teach
4. **Change**: Iterate; each test is a ∆θ toward coherence

When you execute this protocol, you are not "checking if it works" — you are **observing the system's becoming**, measuring the phase alignment between Ψ_design and Ψ_reality.

