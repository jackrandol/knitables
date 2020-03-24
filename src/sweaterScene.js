import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';

export default function sweaterScene(bodyImage, rightSleeve, leftSleeve) {

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        50
    );
    camera.position.z = 50;

    var renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);

    let sceneElement = document.querySelector('.scene');
    sceneElement.appendChild(renderer.domElement);

    var light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

    window.addEventListener("resize", () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;

        camera.updateProjectionMatrix();
    });

    var geometry = new THREE.SphereGeometry(9, 32, 32);

    var cylinderGeometry = new THREE.CylinderGeometry(7, 10, 25, 30, {
        openEnded: false
    });

    ////tube
    function CustomSinCurve(scale) {
        THREE.Curve.call(this);

        this.scale = scale === undefined ? 1 : scale;
    }

    CustomSinCurve.prototype = Object.create(THREE.Curve.prototype);
    CustomSinCurve.prototype.constructor = CustomSinCurve;

    CustomSinCurve.prototype.getPoint = function(t) {
        var tx = t * 3 - 1.5;
        var ty = Math.sin(1 * Math.PI * t);
        var tz = 0;

        return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
    };

    var path = new CustomSinCurve(10);
    var tubeGeometry = new THREE.TubeGeometry(path, 20, 2, 10, false);
    var tubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    var materialHead = new THREE.MeshPhongMaterial();
    var materialBody = new THREE.MeshPhongMaterial();
    var materialRightSleeve = new THREE.MeshPhongMaterial();
    var materialLeftSleeve = new THREE.MeshPhongMaterial();


    var loader = new THREE.TextureLoader();

    materialHead.map = loader.load('./hairlessRabbit.jpg')
    materialBody.map = loader.load(bodyImage);
    materialRightSleeve.map = loader.load(rightSleeve);
    materialLeftSleeve.map = loader.load(leftSleeve);


    var body = new THREE.Mesh(cylinderGeometry, materialBody);
    var rightArm = new THREE.Mesh(tubeGeometry, materialRightSleeve);
    var leftArm = new THREE.Mesh(tubeGeometry, materialLeftSleeve);

    rightArm.position.set(20, 0, 0);

    // tubeMesh2.rotateX(5);
    body.rotateY(5);
    rightArm.rotateX(-5);
    var head = new THREE.Mesh(geometry, materialHead);
    head.position.set(0, 25, 0);

    console.log('renderer.domElement:', renderer.domElement);

    var orbit = new OrbitControls(camera, renderer.domElement);
    orbit.enableZoom = false;

    //add meshes to group and then add group to scene
    var group = new THREE.Group();

    group.add(head);
    group.add(rightArm);
    group.add(body);
    group.add(leftArm);

    scene.add(group);


    var render = function() {
        requestAnimationFrame(render);
        head.rotation.y += 0.005;
        renderer.render(scene, camera);
    };
    render();
}
