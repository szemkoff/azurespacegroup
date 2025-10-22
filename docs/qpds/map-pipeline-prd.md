---
title: Geophysical Map Pipeline PRD
sidebar_position: 3
description: Map acquisition, storage, updates, and distribution for QGN v0.1
---

# Geophysical Map Pipeline PRD

**Document**: QGN v0.1 Map Pipeline Product Requirements  
**Version**: 0.2  
**Owner**: Azure Space Group - Mapping & Data  
**Status**: Active Development  
**Target**: Phase 2 (Days 15-60)

---

## Executive Summary

The Geophysical Map Pipeline provides the foundational data infrastructure for QGN v0.1 positioning. This system acquires, processes, stores, and distributes magnetic field and gravitational anomaly maps that enable passive navigation in GPS-denied environments.

**Key Requirements**:
- **Coverage**: 5 seed areas (3 maritime harbors, 2 urban/industrial zones)
- **Resolution**: 5-10m horizontal grid; 1-5 nT magnetic; 0.1 mGal gravity
- **Update Cadence**: Monthly baseline refresh; weekly differential updates in high-change areas
- **Distribution**: On-device storage + cloud delta sync
- **Format**: HDF5 + GeoTIFF with versioning and tamper-evident hashes

---

## Seed Area Selection

### Priority 1: Maritime Harbors (QGN Core Domain)

#### Harbor 1: Portsmouth Naval Shipyard (NH/ME)
- **Area**: 5 × 5 km (25 km²)
- **Features**: Naval infrastructure, piers, dry docks, submarine basin
- **Magnetic Signature**: Strong anomalies from ships, pilings, ferrous structures
- **Gravity Signature**: Moderate; underwater topography, basin depth changes
- **Access**: Public waterways; coordinate with NOAA/USACE for survey permissions
- **Priority**: **High** - Navy customer proximity; submarine ops validation

#### Harbor 2: Port of Los Angeles / Long Beach (CA)
- **Area**: 10 × 8 km (80 km²)
- **Features**: Container terminals, breakwaters, channel markers, heavy vessel traffic
- **Magnetic Signature**: Dynamic (vessels moving); strong near terminals
- **Gravity Signature**: Weak in open water; moderate near infrastructure
- **Access**: Commercial port; coordinate with port authority
- **Priority**: **High** - Commercial maritime applications; AUV testing

#### Harbor 3: Narragansett Bay / Naval Station Newport (RI)
- **Area**: 8 × 6 km (48 km²)
- **Features**: Naval War College, submarine facilities, underwater test ranges
- **Magnetic Signature**: Mixed naval/commercial; established anomaly database (NAVOCEANO)
- **Gravity Signature**: Strong bathymetry gradients; underwater canyons
- **Access**: Restricted zones require Navy coordination
- **Priority**: **Medium** - R&D partnerships; underwater range access

---

### Priority 2: Urban/Industrial Zones

#### Zone 1: Boston Urban Canyon (MA)
- **Area**: 3 × 3 km (9 km²) - Downtown Financial District
- **Features**: Steel-frame buildings, subway tunnels (MBTA), underground utilities
- **Magnetic Signature**: Strong vertical gradients; building structural steel
- **Gravity Signature**: Underground tunnels; parking garages; variable density
- **Access**: Public streets; coordinate with city GIS office for utility maps
- **Priority**: **High** - Urban GPS-denied ops; MOUT applications

#### Zone 2: Groton/New London Submarine Base Area (CT)
- **Area**: 4 × 4 km (16 km²) - Base perimeter + Thames River approaches
- **Features**: Submarine piers, dry docks, Electric Boat facilities
- **Magnetic Signature**: Extreme anomalies near piers; degaussing ranges
- **Gravity Signature**: Moderate; river bathymetry
- **Access**: Perimeter accessible; coordinate with base PAO for restricted zones
- **Priority**: **Medium** - Submarine applications; Navy customer proximity

---

## Map Specifications

### Magnetic Field Maps

#### Data Layers
| Layer | Parameter | Resolution | Accuracy | Format |
|-------|-----------|------------|----------|--------|
| **Total Field** | Scalar magnitude | 5m grid | ±5 nT | Float32 |
| **Vector Components** | Bx, By, Bz | 5m grid | ±10 nT/axis | 3 × Float32 |
| **Gradient** | ∇B (x,y,z) | 10m grid | ±2 nT/m | 3 × Float32 |
| **Anomaly Map** | B - IGRF model | 5m grid | ±5 nT | Float32 |

