import * as THREE from "three";
import OrbitControls from "three-orbitcontrols";

export default function loadingMesh() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, 400 / 400, 0.01, 3000);
    camera.position.z = 80;

    var renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setSize(400, 400);

    let loadingDiv = document.querySelector(".loadingMesh");
    loadingDiv.appendChild(renderer.domElement);

    var light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);

    var light2 = new THREE.PointLight(0xffffff, 0.5);
    scene.add(light2);

    var cylinderGeometry = new THREE.CylinderGeometry(1, 4, 10, 30, {
        openEnded: false,
    });

    var knittingShaft = new THREE.CylinderGeometry(4, 4, 50, 30);
    var baseGeo = new THREE.CylinderGeometry(5.5, 5.5, 7, 30);

    var cylinderGeometry2 = new THREE.CylinderGeometry(1, 4, 10, 30, {
        openEnded: false,
    });

    var knittingShaft2 = new THREE.CylinderGeometry(4, 4, 50, 30);
    var baseGeo2 = new THREE.CylinderGeometry(5.5, 5.5, 7, 30);

    var orbit = new OrbitControls(camera, renderer.domElement);
    orbit.enableZoom = false;

    var group = new THREE.Group();
    var group2 = new THREE.Group();

    var material = new THREE.MeshStandardMaterial({
        color: "rgb(232, 232, 232)",
    });
    var tip = new THREE.Mesh(cylinderGeometry, material);
    var shaft = new THREE.Mesh(knittingShaft, material);
    var base = new THREE.Mesh(baseGeo, material);

    var tip2 = new THREE.Mesh(cylinderGeometry2, material);
    var shaft2 = new THREE.Mesh(knittingShaft2, material);
    var base2 = new THREE.Mesh(baseGeo2, material);

    tip.position.set(0, 30, 0);
    base.position.set(0, -25, 0);

    tip2.position.set(0, 30, 0);
    base2.position.set(0, -25, 0);

    group.add(tip);
    group.add(shaft);
    group.add(base);
    group2.add(tip2);
    group2.add(shaft2);
    group2.add(base2);

    group2.rotateY(2);

    scene.add(group, group2);

    var render = function () {
        requestAnimationFrame(render);
        group.rotation.x += 0.005;
        group.rotation.y += 0.005;
        group.rotation.z += 0.005;
        group2.rotation.x += 0.008;
        group2.rotation.y += 0.008;
        group2.rotation.z += 0.008;
        renderer.render(scene, camera);
    };
    render();
}
