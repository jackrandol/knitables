import * as THREE from "three";
import OrbitControls from "three-orbitcontrols";

export default function sweaterScene(
    bodyImage,
    rightSleeve,
    leftSleeve,
    headImage,
    ribColor
) {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.01,
        3000
    );
    camera.position.z = 50;

    var renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);

    let sceneElement = document.querySelector(".scene");
    sceneElement.appendChild(renderer.domElement);

    var light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

    var light2 = new THREE.PointLight(0xffffff, 0.3);
    scene.add(light2);

    window.addEventListener("resize", () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });

    var geometry = new THREE.SphereGeometry(9, 32, 32);

    ////tube
    function CustomSinCurve(scale) {
        THREE.Curve.call(this);

        this.scale = scale === undefined ? 1 : scale;
    }

    CustomSinCurve.prototype = Object.create(THREE.Curve.prototype);
    CustomSinCurve.prototype.constructor = CustomSinCurve;

    CustomSinCurve.prototype.getPoint = function (t) {
        var tx = t * 3 - 1.5;
        var ty = Math.sin(1 * Math.PI * t);
        var tz = 0;

        return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
    };

    var path = new CustomSinCurve(7);
    var tubeGeometry = new THREE.TubeGeometry(path, 20, 2.5, 9, false);
    var loader = new THREE.TextureLoader();
    var materialHead = new THREE.MeshPhongMaterial();
    materialHead.map = loader.load(headImage);
    var head = new THREE.Mesh(geometry, materialHead);
    var materialBody = new THREE.MeshStandardMaterial({ roughness: 0.3 });
    materialBody.map = loader.load(bodyImage);
    materialBody.normalMap = new THREE.TextureLoader().load("./knit.png");

    //BODY
    var points = [];
    for (var i = 0; i < 18; i++) {
        points.push(new THREE.Vector2(8 + Math.sin(i * 0.02) * 20, i * 1.2));
    }
    // points = points.reverse();
    var bodygeometry = new THREE.LatheGeometry(points);
    console.log("points", points);
    var newBody = new THREE.Mesh(bodygeometry, materialBody);

    var materialRightSleeve = new THREE.MeshPhongMaterial();
    materialRightSleeve.map = loader.load(rightSleeve);
    var rightArm = new THREE.Mesh(tubeGeometry, materialRightSleeve);

    var materialLeftSleeve = new THREE.MeshPhongMaterial();
    materialLeftSleeve.map = loader.load(leftSleeve);
    var leftArm = new THREE.Mesh(tubeGeometry, materialLeftSleeve);

    var necklineGeometry = new THREE.TorusGeometry(7, 1.2, 30, 100);
    var materialRib = new THREE.MeshPhongMaterial({ color: ribColor });
    var neckline = new THREE.Mesh(necklineGeometry, materialRib);

    var hemGeometry = new THREE.TorusGeometry(14.8, 0.8, 30, 100);
    var hem = new THREE.Mesh(hemGeometry, materialRib);

    var cuffGeometry = new THREE.TorusGeometry(2, 0.8, 30, 100);

    var leftCuff = new THREE.Mesh(cuffGeometry, materialRib);
    var rightCuff = new THREE.Mesh(cuffGeometry, materialRib);

    var basePlane = new THREE.PlaneBufferGeometry(20, 20, 20);

    var wireframe = new THREE.WireframeGeometry(basePlane);

    var line = new THREE.LineSegments(wireframe);
    line.material.depthTest = false;
    line.material.opacity = 0.25;
    line.material.transparent = true;
    function createAGrid(opts) {
        var config = opts || {
            height: 200,
            width: 200,
            linesHeight: 10,
            linesWidth: 10,
            color: 0xffffff,
        };

        var material = new THREE.LineBasicMaterial({
            color: config.color,
            opacity: 0.3,
        });

        var gridObject = new THREE.Object3D(),
            gridGeo = new THREE.Geometry(),
            stepw = (2 * config.width) / config.linesWidth,
            steph = (2 * config.height) / config.linesHeight;

        //width
        for (let i = -config.width; i <= config.width; i += stepw) {
            gridGeo.vertices.push(new THREE.Vector3(-config.height, i, 0));
            gridGeo.vertices.push(new THREE.Vector3(config.height, i, 0));
        }
        //height
        for (let i = -config.height; i <= config.height; i += steph) {
            gridGeo.vertices.push(new THREE.Vector3(i, -config.width, 0));
            gridGeo.vertices.push(new THREE.Vector3(i, config.width, 0));
        }

        var line = new THREE.Line(gridGeo, material, THREE.Segments);
        gridObject.add(line);

        return gridObject;
    }

    var grid = createAGrid();

    rightArm.position.set(14, -6, 0);
    rightArm.rotateZ(-0.5);
    leftArm.rotateZ(0.5);
    leftArm.position.set(-14, -6, 0);
    head.position.set(0, 20, 0);
    head.rotateY(-1.3);
    head.rotateZ(-0.3);
    newBody.position.set(0, 5, 0);
    newBody.rotateX(Math.PI);
    neckline.rotateX(Math.PI / 2);
    neckline.position.set(0, 5, 0);
    hem.rotateX(Math.PI / 2);
    hem.position.set(0, -15.5, 0);
    leftCuff.rotateX(Math.PI / 2);
    leftCuff.position.set(-23, -10.4, 0);
    rightCuff.rotateX(Math.PI / 2);
    rightCuff.rotateY(0.3);
    leftCuff.rotateY(-0.3);
    rightCuff.position.set(23, -10.4, 0);
    line.rotateX(Math.PI / 2);
    line.position.set(0, -30, 0);
    grid.rotateX(Math.PI / 2);
    grid.position.set(0, -35, 0);

    var orbit = new OrbitControls(camera, renderer.domElement);
    orbit.enableZoom = false;

    var group = new THREE.Group();

    group.add(neckline);
    group.add(head);
    group.add(rightArm);
    group.add(leftArm);
    group.add(newBody);
    group.add(hem);
    group.add(leftCuff);
    group.add(rightCuff);
    group.add(grid);

    scene.add(group);

    var render = function () {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    };
    render();
}