#### Survey Methodology
- **Instrument**: Cesium vapor magnetometer (Geometrics G-858) or equivalent
  - Sensitivity: 0.01 nT
  - Sample rate: 10 Hz
  - GPS sync: RTK-GPS for position (2-5 cm horizontal)

- **Platform**:
  - **Maritime**: Towed sensor array (5m depth); ROV for harbor close-approach
  - **Urban**: Backpack-mounted sensor; walking surveys at 1 m/s

- **Survey Pattern**:
  - Grid spacing: 50m line spacing for coverage; 10m for high-detail zones
  - Cross-tie lines every 500m for quality control
  - Height above ground/water: 1-2m (consistent)

---

### Gravitational Anomaly Maps

#### Data Layers
| Layer | Parameter | Resolution | Accuracy | Format |
|-------|-----------|------------|----------|--------|
| **Bouguer Anomaly** | Free-air corrected | 10m grid | ±0.1 mGal | Float32 |
| **Terrain Correction** | Elevation model | 5m grid | ±0.5m vertical | Float32 |
| **Residual Anomaly** | High-pass filtered | 10m grid | ±0.05 mGal | Float32 |

#### Survey Methodology
- **Instrument**: Scintrex CG-6 Autograv or equivalent
  - Sensitivity: 5 µGal (0.005 mGal)
  - Reading time: 60-90 sec per station
  - GPS: RTK for position

- **Platform**:
  - **Maritime**: Boat-mounted; stopped readings every 50-100m
  - **Urban**: Portable gravimeter; station surveys on foot

- **Survey Pattern**:
  - Station spacing: 50-100m in open areas; 25m in high-detail zones
  - Repeat measurements at 10% of stations for QC

---

## Map Storage & Format

### File Structure

```
maps/
├── metadata.json              # Map catalog with versions, coverage, hashes
├── portsmouth/
│   ├── magnetic/
│   │   ├── v1.0_20250115.h5   # HDF5 with magnetic layers
│   │   ├── v1.1_20250215.h5   # Updated version
│   │   └── delta_v1.0_v1.1.h5 # Differential update
│   ├── gravity/
│   │   ├── v1.0_20250115.h5
│   │   └── v1.1_20250215.h5
│   └── composite/
│       ├── terrain_5m.tif     # GeoTIFF elevation
│       └── basemap.png        # Visual reference
├── losangeles/
│   └── ...
└── boston/
    └── ...
```

### HDF5 Schema (Magnetic Field Example)

```
/metadata
  /survey_date: "2025-01-15"
  /instrument: "Geometrics G-858"
  /datum: "WGS84"
  /epsg_code: 32619  # UTM Zone 19N
  /version: "1.0"
  /hash_sha256: "a3f5..."
  
/grids
  /total_field [2D array, float32]
  /vector_bx [2D array, float32]
  /vector_by [2D array, float32]
  /vector_bz [2D array, float32]
  /anomaly [2D array, float32]
  /uncertainty [2D array, float32]  # Per-pixel uncertainty
  
/geospatial
  /x_coords [1D array, float64]  # Easting (meters)
  /y_coords [1D array, float64]  # Northing (meters)
  /grid_spacing: 5.0 (meters)
  
/quality
  /survey_lines [GeoJSON LineString collection]
  /cross_tie_errors [1D array, float32]
  /noise_floor: 2.5 (nT)
```

### Versioning & Hashes

- **Version Format**: `v<major>.<minor>_<YYYYMMDD>`
  - Major: Significant area coverage change or resurvey
  - Minor: Differential update or local correction
  
- **Tamper-Evident Hash**: SHA-256 of entire HDF5 file
  - Stored in `metadata.json` catalog
  - Verified on device before loading

- **Differential Updates**:
  - Format: Sparse HDF5 with only changed grid cells
  - Includes bounding box and change mask
  - Applied via overlay on base map

---

## Update Cadence & Triggers

### Baseline Refresh
- **Frequency**: Monthly for dynamic areas (harbors); Quarterly for static areas (urban)
- **Trigger**: Scheduled survey missions
- **Distribution**: Full map download (WiFi/Ethernet when docked)

### Differential Updates
- **Frequency**: Weekly in high-change zones (active construction, vessel movements)
- **Trigger**:
  - Automatic: Scheduled surveys in known change areas
  - Manual: User-reported map mismatch (confidence &lt;0.5 for >5 min)
- **Distribution**: Delta sync over cellular/satellite (low bandwidth)

### Change Detection
- **Method**: Compare consecutive survey grids; flag cells with |ΔB| >10 nT or |Δg| >0.2 mGal
- **Confirmation**: Repeat measurement; update only if confirmed
- **Notification**: Alert QGN devices in affected area to download delta

---

## On-Device Storage

