---
title: QGN v0.1 Funding Alignment & Grant Strategy
sidebar_position: 5
description: Strategic alignment of QGN capabilities with SBIR/STTR programs and federal funding opportunities
---

# QGN v0.1 Funding Alignment & Grant Strategy

## Executive Summary

This document maps **Quantum Geophysical Navigation (QGN) v0.1** technical capabilities to federal funding opportunities, with emphasis on **SBIR/STTR** programs from DoD, DOE, NSF, and NASA. The goal: secure non-dilutive capital to accelerate prototype development, field validation, and TRL progression while maintaining equity for founders and investors.

**Target Funding**: $1.5-3M in Phase I+II SBIR/STTR awards (18-24 month timeline)  
**Strategic Value**: De-risks technical execution, validates government interest, establishes early customer pipeline

---

## Funding Landscape Overview

### SBIR/STTR Program Structure

**Phase I**: Feasibility Study ($150-300K, 6-12 months)
- Objective: Prove technical feasibility, initial prototype
- Deliverable: Technical report, proof-of-concept demo
- Success Rate: ~15-25% (varies by agency)

**Phase II**: Full Development ($1-2M, 12-24 months)
- Objective: Working prototype, field validation, path to commercialization
- Deliverable: TRL 5-6 system, customer pilot, commercialization plan
- Success Rate: ~40-60% (if Phase I successful)

**Phase III**: Commercialization (No fixed amount, typically contracts)
- Objective: Production deployment, scaling
- Funding Source: Procurement contracts, not grants
- Pathway: Requires Phase II success + government customer commitment

---

## Agency Alignment Matrix

### Priority 1: Office of Naval Research (ONR)

**Why ONR**: Direct mission alignment with underwater/maritime GPS-denied navigation; urgent operational need.

**Relevant Topic Areas**:

| Topic Code | Title | QGN Fit | Phase I $ | Phase II $ | Deadline |
|------------|-------|---------|-----------|------------|----------|
| **N25A-T001** | Underwater Navigation & Positioning (GPS-Denied) | **Excellent** | $250K | $1.8M | Rolling |
| **N25A-T015** | Autonomous Undersea Vehicle (AUV) Enabling Technologies | **Strong** | $250K | $1.6M | Q1 2025 |
| **N25A-T022** | Quantum Sensors for Maritime Domain Awareness | **Excellent** | $300K | $2M | Q2 2025 |

**Key Alignment Points**:
- **Technical**: SQUID magnetometry + gradiometry for subsea nav directly addresses ONR's UUV autonomy gap
- **Operational**: Harbor-to-tunnel demo scenario mirrors Navy contested-environment operations
- **TRL Progression**: ONR seeks TRL 4-5 systems (perfect match for QGN v0.1 timeline)
- **Dual-Use**: Subsea nav has clear commercial applications (offshore energy, marine research)

**Proposal Strategy**:
- **Phase I**: Focus on maritime harbor demo (MH-1), emphasize &lt;10m CEP in subsea environments
- **Phase II**: Expand to multiple test environments, integrate with Navy AUV platform (partner with defense prime)
- **Differentiator**: Passive (RF-silent) navigation = stealth advantage over acoustic/RF alternatives

**POC (Program Officer)**: [TBD — identify from ONR website or introductions]

---

### Priority 2: Defense Advanced Research Projects Agency (DARPA)

**Why DARPA**: High tolerance for ambitious technical challenges; seeks breakthrough capabilities; strong commercialization pathways.

**Relevant Programs**:

| Program | Title | QGN Fit | Funding Model | Status |
|---------|-------|---------|---------------|--------|
| **STOIC** | Sensing Through Obstruction for Improved Cognition | **Strong** | SBIR-like | Active |
| **QNS** | Quantum Navigation Systems | **Excellent** | Direct solicitation | Anticipated 2025 |
| **PIPES** | Precision Inertial and Positioning Enabled Systems | **Moderate** | SBIR | Closed (monitor reopen) |

**Key Alignment Points**:
- **Technical**: DARPA QNS program explicitly seeks quantum-enhanced position/navigation/timing (PNT) alternatives to GPS
- **Challenge**: DARPA prefers &gt;10× improvement vs. state-of-art; we deliver 10× better than INS drift (claim validated)
- **TRL Expectations**: DARPA comfortable with TRL 3-4 starting point (research → prototype transition)
- **Risk Tolerance**: Multi-modal fusion (novel approach) = DARPA-attractive risk profile

