# Create more detailed field control core
def create_field_control_core(params, materials, collection):
    components = {}
    
    # Calculate dimensions
    length = params.total_length * params.section1_ratio
    radius = params.max_diameter / 2
    
    # Create base cylinder
    bpy.ops.mesh.primitive_cylinder_add(
        vertices=64,
        radius=radius, 
        depth=length,
        location=(0, 0, params.total_length/2 - length/2)
    )
    core = bpy.context.active_object
    core.name = "FieldControlCore"
    core.data.materials.append(materials["metal"])
    components["Field Control Core"] = core
    
    # Add surface details to core
    add_surface_details(core, "panels", materials)
    
    # Create hemisphere cap
    bpy.ops.mesh.primitive_uv_sphere_add(
        segments=64,
        ring_count=32,
        radius=radius,
        location=(0, 0, params.total_length/2)
    )
    cap = bpy.context.active_object
    cap.name = "CoreCap"
    
    # Cut the sphere in half
    bpy.ops.object.mode_set(mode='EDIT')
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.mesh.bisect(plane_co=(0, 0, params.total_length/2), plane_no=(0, 0, -1), clear_inner=True)
    bpy.ops.object.mode_set(mode='OBJECT')
    
    cap.data.materials.append(materials["metal"])
    components["Quantum Field Emitter"] = cap
    
    # Add decorative rings on cap
    for i in range(3):
        ring_radius = radius * (0.7 - i * 0.15)
        
        bpy.ops.mesh.primitive_torus_add(
            major_radius=ring_radius,
            minor_radius=0.01,
            major_segments=32,
            minor_segments=8,
            location=(0, 0, params.total_length/2 - 0.02)
        )
        cap_ring = bpy.context.active_object
        cap_ring.name = f"CapRing_{i}"
        cap_ring.data.materials.append(materials["sec_metal"])
    
    # Create central emitter on cap
    bpy.ops.mesh.primitive_cylinder_add(
        vertices=32,
        radius=radius * 0.1,
        depth=0.05,
        location=(0, 0, params.total_length/2 + 0.025)
    )
    emitter = bpy.context.active_object
    emitter.name = "CapEmitter"
    emitter.data.materials.append(materials["blue_glow"])
    components["Main Field Emitter"] = emitter
    
    # Add observation ports
    port_radius = params.observation_port_diameter / 2
    for i in range(params.observation_port_count):
        angle = (2 * math.pi * i) / params.observation_port_count
        port_x = radius * 0.85 * math.cos(angle)
        port_y = radius * 0.85 * math.sin(angle)
        port_z = params.total_length/2 - length * 0.4
        
        bpy.ops.mesh.primitive_cylinder_add(
            vertices=32,
            radius=port_radius,
            depth=radius * 0.3,
            location=(port_x, port_y, port_z),
            rotation=(math.pi/2, math.atan2(port_y, port_x), 0)
        )
        port = bpy.context.active_object
        port.name = f"ObservationPort_{i}"
        port.data.materials.append(materials["glass"])
        
        # Add port housing
        bpy.ops.mesh.primitive_cylinder_add(
            vertices=32,
            radius=port_radius * 1.2,
            depth=radius * 0.1,
            location=(port_x, port_y, port_z),
            rotation=(math.pi/2, math.atan2(port_y, port_x), 0)
        )
        port_housing = bpy.context.active_object
        port_housing.name = f"PortHousing_{i}"
        port_housing.data.materials.append(materials["sec_metal"])
        
        # Add inner glow
        if i % 3 == 0:
            glow_material = materials["blue_glow"]
        elif i % 3 == 1:
            glow_material = materials["green_glow"]
        else:
            glow_material = materials["purple_glow"]
            
        bpy.ops.mesh.primitive_cylinder_add(
            vertices=16,
            radius=port_radius * 0.5,
            depth=radius * 0.05,
            location=(port_x * 0.8, port_y * 0.8, port_z),
            rotation=(math.pi/2, math.atan2(port_y, port_x), 0)
        )
        glow = bpy.context.active_object
        glow.name = f"PortGlow_{i}"
        glow.data.materials.append(glow_material)
        
        if i == 0:  # Track one port for annotation
            components["Observation Port"] = port
    
    # Add cooling fins
    fin_count = 24
    fin_height = params.cooling_fin_height
    fin_length = radius * 0.6
    fin_width = 0.005
    
    for i in range(fin_count):
        angle = (2 * math.pi * i) / fin_count
        fin_x = radius * math.cos(angle)
        fin_y = radius * math.sin(angle)
        
        bpy.ops.mesh.primitive_cube_add(
            size=1,
            location=(fin_x/2, fin_y/2, params.total_length/2 - length * 0.6)
        )
        fin = bpy.context.active_object
        fin.name = f"CoolingFin_{i}"
        
        # Scale to proper dimensions
        fin.scale = (fin_width, fin_length, fin_height)
        
        # Rotate to point outward
        fin.rotation_euler = (0, 0, angle)
        
        fin.data.materials.append(materials["sec_metal"])
        
        if i == 0:  # Track one fin for annotation
            components["Cooling Fin"] = fin
    
    # Add cooling fin rings
    for i in range(2):
        ring_z = params.total_length/2 - length * (0.4 + i * 0.4)
        
        bpy.ops.mesh.primitive_torus_add(
            major_radius=radius * 1.05,
            minor_radius=0.01,
            major_segments=32,
            minor_segments=8,
            location=(0, 0, ring_z)
        )
        fin_ring = bpy.context.active_object
        fin_ring.name = f"CoolingFinRing_{i}"
        fin_ring.data.materials.append(materials["sec_metal"])
    
    # Add to collection
    for obj in bpy.context.selected_objects:
        if obj.name not in collection.objects:
            try:
                collection.objects.link(obj)
            except:
                pass
    
    return core, components

