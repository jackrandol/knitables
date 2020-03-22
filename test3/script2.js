var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 50)
camera.position.z = 30

var renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

var light = new THREE.AmbientLight( 0xFFFFFF )
scene.add( light )

var geometry = new THREE.SphereGeometry( 10, 32, 32 )
var material = new THREE.MeshPhongMaterial()
var loader = new THREE.TextureLoader();
material.map = loader.load('./jenny.png')


var earthMesh = new THREE.Mesh( geometry, material )

var texture = new THREE.TextureLoader().load('mercurymap.jpg')
var material = new THREE.MeshBasicMaterial( { map: texture });

scene.add( earthMesh )

// var orbit = new THREE.OrbitControls(camera, renderer.domElement)
// orbit.enableZoom = false

var render = function() {
    requestAnimationFrame(render)
    earthMesh.rotation.x += 0.005
    earthMesh.rotation.y += 0.005
    renderer.render(scene, camera)
}
render()
