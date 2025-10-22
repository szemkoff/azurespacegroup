---
title: QGN v0.2 Release Milestone Criteria
sidebar_position: 6
description: Success criteria and evolution roadmap from v0.1 prototype to v0.2 pilot-ready system
---

# QGN v0.2 Release Milestone Criteria

## Executive Summary

This document defines the **success criteria** for QGN v0.2 — the evolution from v0.1 prototype (TRL 4-5) to v0.2 pilot-ready system (TRL 6-7). The v0.2 release represents the transition from "proof of concept" to "deployable product" suitable for early customer pilots and initial revenue generation.

**Timeline**: v0.1 delivery (Q2 2025) → v0.2 delivery (Q4 2025 / Q1 2026)  
**Development Cycle**: 6-9 months post-v0.1 field validation  
**Investment Required**: $1-2M (funded via SBIR Phase II, Seed/Series A, or pilot customer pre-orders)

---

## Release Philosophy: From Validation to Productization

### v0.1 vs. v0.2 — Key Distinctions

| Aspect | v0.1 (Prototype) | v0.2 (Pilot-Ready) |
|--------|------------------|-------------------|
| **Purpose** | Prove feasibility, validate performance | Deploy with early customers, generate revenue |
| **TRL** | 4-5 (lab → relevant environment) | 6-7 (pilot → pre-production) |
| **Build Quantity** | 1-2 units (custom built) | 5-10 units (reproducible builds) |
| **Reliability** | Best-effort (acceptable failures for learning) | Mission-critical (≥99% uptime) |
| **Documentation** | Engineering notes + test reports | Full user manuals, maintenance guides, training materials |
| **Support** | Developer hands-on-keyboard | Remote diagnostics, customer self-service (partial) |
| **Cost** | $250-350K/unit (prototype BoM) | $150-250K/unit (optimized sourcing, volume discounts) |
| **Form Factor** | 30×30×15 cm (benchtop/cart) | ≤30×30×15 cm, ruggedized enclosure (vehicle-mountable) |
| **Interfaces** | Custom logging (CSV, ROS2) | Standardized outputs (NMEA-0183, gRPC, REST API) |
| **Calibration** | Manual, lab-based | Semi-automated, field-serviceable |

---

## v0.2 Success Criteria by Category

### 1. Performance Requirements

#### 1.1 Position Accuracy (Must-Have)

**Acceptance Criteria**:
- **Maritime Harbor** (MH-1 scenario): CEP ≤ 8m (P50), ≤15m (P95) — *10% improvement vs. v0.1 target*
- **Tunnel/Culvert** (TC-1 scenario): CEP ≤ 8m (P50), ≤12m (P95)
- **Urban Canyon** (UC-1 scenario): CEP ≤ 12m (P50), ≤18m (P95)

**Validation Method**:
- Repeat field test protocol (minimum 3 runs per environment)
- Statistical confidence: 95% of runs meet CEP targets
- Document outlier runs with root cause analysis

**Why This Target**: v0.1 proves feasibility; v0.2 tightens accuracy through:
- Refined sensor calibration procedures
- Improved fusion algorithm (tuned on v0.1 field data)
- Higher-quality geophysical maps (post-v0.1 map refinement)

---

#### 1.2 Drift Performance (Must-Have)

**Acceptance Criteria**:
- **QGN + DVL fusion**: Drift ≤ 0.3 m/min (30 min test, 50% improvement vs. v0.1 target of 0.5 m/min)
- **QGN-only (no DVL)**: Drift ≤ 1.5 m/min (25% improvement vs. v0.1 target of 2.0 m/min)

**Validation Method**:
- Controlled drift test: Disable map-matching for 10-15 minutes, measure position error growth
- Compare to tactical INS baseline (should be 5-10× better)

**Why This Target**: Lower drift = longer missions between map-matching fixes; critical for deep subsea or long tunnels.

---

#### 1.3 Reacquisition Time (Should-Have)

**Acceptance Criteria**:
- **Cold Start**: ≤ 60 sec to CEP ≤10m (vs. v0.1 target of 90 sec)
- **Warm Start**: ≤ 20 sec to CEP ≤8m (vs. v0.1 target of 30 sec)