**Proposal Strategy**:
- **Phase I** (if SBIR): Demonstrate 10m CEP in 3+ GPS-denied environments (urban, tunnel, subsea)
- **Phase II**: Scale to tactical scenarios (contested urban, deep subsea, extreme Arctic)
- **Differentiator**: Quantum sensors + ML fusion = DARPA's "high-risk, high-reward" sweet spot
- **Partnership**: Consider teaming with university (STTR) for quantum sensor R&D credibility

**POC**: Monitor DARPA solicitation announcements; attend Proposers' Days for QNS program

---

### Priority 3: National Science Foundation (NSF)

**Why NSF**: Strong interest in quantum technology commercialization; SBIR program emphasizes deep-tech startups; good for early-stage.

**Relevant Programs**:

| Program | Title | QGN Fit | Phase I $ | Phase II $ | Deadline |
|---------|-------|---------|-----------|------------|----------|
| **Quantum Leap Challenge Institutes (QLCI)** | Quantum sensing & metrology | **Moderate** | Grant, not SBIR | Variable | Annual |
| **NSF SBIR** | Deep-Tech Commercialization (Quantum track) | **Strong** | $275K | $1.5M | Rolling |
| **ExpandQISE** | Quantum Information Science & Engineering Expansion | **Moderate** | Grant | Variable | Annual |

**Key Alignment Points**:
- **Technical**: NSF values scientific innovation + commercial pathway; QGN bridges both
- **Broader Impacts**: Geophysical map database = open science potential (if non-sensitive areas shared)
- **Education/Workforce**: Partner with university for STTR; train next-gen quantum engineers
- **Commercialization**: NSF SBIR requires clear revenue model (we have: unit sales + subscriptions)

**Proposal Strategy**:
- **Phase I**: Focus on quantum sensor integration science; publish results in peer-reviewed journals
- **Phase II**: Transition to commercial pilots (mining, urban autonomy) — NSF loves dual-use
- **Differentiator**: Academic partnerships (e.g., UConn Quantum Center) strengthen credibility
- **Broader Impacts Section**: Emphasize STEM outreach, open-source geophysical toolkit (sanitized version)

**POC**: NSF SBIR program directors rotate; check nsf.gov for current quantum track leads

---

### Priority 4: Department of Energy (DOE)

**Why DOE**: Interest in quantum sensors for energy infrastructure; ARPA-E funds high-risk energy applications; nuclear security applications.

**Relevant Programs**:

| Program | Title | QGN Fit | Funding Model | Phase I $ | Phase II $ |
|---------|-------|---------|---------------|-----------|------------|
| **ARPA-E OPEN** | Open solicitation (quantum sensing track) | **Moderate** | Cooperative agreement | $500K-2M (single phase) | N/A |
| **QIS for Energy Sciences** | Quantum sensors for subsurface mapping | **Strong** | Grant | Variable | Annual |
| **Nuclear Security** | GPS-denied positioning for secure facilities | **Moderate** | SBIR | $200K | $1.2M |

**Key Alignment Points**:
- **Technical**: Gravitational gradiometry = proven value for subsurface resource mapping (oil/gas, geothermal)
- **Energy Application**: Underground mining autonomy (coal, uranium), tunnel boring for energy infrastructure
- **National Security**: Quantum sensors for GPS-denied positioning in sensitive facilities (nuclear plants, storage)
- **Environmental**: Reduced surveying footprint (fewer drill holes) via better geophysical mapping

**Proposal Strategy**:
- **ARPA-E OPEN**: Pitch as "Quantum-Enhanced Positioning for Subsurface Energy Operations"
- **Phase I/II**: Partner with energy company (pilot customer) — DOE loves industry co-investment
- **Differentiator**: Environmental benefit angle (less invasive surveying) + safety (autonomous underground ops)

**POC**: ARPA-E program directors change by topic; monitor solicitations at arpa-e.energy.gov

---

### Priority 5: NASA

**Why NASA**: Interest in GPS-denied navigation for planetary exploration; quantum sensing for gravity mapping; TRL progression focus.

**Relevant Programs**:

| Program | Title | QGN Fit | Phase I $ | Phase II $ | Deadline |
|---------|-------|---------|-----------|------------|----------|
| **NASA SBIR** | Autonomous systems for lunar/Mars operations | **Moderate** | $150K | $1M | Semiannual |
| **NIAC** | NASA Innovative Advanced Concepts | **Weak** | $175K (I), $600K (II) | N/A | Annual |
| **Planetary Science** | In-situ resource utilization (ISRU) navigation | **Moderate** | Grant | Variable | Annual |

**Key Alignment Points**:
- **Technical**: GPS unavailable on Moon/Mars; quantum geophysical nav could work with pre-mapped planetary magnetic/gravitational fields
- **Challenge**: Planetary mag/grav fields much weaker than Earth's (lower SNR)
- **TRL Expectations**: NASA SBIR seeks TRL 3-6 systems; we fit
- **Dual-Use**: Prove on Earth first (QGN v0.1), then propose lunar adaptation (QGN v2.x)

**Proposal Strategy**:
- **Phase I**: Focus on Earth-based validation (caves, lava tubes = lunar analog environments)
- **Phase II**: Develop "Lunar QGN" variant with enhanced sensitivity for weak fields
- **Differentiator**: Passive navigation = no reliance on orbital infrastructure (resilient)
- **Partnership**: Team with lunar lander company (SpaceX, Blue Origin, Astrobotic) for Phase II

**POC**: NASA SBIR program officers by topic at sbir.nasa.gov

---

## Proposal Writing Strategy

### General Best Practices for SBIR/STTR

1. **Lead with the Problem, Not the Technology**
   - Bad: "We use SQUIDs and gradiometers for positioning"
   - Good: "GPS denial costs Navy $X per failed mission; we deliver 10m accuracy without GPS"

2. **Emphasize TRL Progression**
   - Current TRL: 3-4 (component validation)
   - Phase I Goal: TRL 4-5 (lab → relevant environment)
   - Phase II Goal: TRL 5-6 (prototype → pilot deployment)

3. **Show Commercialization Pathway**
   - SBIR requires viable business model; show unit economics, early customer interest
   - Letter of Support (LOS) from potential customer = huge credibility boost
   - Dual-use angle: Defense validation → commercial scaling

4. **Team Credibility**
   - Highlight quantum sensor experience, navigation expertise, relevant publications
   - Advisory board: include retired military (ONR), academic quantum experts (NSF), energy executives (DOE)
   - STTR option: Partner with university if need academic credibility boost

5. **Realistic Milestones & Budget**
   - Break Phase I into 3-4 quarterly milestones with Go/No-Go decision points
   - Budget: 50-60% technical labor, 20-30% hardware/supplies, 10-20% overhead
   - Avoid padding; reviewers spot inflated budgets

6. **Address "Dual-Use" Explicitly**
   - Especially for DoD: show commercial applications (mining, autonomy, infrastructure)
   - Helps with Phase III transition (procurement contracts require broad utility)

---

## Proposed SBIR/STTR Timeline (Next 24 Months)

| Month | Action | Target Program | Deliverable | Funding |
|-------|--------|----------------|-------------|---------|
| **M0** | Identify open solicitations | ONR, DARPA, NSF | Topic selection | - |
| **M1** | Draft Phase I proposals | ONR N25A-T001, NSF SBIR | 15-page technical + budget | - |
| **M2** | Secure Letters of Support | Navy contact, mining company | LOS from 2-3 potential customers | - |
| **M3** | Submit Phase I proposals | ONR, NSF, DARPA (if open) | 3 proposals submitted | - |
| **M6** | Phase I award decisions | - | 1-2 awards expected (probabilistic) | $200-600K |
| **M7-M12** | Execute Phase I | - | Prototype, field test (MH-1 or TC-1), report | - |
| **M12** | Draft Phase II proposals | - | Based on Phase I results | - |
| **M13** | Submit Phase II proposals | ONR, NSF | 25-page technical + commercialization plan | - |
| **M18** | Phase II award decisions | - | 1 award expected | $1-2M |
| **M19-M36** | Execute Phase II | - | QGN v1.0, pilot deployment, TRL 6 | - |

**Success Scenario**: 2 Phase I awards by M6, 1 Phase II award by M18 = $2.5-3M non-dilutive funding over 24 months

---

## Specific Proposal Outlines

### Proposal #1: ONR Phase I — "Quantum Geophysical Navigation for GPS-Denied Maritime Operations"

