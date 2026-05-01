================================================================================
QPDS MATLAB SIMULATOR - Quick Reference Guide
================================================================================

Version: 1.0
Date: October 24, 2025
Status: Ready for Use (NOT for GitHub - Local Only)
Author: Azure Space Group Research Team

================================================================================
FILES INCLUDED
================================================================================

1. qpds_matlab_simulator.m (19 KB)
   - Main executable MATLAB script
   - Contains 3 classes: KalmanFilterND, QPDSSimulator, QPDSSimulationResult
   - Ready to run: just open and execute
   - Generates 3 figures + 4 export files

2. QPDS_MATLAB_DOCUMENTATION.md (14 KB)
   - Comprehensive technical documentation
   - Architecture overview, error models, usage examples
   - Environment definitions, output formats
   - Advanced configuration and troubleshooting

3. MATLAB_SIMULATOR_README.txt (This file)
   - Quick start reference
   - File descriptions, usage examples

================================================================================
QUICK START (2 MINUTES)
================================================================================

Step 1: Open MATLAB
   >> cd /Users/stantheman/AndroidStudioProjects/NewEarthOrder
   >> open qpds_matlab_simulator.m

Step 2: Run the Script
   >> Run (Ctrl+Enter or click Run button)

Step 3: Wait for Completion
   - Console shows progress: "Processing..." then "Simulation Complete"
   - 3 figure windows open with visualizations
   - 4 files exported to current directory

Step 4: Check Output Files
   - qpds_simulation_results.json
   - qpds_measurements.csv
   - qpds_underwater.csv
   - qpds_urban.csv

================================================================================
USAGE EXAMPLES
================================================================================

EXAMPLE 1: Run Default Scenario
   >> qpds_matlab_simulator
   (Runs Harbor-to-Tunnel + 2 additional scenarios automatically)

EXAMPLE 2: Create Custom Scenario
   sim = QPDSSimulator(environments);
   scenario = sim.createCustomScenario('UNDERWATER', 120, 20);
   results = sim.run(scenario, 'sensorNoise', 18, 'verbose', true);
   results.plotResults();
   results.exportCSV('my_results.csv');

EXAMPLE 3: Batch Processing
   scenarios = {
       sim.createHarborToTunnelScenario(), ...
       sim.createCustomScenario('URBAN', 60, 15)
   };
   for i = 1:length(scenarios)
       results = sim.run(scenarios{i}, 'sensorNoise', 10);
       results.exportCSV(sprintf('scenario_%d.csv', i));
   end

EXAMPLE 4: High-Resolution Analysis
   scenario = sim.createCustomScenario('SURFACE', 300, 50);  % 300s @ 50Hz
   results = sim.run(scenario, 'sensorNoise', 5, 'verbose', true);
   results.plotResults();

================================================================================
ENVIRONMENTS AVAILABLE
================================================================================

1. SURFACE
   - Low noise (5-8 pT)
   - High quality signature (0.95)
   - Minimal INS drift (0.001 m/s²)
   - Use: Harbor, open ocean, baseline scenarios

2. UNDERWATER
   - Medium-high noise (15-20 pT)
   - Good signature quality (0.85)
   - Moderate INS drift (0.01 m/s²)
   - Use: Submarine navigation, underwater robotics

3. UNDERGROUND
   - Medium noise (10-15 pT)
   - Fair signature quality (0.75)
   - Moderate INS drift (0.005 m/s²)
   - Use: Tunnel, mine, cave surveys

4. URBAN
   - Medium noise (10-15 pT)
   - Poor signature quality (0.70)
   - Moderate INS drift (0.008 m/s²)
   - Use: City streets, urban search & rescue

================================================================================
OUTPUT DATA
================================================================================

CONSOLE OUTPUT:
   - Simulation progress (0-100%)
   - Duration, update rate, sensor noise settings
   - Mean Error, Max Error, Std Dev, CEP, RMS Error
   - File export confirmations

FIGURE 1: Position Error Analysis (6 panels)
   Panel 1: Error over time with mean reference
   Panel 2: INS drift accumulation
   Panel 3: Quantum sensor noise
   Panel 4: Kalman filter performance
   Panel 5: Error distribution histogram
   Panel 6: Statistics summary

CSV FILES:
   Columns: Time_s, TotalError_m, INSDrift_m, SensorError_pT, 
            MagneticField_nT, GravityAnomaly_mGal, KalmanEstimate_m
   Use: Data analysis, plotting, Excel import

JSON FILES:
   Structure: scenario, statistics, environment, kalmanParams, measurements
   Use: Data interchange, web API, Python/R import

================================================================================
KEY PARAMETERS
================================================================================

When creating custom scenarios, adjust:

   environment     - SURFACE, UNDERWATER, UNDERGROUND, or URBAN
   duration        - Test time in seconds (10-600 recommended)
   updateRate      - Measurement frequency in Hz (1-50)
   sensorNoise     - Quantum sensor noise in pT (1-50, default 10)