# Create more detailed metamaterial chamber
def create_metamaterial_chamber(params, materials, collection):
    components = {}
    
    # Calculate dimensions
    length = params.total_length * params.section2_ratio
    radius = params.max_diameter / 2
    z_pos = params.total_length/2 - params.total_length * params.section1_ratio - length/2
    
    # Create base cylinder
    bpy.ops.mesh.primitive_cylinder_add(
        vertices=64,
        radius=radius, 
        depth=length,
        location=(0, 0, z_pos)
    )
    chamber = bpy.context.active_object
    chamber.name = "MetamaterialChamber"
    chamber.data.materials.append(materials["metal"])
    components["Metamaterial Chamber"] = chamber
    
    # Add surface details
    add_surface_details(chamber, "panels", materials)
    
    # Add viewing bands
    band_count = 3
    band_width = 0.05
    
    for i in range(band_count):
        band_z = z_pos + length * (i - 1) / (band_count - 1)
        
        bpy.ops.mesh.primitive_cylinder_add(
            vertices=64,
            radius=radius * 1.01,
            depth=band_width,
            location=(0, 0, band_z)
        )
        band = bpy.context.active_object
        band.name = f"ViewingBand_{i}"
        band.data.materials.append(materials["glass"])
        
        # Add band housing (top edge)
        bpy.ops.mesh.primitive_torus_add(
            major_radius=radius * 1.01,
            minor_radius=0.01,
            major_segments=64,
            minor_segments=8,
            location=(0, 0, band_z + band_width/2)
        )
        top_edge = bpy.context.active_object
        top_edge.name = f"BandTopEdge_{i}"
        top_edge.data.materials.append(materials["sec_metal"])
        
        # Add band housing (bottom edge)
        bpy.ops.mesh.primitive_torus_add(
            major_radius=radius * 1.01,
            minor_radius=0.01,
            major_segments=64,
            minor_segments=8,
            location=(0, 0, band_z - band_width/2)
        )
        bottom_edge = bpy.context.active_object
        bottom_edge.name = f"BandBottomEdge_{i}"
        bottom_edge.data.materials.append(materials["sec_metal"])
        
        # Add interior glow behind bands
        bpy.ops.mesh.primitive_cylinder_add(
            vertices=32,
            radius=radius * 0.95,
            depth=band_width * 0.8,
            location=(0, 0, band_z)
        )
        glow = bpy.context.active_object
        glow.name = f"BandGlow_{i}"
        
        # Different colors for each band
        if i == 0:
            glow.data.materials.append(materials["blue_glow"])
        elif i == 1:
            glow.data.materials.append(materials["green_glow"])
        else:
            glow.data.materials.append(materials["purple_glow"])
        
        if i == 1:  # Track middle band for annotation
            components["Monitoring Band"] = band
    
    # Add metamaterial array inside chamber
    bpy.ops.mesh.primitive_cylinder_add(
        vertices=48,
        radius=radius * 0.85,
        depth=length * 0.9,
        location=(0, 0, z_pos)
    )
    metamaterial = bpy.context.active_object
    metamaterial.name = "MetamaterialArray"
    metamaterial.data.materials.append(materials["circuit"])
    components["Metamaterial Array"] = metamaterial
    
    # Add honeycomb pattern to metamaterial
    try:
        # We'll simulate this with rings instead of actual hexagons
        ring_count = 8
        for i in range(ring_count):
            ring_z = z_pos + length * (i - ring_count/2) / ring_count * 0.7
            ring_radius = radius * (0.3 + 0.5 * (i % 2))
            
            bpy.ops.mesh.primitive_torus_add(
                major_radius=ring_radius,
                minor_radius=0.01,
                major_segments=6 if i % 2 == 0 else 8,  # Hexagonal or octagonal
                minor_segments=8,
                location=(0, 0, ring_z)
            )
            honey_ring = bpy.context.active_object
            honey_ring.name = f"MetamaterialRing_{i}"
            
            # Alternate materials
            if i % 2 == 0:
                honey_ring.data.materials.append(materials["gold"])
            else:
                honey_ring.data.materials.append(materials["copper"])
    except Exception as e:
        print(f"Could not add honeycomb pattern: {e}")
    
    # Add field stabilizer nodes
    node_count = 6
    node_radius = 0.04
    
    for i in range(node_count):
        angle = (2 * math.pi * i) / node_count
        node_x = radius * math.cos(angle)
        node_y = radius * math.sin(angle)
        
        bpy.ops.mesh.primitive_uv_sphere_add(
            segments=32,
            ring_count=16,
            radius=node_radius,
            location=(node_x, node_y, z_pos)
        )
        node = bpy.context.active_object
        node.name = f"StabilizerNode_{i}"
        node.data.materials.append(materials["blue_glow"])
        
        # Add housing for stabilizer node
        bpy.ops.mesh.primitive_cylinder_add(
            vertices=16,
            radius=node_radius * 1.3,
            depth=node_radius * 0.8,
            location=(node_x, node_y, z_pos),
            rotation=(math.pi/2, math.atan2(node_y, node_x), 0)
        )
        housing = bpy.context.active_object
        housing.name = f"StabilizerHousing_{i}"
        housing.data.materials.append(materials["sec_metal"])
        
        if i == 0:  # Track one node for annotation
            components["Field Stabilizer"] = node
    
    # Add to collection
    for obj in bpy.context.selected_objects:
        if obj.name not in collection.objects:
            try:
                collection.objects.link(obj)
            except:
                pass
    
    return chamber, components

