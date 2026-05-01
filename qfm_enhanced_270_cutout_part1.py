import bpy
import math
import random
from mathutils import Vector

# Class to store parameters
class QFM_Parameters:
    def __init__(self):
        # Main dimensions
        self.total_length = 0.8
        self.max_diameter = 0.4
        self.aperture_diameter = 0.2
        
        # Section ratios (must sum to 1.0)
        self.section1_ratio = 0.3  # Field Control Core
        self.section2_ratio = 0.3  # Metamaterial Chamber
        self.section3_ratio = 0.4  # Tunneling Array
        
        # Component parameters
        self.observation_port_count = 4
        self.observation_port_diameter = 0.05
        self.cooling_fin_height = 0.08
        self.emitter_rings = 5
        self.emitters_per_ring = 12
        
        # Cutout parameters - 270 degree (showing only 1/4)
        self.cutout_angle = math.radians(270)  # Show only 90 degrees (1/4) of the model

# Clear existing objects
def clear_scene():
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete()
    
    # Remove existing materials
    for material in bpy.data.materials:
        bpy.data.materials.remove(material)
    
    # Remove existing collections except Scene Collection
    for collection in bpy.data.collections:
        bpy.data.collections.remove(collection)

# Create more detailed materials
def create_materials():
    materials = {}
    
    # Main metal material
    metal_mat = bpy.data.materials.new(name="QFM_Metal")
    metal_mat.diffuse_color = (0.8, 0.82, 0.85, 1.0)
    metal_mat.metallic = 0.9
    metal_mat.roughness = 0.2
    materials["metal"] = metal_mat
    
    # Secondary metal material (for accent parts)
    sec_metal_mat = bpy.data.materials.new(name="QFM_SecondaryMetal")
    sec_metal_mat.diffuse_color = (0.7, 0.7, 0.75, 1.0)
    sec_metal_mat.metallic = 0.85
    sec_metal_mat.roughness = 0.3
    materials["sec_metal"] = sec_metal_mat
    
    # Interior metal material
    interior_mat = bpy.data.materials.new(name="QFM_Interior")
    interior_mat.diffuse_color = (0.6, 0.65, 0.7, 1.0)
    interior_mat.metallic = 1.0
    interior_mat.roughness = 0.3
    materials["interior"] = interior_mat
    
    # Glass material
    glass_mat = bpy.data.materials.new(name="QFM_Glass")
    glass_mat.diffuse_color = (0.8, 0.9, 1.0, 0.2)
    glass_mat.metallic = 0.0
    glass_mat.roughness = 0.05
    glass_mat.blend_method = 'BLEND'
    materials["glass"] = glass_mat
    
    # Blue glow material
    blue_glow_mat = bpy.data.materials.new(name="QFM_BlueGlow")
    blue_glow_mat.diffuse_color = (0.2, 0.5, 1.0, 1.0)
    blue_glow_mat.emission_color = (0.2, 0.5, 1.0)
    blue_glow_mat.emission_strength = 5.0
    materials["blue_glow"] = blue_glow_mat
    
    # Green glow material
    green_glow_mat = bpy.data.materials.new(name="QFM_GreenGlow")
    green_glow_mat.diffuse_color = (0.2, 1.0, 0.5, 1.0)
    green_glow_mat.emission_color = (0.2, 1.0, 0.5)
    green_glow_mat.emission_strength = 3.0
    materials["green_glow"] = green_glow_mat
    
    # Purple glow material
    purple_glow_mat = bpy.data.materials.new(name="QFM_PurpleGlow")
    purple_glow_mat.diffuse_color = (0.8, 0.2, 1.0, 1.0)
    purple_glow_mat.emission_color = (0.8, 0.2, 1.0)
    purple_glow_mat.emission_strength = 4.0
    materials["purple_glow"] = purple_glow_mat
    
    # Circuit material
    circuit_mat = bpy.data.materials.new(name="QFM_Circuit")
    circuit_mat.diffuse_color = (0.05, 0.15, 0.1, 1.0)
    circuit_mat.metallic = 0.3
    circuit_mat.roughness = 0.2
    materials["circuit"] = circuit_mat
    
    # Gold contacts material
    gold_mat = bpy.data.materials.new(name="QFM_Gold")
    gold_mat.diffuse_color = (1.0, 0.8, 0.2, 1.0)
    gold_mat.metallic = 1.0
    gold_mat.roughness = 0.1
    materials["gold"] = gold_mat
    
    # Copper material
    copper_mat = bpy.data.materials.new(name="QFM_Copper")
    copper_mat.diffuse_color = (0.85, 0.45, 0.3, 1.0)
    copper_mat.metallic = 0.9
    copper_mat.roughness = 0.2
    materials["copper"] = copper_mat
    
    # Annotation material
    annotation_mat = bpy.data.materials.new(name="QFM_Annotation")
    annotation_mat.diffuse_color = (1.0, 1.0, 1.0, 1.0)
    annotation_mat.use_backface_culling = False
    annotation_mat.blend_method = 'BLEND'
    materials["annotation"] = annotation_mat
    
    return materials

