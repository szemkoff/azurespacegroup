---
slug: documentation-and-qpds-milestones
title: "Documentation and QPDS Milestones: Communications Research, MATLAB Simulator, and Site Updates"
authors: [szemkoff]
tags: [updates, qpds, quantum, communications, documentation, simulation]
date: "2026-04-29"
---

We have shipped a coordinated set of updates across research documentation, communication systems, and the Quantum Position Determination System (QPDS) toolchain. This post summarizes what is new and where to find it.

## Gravitational communication research (exploratory)

We added a structured, frontier-research document on **dual-mode gravity** as a hypothetical framework for non-local signaling: a subatomic-scale layer contrasted with classical gravitation, plus implications for detection, system architecture, and interstellar communication concepts. The material is explicitly **exploratory**—meant to map hypotheses, experiments, and design ideas rather than to assert settled physics.

- **[Gravitational Communication Hypothesis](/docs/research-documentation/gravitational-communication-hypothesis)** — full analysis (models, detection strategies, device concepts, risks, roadmap).
- **[Communication Systems](/docs/core-documentation/communication-systems)** — new subsection tying this line of research into our interstellar and quantum communication narrative, with links from the project overview and technical diagrams index.

This sits alongside our existing **quantum entanglement** communication story as a parallel research thread for long-range, non-electromagnetic channels.

## QPDS: MATLAB simulation stack

The QPDS simulation path is now centered on **MATLAB** for harbor-to-tunnel and related scenarios:

- **`qpds_matlab_simulator.m`** — object-oriented simulator with scenario classes, sensor fusion, and export helpers.
- **`QPDS_MATLAB_DOCUMENTATION.md`** and **`MATLAB_SIMULATOR_README.txt`** — usage, architecture, and batch patterns.
- **`qpds_simulation_results.json`** — example output (timestamps, true vs. estimated position, errors) for tooling and demos.

Legacy **Python** simulator files have been retired from the repository in favor of this MATLAB baseline, which aligns with many partners’ navigation and defense workflows.

## Site and publishing

The **GitHub Pages** documentation pipeline was simplified: build the Docusaurus site, then deploy to the `gh-pages` branch in a single, auditable flow. Local Python virtual environments are ignored via `.venv/` in `.gitignore` to keep contributor setups clean.

## Where to start

| Audience | Link |
|----------|------|
| Communications & interstellar concepts | [Communication Systems](/docs/core-documentation/communication-systems) |
| Gravity-channel hypothesis (full paper-style doc) | [Gravitational Communication Hypothesis](/docs/research-documentation/gravitational-communication-hypothesis) |
| QPDS / QGN engineering | [QPDS overview](/docs/qpds/) and MATLAB materials in the repository root |

We will continue to evolve these documents as field tests, simulator results, and partner feedback land. Thank you to everyone contributing reviews and technical input.