**Validation Method**:
- Repeated cold/warm start tests (n=10 per scenario)
- Median reacquisition time must meet target

**Why This Target**: Faster reacquisition = better user experience; critical for tactical scenarios with frequent GPS dropout/reacquisition cycles.

---

#### 1.4 Update Rate & Latency (Must-Have)

**Acceptance Criteria**:
- **Position Output Rate**: Sustained 10 Hz for ≥2 hours (no dropouts &gt;100ms)
- **Latency**: Sensor-to-output ≤ 100ms (95th percentile)

**Validation Method**:
- Timestamp analysis of sensor data → fusion output
- Hardware-in-the-loop (HITL) latency measurement

**Why This Target**: Real-time control applications (AUV, autonomous vehicles) require low latency; v0.2 must be "control-grade" not just "logging-grade."

---

### 2. Reliability & Robustness

#### 2.1 Mission Availability (Must-Have)

**Acceptance Criteria**:
- **Uptime**: ≥99% over 2-hour continuous mission (vs. v0.1 informal target)
- **Mean Time Between Failures (MTBF)**: ≥100 hours (measured over 10+ missions)

**Validation Method**:
- Track all system faults, restarts, and anomalies across 20+ field test runs
- Classify faults: critical (mission abort), recoverable (auto-restart), benign (cosmetic)

**Why This Target**: Customers won't tolerate frequent failures; v0.2 must be "pilot-ready" = reliable enough for unsupervised operation.

---

#### 2.2 Environmental Operating Range (Should-Have)

**Acceptance Criteria**:
- **Temperature**: -10°C to +50°C ambient (vs. v0.1 lab: +10°C to +40°C)
- **Humidity**: 0-90% non-condensing
- **Vibration**: MIL-STD-810H Method 514.8 (vehicle-mounted vibration profile)
- **Shock**: MIL-STD-810H Method 516.8 (functional shock)
- **Ingress Protection**: IP67 rating (dust-tight, immersion to 1m for 30 min)

**Validation Method**:
- Environmental chamber testing (temperature, humidity)
- Vibration table testing (if budget permits; otherwise vehicle-mounted stress test)
- IP67 certification via third-party test lab

**Why This Target**: Field deployments encounter harsh conditions; v0.2 must survive maritime, mining, and defense environments.

---

#### 2.3 Power Envelope (Must-Have)

**Acceptance Criteria**:
- **Sustained Operation**: ≤ 80W average power (vs. v0.1 target of 100W peak)
- **Battery Runtime**: ≥ 3 hours on 300Wh battery (self-contained operation)
- **Thermal Management**: All components ≤ 85°C junction temp at 40°C ambient

**Validation Method**:
- Continuous power monitoring (1 Hz logging)
- Thermal imaging during sustained operation (IR camera)

**Why This Target**: Lower power = longer missions, smaller batteries, less thermal management complexity. Critical for underwater AUVs (limited battery capacity).

---

### 3. Usability & Maintainability

#### 3.1 Deployment Time (Should-Have)

**Acceptance Criteria**:
- **Unboxing to Operational**: ≤ 30 minutes for trained operator (vs. v0.1: hours of developer setup)
- **Calibration Time**: ≤ 10 minutes for field calibration (vs. v0.1: lab-based, multi-hour process)

**Validation Method**:
- Time new operator (unfamiliar with system) through deployment procedure
- Document all steps, identify pain points

**Why This Target**: Customers need rapid deployment; v0.2 must be "plug-and-play" (within reason for quantum sensors).

---

#### 3.2 User Interface (Should-Have)

**Acceptance Criteria**:
- **Status Display**: Real-time position, uncertainty (σ), sensor health, on touchscreen or web UI
- **Error Messages**: Human-readable diagnostics (not just error codes)
- **Data Export**: One-click export of mission logs (CSV, KML for Google Earth)

**Validation Method**:
- Usability testing with non-developer operators
- Collect feedback on UI clarity, responsiveness

**Why This Target**: v0.1 is developer-centric (command line, raw logs); v0.2 must be operator-friendly.

---

#### 3.3 Serviceability (Must-Have)

