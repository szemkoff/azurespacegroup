---
title: QGN v0.1 Product Requirements Document
sidebar_position: 1
description: Executable specifications for Quantum Geophysical Navigation v0.1 prototype
---

# QGN v0.1 Product Requirements Document

**Product**: Quantum Geophysical Navigation (QGN) System v0.1  
**Status**: Prototype Development (TRL 3-4 → 5)  
**Target Delivery**: Q2 2025 (90-180 days from kickoff)  
**Owner**: Azure Space Group  
**Document Version**: 0.3  
**Last Updated**: October 2025

---

## Executive Product Summary

QGN v0.1 is a **passive GPS-denied navigation kit** providing absolute position fixes in environments where GPS is jammed, denied, or unavailable. The system fuses quantum magnetometry (SQUID), gravitational gradiometry, and inertial sensing with geophysical map-matching to deliver continuous 10 Hz position updates without RF emissions.

**Form Factor**: ≤30 × 30 × 15 cm (target: 35 × 35 × 20 cm with margin)  
**Power**: ≤100W peak (target: 70-80W operational)  
**Mass**: ≤10 kg (target: 8-9 kg)  
**Environments**: Surface/port, open water (≤50m depth), tunnel/culvert, underground

### Value Proposition

- **Passive**: Zero RF emissions → undetectable, OPSEC-friendly
- **Jam-Proof**: Immune to GPS jamming/spoofing/denial
- **Infrastructure-Free**: No satellites, beacons, or external references
- **Continuous**: 10 Hz updates without signal outages
- **Multi-Domain**: Underground, underwater, urban, industrial

---

## Acceptance Criteria & KPIs

### 1. Position Accuracy (Circular Error Probable)

| Environment | P50 (CEP) | P95 | Test Conditions |
|-------------|-----------|-----|-----------------|
| **Urban Canyon** | ≤10 m | ≤20 m | Building density >50%; GNSS C/N₀ <25 dB-Hz |
| **Industrial Zone** | ≤15 m | ≤30 m | Ferrous clutter; EM interference >10 V/m @ 1 kHz |
| **Subsea (Open Water)** | ≤25 m | ≤50 m | Depth 10-50m; weak geo-signatures |
| **Subsea (Harbor)** | ≤10 m | ≤20 m | Magnetic anomalies from piers/infrastructure |
| **Tunnel/Culvert** | ≤10 m | ≤15 m | Confined space; strong mag/grav gradients |
| **Cave/Underground** | ≤20 m | ≤40 m | Variable signatures; no DVL available |

**Acceptance Threshold**: P50 CEP achieved in ≥4 of 6 environments during field validation

---

### 2. Drift Performance

| Configuration | Drift Rate | Test Duration | Acceptance |
|---------------|------------|---------------|------------|
| **QGN-only** (no DVL) | ≤2.0 m/min | 30 min continuous | P95 ≤2.5 m/min |
| **QGN + DVL fusion** | ≤0.5 m/min | 30 min continuous | P95 ≤0.8 m/min |
| **INS-only** (baseline) | 10-50 m/min | 30 min | Reference only |

**Test Protocol**: Static position hold + slow-speed transit (≤2 m/s)

---

### 3. Reacquisition Performance

- **Cold Start** (no prior position): ≤90 sec to CEP ≤15m
- **Warm Start** (prior <1 hr old): ≤30 sec to CEP ≤10m
- **Outage Recovery**: ≤30 sec after geo-signature dropout

**Measurement**: Time from system power-on (or outage end) to first valid position fix with confidence >0.7

---

### 4. Power Budget & Thermal Limits

#### Power Consumption by Mode

| Operating Mode | Power (W) | Thermal Constraint | Test Condition |
|----------------|-----------|---------------------|----------------|
| **Idle/Standby** | ≤20W | SQUID temp ±2°C | Sensors off; compute sleep |
| **Sense** | 50-60W | SQUID ΔT ≤±0.01°C over 30 min | Sensors active; no fusion |
| **Sense + Fuse** | 70-80W | Orin ≤60W sustained; Tjunc ≤85°C | Full ops @ 10 Hz |
| **Peak (DVL)** | ≤100W | Ambient 0-40°C; forced air | All sensors + logging |