# Create more detailed tunneling array
def create_tunneling_array(params, materials, collection):
    components = {}
    
    # Calculate dimensions
    length = params.total_length * params.section3_ratio
    radius_top = params.max_diameter / 2
    radius_bottom = params.aperture_diameter / 2
    z_pos = params.total_length/2 - params.total_length * (params.section1_ratio + params.section2_ratio) - length/2
    
    # Create truncated cone
    bpy.ops.mesh.primitive_cone_add(
        vertices=64,
        radius1=radius_top,
        radius2=radius_bottom,
        depth=length,
        location=(0, 0, z_pos)
    )
    array = bpy.context.active_object
    array.name = "TunnelingArray"
    array.data.materials.append(materials["metal"])
    components["Tunneling Array"] = array
    
    # Add surface details
    add_surface_details(array, "panels", materials)
    
    # Add reinforcement rings
    ring_count = 5
    for i in range(ring_count):
        ring_z = z_pos + length/2 - length * i / (ring_count - 1)
        ring_radius = radius_top - (radius_top - radius_bottom) * i / (ring_count - 1)
        
        bpy.ops.mesh.primitive_torus_add(
            major_radius=ring_radius,
            minor_radius=0.015,
            major_segments=48,
            minor_segments=12,
            location=(0, 0, ring_z)
        )
        ring = bpy.context.active_object
        ring.name = f"ReinforcementRing_{i}"
        ring.data.materials.append(materials["sec_metal"])
    
    # Add interior channel
    bpy.ops.mesh.primitive_cone_add(
        vertices=48,
        radius1=radius_top * 0.85,
        radius2=radius_bottom * 0.85,
        depth=length * 0.95,
        location=(0, 0, z_pos)
    )
    channel = bpy.context.active_object
    channel.name = "InteriorChannel"
    channel.data.materials.append(materials["circuit"])
    
    # Add emitter rings
    emitter_ring_objects = []
    for i in range(params.emitter_rings):
        ring_z = z_pos - length * i / (params.emitter_rings * 2)
        ring_radius = radius_bottom + (radius_top - radius_bottom) * i / (params.emitter_rings - 1)
        
        # Create the main ring
        bpy.ops.mesh.primitive_torus_add(
            major_radius=ring_radius * 0.95,
            minor_radius=0.01,
            major_segments=48,
            minor_segments=8,
            location=(0, 0, ring_z)
        )
        main_ring = bpy.context.active_object
        main_ring.name = f"EmitterRing_{i}"
        
        # Apply different materials to different rings
        if i % 3 == 0:
            main_ring.data.materials.append(materials["blue_glow"])
        elif i % 3 == 1:
            main_ring.data.materials.append(materials["green_glow"])
        else:
            main_ring.data.materials.append(materials["purple_glow"])
        
        emitter_objects = []
        # Add individual emitters on the ring
        for j in range(params.emitters_per_ring):
            angle = (2 * math.pi * j) / params.emitters_per_ring
            emitter_x = ring_radius * 0.95 * math.cos(angle)
            emitter_y = ring_radius * 0.95 * math.sin(angle)
            
            # Create small emitter
            bpy.ops.mesh.primitive_cylinder_add(
                vertices=8,
                radius=0.008,
                depth=0.02,
                location=(emitter_x, emitter_y, ring_z),
                rotation=(math.pi/2, angle, 0)
            )
            emitter = bpy.context.active_object
            emitter.name = f"Emitter_Ring{i}_Node{j}"
            
            # Apply same glow material as the ring
            if i % 3 == 0:
                emitter.data.materials.append(materials["blue_glow"])
            elif i % 3 == 1:
                emitter.data.materials.append(materials["green_glow"])
            else:
                emitter.data.materials.append(materials["purple_glow"])
                
            emitter_objects.append(emitter)
        
        # Store the first emitter of each ring for annotation
        if i == 1:
            components["Quantum Emitter"] = emitter_objects[0]
        
        emitter_ring_objects.append(emitter_objects)
    
    # Add aperture with detailed rim
    bpy.ops.mesh.primitive_cylinder_add(
        vertices=64,
        radius=radius_bottom,
        depth=0.03,
        location=(0, 0, z_pos - length/2)
    )
    aperture_rim = bpy.context.active_object
    aperture_rim.name = "ApertureRim"
    aperture_rim.data.materials.append(materials["sec_metal"])
    
    # Add aperture glow
    bpy.ops.mesh.primitive_cylinder_add(
        vertices=64,
        radius=radius_bottom * 0.9,
        depth=0.01,
        location=(0, 0, z_pos - length/2 - 0.01)
    )
    aperture_glow = bpy.context.active_object
    aperture_glow.name = "ApertureGlow"
    aperture_glow.data.materials.append(materials["blue_glow"])
    components["Emission Aperture"] = aperture_glow
    
    # Add to collection
    for obj in bpy.context.selected_objects:
        if obj.name not in collection.objects:
            try:
                collection.objects.link(obj)
            except:
                pass
    
    return array, components

