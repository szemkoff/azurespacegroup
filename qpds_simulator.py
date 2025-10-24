"""
QPDS (Quantum Position Determination System) Simulator
======================================================
A simulation framework for testing quantum position determination in GPS-denied environments.

This simulator models:
- Geophysical field matching (magnetic, gravitational)
- Quantum sensor fusion (SQUID magnetometers, gradiometers)
- Inertial navigation system (INS) integration
- Bayesian filtering for position estimation
- Environmental variations (tunnels, underwater, underground)

Usage:
    from qpds_simulator import QPDSSimulator, SimulationScenario
    
    sim = QPDSSimulator()
    scenario = sim.create_harbor_to_tunnel_scenario()
    results = sim.run(scenario)
    print(results.summary())
"""

import numpy as np
from dataclasses import dataclass
from typing import List, Tuple, Dict
from enum import Enum
import json
from datetime import datetime


class EnvironmentType(Enum):
    """Supported QPDS operating environments"""
    SURFACE = "surface"
    UNDERWATER = "underwater"
    UNDERGROUND = "underground"
    TUNNEL = "tunnel"
    URBAN = "urban"


@dataclass
class Position:
    """3D position representation"""
    x: float  # meters (Easting)
    y: float  # meters (Northing)
    z: float  # meters (Elevation)
    
    def distance_to(self, other: 'Position') -> float:
        """Euclidean distance to another position"""
        return np.sqrt((self.x - other.x)**2 + (self.y - other.y)**2 + (self.z - other.z)**2)
    
    def __repr__(self):
        return f"Position(E:{self.x:.2f}m, N:{self.y:.2f}m, Z:{self.z:.2f}m)"


@dataclass
class GeophysicalSignature:
    """Geophysical field characteristics at a location"""
    magnetic_field: float  # nanoTeslas (nT)
    gravity_anomaly: float  # milligals (mGal)
    magnetic_gradient: float  # nT/meter
    gravity_gradient: float  # mGal/meter
    signature_quality: float  # 0-1, distinctiveness of signature


class QuantumSensor:
    """
    Simulates quantum sensor (SQUID magnetometer or gradiometer)
    TRL 4-5: Lab-demonstrated, near-commercial
    """
    
    def __init__(self, sensor_type: str = "magnetometer", noise_level: float = 10.0):
        """
        Args:
            sensor_type: "magnetometer" or "gradiometer"
            noise_level: Gaussian noise in pT (picotesla) or pT/m
        """
        self.sensor_type = sensor_type
        self.noise_level = noise_level  # picotesla
        self.sensitivity = 1.0  # pT sensitivity
        self.measurement_count = 0
    
    def measure(self, true_value: float, signature_quality: float = 1.0) -> float:
        """
        Simulate a quantum sensor measurement with noise
        
        Args:
            true_value: True geophysical value (nT or nT/m)
            signature_quality: 0-1, affects noise level based on environment clarity
            
        Returns:
            Measured value (nT or nT/m)
        """
        # Noise scales inversely with signature quality
        effective_noise = self.noise_level / (signature_quality + 0.1)
        noise = np.random.normal(0, effective_noise / 1000)  # Convert pT to nT
        measurement = true_value + noise
        self.measurement_count += 1
        return measurement