**Technical Objectives**:
1. Integrate SQUID magnetometer array + gradiometer + IMU into 30×30×15 cm form factor
2. Develop Bayesian fusion algorithm (QPIM) for multi-modal sensor integration
3. Generate geophysical map database for test harbor (5-10 km² coverage)
4. Demonstrate &lt;10m CEP in maritime harbor scenario (MH-1 demo)

**Milestones** (12 months):
- **M3**: Component integration complete, self-test passed
- **M6**: Map database operational, fusion software tested in simulation
- **M9**: Field test campaign (MH-1), data collection
- **M12**: Final report with CEP analysis, TRL assessment, Phase II proposal

**Budget**: $250K
- Labor (2 FTE × 12 mo): $160K
- Hardware (sensors, compute, enclosure): $60K
- Field test operations (boat rental, RTK-GPS, travel): $20K
- Overhead (15%): $10K

**Deliverables**:
- Working QGN v0.1 prototype
- Test data from MH-1 scenario (CEP plots, sensor logs)
- Technical report (50 pages)
- Phase II proposal (draft)

---

### Proposal #2: NSF SBIR Phase I — "Quantum Sensor Fusion for Commercial GPS-Denied Navigation"

**Technical Objectives**:
1. Validate QGN performance in commercial environments (tunnel, urban canyon, underground mine)
2. Develop auto-map-update pipeline for crowdsourced geophysical data
3. Partner with university (STTR) for quantum sensor noise characterization
4. Publish peer-reviewed paper on multi-modal fusion algorithm

**Milestones** (12 months):
- **M3**: University partnership established, sensor characterization begun
- **M6**: Commercial test sites identified (mining partner, tunnel operator)
- **M9**: Field test campaign (TC-1, UC-1), data collection
- **M12**: Journal publication submitted, commercialization plan finalized

**Budget**: $275K
- Labor (2 FTE × 12 mo): $150K
- Hardware + integration: $50K
- University subcontract (STTR 40% minimum): $60K
- Field ops + travel: $15K

**Deliverables**:
- QGN v0.1 prototype tested in 2 commercial environments
- Peer-reviewed publication (submitted/accepted)
- Commercialization plan with 3+ letters of interest from customers
- Phase II proposal (draft)

**Broader Impacts** (NSF requirement):
- Train 2 graduate students in quantum sensing + navigation
- Open-source geophysical toolkit (sanitized algorithms, non-sensitive maps)
- STEM outreach: Demo at local high schools ("Navigation without satellites")

---

### Proposal #3: DARPA Phase I — "Multi-Modal Quantum Positioning for Contested Environments"

**Technical Objectives**:
1. Demonstrate &gt;10× improvement vs. tactical INS in GPS-denied scenarios
2. Validate performance under intentional jamming/spoofing (contested environment simulation)
3. Achieve &lt;10m CEP in 3 distinct environments (urban, subsea, tunnel)
4. Characterize performance degradation under EMI, magnetic clutter, and geomagnetic storms

**Milestones** (12 months):
- **M3**: Prototype integrated with EMI hardening (shielding, filtering)
- **M6**: Map databases for 3 test environments complete
- **M9**: Field test campaign across all 3 environments
- **M12**: Final report with contested-environment performance analysis

**Budget**: $300K
- Labor (2.5 FTE × 12 mo): $180K
- Hardware (ruggedized sensors, shielding, compute): $80K
- Field ops (3 test sites, ground truth systems): $30K
- Overhead (10%): $10K

**Deliverables**:
- QGN v0.1 prototype hardened for contested environments
- Test data from 3 environments with CEP &lt;10m in 2/3, &lt;15m in 3/3
- Technical report with failure mode analysis (FMEA)
- Phase II proposal targeting tactical deployment

---

## Letters of Support (LOS) Strategy

**Target**: 3-5 letters from potential customers/partners to strengthen commercialization narrative.

### Potential LOS Sources

| Organization Type | Contact Strategy | What to Ask For |
|-------------------|------------------|-----------------|
| **Navy/DARPA Lab** | Intro via advisor, attend ONR SBIR workshop | "Letter of interest in GPS-denied nav for UUVs; willing to provide test platform in Phase II" |
| **Defense Prime** | Cold outreach to BD (business development) | "Interest in integrating QGN into AUV product line if Phase II successful" |
| **Mining Company** | Intro via industry association (e.g., SME) | "Interest in pilot deployment for autonomous underground vehicle navigation" |
| **AUV Manufacturer** | Direct outreach (small companies, not primes) | "Willing to test QGN on our platform; see commercial value in GPS-denied nav" |
| **Tunneling/Construction** | Contact via The Boring Company, Robbins TBM | "Interest in tunnel positioning tech; current solutions inadequate" |