#### Thermal Budget Breakdown

| Component | Power (W) | Thermal Management |
|-----------|-----------|---------------------|
| **SQUID + Cryocooler** | 20-25W | Closed-cycle; ΔT ≤±0.01°C over 30 min |
| **Gradiometer** | 10-15W | Passive thermal mass; ΔT ≤±0.05°C |
| **IMU** | 15-20W | Heatsink + forced convection |
| **Compute (Orin)** | 15-60W | Heatsink + fan; Tjunc ≤85°C @ 25°C ambient |
| **Power Management** | 5-10W (loss) | DC-DC efficiency >85% |
| **Total** | **70-80W typical**; **100W peak** | IP67 enclosure with thermal vents |

**Acceptance**: System operates continuously for 2 hours at ≤100W peak without thermal shutdown

---

### 5. EMI/EMC Performance

| Parameter | Specification | Test Standard |
|-----------|---------------|---------------|
| **Magnetic Shielding** | ≥60 dB @ 50/60 Hz; ≥40 dB @ 1 kHz | Custom test; 3-5 layer mu-metal |
| **Conducted Emissions** | MIL-STD-461G CE102 limits | Bench test (engineering level) |
| **Radiated Emissions** | MIL-STD-461G RE102 limits | Bench test (engineering level) |
| **Radiated Susceptibility** | 10 V/m, 10 kHz - 18 GHz | MIL-STD-461G RS103 (spot check) |
| **ESD Protection** | ±4 kV contact; ±8 kV air | IEC 61000-4-2 (Level 2) |

**Note**: Full MIL-STD-461G certification deferred to production; prototype to demonstrate engineering-level compliance

---

### 6. Availability & Reliability

- **Mission Availability**: ≥99% over 2-hour continuous mission
- **Mean Time Between Failures (MTBF)**: TBD from field data (target >1000 hrs)
- **Sensor Health Monitoring**: Real-time fault detection; <1 sec latency
- **Graceful Degradation**: System continues with reduced accuracy if 1 sensor fails

**Test**: 10 × 2-hour missions with <1% downtime (excluding planned maintenance)

---

## Sensor Bill of Materials & Procurement

### SQUID Magnetometer (3-Axis Vector)

| Vendor | Model | Type | Sensitivity | Temp | Power | Lead | Cost |
|--------|-------|------|-------------|------|-------|------|------|
| **QuSpin** ⭐ | QZFM Gen-2 | OPM | 15 fT/√Hz | Ambient | 15W | 8-12 wk | $50-80K |
| Tristan Tech | tSQUID | Low-Tc | 5 fT/√Hz | 4.2K | 25W+cryo | 12-16 wk | $120-150K |
| STAR Cryo | STARcryomag | High-Tc | 20 fT/√Hz | 77K | 20W+cryo | 10-14 wk | $80-100K |

**Recommendation**: QuSpin QZFM Gen-2  
**Rationale**: No cryogen → lower SWaP, faster field deployment, reduced logistics  
**Second Source**: STAR High-Tc as backup

**Procurement**: Order immediately (longest lead item)

---

### Gravitational Gradiometer

| Vendor | Model | Type | Sensitivity | Stability | Power | Lead | Cost |
|--------|-------|------|-------------|-----------|-------|------|------|
| **Scintrex** ⭐ | CG-6 Autograv | Spring | 5 µGal | ±0.01°C | 12W | 6-8 wk | $80-100K |
| iMAR Nav | RQH-1003 | MEMS | 10 µGal | ±0.05°C | 8W | 8-10 wk | $40-60K |
| Lockheed Martin | FTG | Rotating | 1 Eötvös | Custom | 50W | 20-24 wk | $500K+ |

**Recommendation**: Scintrex CG-6  
**Rationale**: Proven commercial support; meets accuracy target; reasonable lead time  
**Second Source**: iMAR RQH-1003 for cost-down in Phase 2

**Procurement**: Order after SQUID confirmed (6-8 week lead acceptable)

---

### Inertial Measurement Unit (IMU)