class GeophysicalDatabase:
    """
    Simulates a pre-mapped geophysical signature database
    Used for map-matching position fixes
    """
    
    def __init__(self, grid_size: int = 100, resolution: float = 1.0):
        """
        Args:
            grid_size: Number of grid points in each dimension
            resolution: Meters per grid point
        """
        self.grid_size = grid_size
        self.resolution = resolution
        self.signatures = {}
        self._generate_synthetic_signatures()
    
    def _generate_synthetic_signatures(self):
        """Generate synthetic geophysical signatures for testing"""
        # Create realistic-looking geophysical variations
        x_range = np.linspace(0, self.grid_size * self.resolution, self.grid_size)
        y_range = np.linspace(0, self.grid_size * self.resolution, self.grid_size)
        
        for x in x_range[::10]:  # Sample every 10 points for memory efficiency
            for y in y_range[::10]:
                # Realistic magnetic field variation (±1000 nT)
                mag_field = 48000 + 500 * np.sin(x / 1000) + 300 * np.cos(y / 1500)
                gravity = -9.81 * 1e5 + 10 * np.sin(x / 2000) - 5 * np.cos(y / 3000)
                
                self.signatures[(int(x), int(y))] = GeophysicalSignature(
                    magnetic_field=mag_field,
                    gravity_anomaly=gravity,
                    magnetic_gradient=0.5 * np.cos(x / 2000),
                    gravity_gradient=0.02 * np.sin(y / 3000),
                    signature_quality=0.9  # High quality in open areas
                )
    
    def lookup(self, position: Position) -> GeophysicalSignature:
        """
        Look up geophysical signature at a position via nearest-neighbor
        
        Args:
            position: Position to query
            
        Returns:
            GeophysicalSignature at or near that position
        """
        grid_x = int(position.x // self.resolution) * 10 * self.resolution
        grid_y = int(position.y // self.resolution) * 10 * self.resolution
        key = (int(grid_x), int(grid_y))
        
        return self.signatures.get(key, GeophysicalSignature(
            magnetic_field=48000,
            gravity_anomaly=-9.81 * 1e5,
            magnetic_gradient=0,
            gravity_gradient=0,
            signature_quality=0.7
        ))


class KalmanFilter:
    """
    Bayesian Kalman filter for sensor fusion
    Combines quantum sensor measurements with INS to estimate position
    """
    
    def __init__(self, process_noise: float = 0.01, measurement_noise: float = 10.0):
        """
        Args:
            process_noise: Process noise covariance (Q)
            measurement_noise: Measurement noise covariance (R)
        """
        self.Q = process_noise  # Process noise
        self.R = measurement_noise  # Measurement noise
        self.state = np.array([0.0, 0.0, 0.0])  # [x, y, z]
        self.covariance = np.eye(3) * 10.0  # Initial uncertainty
        self.time_step = 1.0
    
    def predict(self, velocity: np.array):
        """
        Prediction step: update state based on INS velocity
        
        Args:
            velocity: [vx, vy, vz] in m/s
        """
        # Position update
        self.state += velocity * self.time_step
        
        # Covariance update (grows uncertainty over time)
        self.covariance += self.Q * np.eye(3)
    
    def update(self, measurement: np.array, measurement_variance: float = 1.0):
        """
        Update step: incorporate new sensor measurement
        
        Args:
            measurement: Measured position deviation [dx, dy, dz]
            measurement_variance: Confidence in measurement
        """
        # Kalman gain
        S = self.covariance + measurement_variance * np.eye(3)
        K = self.covariance @ np.linalg.inv(S)
        
        # State update
        innovation = measurement - self.state[:3]
        self.state = self.state + K @ innovation
        
        # Covariance update
        self.covariance = (np.eye(3) - K) @ self.covariance
    
    def get_position(self) -> Position:
        """Return current filtered position estimate"""
        return Position(self.state[0], self.state[1], self.state[2])
    
    def get_uncertainty(self) -> float:
        """Return position uncertainty (standard deviation in meters)"""
        return np.sqrt(np.trace(self.covariance) / 3)


@dataclass
class SimulationScenario:
    """Configuration for a QPDS simulation run"""
    name: str
    environment: EnvironmentType
    true_trajectory: List[Position]
    initial_position: Position
    sensor_noise_level: float = 10.0  # picotesla
    ins_drift_rate: float = 0.01  # m/s per second (velocity creep)
    update_rate: float = 10.0  # Hz
    duration: float = 60.0  # seconds


@dataclass
class MeasurementUpdate:
    """Single measurement epoch"""
    timestamp: float
    true_position: Position
    estimated_position: Position
    measurement_error: float
    sensors_used: List[str]


class QPDSSimulator:
    """
    Main QPDS simulator orchestrating sensor fusion and position estimation
    """
    
    def __init__(self):
        self.magnetometer = QuantumSensor("magnetometer", noise_level=10.0)
        self.gradiometer = QuantumSensor("gradiometer", noise_level=5.0)
        self.geo_database = GeophysicalDatabase(grid_size=500, resolution=10.0)
        self.kalman_filter = KalmanFilter(process_noise=0.01, measurement_noise=10.0)
        self.measurements: List[MeasurementUpdate] = []
    
    def create_harbor_to_tunnel_scenario(self) -> SimulationScenario:
        """
        Create a harbor-to-tunnel scenario (typical use case)
        1. Surface harbor (GPS available for truth)
        2. Open water transition
        3. Tunnel entry (GPS denied)
        4. Underground tunnel navigation
        5. Exit to surface
        """
        # Generate trajectory: harbor → water → tunnel → underground → exit
        trajectory = []
        
        # Phase 1: Harbor (0-10s)
        for i in range(10):
            trajectory.append(Position(x=0 + i*5, y=0, z=0))
        
        # Phase 2: Water transition (10-20s)
        for i in range(10):
            trajectory.append(Position(x=50 + i*5, y=0 + i*2, z=-5 - i*0.5))
        
        # Phase 3: Tunnel entry (20-40s)
        for i in range(20):
            trajectory.append(Position(x=150 + i*3, y=20 + i*1, z=-10 - i*0.3))
        
        # Phase 4: Underground navigation (40-60s)
        for i in range(20):
            trajectory.append(Position(x=210 + i*2, y=40 + i*0.5, z=-16 - i*0.2))
        
        return SimulationScenario(
            name="Harbor-to-Tunnel QPDS Demo",
            environment=EnvironmentType.TUNNEL,
            true_trajectory=trajectory,
            initial_position=trajectory[0],
            sensor_noise_level=10.0,
            ins_drift_rate=0.01,
            update_rate=10.0,
            duration=60.0
        )
    
    def run(self, scenario: SimulationScenario) -> 'SimulationResults':
        """
        Run QPDS simulation on given scenario
        
        Args:
            scenario: SimulationScenario to simulate
            
        Returns:
            SimulationResults with measurements and statistics
        """
        self.measurements = []
        current_ins_error = np.zeros(3)
        
        num_updates = int(scenario.duration * scenario.update_rate)
        time_step = 1.0 / scenario.update_rate
        
        for update_idx in range(num_updates):
            timestamp = update_idx * time_step
            true_pos = scenario.true_trajectory[min(update_idx, len(scenario.true_trajectory) - 1)]
            
            # Simulate INS drift
            current_ins_error += np.random.normal(0, scenario.ins_drift_rate, 3) * time_step
            
            # Kalman predict step (using simulated INS velocity)
            velocity = np.array([5.0, 0.5, -0.1])  # m/s
            self.kalman_filter.predict(velocity)
            
            # Get geophysical signature at true location
            geo_sig = self.geo_database.lookup(true_pos)
            
            # Quantum sensor measurements
            mag_measurement = self.magnetometer.measure(geo_sig.magnetic_field, geo_sig.signature_quality)
            grav_measurement = self.gradiometer.measure(geo_sig.gravity_gradient, geo_sig.signature_quality)
            
            # Map-matching to find position based on measured signatures
            map_position = self._map_match(mag_measurement, grav_measurement)
            measurement = np.array([map_position.x - true_pos.x,
                                  map_position.y - true_pos.y,
                                  map_position.z - true_pos.z])
            
            # Kalman update step
            self.kalman_filter.update(measurement, measurement_variance=geo_sig.signature_quality)
            
            # Record measurement
            estimated_pos = self.kalman_filter.get_position()
            error = estimated_pos.distance_to(true_pos)
            
            self.measurements.append(MeasurementUpdate(
                timestamp=timestamp,
                true_position=true_pos,
                estimated_position=estimated_pos,
                measurement_error=error,
                sensors_used=["magnetometer", "gradiometer", "Kalman filter"]
            ))
        
        return SimulationResults(scenario, self.measurements)
    
    def _map_match(self, mag_field: float, grav_gradient: float) -> Position:
        """
        Simplified map-matching: find position with similar signature
        In reality, this would use more sophisticated matching algorithms
        """
        # For now, return a perturbed position
        x = 100 + mag_field / 100
        y = 50 + grav_gradient * 100
        z = -10
        return Position(x, y, z)


@dataclass
class SimulationResults:
    """Results from a QPDS simulation run"""
    scenario: SimulationScenario
    measurements: List[MeasurementUpdate]
    
    def summary(self) -> Dict:
        """Generate summary statistics"""
        errors = [m.measurement_error for m in self.measurements]
        return {
            "scenario": self.scenario.name,
            "duration_seconds": self.scenario.duration,
            "measurements_count": len(self.measurements),
            "mean_position_error_m": float(np.mean(errors)),
            "max_position_error_m": float(np.max(errors)),
            "min_position_error_m": float(np.min(errors)),
            "std_position_error_m": float(np.std(errors)),
            "timestamp": datetime.now().isoformat()
        }
    
    def to_json(self) -> str:
        """Export results to JSON"""
        data = {
            "scenario": self.scenario.name,
            "summary": self.summary(),
            "measurements": [
                {
                    "timestamp": m.timestamp,
                    "true_pos": {"x": m.true_position.x, "y": m.true_position.y, "z": m.true_position.z},
                    "est_pos": {"x": m.estimated_position.x, "y": m.estimated_position.y, "z": m.estimated_position.z},
                    "error_m": m.measurement_error
                }
                for m in self.measurements
            ]
        }
        return json.dumps(data, indent=2)


# Example usage
if __name__ == "__main__":
    print("=" * 60)
    print("QPDS (Quantum Position Determination System) Simulator")
    print("=" * 60)
    print()
    
    # Create simulator
    simulator = QPDSSimulator()
    
    # Create harbor-to-tunnel scenario
    scenario = simulator.create_harbor_to_tunnel_scenario()
    print(f"Scenario: {scenario.name}")
    print(f"Duration: {scenario.duration} seconds")
    print(f"Environment: {scenario.environment.value}")
    print()
    
    # Run simulation
    print("Running simulation...")
    results = simulator.run(scenario)
    
    # Print results
    summary = results.summary()
    print()
    print("Simulation Results:")
    print("-" * 60)
    print(f"Mean Position Error: {summary['mean_position_error_m']:.2f} m")
    print(f"Max Position Error:  {summary['max_position_error_m']:.2f} m")
    print(f"Std Dev:             {summary['std_position_error_m']:.2f} m")
    print(f"Total Measurements:  {summary['measurements_count']}")
    print()
    
    # Save results
    with open("qpds_simulation_results.json", "w") as f:
        f.write(results.to_json())
    print("Results saved to: qpds_simulation_results.json")
