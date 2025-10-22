---
title: Quantum Position Determination System (QPDS)
sidebar_position: 4
description: Advanced positioning technology for GPS-denied navigation
---

# Quantum Position Determination System (QPDS)

## Overview

The Quantum Position Determination System (QPDS) represents Azure Space Group's revolutionary approach to navigation in GPS-denied environments. The system combines quantum sensing, geophysical map-matching, and advanced sensor fusion to provide continuous, accurate positioning without external infrastructure.

**Current Status**: QGN v0.1 prototype in development (TRL 3-4 → 5)  
**Target Markets**: Defense, maritime/underwater, underground/industrial  
**Key Advantage**: Passive operation with zero RF emissions

---

## Documentation Structure

This section is organized into focused documents for different stakeholder needs:

### 🎯 **For Partners & Program Managers**
**[QGN v0.1 Product Requirements](./qgn-v01-prd)**
- Executive product summary and acceptance criteria
- KPIs: CEP by environment, drift rates, power budgets
- Bill of Materials with vendor shortlist and costs
- 90-180 day delivery roadmap
- **Start here** if you need specs, timelines, and deliverables

### 🔬 **For Engineers & Researchers**
**[System Architecture & Technology](./system-architecture)**
- Full QPDS vision: 4 quantum subsystems (QERA, PSSM, VFPA, MDRI)
- QPIM sensor fusion framework
- Technology Readiness Levels (TRL 3-4 through TRL 8-9)
- Long-term research tracks (Planck-scale sensing, vacuum fluctuation analysis)

### 🚢 **For Maritime & Underwater Applications**
**[Maritime Operations Guide](./maritime-operations)**
- Harbor-to-tunnel demonstration pattern (5-phase validation)
- INS/DVL integration architecture
- AUV/submarine use cases
- Underwater positioning performance

### 🧪 **For Test Teams**
**[Field Test Protocol](./field-test-protocol)**
- Phase-gated test procedures
- Pass/fail acceptance criteria
- Data collection requirements
- Environment-specific checklists

### 📋 **For Compliance & Integration**
**[Technical Specifications](./technical-specifications)**
- Thermal & EMI budgets (numeric tolerances)
- Failure Modes & Effects Analysis (FMEA)
- Standards compliance (MIL-STD-810H, 461G, IP67/68)
- Interface specifications (ROS2, NMEA, APIs)

---

## Quick Reference: QGN v0.1 at a Glance

| Parameter | Specification |
|-----------|---------------|
| **Position Accuracy** | 10m CEP (urban/tunnel); 25m (open water) |
| **Update Rate** | 10 Hz continuous |
| **Power** | 70-80W operational; 100W peak |
| **Form Factor** | 30 × 30 × 15 cm; ≤10 kg |
| **Environments** | GPS-denied: urban, tunnel, underwater ≤50m, cave |
| **Key Sensors** | SQUID magnetometer, gravitational gradiometer, IMU |
| **Interfaces** | ROS2, NMEA-0183, gRPC APIs |
| **Delivery** | Q2 2025 (90-180 days from kickoff) |

---

## Key Capabilities

### Passive Navigation
- **Zero RF emissions**: Undetectable; OPSEC-friendly
- **No external infrastructure**: No satellites, beacons, or ground stations
- **Jam-proof**: Immune to GPS jamming, spoofing, and denial

### Multi-Domain Operations
- **Underground**: Tunnels, mines, caves, underground facilities
- **Underwater**: AUV operations, submarine transit, harbor approach
- **Urban**: Signal-denied urban canyons, MOUT operations
- **Industrial**: GPS-denied factories, warehouses, cluttered RF environments

### Superior Performance
- **Drift arrest**: 10× better than INS-only after 30 minutes
- **Continuous updates**: 10 Hz position fix without signal outages
- **High availability**: ≥99% over 2-hour missions

---

## Development Timeline

```
┌─────────────────────────────────────────────────────────────┐
│  NOW        90 days      180 days       1 year      2 years │
│   │            │            │             │            │     │
│   └──────QGN v0.1──────────┘             │            │     │
│   Prototype        Field                 │            │     │
│   Build           Testing                │            │     │
│                                           │            │     │
│                              ┌───QGN v2.0─────────────┘     │
│                              Quantum         Production      │
│                              Inertial        Units          │
│                                                              │
│                                          TRL 3-4 → 5 → 6    │
└─────────────────────────────────────────────────────────────┘
```

**Phase 1** (0-90 days): Sensor integration, fusion software, bench testing  
**Phase 2** (90-180 days): Field validation, harbor-to-tunnel demos, partner pilots  
**Phase 3** (6-12 months): Production engineering, early customer deliveries  
**Phase 4** (1-2 years): Enhanced version with atom interferometry & quantum gyros

---

## Target Markets & Applications

### Defense & Security
- Special operations in GPS-denied environments
- Covert insertion/exfiltration
- Signal-denied urban operations (MOUT)
- Counter-UAS navigation

### Maritime & Underwater
- Submarine covert transit
- AUV pipeline inspection & seafloor mapping
- Harbor security & intrusion detection
- Offshore energy: ROV positioning, subsea construction

### Underground & Industrial
- Mining navigation & personnel tracking
- Tunnel boring machine guidance
- Cave rescue & emergency response
- Underground infrastructure inspection

---

## Get Started

**For Partners**: Start with [QGN v0.1 PRD](./qgn-v01-prd) for specs and timelines

**For Engineers**: Review [System Architecture](./system-architecture) for technical depth

**For Maritime Teams**: See [Maritime Operations Guide](./maritime-operations) for demo patterns

**For Test Teams**: Use [Field Test Protocol](./field-test-protocol) for acceptance procedures

---

## Contact & Support

**Technical Lead**: Azure Space Group Engineering  
**Documentation**: This section maintained as living technical reference  
**Updates**: Check git commit history for latest changes

For questions on specific capabilities, procurement, or integration support, refer to the detailed sub-documents linked above.

