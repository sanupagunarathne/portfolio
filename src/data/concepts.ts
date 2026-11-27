export const expertiseConcepts=[
 ['Exploded stack','Separate interface, API and data layers. Select a layer to reveal tools and related projects.'],
 ['Signal machine','Follow a request through a living circuit: input, validation, API, database and response.'],
 ['Developer city','Explore small districts for frontend, backend, data and tooling; each building reveals a real project connection.'],
 ['Kinetic workshop','Arrange tactile glass, metal and clay tools on a workbench; dragging a tool opens its context.'],
 ['Code loom','Technology threads weave into project fabrics. Trace a thread to see where a tool is used.'],
 ['Magnetic assembly','Parts snap together into working architectures. Select a project to watch its stack assemble.'],
 ['Logic observatory','Lenses, prisms and light paths reveal how interface, processing and storage transform information.'],
 ['Living blueprint','A wireframe machine unfolds into labeled layers, with editable sketches becoming solid forms.']
];
export const experimentGroups=[
 {name:'Physics',items:['Time-reversal sandbox','Gravity sculptor','Soft-body typography','Magnetic marble computer','Impossible pendulum'],mechanic:'Manipulate forces, rewind state and discover how the simulation responds.'},
 {name:'Light',items:['Prism ray laboratory','Caustic liquid lens','Black-hole lensing','Spectral shadow painter','Volumetric light instrument'],mechanic:'Move emitters and materials to shape light, reflections and shadows.'},
 {name:'Algorithms',items:['Pathfinding labyrinth','Reaction-diffusion garden','Genetic creature evolution','Sorting sculpture','Cellular automata planet'],mechanic:'Change rules and seeds; inspect how local decisions create global behavior.'},
 {name:'Systems',items:['Packet-routing city','Distributed consensus theatre','Live shader compiler','Memory allocator reef','Procedural world streaming'],mechanic:'Scrub a timeline, introduce faults and inspect the resulting system state.'},
 {name:'Materials',items:['Programmable ferrofluid','Tearable cloth circuit','Voxel erosion forge','Origami mechanism solver','Signed-distance sculpture'],mechanic:'Drag, cut and reshape a material while its underlying constraints remain visible.'},
 {name:'Instruments',items:['Spatial audio loom','Gesture particle orchestra','Four-dimensional slicer','Recursive portal rooms','Data-driven weather chamber'],mechanic:'Use pointer or keyboard input to play an instrument built from code and space.'}
];
export const experiments=experimentGroups.flatMap((group,g)=>group.items.map((title,i)=>({title,group:group.name,description:group.mechanic,mode:(g+i)%8,id:g*5+i})));
