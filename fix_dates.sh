#!/bin/bash

# Fix the date format first
sed -i '' 's/dateFormat YYYY-MM/dateFormat YYYY/' src/pages/project-status.js

# Core Research section
sed -i '' 's/2023-01, 2024-12/2023, 2y/g' src/pages/project-status.js
sed -i '' 's/2024-01, 2026-12/2024, 3y/g' src/pages/project-status.js
sed -i '' 's/2024-06, 2027-06/2024, 3y/g' src/pages/project-status.js
sed -i '' 's/2024-08, 2027-12/2024, 4y/g' src/pages/project-status.js
sed -i '' 's/2025-01, 2025-05/2025, 1y/g' src/pages/project-status.js
sed -i '' 's/2025-04, 2025-08/2025, 1y/g' src/pages/project-status.js

# Prototype Development section
sed -i '' 's/2025-04, 2026-06/2025, 2y/g' src/pages/project-status.js
sed -i '' 's/2025-06, 2026-10/2025, 2y/g' src/pages/project-status.js
sed -i '' 's/2025-08, 2026-12/2025, 2y/g' src/pages/project-status.js
sed -i '' 's/2025-10, 2026-08/2025, 2y/g' src/pages/project-status.js
sed -i '' 's/2026-10, 2028-12/2026, 3y/g' src/pages/project-status.js

# System Integration section
sed -i '' 's/2025-03, 2026-09/2025, 2y/g' src/pages/project-status.js
sed -i '' 's/2026-06, 2027-12/2026, 2y/g' src/pages/project-status.js
sed -i '' 's/2027-10, 2029-06/2027, 2y/g' src/pages/project-status.js
sed -i '' 's/2025-06, 2027-04/2025, 2y/g' src/pages/project-status.js
sed -i '' 's/2026-02, 2027-08/2026, 2y/g' src/pages/project-status.js
sed -i '' 's/2025-10, 2027-12/2025, 3y/g' src/pages/project-status.js

# Vehicle Development section
sed -i '' 's/2025-01, 2026-12/2025, 2y/g' src/pages/project-status.js
sed -i '' 's/2026-06, 2028-06/2026, 2y/g' src/pages/project-status.js
sed -i '' 's/2026-01, 2029-12/2026, 4y/g' src/pages/project-status.js
sed -i '' 's/2028-01, 2032-12/2028, 5y/g' src/pages/project-status.js
sed -i '' 's/2033-01, 2037-12/2033, 5y/g' src/pages/project-status.js
sed -i '' 's/2038-01, 2042-12/2038, 5y/g' src/pages/project-status.js

# Energy Systems section
sed -i '' 's/2024-06, 2027-06/2024, 3y/g' src/pages/project-status.js
sed -i '' 's/2025-07, 2028-06/2025, 3y/g' src/pages/project-status.js
sed -i '' 's/2026-01, 2028-06/2026, 2y/g' src/pages/project-status.js
sed -i '' 's/2025-01, 2026-12/2025, 2y/g' src/pages/project-status.js
sed -i '' 's/2026-01, 2028-12/2026, 3y/g' src/pages/project-status.js

# Communication & Control section
sed -i '' 's/2024-06, 2027-06/2024, 3y/g' src/pages/project-status.js
sed -i '' 's/2025-01, 2026-12/2025, 2y/g' src/pages/project-status.js
sed -i '' 's/2025-06, 2027-12/2025, 3y/g' src/pages/project-status.js
sed -i '' 's/2024-01, 2026-12/2024, 3y/g' src/pages/project-status.js
sed -i '' 's/2024-08, 2026-10/2024, 3y/g' src/pages/project-status.js
sed -i '' 's/2025-02, 2027-06/2025, 2y/g' src/pages/project-status.js

# Human Integration section
sed -i '' 's/2025-01, 2027-06/2025, 2y/g' src/pages/project-status.js
sed -i '' 's/2026-01, 2028-12/2026, 3y/g' src/pages/project-status.js
sed -i '' 's/2027-01, 2030-12/2027, 4y/g' src/pages/project-status.js
sed -i '' 's/2028-01, 2030-12/2028, 3y/g' src/pages/project-status.js

# Commercialization section
sed -i '' 's/2024-01, 2029-12/2024, 6y/g' src/pages/project-status.js
sed -i '' 's/2025-01, 2026-12/2025, 2y/g' src/pages/project-status.js
sed -i '' 's/2025-01, 2027-12/2025, 3y/g' src/pages/project-status.js
sed -i '' 's/2028-01, 2037-12/2028, 10y/g' src/pages/project-status.js
sed -i '' 's/2033-01, 2042-12/2033, 10y/g' src/pages/project-status.js
sed -i '' 's/2033-01, 2042-12/2033, 10y/g' src/pages/project-status.js
sed -i '' 's/2038-01, 2047-12/2038, 10y/g' src/pages/project-status.js

echo "Date formats fixed in project-status.js" 