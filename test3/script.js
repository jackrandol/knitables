// importing mesh from GLTFLoader, glft object made in blender 

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(200,window.innerWidth/window.innerHeight,0.5,1000)
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#e5e5e5");
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

//you can use this to have the canvas automatically readjust to the change size of the browser window
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
})

var loader = new THREE.GLTFLoader();
loader.load('myFirstShape.gltf', handle_load);

var material = new THREE.MeshPhongMaterial()
var imageLoader = new THREE.TextureLoader();
material.map = imageLoader.load('/default.png');



function handle_load(gltf) {
    let mesh = gltf.scene
    var imageMesh = new THREE.Mesh( mesh, material);
    console.log('mesh:', mesh);

    scene.add( imageMesh );
    scene.add( material);

    var render = function () {
        requestAnimationFrame(render);

        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;

        renderer.render(scene, camera);
        }

        render();

	 // Object
}

//object
// var geometry = new THREE.BoxGeometry(1, 1, 1);
// var material = new THREE.MeshLambertMaterial({color: 0xFFFF00});
// var mesh = new THREE.Mesh(geometry, material);
// // mesh.position.set(0, 0, -1000);
//
// mesh.position.x = -2;
// mesh.scale.set(1,2,1);
// //
// //add object to scene
//
// scene.add(mesh);

var light = new THREE.PointLight(0xFFFFFF, 1, 500);
light.position.set(10, 0, 25);
scene.add(light);

//make sure to render the scene AFTER you add the mesh duhhhh fuck

render();