# Create 270° section cut (leaving only 1/4 of the model)
def create_section_cut(objects, params):
    # Create the cutting planes
    # For a 270° cut (showing only 1/4), we'll use two perpendicular planes at X=0 and Y=0
    
    # Create first cutting plane (X-Z plane at Y=0, keeping Y>0)
    bpy.ops.mesh.primitive_plane_add(
        size=2.0,
        rotation=(0, math.pi/2, 0),
        location=(0, 0, 0)
    )
    cut_plane1 = bpy.context.active_object
    cut_plane1.name = "CutPlane_YZ"
    cut_plane1.scale = (2, 2, 2)
    
    # Create second cutting plane (Y-Z plane at X=0, keeping X>0)
    bpy.ops.mesh.primitive_plane_add(
        size=2.0,
        rotation=(math.pi/2, 0, 0),
        location=(0, 0, 0)
    )
    cut_plane2 = bpy.context.active_object
    cut_plane2.name = "CutPlane_XZ"
    cut_plane2.scale = (2, 2, 2)
    
    # Add transparent material to cutting planes
    cut_material = bpy.data.materials.new(name="QFM_CutPlane")
    cut_material.diffuse_color = (1.0, 0.0, 0.0, 0.3)
    cut_material.blend_method = 'BLEND'
    
    cut_plane1.data.materials.append(cut_material)
    cut_plane2.data.materials.append(cut_material)
    
    # Apply the boolean operation to all relevant objects
    for obj in objects:
        if obj and obj.type == 'MESH' and obj != cut_plane1 and obj != cut_plane2:
            # Add boolean modifier for first plane (X-Z)
            mod1 = obj.modifiers.new(name="Cut_Y", type='BOOLEAN')
            mod1.operation = 'DIFFERENCE'
            mod1.solver = 'EXACT'
            mod1.object = cut_plane1
            
            # Add boolean modifier for second plane (Y-Z)
            mod2 = obj.modifiers.new(name="Cut_X", type='BOOLEAN')
            mod2.operation = 'DIFFERENCE'
            mod2.solver = 'EXACT'
            mod2.object = cut_plane2
            
            # Apply modifiers
            try:
                # Set active object
                bpy.context.view_layer.objects.active = obj
                
                # Apply first modifier
                bpy.ops.object.modifier_apply(modifier="Cut_Y")
                
                # Apply second modifier
                bpy.ops.object.modifier_apply(modifier="Cut_X")
            except Exception as e:
                print(f"Could not apply boolean modifier to {obj.name}: {e}")
    
    # Hide the cutting planes
    cut_plane1.hide_viewport = True
    cut_plane2.hide_viewport = True
    cut_plane1.hide_render = True
    cut_plane2.hide_render = True
    
    return [cut_plane1, cut_plane2]