### Storage Allocation
- **Onboard SSD**: 128 GB total
  - **Maps**: 64 GB (5-10 seed areas × 2-5 GB each)
  - **Logs**: 32 GB (mission data)
  - **OS/Software**: 32 GB

### Map Loading
- **Preloaded**: All seed area maps during initial provisioning
- **Mission-Specific**: Download additional areas before deployment
- **Fallback**: Operate with reduced coverage if map unavailable (INS-only mode)

### Map Indexing
- **R-tree Spatial Index**: Fast lookup by lat/lon
- **Cache**: Most recently accessed 1 km² in RAM (100-200 MB)
- **Load Time**: &lt;3 seconds for 1 km² region on SSD

---

## Cloud Distribution & Sync

### Map Repository
- **Host**: AWS S3 or equivalent (geo-replicated)
- **Access**: Authenticated API (HTTPS + client cert)
- **Structure**:
  - `/maps/<area>/<type>/v<version>.h5`
  - `/deltas/<area>/<type>/delta_v<old>_v<new>.h5`
  - `/metadata/<area>/catalog.json`

### Sync Protocol
1. **Device Checks**: Query catalog for new versions (HTTPS GET)
2. **Compare Hashes**: Local vs. remote SHA-256
3. **Download**:
   - **Full Map**: If major version change or missing
   - **Delta**: If minor version change
4. **Verify**: Check hash before applying
5. **Apply**: Overlay delta on base map; re-index
6. **Confirm**: Report success to server

### Bandwidth Optimization
- **Delta Size**: Target &lt;10 MB per update (1% of base map)
- **Compression**: gzip or zstd on HDF5 (50-70% reduction)
- **Cellular-Friendly**: Differential updates &lt;5 MB for 3G/4G

---

## Map Quality Assurance

### Survey QA Checklist
- [ ] Cross-tie line errors &lt;5 nT (magnetic) or &lt;0.1 mGal (gravity)
- [ ] GPS horizontal accuracy &lt;10 cm (RTK)
- [ ] Instrument noise floor documented (&lt;2 nT or &lt;5 µGal)
- [ ] Survey line density meets 50m spacing minimum
- [ ] Repeat measurements at 10% of stations within ±2σ

### Processing QA
- [ ] No data gaps >25m (interpolate if necessary; flag uncertainty)
- [ ] Grid alignment checked (no registration errors)
- [ ] Anomaly field computed correctly (subtract IGRF or WGS84 grav model)
- [ ] Outliers filtered (>5σ from local mean removed)
- [ ] Visual inspection for artifacts (gridding, interpolation)

### Validation Tests
- [ ] Test QGN matching against ground-truth GPS (CEP &lt;15m)
- [ ] Confidence scores >0.7 in ≥80% of map area
- [ ] No systematic bias (mean error ~0 over test corridor)

---

## Privacy & Data Governance

### Data Licensing
- **Base Data Sources**:
  - NOAA: Magnetic declination model (public domain)
  - USGS: Gravity database (public domain)
  - OpenStreetMap: Terrain/basemaps (ODbL)
  - **Azure Surveys**: Proprietary differential data

- **License**: Proprietary with customer-specific rights
  - Defense: Full rights; no redistribution without approval
  - Commercial: Use for navigation only; no reverse-engineering

### Sensitive Area Handling
- **Military Installations**: Coordinate with base security; omit classified zones
- **Critical Infrastructure**: Redact power substations, water treatment per DHS guidelines
- **Privacy**: No residential address-level detail; aggregate to 10m grid

### Export Control
- **Classification**: Likely ECCN 9E003 (gravity/magnetic survey data) or EAR99
- **Restrictions**: No distribution to embargoed countries without BIS license
- **End-User Screening**: Required for foreign customers

---

## Development Timeline

### Phase 2: Map Acquisition (Days 15-60)

#### Week 1-2 (Days 15-30): Equipment & Permissions
- [ ] Procure/rent magnetometer (Geometrics G-858 or QuSpin)
- [ ] Procure/rent gravimeter (Scintrex CG-6 or iMAR)
- [ ] RTK-GPS base station setup
- [ ] File survey permits (NOAA, port authorities, city GIS)
- [ ] Recruit survey team (2-3 personnel)

#### Week 3-4 (Days 30-45): Survey Execution
- [ ] Portsmouth survey (3 days maritime + 1 day processing)
- [ ] Los Angeles survey (5 days maritime + 2 days processing)
- [ ] Boston urban (3 days walking + 1 day processing)
- [ ] Groton/New London (2 days + 1 day processing)