Example:
   scenario.duration = 120;     % 2 minutes
   scenario.updateRate = 20;    % 20 measurements per second = 2400 total
   
   results = sim.run(scenario, 'sensorNoise', 15, 'verbose', true);

================================================================================
EXPECTED PERFORMANCE
================================================================================

Computation Times (Intel i7, 16GB RAM):
   60 seconds @ 10 Hz:   <1 second
   300 seconds @ 10 Hz:  2-3 seconds
   600 seconds @ 50 Hz:  5-10 seconds

Typical Accuracy Results (mean error):
   Surface:     50-100 m     (best case)
   Underwater:  150-250 m    (good coherence)
   Underground: 200-300 m    (poor signatures)
   Urban:       250-350 m    (multipath)

================================================================================
MODIFYING THE SIMULATOR
================================================================================

To Add a New Environment:
   >> Edit qpds_matlab_simulator.m, find "Define Environment Parameters"
   >> Add:
      environments.LUNAR = struct(...
          'label', 'Lunar Surface', ...
          'noiseLevel', [2, 4], ...
          'quality', 0.99, ...
          'insDriftRate', 0.0001, ...
          'description', 'Lunar rover navigation');

To Change Kalman Filter Parameters:
   >> In run() method, adjust:
      kf = KalmanFilterND(0.001, sensorNoise, dt);
      % First parameter: process noise (0.001 = trust model)
      % Second parameter: measurement noise (trust sensors less = higher value)

To Add Custom Error Model:
   >> In the main loop, add before "totalPosError" calculation:
      customError = your_error_calculation(t, environment);
      totalPosError = sqrt(insDrift^2 + thermalDrift^2 + customError^2);

================================================================================
TROUBLESHOOTING
================================================================================

Problem: Script runs very slowly
Solution: Reduce updateRate or duration
   scenario.updateRate = 5;    % 5 Hz instead of 20 Hz
   scenario.duration = 30;     % 30 seconds instead of 120

Problem: JSON export fails
Solution: Ensure MATLAB R2016b or later, or use CSV instead
   results.exportCSV('fallback.csv');

Problem: Figures don't display
Solution: Check graphics settings and try:
   figure('Visible', 'on');
   results.plotResults();

Problem: Memory error with large simulations
Solution: Reduce sampling rate and batch process smaller scenarios
   scenario.updateRate = 2;    % Very low update rate
   % Then run multiple shorter scenarios sequentially

================================================================================
NEXT STEPS
================================================================================

1. REVIEW DOCUMENTATION
   Open: QPDS_MATLAB_DOCUMENTATION.md
   Sections: Architecture, Error Models, Advanced Configuration

2. RUN EXAMPLE SCENARIOS
   Start with default (Harbor-to-Tunnel)
   Then try custom underwater and urban scenarios

3. ANALYZE RESULTS
   Import CSV files into Excel, Python, or R
   Compare statistics across different environments

4. EXTEND SIMULATOR
   Add new environments or error sources
   Modify Kalman filter parameters for your use case
   Implement domain-specific analysis

5. INTEGRATION
   Use results in MATLAB Simulink models
   Export to Python for machine learning
   Share CSV/JSON with collaborators

================================================================================
REQUIREMENTS
================================================================================

MATLAB Version: R2016b or later
   - Earlier versions need manual jsonencode() replacement
   - All other features should work with R2014b+

Toolboxes (built-in functions used):
   - Statistics and Machine Learning Toolbox (std, histogram)
   - Signal Processing Toolbox (signal generation)

Disk Space: ~100 MB (for simulator + output files)

RAM: 512 MB minimum (2 GB recommended for 30000+ measurements)

================================================================================
SUPPORT & DOCUMENTATION
================================================================================

Full Documentation: QPDS_MATLAB_DOCUMENTATION.md
Quick Reference:    This file (MATLAB_SIMULATOR_README.txt)
Python Version:     qpds_simulator.py (for cross-validation)
Web Version:        https://szemkoff.github.io/azurespacegroup/docs/qpds/simulator/

For Questions:
   - Consult QPDS_MATLAB_DOCUMENTATION.md
   - Review example code in comments
   - Check error messages in console output

For Issues:
   - Verify MATLAB version is R2016b or later
   - Check that all input parameters are valid
   - Ensure output directory has write permissions

================================================================================
VERSION HISTORY
================================================================================

v1.0 (Oct 24, 2025)
   - Initial release
   - 3 core classes: KalmanFilterND, QPDSSimulator, QPDSSimulationResult
   - 4 environments: Surface, Underwater, Underground, Urban
   - 2 built-in scenarios: Harbor-to-Tunnel + custom creation
   - CSV and JSON export
   - 6-panel visualization
   - Comprehensive error modeling (thermal, geophysical, INS, sensor)

================================================================================
LICENSE & DISTRIBUTION
================================================================================

Status: INTERNAL USE ONLY
Repository: Local (NOT on GitHub)
Distribution: Keep local to project directory only
Sharing: Share via email/Teams (not public repositories)

This simulator contains proprietary research and must remain confidential.

================================================================================
Contact: research@azurespacegroup.org
Last Updated: October 24, 2025
================================================================================
