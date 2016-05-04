 var scene, camera, renderer;


 init();
 animate();


function init() {
 
    // Create the scene and set the scene size.
    scene = new THREE.Scene();
    var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;
 
    // More code goes here next...
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(WIDTH, HEIGHT);
    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 20000);
    camera.position.set(0,6,0);
    scene.add(camera);

    // Set the background color of the scene.
    renderer.setClearColorHex(0x333F47, 1);
 
    // Create a light, set its position, and add it to the scene.
    var light = new THREE.PointLight(0xffffff);
    light.position.set(-100,200,100);
    scene.add(light);

       // Load in the mesh and add it to the scene.
    // var loader = new THREE.JSONLoader();
    // loader.load( "/js/models/treehouse_logo.js", function(geometry){
    //   var material = new THREE.MeshLambertMaterial({color: 0x55B663});
    //   mesh = new THREE.Mesh(geometry, material);
    //   scene.add(mesh);
    // });
    var geometry = new THREE.CubeGeometry(1.5, 1.5, 1.5);
		
	var material = new THREE.MeshPhongMaterial({
			color: randomFairColor(),
			ambient: 0x808080,
			specular: 0xffffff,
			shininess: 20,
			reflectivity: 5.5 
		});
	var cube = new THREE.Mesh(geometry, material);
	cube.position = new THREE.Vector3(1, 1, 0);
		
	scene.add(cube);

    // Add OrbitControls so that we can pan around with the mouse.
    controls = new THREE.OrbitControls(camera, renderer.domElement);
 
  }


 // Renders the scene and updates the render as needed.
 function animate() {
 
    // Read more about requestAnimationFrame at http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    requestAnimationFrame(animate);
 
    // Render the scene.
    renderer.render(scene, camera);
    controls.update();
 
  }