| Vendor | Model | Type | Bias Stability | ARW | Power | Lead | Cost |
|--------|-------|------|----------------|-----|-------|------|------|
| **KVH Industries** ⭐ | 1775 IMU | FOG | 0.5°/hr | 0.07°/√hr | 18W | 6-8 wk | $30-40K |
| Northrop Grumman | LN-200S | FOG tactical | 1.0°/hr | 0.15°/√hr | 10W | 8-10 wk | $20-30K |
| Honeywell | HG1700 | RLG | 0.01°/hr | 0.005°/√hr | 25W | 10-12 wk | $80-100K |

**Recommendation**: KVH 1775  
**Rationale**: Good performance/cost/availability balance; proven in maritime applications  
**Second Source**: Northrop LN-200S for cost-constrained prototype

**Procurement**: Standard lead time; parallel with gradiometer

---

### Edge Compute Platform

| Vendor | Model | Compute | Power | Rugged | Lead | Cost |
|--------|-------|---------|-------|--------|------|------|
| **NVIDIA** ⭐ | Jetson AGX Orin | 275 TOPS AI | 15-60W | IP65 | 4-6 wk | $2-5K |
| Intel | Movidius Myriad X | 4 TOPS | 2.5W | Module only | 6-8 wk | $500-1K |
| Xilinx/AMD | Kria KV260 | FPGA+ARM | 10-25W | IP67 avail | 6-8 wk | $3-5K |

**Recommendation**: NVIDIA Jetson AGX Orin  
**Rationale**: Best ML performance for map-matching; mature ecosystem (ROS2, CUDA)  
**Power Profile**: 15W idle → 45-60W typical (ML inference @ 10 Hz)

**Procurement**: Off-the-shelf; 4-6 week delivery

---

### Integration Components

#### Power Management
- **Input**: 28V DC ±20% (military standard) or 12V DC (commercial)
- **Outputs**: 12V (SQUID), 5V (IMU, periph), 3.3V (logic)
- **Efficiency**: >85% across load range
- **Protection**: Overvoltage, reverse polarity, soft-start
- **Part**: Vicor DCM series or equivalent; $500-1K

#### Data Acquisition
- **ADC**: 24-bit, 4-8 channels, 1-10 kSPS
- **Part**: Texas Instruments ADS1256 or Analog Devices AD7124; $50-100/ch

#### Enclosure
- **Material**: Aluminum 6061-T6 with anodized finish
- **Rating**: IP67 (dust-tight; water immersion ≤1m for 30 min)
- **Dimensions**: 35 × 35 × 20 cm (allows margin vs. 30×30×15 target)
- **Weight Budget**: 3-4 kg (enclosure + structure)
- **Thermal**: Passive heatsinks + 5W forced-air fan; thermostatic control
- **Cost**: $2-3K (custom fab)

#### Connectors & Cables
- **External I/O**: MIL-STD-38999 Series III circular connectors
- **Internal**: CAN bus (sensors) + Gigabit Ethernet (compute to storage)
- **GPS/GNSS Input**: SMA coax for external antenna (when available)
- **Cost**: $500-1K

---

### Total Bill of Materials

| Category | Cost Range |
|----------|------------|
| **SQUID Magnetometer** | $50-80K |
| **Gravitational Gradiometer** | $80-100K |
| **IMU** | $30-40K |
| **Edge Compute** | $2-5K |
| **Power, DAQ, Enclosure, Integration** | $10-15K |
| **Contingency (15%)** | $25-35K |
| **TOTAL** | **$200-280K** |

**Procurement Strategy**:
1. **Week 0**: Place SQUID order (longest lead: 8-12 weeks)
2. **Week 2**: Order gradiometer, IMU (6-10 week leads)
3. **Week 4**: Order compute, integration parts (4-6 weeks)
4. **Week 8-12**: Sensors arrive; begin integration
5. **Week 12-16**: System integration & bench testing
6. **Week 16-24**: Field validation

---

## Interfaces & Data Formats

### External Interfaces