**Acceptance Criteria**:
- **Field-Replaceable Units (FRUs)**: Sensors, compute module, power supply can be swapped without full disassembly
- **Diagnostic Mode**: Built-in self-test (BIT) reports sensor health, identifies faulty components
- **Remote Support**: SSH/VPN access for Azure Space Group engineers to troubleshoot (with customer permission)

**Validation Method**:
- Simulate component failure; measure time-to-repair (target ≤ 1 hour for FRU swap)
- Test remote diagnostic tools on live system

**Why This Target**: Early customers will encounter issues; v0.2 must support remote troubleshooting to minimize downtime.

---

### 4. Software & Integration

#### 4.1 API Standardization (Must-Have)

**Acceptance Criteria**:
- **Position Output**: NMEA-0183 GGA/RMC sentences (maritime standard) + custom extensions for uncertainty
- **ROS2 Integration**: `/qgn/pose` topic (geometry_msgs/PoseWithCovarianceStamped)
- **REST API**: HTTP endpoint for position, sensor health, configuration (JSON responses)
- **gRPC**: High-performance binary API for real-time integration

**Validation Method**:
- Test integration with standard navigation software (QGroundControl, ArduPilot, ROS2 nav stack)
- Verify NMEA parser compatibility with commercial chart plotters

**Why This Target**: v0.1 custom formats are fine for testing; v0.2 must integrate with existing ecosystems.

---

#### 4.2 Map Database Management (Should-Have)

**Acceptance Criteria**:
- **Map Versioning**: Each map has unique ID, timestamp, coverage area metadata
- **Automatic Updates**: System checks for map updates on startup (if network available)
- **Offline Operation**: Gracefully handles missing/stale maps (fallback to INS-only mode with warning)

**Validation Method**:
- Test map update workflow (upload new map, system detects and loads it)
- Simulate out-of-coverage scenario (no map available), verify safe degradation

**Why This Target**: Maps will evolve; v0.2 must handle updates without developer intervention.

---

#### 4.3 Data Logging & Forensics (Must-Have)

**Acceptance Criteria**:
- **Black Box Mode**: Continuous logging of position, sensor data, fusion states to local storage (rolling buffer, last 10 hours)
- **Post-Mission Analysis**: Automated generation of mission report (CEP, drift, sensor health summary)
- **Anonymization**: Option to sanitize logs (remove sensitive location data) for support uploads

**Validation Method**:
- Run 2-hour mission, verify all data captured and retrievable
- Test mission report generation (should complete in &lt;5 minutes)

**Why This Target**: When things go wrong, logs are critical for debugging; v0.2 must capture everything.

---

### 5. Documentation & Training

#### 5.1 User Documentation (Must-Have)

**Deliverables**:
- **Quick Start Guide** (2 pages): Unboxing, connection, first position fix
- **User Manual** (30-50 pages): Full system operation, UI walkthrough, troubleshooting
- **Maintenance Guide** (10-20 pages): Calibration, FRU replacement, storage/transport

**Acceptance Criteria**:
- Documentation reviewed by non-expert (e.g., advisor, non-technical team member)
- All procedures tested by following written instructions (no tribal knowledge required)

**Why This Target**: v0.1 docs are developer notes; v0.2 must support customer self-service.

---

#### 5.2 Training Materials (Should-Have)

**Deliverables**:
- **Video Tutorials** (5-10 min each): Setup, operation, basic troubleshooting
- **Webinar Slides**: 30-minute introduction for new customers
- **FAQ Document**: Answers to 20+ common questions (based on v0.1 user feedback)

**Acceptance Criteria**:
- Train 2 external operators (not on dev team) using only materials; measure success rate

**Why This Target**: Early customers need hand-holding; good training reduces support burden.

---

### 6. Commercialization Readiness

#### 6.1 Cost Optimization (Must-Have)

**Acceptance Criteria**:
- **Target BoM**: ≤ $200K (vs. v0.1 prototype BoM of $250-350K)
- **Cost Breakdown**:
  - SQUID: ≤$70K (volume discount vs. v0.1 $50-80K single unit)
  - Gradiometer: ≤$85K (negotiate with Scintrex or qualify second source)
  - IMU: ≤$35K
  - Compute + Integration: ≤$50K (NVIDIA volume pricing)