#### Week 5-6 (Days 45-60): Processing & Validation
- [ ] Grid all survey data (HDF5 format)
- [ ] Compute anomaly fields (IGRF, WGS84 models)
- [ ] Generate GeoTIFF basemaps
- [ ] Metadata catalog creation
- [ ] Initial QA tests (cross-tie errors, repeat measurements)

**Deliverable**: ≥2 seed area maps completed and validated

---

### Phase 3: Pipeline Integration (Days 60-90)

#### Week 1-2 (Days 60-75): On-Device Integration
- [ ] Implement HDF5 map loader in QGN software
- [ ] R-tree spatial indexing
- [ ] RAM caching layer
- [ ] Map-matching algorithm integration

#### Week 3-4 (Days 75-90): Cloud Infrastructure
- [ ] AWS S3 bucket setup with geo-replication
- [ ] REST API for map catalog
- [ ] Delta generation tooling (compute changed cells)
- [ ] Sync protocol implementation

**Deliverable**: Maps loaded on QGN prototype; cloud sync operational

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Map Coverage** | ≥2 seed areas (≥50 km² total) | Survey logs + HDF5 file sizes |
| **Resolution** | 5-10m grid spacing | HDF5 grid metadata |
| **Accuracy** | Magnetic ±5 nT; Gravity ±0.1 mGal | Cross-tie errors + repeat measurements |
| **QGN CEP** | ≤15m with maps vs. >50m without | Field test comparison |
| **Update Latency** | Delta applied &lt;24 hours after survey | Timestamp logs |
| **Storage Efficiency** | Delta &lt;10% of base map size | File size comparison |

---

## Risk Register

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **Survey permits delayed** | Medium | High | Start permit process early; have backup areas |
| **Equipment unavailability** | Low | High | Rent from multiple vendors; have backups |
| **Weather delays** | High (maritime) | Medium | Schedule buffer; flexible survey windows |
| **Data quality insufficient** | Medium | High | Experienced survey team; rigorous QA |
| **Storage/bandwidth limits** | Low | Medium | Compression; optimize delta algorithm |

---

## Budget Estimate

| Item | Cost | Notes |
|------|------|-------|
| **Magnetometer Rental** | $3-5K/week | 4 weeks total across surveys |
| **Gravimeter Rental** | $2-3K/week | 4 weeks |
| **RTK-GPS Equipment** | $1-2K | Purchase or rental |
| **Survey Team Labor** | $15-20K | 2-3 personnel × 4 weeks |
| **Boat/Vehicle Rental** | $2-3K | Maritime survey platforms |
| **Permits & Fees** | $1-2K | Port authorities, city GIS |
| **Processing/Storage** | $2-3K | AWS, compute resources |
| **Contingency (20%)** | $5-7K | - |
| **TOTAL** | **$30-45K** | Phase 2 map acquisition |

---

## Appendices

### A. Sample Metadata JSON

```json
{
  "catalog_version": "1.0",
  "last_updated": "2025-01-15T18:30:00Z",
  "areas": [
    {
      "name": "portsmouth",
      "bbox": [-70.8, 43.05, -70.7, 43.12],
      "maps": {
        "magnetic": {
          "latest_version": "v1.1_20250215",
          "file": "maps/portsmouth/magnetic/v1.1_20250215.h5",
          "hash_sha256": "a3f5b2c...",
          "size_mb": 145,
          "survey_date": "2025-02-10"
        },
        "gravity": {
          "latest_version": "v1.0_20250115",
          "file": "maps/portsmouth/gravity/v1.0_20250115.h5",
          "hash_sha256": "d7e9f1a...",
          "size_mb": 98,
          "survey_date": "2025-01-12"
        }
      }
    }
  ]
}
```

### B. Delta Update Example

```python
# Pseudo-code for applying delta update
import h5py

base_map = h5py.File('v1.0_20250115.h5', 'r')
delta = h5py.File('delta_v1.0_v1.1.h5', 'r')

# Extract change mask and bounding box
mask = delta['/changes/mask'][:]
bbox = delta['/changes/bbox'][:]

# Apply changes to base map grid
updated_grid = base_map['/grids/total_field'][:].copy()
updated_grid[bbox[0]:bbox[1], bbox[2]:bbox[3]][mask] = delta['/changes/values'][:]

# Save as new version
new_map = h5py.File('v1.1_20250215.h5', 'w')
new_map.create_dataset('/grids/total_field', data=updated_grid)
# ... copy other datasets, update metadata
```

---

**Document Control**:
- Version 0.2 (2025-10-22)
- Next Review: 2025-11-01 (or at Phase 2 gate)
- Approval: [ ] Technical Lead | [ ] PM | [ ] Finance