#### ROS2 Topics (Primary)
- **Input**:
  - `/gps/fix` (sensor_msgs/NavSatFix) - GPS when available
  - `/imu/data` (sensor_msgs/Imu) - IMU data @ 100 Hz
  - `/dvl/velocity` (geometry_msgs/TwistWithCovarianceStamped) - DVL when available
  - `/depth` (sensor_msgs/FluidPressure) - Depth sounder for underwater

- **Output**:
  - `/qgn/position` (sensor_msgs/NavSatFix) - QGN position fix @ 10 Hz
  - `/qgn/odometry` (nav_msgs/Odometry) - Full state (pos, vel, cov) @ 10 Hz
  - `/qgn/diagnostics` (diagnostic_msgs/DiagnosticArray) - Health status @ 1 Hz
  - `/qgn/confidence` (std_msgs/Float32) - Position confidence [0-1] @ 10 Hz

#### NMEA-0183 Output (Secondary)
- **Sentences**:
  - `$GPGGA` - Global Positioning System Fix Data
  - `$GPRMC` - Recommended Minimum Specific GNSS Data
  - `$GPGSA` - GNSS DOP and Active Satellites (simulated)
- **Serial**: RS-232, 4800/9600 baud, 8N1
- **Update Rate**: 1 Hz (compatible with legacy systems)

#### gRPC API (Management & Control)
- **Service**: `QGNService`
  - `GetStatus()` → System health, sensor states, power consumption
  - `GetWeights()` → Current QPIM sensor weights (mag, grav, INS)
  - `SetMode(mode)` → Change operating mode (idle, sense, fuse)
  - `UpdateMap(map_data)` → Push differential map updates
  - `GetFaults()` → Active fault flags with timestamps

- **Protocol**: gRPC over TCP/IP (Ethernet or WiFi)
- **Security**: TLS 1.3; client cert authentication (production)

#### Timing
- **PPS Input**: 1 PPS signal for time synchronization (GPS, IRIG-B, or PTP)
- **10 MHz Reference**: Optional 10 MHz clock input for high-precision timing

---

### Data Logging

#### On-Device Storage
- **Format**: ROS2 bag files (MCAP or SQLite3 backend)
- **Capacity**: 128 GB SSD (≈8-12 hours @ 10 Hz with all sensors)
- **Logged Topics**: All ROS2 input/output + raw sensor data
- **Filename**: `qgn_YYYYMMDD_HHMMSS_<mission_id>.mcap`
- **Metadata**: Git commit hash, sensor serial numbers, map version

#### Off-Device Export
- **Method**: Ethernet file transfer (scp/rsync) or USB 3.0
- **Format**: MCAP bag + JSON manifest with checksums (SHA-256)
- **Post-Processing**: Python scripts for CEP analysis, drift curves, trajectory plots

---

## Compliance & Standards

### Environmental Testing (MIL-STD-810H)

| Method | Condition | Status |
|--------|-----------|--------|
| **500.6 (Low Pressure)** | 4,572 m altitude | Deferred to Phase 2 |
| **501.7 (High Temp)** | +40°C operational | Prototype target |
| **502.7 (Low Temp)** | 0°C operational | Prototype target |
| **506.6 (Rain)** | IP67 → 1m immersion | Bench test |
| **514.8 (Vibration)** | Category 14 (naval) | Spot check (1 axis) |

**Prototype Level**: Engineering validation; full certification in production

---

### EMI/EMC (MIL-STD-461G)

| Test | Requirement | Prototype Status |
|------|-------------|------------------|
| **CE102** (Conducted Emissions) | Limits per 461G | Bench measurement |
| **RE102** (Radiated Emissions) | Limits per 461G | Preliminary scan |
| **RS103** (Radiated Susceptibility)** | 10 V/m, 10 kHz - 18 GHz | Spot check @ 1 GHz |

**Prototype Level**: Demonstrate engineering-level compliance; full test house validation in Phase 2

---

### Enclosure Rating

- **IP67**: Dust-tight; water immersion ≤1m for 30 min (tested)
- **IP68** (stretch goal): Continuous immersion ≤10m for 1 hour (deferred to Phase 2)

---

### Software Bill of Materials (SBOM)