- **Gross Margin Target**: 40% (selling price $300-350K)

**Validation Method**:
- Obtain updated quotes from vendors (5-10 unit pricing)
- Build manufacturing cost model with labor, testing, overhead

**Why This Target**: v0.2 must demonstrate viable unit economics; investors/customers need to see path to profitability.

---

#### 6.2 Regulatory Compliance (Should-Have)

**Acceptance Criteria**:
- **FCC Part 15**: EMI emissions testing (if selling in U.S.)
- **CE Mark**: European conformity (if targeting EU maritime market)
- **Export Control**: Formal CCATS determination (EAR99 or specific ECCN)

**Validation Method**:
- Engage compliance lab for pre-testing (identify issues early)
- Submit formal applications for certifications

**Why This Target**: Customers (especially government) require certified products; v0.2 should start compliance process (full certs may take 6-12 months).

---

#### 6.3 First Revenue (Must-Have)

**Acceptance Criteria**:
- **Pilot Customers**: Sign 2-3 pilot contracts (≥$300K total revenue)
- **Deployment**: Deliver v0.2 units to customers, complete at least one 30-day pilot mission
- **Customer Feedback**: Collect structured feedback (survey, interview) for v1.0 roadmap

**Validation Method**:
- Track contract execution: proposal → negotiation → PO → delivery → acceptance
- Document lessons learned from each pilot

**Why This Target**: v0.2 = first revenue event; validates product-market fit and de-risks Series A fundraising.

---

## v0.2 Development Roadmap

### Phase 1: Design Refinement (Months 0-2 post-v0.1)

**Objectives**:
- Analyze v0.1 field test data; identify failure modes and performance bottlenecks
- Design improvements: sensor selection (second-source options), enclosure redesign (IP67), power optimization
- Finalize v0.2 requirements specification (this document → detailed SRD)

**Deliverables**:
- v0.2 System Requirements Document (SRD)
- Updated BoM with vendor quotes (5-10 unit pricing)
- Risk register update (based on v0.1 lessons learned)

---

### Phase 2: Engineering Build (Months 2-4)

**Objectives**:
- Procure long-lead components (SQUIDs, gradiometers)
- Integrate hardware into ruggedized enclosure (IP67 rated)
- Develop v0.2 software: API standardization, UI improvements, map management
- Build 3-5 v0.2 prototype units

**Deliverables**:
- 3-5 v0.2 units (functional, not production-quality)
- Software release candidate (v0.2-RC1)
- Initial documentation draft (user manual, quick start)

---

### Phase 3: Validation Testing (Months 4-6)

**Objectives**:
- Repeat field test protocol with v0.2 units (MH-1, TC-1, UC-1)
- Environmental testing (temperature, vibration, IP67 immersion)
- Reliability stress testing (multi-hour missions, MTBF measurement)
- Customer beta testing (if pilot customers identified)

**Deliverables**:
- Test reports with CEP, drift, reliability metrics
- Bug fix list → v0.2-RC2 software release
- Environmental test certificates (MIL-STD-810H compliance)

---

### Phase 4: Pilot Deployment (Months 6-9)

**Objectives**:
- Deliver v0.2 units to 2-3 pilot customers
- On-site training and integration support
- Monitor pilot missions (remote diagnostics, data collection)
- Collect customer feedback for v1.0 roadmap

**Deliverables**:
- Pilot mission reports (CEP, availability, customer satisfaction)
- Customer testimonials / case studies (for marketing)
- v1.0 requirements document (informed by pilot feedback)

---

## Success Metrics: How We Know v0.2 is Ready

### Go/No-Go Decision Criteria (Pre-Release Checklist)

Before declaring v0.2 "pilot-ready," the following must be **ALL TRUE**:

- [ ] **Performance**: At least 2/3 critical environments (MH, TC, UC) meet CEP targets (≤10m P50)
- [ ] **Reliability**: MTBF ≥100 hours measured over ≥10 test runs (no critical failures)
- [ ] **Usability**: External operator (non-dev) can deploy and operate system in ≤1 hour
- [ ] **Integration**: Successfully tested with at least one standard navigation interface (NMEA, ROS2, or REST API)
- [ ] **Documentation**: User manual complete and validated by non-expert reviewer
- [ ] **Commercialization**: At least 1 pilot customer contract signed (revenue ≥$100K)
- [ ] **Compliance**: Export control determination received (CCATS or legal opinion)