# Add intricate details to a cylinder
def add_surface_details(obj, detail_type="panels", materials=None):
    if detail_type == "panels":
        # Add panel seams
        try:
            bpy.context.view_layer.objects.active = obj
            bpy.ops.object.mode_set(mode='EDIT')
            bpy.ops.mesh.select_all(action='DESELECT')
            
            # Get mesh in edit mode
            bpy.ops.object.mode_set(mode='OBJECT')
            
            # Select faces for panel seams
            for i, face in enumerate(obj.data.polygons):
                if i % 8 == 0:  # Every 8th face
                    face.select = True
            
            bpy.ops.object.mode_set(mode='EDIT')
            bpy.ops.mesh.extrude_region_move(TRANSFORM_OT_translate=(0, 0, -0.005))
            bpy.ops.object.mode_set(mode='OBJECT')
        except Exception as e:
            print(f"Could not add panel details: {e}")
    
    elif detail_type == "tech":
        # Add technical-looking insets
        try:
            # Create a smaller cylinder inside
            radius = obj.dimensions[0] / 2 * 0.9
            depth = obj.dimensions[2] * 0.95
            
            bpy.ops.mesh.primitive_cylinder_add(
                vertices=32,
                radius=radius,
                depth=depth,
                location=obj.location
            )
            inset = bpy.context.active_object
            inset.rotation_euler = obj.rotation_euler
            
            if materials and "circuit" in materials:
                inset.data.materials.append(materials["circuit"])
                
            # Parent to main object
            inset.parent = obj
            
            # Add some random tech details
            for i in range(5):
                size = random.uniform(0.02, 0.05)
                angle = random.uniform(0, 2 * math.pi)
                dist = radius * 0.8
                
                x_offset = math.cos(angle) * dist
                y_offset = math.sin(angle) * dist
                z_offset = random.uniform(-depth/3, depth/3)
                
                loc = (
                    obj.location[0] + x_offset,
                    obj.location[1] + y_offset,
                    obj.location[2] + z_offset
                )
                
                if random.random() > 0.5:
                    bpy.ops.mesh.primitive_cube_add(
                        size=size,
                        location=loc
                    )
                else:
                    bpy.ops.mesh.primitive_cylinder_add(
                        vertices=16,
                        radius=size/2,
                        depth=size,
                        location=loc
                    )
                
                detail = bpy.context.active_object
                detail.rotation_euler = (
                    random.uniform(0, math.pi/2),
                    random.uniform(0, math.pi/2),
                    random.uniform(0, math.pi/2)
                )
                
                # Apply random material
                if materials:
                    mat_keys = list(materials.keys())
                    if len(mat_keys) > 0:
                        random_mat = materials[random.choice(mat_keys)]
                        detail.data.materials.append(random_mat)
                
                # Parent to main object
                detail.parent = obj
        except Exception as e:
            print(f"Could not add tech details: {e}")