# Create annotations
def create_annotations(components, materials, collection):
    # Create a collection for annotations
    annotation_collection = bpy.data.collections.new("QFM_Annotations")
    bpy.context.scene.collection.children.link(annotation_collection)
    
    # Font settings
    font_size = 0.02
    line_thickness = 0.002
    
    # Function to create annotation text and line
    def create_annotation(component, label, location_offset=(0.3, 0.3, 0.1)):
        if component is None:
            return
            
        # Get component location
        component_loc = component.location
        
        # Calculate text position
        text_loc = (
            component_loc[0] + location_offset[0],
            component_loc[1] + location_offset[1],
            component_loc[2] + location_offset[2]
        )
        
        # Create text object
        bpy.ops.object.text_add(location=text_loc)
        text_obj = bpy.context.active_object
        text_obj.name = f"Annotation_Text_{label}"
        text_obj.data.body = label
        
        # Set text properties
        text_obj.data.size = font_size
        text_obj.data.align_x = 'LEFT'
        text_obj.data.extrude = 0.001
        
        # Apply annotation material
        if "annotation" in materials:
            text_obj.data.materials.append(materials["annotation"])
        
        # Create line connecting text to component
        line_points = [component_loc, text_loc]
        
        # Create line mesh
        line_mesh = bpy.data.meshes.new(f"Annotation_Line_{label}_Mesh")
        line_obj = bpy.data.objects.new(f"Annotation_Line_{label}", line_mesh)
        
        # Define vertices and edges
        vertices = line_points
        edges = [(0, 1)]
        faces = []
        
        # Create mesh
        line_mesh.from_pydata(vertices, edges, faces)
        line_mesh.update()
        
        # Add material to line
        if "annotation" in materials:
            line_obj.data.materials.append(materials["annotation"])
        
        # Add to scene
        bpy.context.collection.objects.link(line_obj)
        
        # Add both objects to annotation collection
        if text_obj.name not in annotation_collection.objects:
            annotation_collection.objects.link(text_obj)
        if line_obj.name not in annotation_collection.objects:
            annotation_collection.objects.link(line_obj)
        
        # Remove from current collection
        if text_obj.name in bpy.context.collection.objects:
            bpy.context.collection.objects.unlink(text_obj)
        if line_obj.name in bpy.context.collection.objects:
            bpy.context.collection.objects.unlink(line_obj)
    
    # Create annotations for tracked components
    annotation_offsets = {
        "Field Control Core": (0.3, 0.3, 0.4),
        "Quantum Field Emitter": (0.3, 0.3, 0.5),
        "Main Field Emitter": (0.3, 0.3, 0.5),
        "Observation Port": (0.3, 0.3, 0.2),
        "Cooling Fin": (0.3, 0.3, 0.3),
        "Metamaterial Chamber": (0.3, 0.3, 0.1),
        "Metamaterial Array": (0.3, 0.3, 0.0),
        "Monitoring Band": (0.3, 0.3, 0.1),
        "Field Stabilizer": (0.3, 0.3, 0.0),
        "Tunneling Array": (0.3, 0.3, -0.2),
        "Quantum Emitter": (0.3, 0.3, -0.2),
        "Emission Aperture": (0.3, 0.3, -0.4),
        "Quantum Core Processor": (-0.3, 0.3, 0.1),
        "Primary Cooling Conduit": (-0.3, 0.3, 0.0),
        "Quantum State Controller": (-0.3, 0.3, 0.2),
        "Quantum Data Conduit": (-0.3, 0.3, -0.1),
        "Field Emission Core": (-0.3, 0.3, -0.2)
    }
    
    # Create annotations for all components
    for label, component in components.items():
        offset = annotation_offsets.get(label, (0.3, 0.3, 0.1))
        create_annotation(component, label, offset)
    
    return annotation_collection