- **Format**: CycloneDX JSON or SPDX 2.3
- **Contents**: All dependencies (ROS2, CUDA, Python libs) with versions and licenses
- **Purpose**: Security audits, export control, supply chain risk management
- **Delivery**: SBOM included with each software release

---

## Export Control & Compliance

### Current Assessment

- **SQUID Magnetometers**: Potentially controlled under USML Category XI(a)(3) or ECCN 6A006.a.1
  - **Mitigation**: Use commercial-grade sensors (QuSpin QZFM) with public specifications
  
- **Gravitational Gradiometers**: ECCN 6A006.b or 6A006.c (depending on sensitivity)
  - **Mitigation**: Scintrex CG-6 is commercial; <1 mGal → EAR99 likely

- **Overall System**: Likely ECCN 7A003 (navigation equipment) or EAR99
  - **Intended Use**: Commercial/defense dual-use for GPS-denied navigation
  - **End-User Screening**: Required for non-US customers

**Action**: Engage export counsel for Commodity Classification (CCATS) determination before foreign sales

---

## Development Timeline

### Phase 1: Specification & Architecture (Days 1-30)
**Deliverables**:
- ✅ QGN v0.1 SRD (this document)
- ✅ Sensor BoM with vendor quotes
- ✅ QPIM fusion architecture design
- [ ] Procurement orders placed

---

### Phase 2: Geophysical Map Development (Days 15-60)
**Deliverables**:
- [ ] 3 pilot area maps (urban, harbor, tunnel)
- [ ] Map resolution: 5-10m grid, 1-5 nT magnetic, 0.1 mGal gravity
- [ ] Map update pipeline architecture

---

### Phase 3: Prototype Integration (Days 30-90)
**Deliverables**:
- [ ] Integrated hardware (sensors + compute + enclosure)
- [ ] QPIM fusion software (Bayesian filter + map-matching)
- [ ] ROS2 interfaces operational
- [ ] Bench tests: sensor PSDs, shielding, thermal soak

---

### Phase 4: Field Validation (Days 60-180)
**Deliverables**:
- [ ] Harbor-to-tunnel demo (3 runs × 3 days)
- [ ] CEP & drift curves published
- [ ] Test report with error budgets by environment

---

## Risk Register

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **SQUID lead time >12 weeks** | Medium | High | Order immediately; QuSpin has shortest lead |
| **Map quality insufficient** | Medium | High | Higher-res surveys; ML feature extraction |
| **Fusion convergence issues** | High | Medium | Extensive HITL testing; fallback algorithms |
| **Power budget exceeded** | Medium | Medium | Duty-cycling; sensor down-select; optimize compute |
| **Thermal stability failure** | Low | High | Closed-cycle cryo; thermal mass for gradiometer |
| **EMI/EMC non-compliance** | Low | Medium | Early screening; mu-metal stack; grounding plan |

---

## Acceptance Gate Criteria

**Go/No-Go Decision Points**:

### Phase 1 Gate (Day 30)
- [ ] All sensors ordered with confirmed lead times
- [ ] Fusion architecture peer-reviewed
- [ ] Budget approved ($200-280K BoM + labor)

### Phase 2 Gate (Day 60)
- [ ] ≥2 pilot area maps completed
- [ ] Map-matching algorithm validated in simulation

### Phase 3 Gate (Day 90)
- [ ] Integrated prototype operational
- [ ] Bench test CEP <20m in HITL simulation
- [ ] Power draw ≤100W measured

### Phase 4 Gate (Day 180)
- [ ] Field test CEP ≤15m in ≥2 environments
- [ ] Drift ≤2 m/min (QGN-only) demonstrated
- [ ] Availability ≥99% over 10 × 2-hour missions

**Final Acceptance**: Phase 4 gate + test report published → Proceed to production engineering

---

## Document Control

**Version History**:
- v0.1 (2025-10-15): Initial draft
- v0.2 (2025-10-20): Added thermal budgets, FMEA, standards
- v0.3 (2025-10-22): Added interfaces, timeline, acceptance gates

**Approvals**:
- [ ] Technical Lead: _______________
- [ ] Program Manager: _______________
- [ ] Finance: _______________

**Next Review**: 2025-11-01 (or upon Phase 1 gate)