**LOS Template** (customize per organization):
> "[Organization] is aware of Azure Space Group's Quantum Geophysical Navigation (QGN) system and its potential to address GPS-denied positioning challenges in [maritime/underground/urban] operations. If QGN achieves the performance targets outlined in this proposal (&lt;10m CEP in GPS-denied environments), we would be interested in [pilot deployment / integration evaluation / test platform access] during Phase II. We see significant commercial value in passive, RF-silent navigation for [specific application]."

---

## Risk Mitigation & Backup Plans

### Risk 1: Proposal Not Selected (High Probability)

**Likelihood**: 70-85% (typical SBIR rejection rate)

**Mitigation**:
- Submit to multiple agencies (ONR, NSF, DARPA) to diversify odds
- Request reviewer feedback; resubmit to next solicitation cycle with improvements
- Parallel track: Secure venture capital (see Partner Deck) to not be funding-dependent

---

### Risk 2: Phase I Funded, Phase II Rejected

**Likelihood**: 40-60% (Phase I → Phase II attrition)

**Mitigation**:
- Overachieve on Phase I milestones (exceed CEP target, deliver early)
- Cultivate program officer relationship; seek informal feedback mid-Phase I
- Secure commercial pilot customer during Phase I (shows traction beyond SBIR)

---

### Risk 3: Technical Performance Falls Short (CEP &gt;15m)

**Likelihood**: Moderate (integration risk is real)

**Mitigation**:
- Build contingency into milestones ("If CEP &lt;10m, pursue maritime; if 10-15m, pivot to tunnel where acceptable")
- Emphasize learning: "Phase I de-risked fusion algorithm; Phase II will optimize sensors"
- Fall back to "proof of multi-modal fusion value" vs. absolute CEP target

---

## Summary: Funding Recommendations

### Top Priorities (Submit by Q1 2025)

1. **ONR N25A-T001** (Underwater Nav): Highest mission alignment, strong commercialization pathway
2. **NSF SBIR** (Quantum track): Good for early-stage, emphasizes commercialization + broader impacts
3. **DARPA QNS** (if solicited in 2025): High-risk/high-reward; worth the effort if timing aligns

### Secondary Targets (Submit by Q2 2025)

4. **ARPA-E OPEN** (Energy applications): Moderate fit, but high funding amounts justify effort
5. **NASA SBIR** (Lunar analog): Lower priority (far future market), but low competition

### Do Not Pursue (For Now)

- **NIAC**: Too early-stage/speculative; NIAC funds TRL 1-2, we're already TRL 3-4
- **DOE Nuclear Security**: Niche market, complex security clearances, not worth unless strong POC intro

---

## Action Items (Next 30 Days)

- [ ] Identify open solicitations for Q1 2025 (check SBIR.gov, agency websites)
- [ ] Draft proposal outlines for ONR + NSF (1-page executive summaries)
- [ ] Reach out to 5 potential LOS sources (Navy contact, mining company, AUV startup)
- [ ] Recruit proposal writer (consultant or internal) — budget $10-15K per proposal
- [ ] Schedule internal "red team" review of draft proposals (advisors, friendly reviewers)

---

## Conclusion: Strategic Value of SBIR/STTR Pathway

Non-dilutive funding accelerates QGN v0.1 development without equity sacrifice. Beyond capital, SBIR/STTR provides:
- **Customer Validation**: Government interest = proof of concept value
- **Technical De-Risking**: Phase I/II milestones force disciplined execution
- **Commercialization Pathway**: Phase III = procurement contracts (revenue)
- **Investor Signal**: SBIR award = third-party validation for VCs

**Combined Strategy**: Pursue SBIR/STTR (non-dilutive) + Seed/Series A (equity) in parallel. SBIR funds technical execution; VC funds team scaling and go-to-market. Together, they provide 18-24 month runway to TRL 6 and first revenue.

---

## Revision History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2025-10-22 | Initial funding alignment document | AI + User (stantheman) |