# Setup cameras for 2D technical drawings
def setup_cameras(params):
    # Create a collection for cameras
    camera_collection = bpy.data.collections.new("QFM_Cameras")
    bpy.context.scene.collection.children.link(camera_collection)
    
    # Camera distance factor
    distance_factor = 1.2
    
    # Create cameras for standard views
    # Front view
    bpy.ops.object.camera_add(
        location=(0, -params.max_diameter * distance_factor, 0)
    )
    front_cam = bpy.context.active_object
    front_cam.name = "Camera_Front"
    front_cam.rotation_euler = (math.pi/2, 0, 0)
    camera_collection.objects.link(front_cam)
    
    # Side view
    bpy.ops.object.camera_add(
        location=(params.max_diameter * distance_factor, 0, 0)
    )
    side_cam = bpy.context.active_object
    side_cam.name = "Camera_Side"
    side_cam.rotation_euler = (math.pi/2, 0, math.pi/2)
    camera_collection.objects.link(side_cam)
    
    # Top view
    bpy.ops.object.camera_add(
        location=(0, 0, params.total_length * distance_factor / 2)
    )
    top_cam = bpy.context.active_object
    top_cam.name = "Camera_Top"
    top_cam.rotation_euler = (0, 0, 0)
    camera_collection.objects.link(top_cam)
    
    # Isometric view
    iso_distance = params.max_diameter * distance_factor * 1.5
    bpy.ops.object.camera_add(
        location=(iso_distance, -iso_distance, iso_distance)
    )
    iso_cam = bpy.context.active_object
    iso_cam.name = "Camera_Isometric"
    iso_cam.rotation_euler = (math.radians(54.7), 0, math.radians(45))
    camera_collection.objects.link(iso_cam)
    
    # Section view
    bpy.ops.object.camera_add(
        location=(params.max_diameter * distance_factor * 0.8, 
                 params.max_diameter * distance_factor * 0.8, 
                 0)
    )
    section_cam = bpy.context.active_object
    section_cam.name = "Camera_Section"
    section_cam.rotation_euler = (math.pi/2, 0, math.radians(135))
    camera_collection.objects.link(section_cam)
    
    # Make the isometric camera active
    bpy.context.scene.camera = iso_cam
    
    # Set orthographic for technical drawings
    for cam in [front_cam, side_cam, top_cam, section_cam]:
        cam.data.type = 'ORTHO'
        cam.data.ortho_scale = params.total_length * 1.2
    
    # Keep isometric in perspective for better visualization
    iso_cam.data.type = 'PERSP'
    iso_cam.data.lens = 50
    
    return camera_collection