# Create more detailed internal components
def create_internal_components(params, materials, collection):
    # Dictionary to track created objects for annotation
    components = {}
    
    # Calculate dimensions
    radius = params.max_diameter / 2 * 0.7
    
    # Create central core component
    bpy.ops.mesh.primitive_cylinder_add(
        vertices=32,
        radius=radius * 0.5,
        depth=params.total_length * 0.8,
        location=(0, 0, 0)
    )
    core = bpy.context.active_object
    core.name = "InternalCore"
    core.data.materials.append(materials["circuit"])
    components["Quantum Core Processor"] = core
    
    # Add core details - concentric rings
    for i in range(4):
        ring_radius = radius * 0.5 * (0.7 + i * 0.1)
        ring_height = 0.02
        ring_z = params.total_length * 0.1 * (i - 1.5)
        
        bpy.ops.mesh.primitive_torus_add(
            major_radius=ring_radius,
            minor_radius=ring_height,
            major_segments=32,
            minor_segments=12,
            location=(0, 0, ring_z)
        )
        ring = bpy.context.active_object
        ring.name = f"CoreRing_{i}"
        
        # Alternate materials for the rings
        if i % 2 == 0:
            ring.data.materials.append(materials["gold"])
        else:
            ring.data.materials.append(materials["copper"])
    
    # Create primary cooling conduit
    bpy.ops.mesh.primitive_torus_add(
        major_radius=radius * 0.65,
        minor_radius=radius * 0.08,
        major_segments=32,
        minor_segments=16,
        location=(0, 0, 0)
    )
    conduit = bpy.context.active_object
    conduit.name = "PrimaryCoolingConduit"
    conduit.data.materials.append(materials["blue_glow"])
    components["Primary Cooling Conduit"] = conduit
    
    # Create circuit boards
    board_count = 5
    for i in range(board_count):
        z_pos = params.total_length * (i - board_count/2) / board_count
        
        bpy.ops.mesh.primitive_cylinder_add(
            vertices=32,
            radius=radius * 0.9,
            depth=0.02,
            location=(0, 0, z_pos)
        )
        board = bpy.context.active_object
        board.name = f"CircuitBoard_{i}"
        board.data.materials.append(materials["circuit"])
        
        if i == 2:  # Track middle board for annotation
            components["Quantum State Controller"] = board
        
        # Add inner ring on circuit board
        bpy.ops.mesh.primitive_torus_add(
            major_radius=radius * 0.6,
            minor_radius=0.01,
            major_segments=32,
            minor_segments=8,
            location=(0, 0, z_pos + 0.01)
        )
        inner_ring = bpy.context.active_object
        inner_ring.name = f"CircuitRing_{i}"
        inner_ring.data.materials.append(materials["copper"])
        
        # Add random small components to the board
        component_count = 18  # Increased component count
        for j in range(component_count):
            comp_radius = random.uniform(0.01, 0.03)
            angle = random.uniform(0, 2 * math.pi)
            dist = random.uniform(0, radius * 0.7)
            comp_x = dist * math.cos(angle)
            comp_y = dist * math.sin(angle)
            
            # Choose component shape randomly
            shape = random.choice(["cube", "cylinder", "cone"])
            
            if shape == "cube":
                bpy.ops.mesh.primitive_cube_add(
                    size=comp_radius,
                    location=(comp_x, comp_y, z_pos + 0.015)
                )
            elif shape == "cylinder":
                bpy.ops.mesh.primitive_cylinder_add(
                    vertices=8,
                    radius=comp_radius/2,
                    depth=comp_radius,
                    location=(comp_x, comp_y, z_pos + 0.015)
                )
            else:
                bpy.ops.mesh.primitive_cone_add(
                    vertices=8,
                    radius1=comp_radius/2,
                    radius2=0,
                    depth=comp_radius,
                    location=(comp_x, comp_y, z_pos + 0.015)
                )
                
            component = bpy.context.active_object
            component.name = f"Component_{i}_{j}"
            
            # Assign random material
            mat_choice = random.choice(["metal", "sec_metal", "gold", "copper"])
            if mat_choice in materials:
                component.data.materials.append(materials[mat_choice])
            
            # Add subtle glow to some components
            if random.random() < 0.2:
                glow_choice = random.choice(["blue_glow", "green_glow", "purple_glow"])
                if glow_choice in materials:
                    glow_mat = materials[glow_choice]
                    if len(component.data.materials) > 0:
                        component.data.materials[0] = glow_mat
                    else:
                        component.data.materials.append(glow_mat)
    
    # Create connecting tubes
    tube_count = 12  # Increased tube count
    tube_radius = 0.01
    for i in range(tube_count):
        angle = (2 * math.pi * i) / tube_count
        tube_x = radius * 0.6 * math.cos(angle)
        tube_y = radius * 0.6 * math.sin(angle)
        
        bpy.ops.mesh.primitive_cylinder_add(
            vertices=16,
            radius=tube_radius,
            depth=params.total_length * 0.7,
            location=(tube_x, tube_y, 0)
        )
        tube = bpy.context.active_object
        tube.name = f"ConnectingTube_{i}"
        
        # Alternate materials for tubes
        if i % 3 == 0:
            tube.data.materials.append(materials["metal"])
        elif i % 3 == 1:
            tube.data.materials.append(materials["copper"])
        else:
            tube.data.materials.append(materials["sec_metal"])
        
        if i == 0:  # Track one tube for annotation
            components["Quantum Data Conduit"] = tube
        
        # Add connection nodes on tubes
        node_count = 3
        for j in range(node_count):
            node_z = params.total_length * (j - node_count/2) / node_count * 0.5
            
            bpy.ops.mesh.primitive_uv_sphere_add(
                segments=16,
                ring_count=8,
                radius=tube_radius * 2,
                location=(tube_x, tube_y, node_z)
            )
            node = bpy.context.active_object
            node.name = f"TubeNode_{i}_{j}"
            
            # Apply appropriate glow material
            if i % 3 == 0:
                node.data.materials.append(materials["blue_glow"])
            elif i % 3 == 1:
                node.data.materials.append(materials["green_glow"])
            else:
                node.data.materials.append(materials["purple_glow"])
    
    # Create central emitter array
    bpy.ops.mesh.primitive_cone_add(
        vertices=32,
        radius1=radius * 0.4,
        radius2=radius * 0.2,
        depth=params.total_length * 0.4,
        location=(0, 0, -params.total_length * 0.25)
    )
    emitter = bpy.context.active_object
    emitter.name = "CentralEmitter"
    emitter.data.materials.append(materials["blue_glow"])
    components["Field Emission Core"] = emitter
    
    # Add emitter rings
    for i in range(3):
        ring_z = -params.total_length * 0.25 + i * 0.1
        ring_radius = radius * (0.4 - i * 0.07)
        
        bpy.ops.mesh.primitive_torus_add(
            major_radius=ring_radius,
            minor_radius=0.01,
            major_segments=32,
            minor_segments=8,
            location=(0, 0, ring_z)
        )
        emitter_ring = bpy.context.active_object
        emitter_ring.name = f"EmitterRing_{i}"
        emitter_ring.data.materials.append(materials["purple_glow"])
    
    # Add to collection
    for obj in bpy.context.selected_objects:
        if obj.name not in collection.objects:
            try:
                collection.objects.link(obj)
            except:
                pass
    
    return components 