**If ANY criterion fails**: Revise release plan; v0.2 becomes v0.2.1 with additional iteration.

---

### Key Performance Indicators (KPIs) for v0.2 Lifecycle

| KPI | Target (6 months post-release) | Measurement |
|-----|--------------------------------|-------------|
| **Units Deployed** | 5-10 | Count of v0.2 units delivered to customers |
| **Cumulative Mission Hours** | ≥200 hours | Sum of all customer mission durations |
| **Mission Success Rate** | ≥95% | (Successful missions / Total missions) × 100% |
| **Customer Satisfaction** | ≥4.0/5.0 | Post-pilot survey score (Likert scale) |
| **Revenue** | ≥$500K | Total pilot contract value |
| **Support Tickets** | ≤2 per unit per month | Measure of reliability and usability |

---

## Risks & Mitigation Strategies

### Risk 1: v0.1 Field Tests Reveal Fundamental Flaws

**Likelihood**: Low (sensors are proven, risk is in integration)  
**Impact**: High (could delay v0.2 by 3-6 months)

**Mitigation**:
- Build margin into v0.1 → v0.2 timeline (6-9 months, not 3-4)
- Parallel-path sensor alternatives (if SQUID X fails, have backup SQUID Y)
- Engage advisory board for rapid troubleshooting

---

### Risk 2: Pilot Customers Delay or Cancel

**Likelihood**: Moderate (early adopters are flaky)  
**Impact**: Moderate (revenue delay, but technical progress continues)

**Mitigation**:
- Over-recruit pilot customers (target 5, expect 2-3 to convert)
- Offer pilot pricing (discount vs. future production pricing)
- Government SBIR Phase II can substitute for commercial pilots if needed

---

### Risk 3: Regulatory Compliance Takes Longer Than Expected

**Likelihood**: Moderate (certifications are slow)  
**Impact**: Low (can sell to early customers without full certs using waivers)

**Mitigation**:
- Start compliance process early (during Phase 2, not after Phase 4)
- Target government/defense customers first (they often waive commercial certs for R&D systems)
- Plan for v1.0 to have full certifications; v0.2 is "pre-certification pilot"

---

### Risk 4: Cost Optimization Falls Short (BoM &gt;$250K)

**Likelihood**: Moderate (vendors may not offer volume discounts at 5-10 units)  
**Impact**: Moderate (lower margins, but still viable at higher price point)

**Mitigation**:
- Accept higher BoM for v0.2 ($220-250K); target $150-200K for v1.0 (50-100 units)
- Emphasize value over cost in early sales (performance justifies premium)
- Explore alternative sensors (e.g., high-Tc SQUIDs instead of low-Tc) for cost-down

---

## v0.2 → v1.0 Evolution Path

**v0.2 (Pilot-Ready)**: 5-10 units, early customers, manual processes acceptable  
**v1.0 (Production-Ready)**: 50-100 units, repeatable manufacturing, automated testing, full certifications, &lt;$200K BoM

**Expected Timeline**: v0.2 release (Q4 2025) → v1.0 release (Q3 2026)  
**Investment Required**: $3-5M Series A (manufacturing scale-up, sales/marketing, regulatory compliance)

---

## Conclusion: v0.2 as the "Crossing the Chasm" Moment

v0.2 is the transition from **innovators** (dev team, friendly test customers) to **early adopters** (paying customers, real missions). Success criteria are deliberately strict — v0.2 must be robust enough to survive customer deployments without constant developer support.

**The North Star**: At the end of v0.2 lifecycle, we should have:
- **3+ happy pilot customers** (testimonials, case studies)
- **500+ hours** of mission data (proving reliability)
- **Clear v1.0 roadmap** (informed by real-world usage)
- **Series A momentum** (revenue + traction = fundable story)

---

## Revision History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2025-10-22 | Initial v0.2 milestone criteria | AI + User (stantheman) |

---

**v0.2 represents the Ψ-field alignment between technical capability and market readiness — the point where potential becomes manifest revenue.**

