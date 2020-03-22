var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 50)
camera.position.z = 30

var renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

var light = new THREE.AmbientLight( 0xFFFFFF )
scene.add( light )

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
})

var geometry = new THREE.SphereGeometry( 10, 32, 32 )

var cylinderGeometry = new THREE.CylinderGeometry(5, 5, 30, 30, { openEnded: true });
var cylinder = new THREE.Mesh( cylinderGeometry, material);

////tube
function CustomSinCurve( scale ) {

	THREE.Curve.call( this );

	this.scale = ( scale === undefined ) ? 1 : scale;

}

CustomSinCurve.prototype = Object.create( THREE.Curve.prototype );
CustomSinCurve.prototype.constructor = CustomSinCurve;

CustomSinCurve.prototype.getPoint = function ( t ) {

	var tx = t * 3 - 1.5;
	var ty = Math.sin( 2 * Math.PI * t );
	var tz = 0;

	return new THREE.Vector3( tx, ty, tz ).multiplyScalar( this.scale );

};

var path = new CustomSinCurve( 10 );
var tubeGeometry = new THREE.TubeGeometry( path, 20, 2, 8, false );
var tubeMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var tubeMesh = new THREE.Mesh( tubeGeometry, tubeMaterial );


var material = new THREE.MeshPhongMaterial()
var loader = new THREE.TextureLoader();
material.map = loader.load('./jenny.png')


var earthMesh = new THREE.Mesh( geometry, material )

// var texture = new THREE.TextureLoader().load('jenny.png');
var material = new THREE.MeshBasicMaterial( { map: texture });

//add meshes to group and then add group to scene 
var group = new THREE.Group();

group.add( earthMesh );
group.add( cylinder );
group.add( tubeMesh );


scene.add( group );

// var orbit = new THREE.OrbitControls(camera, renderer.domElement)
// orbit.enableZoom = false

var render = function() {
    requestAnimationFrame(render)
    earthMesh.rotation.x += 0.005
    earthMesh.rotation.y += 0.005
    renderer.render(scene, camera)
}
render()