# Create lighting setup
def create_lighting():
    # Create a collection for lights
    light_collection = bpy.data.collections.new("QFM_Lighting")
    bpy.context.scene.collection.children.link(light_collection)
    
    # Key light
    bpy.ops.object.light_add(type='AREA', location=(1, -1, 1))
    key_light = bpy.context.active_object
    key_light.name = "Key_Light"
    key_light.data.energy = 300
    key_light.data.size = 2.0
    light_collection.objects.link(key_light)
    
    # Fill light
    bpy.ops.object.light_add(type='AREA', location=(-1.5, -0.5, 0.5))
    fill_light = bpy.context.active_object
    fill_light.name = "Fill_Light"
    fill_light.data.energy = 150
    fill_light.data.size = 2.0
    light_collection.objects.link(fill_light)
    
    # Rim light
    bpy.ops.object.light_add(type='AREA', location=(0, 2, 0.5))
    rim_light = bpy.context.active_object
    rim_light.name = "Rim_Light"
    rim_light.data.energy = 200
    rim_light.data.size = 2.0
    light_collection.objects.link(rim_light)
    
    # Environment light
    bpy.ops.object.light_add(type='AREA', location=(0, 0, -2))
    env_light = bpy.context.active_object
    env_light.name = "Environment_Light"
    env_light.data.energy = 100
    env_light.data.size = 5.0
    light_collection.objects.link(env_light)
    
    return light_collection

# Main function to create Quantum Field Manipulator
def create_quantum_field_manipulator():
    # Define parameters
    params = QFM_Parameters()
    
    # Clear existing scene
    clear_scene()
    
    # Create collections
    qfm_collection = bpy.data.collections.new("Quantum_Field_Manipulator")
    bpy.context.scene.collection.children.link(qfm_collection)
    
    internal_collection = bpy.data.collections.new("QFM_Internal_Components")
    qfm_collection.children.link(internal_collection)
    
    # Create materials
    materials = create_materials()
    
    # Create components
    all_components = {}  # Dictionary to store all components for annotation
    all_objects = []     # List to store all objects for section cut
    
    # Create internal components first (they'll be inside the outer shell)
    internal_components = create_internal_components(params, materials, internal_collection)
    all_components.update(internal_components)
    
    # Create main sections
    core, core_components = create_field_control_core(params, materials, qfm_collection)
    all_components.update(core_components)
    all_objects.append(core)
    
    chamber, chamber_components = create_metamaterial_chamber(params, materials, qfm_collection)
    all_components.update(chamber_components)
    all_objects.append(chamber)
    
    array, array_components = create_tunneling_array(params, materials, qfm_collection)
    all_components.update(array_components)
    all_objects.append(array)
    
    # Add all objects in internal collection to all_objects
    for obj in internal_collection.objects:
        all_objects.append(obj)
    
    # Create 270° section cut
    cut_planes = create_section_cut(all_objects, params)
    
    # Create annotations
    annotations = create_annotations(all_components, materials, qfm_collection)
    
    # Setup cameras for 2D views
    cameras = setup_cameras(params)
    
    # Create lighting
    lighting = create_lighting()
    
    # Set viewport shading to Material Preview
    for area in bpy.context.screen.areas:
        if area.type == 'VIEW_3D':
            for space in area.spaces:
                if space.type == 'VIEW_3D':
                    space.shading.type = 'MATERIAL'
                    space.shading.use_scene_lights = True
                    space.shading.use_scene_world = False
    
    print("Quantum Field Manipulator created successfully with 270° section cut and enhanced details")
    return qfm_collection

# Call the main function
if __name__ == "__main__":
    collection = create_quantum_field_manipulator() 