import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/loaders/GLTFLoader.js";

class BasicWorldDemo {
  constructor() {
    this._Initialize();
  }

  _Initialize() {
    this._threejs = new THREE.WebGLRenderer({
      antialias: true,
    });
    this._threejs.shadowMap.enabled = true;
    this._threejs.shadowMap.type = THREE.PCFSoftShadowMap;
    this._threejs.setPixelRatio(window.devicePixelRatio);
    this._threejs.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this._threejs.domElement);

    window.addEventListener(
      "resize",
      () => {
        this._OnWindowResize();
      },
      false
    );

    const fov = 60;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 1.0;
    const far = 1000.0;
    this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this._camera.position.set(100, 50, 100);

    this._scene = new THREE.Scene();

    let light = new THREE.DirectionalLight(0xffffff, 1.0);
    light.position.set(20, 100, 10);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow.bias = -0.001;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.left = 100;
    light.shadow.camera.right = -100;
    light.shadow.camera.top = 100;
    light.shadow.camera.bottom = -100;
    this._scene.add(light);

    light = new THREE.AmbientLight(0x101010);
    this._scene.add(light);

    const controls = new OrbitControls(this._camera, this._threejs.domElement);
    controls.target.set(0, 20, 0);
    controls.update();

    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
        './resources/posx.jpg',
        './resources/negx.jpg',
        './resources/posy.jpg',
        './resources/negy.jpg',
        './resources/posz.jpg',
        './resources/negz.jpg',
    ]);
    this._scene.background = texture;

    const loader2 = new GLTFLoader();
    loader2.load(
      "tajmahal.gltf",
      (gltf) => {
        const tajMahal = gltf.scene;
        tajMahal.position.set(0, 0, 0);
        this._scene.add(tajMahal);
      },
      undefined,
      (error) => {
        console.error("Error loading Taj Mahal model:", error);
      }
    );

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(1000, 1000, 10, 10),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
      })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    // this._scene.add(ground);

    this._RAF();
  }

  _OnWindowResize() {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._threejs.setSize(window.innerWidth, window.innerHeight);
  }

  _RAF() {
    requestAnimationFrame(() => {
      this._threejs.render(this._scene, this._camera);
      this._RAF();
    });
  }
}

let _APP = null;

window.addEventListener("DOMContentLoaded", () => {
  _APP = new BasicWorldDemo();
});





// import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";
// import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js";

// class BasicWorldDemo {
//   constructor() {
//     this._Initialize();
//   }

//   _Initialize() {
//     this._threejs = new THREE.WebGLRenderer({
//       antialias: true,
//     });
//     this._threejs.shadowMap.enabled = true;
//     this._threejs.shadowMap.type = THREE.PCFSoftShadowMap;
//     this._threejs.setPixelRatio(window.devicePixelRatio);
//     this._threejs.setSize(window.innerWidth, window.innerHeight);

//     document.body.appendChild(this._threejs.domElement);

//     window.addEventListener(
//       "resize",
//       () => {
//         this._OnWindowResize();
//       },
//       false
//     );

//     const fov = 60;
//     const aspect = window.innerWidth / window.innerHeight;
//     const near = 1.0;
//     const far = 1000.0;
//     this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
//     this._camera.position.set(75, 20, 0);

//     this._scene = new THREE.Scene();

//     let light = new THREE.DirectionalLight(0xffffff, 1.0);
//     light.position.set(20, 100, 10);
//     light.target.position.set(0, 0, 0);
//     light.castShadow = true;
//     light.shadow.bias = -0.001;
//     light.shadow.mapSize.width = 2048;
//     light.shadow.mapSize.height = 2048;
//     light.shadow.camera.near = 0.1;
//     light.shadow.camera.far = 500.0;
//     light.shadow.camera.near = 0.5;
//     light.shadow.camera.far = 500.0;
//     light.shadow.camera.left = 100;
//     light.shadow.camera.right = -100;
//     light.shadow.camera.top = 100;
//     light.shadow.camera.bottom = -100;
//     this._scene.add(light);

//     light = new THREE.AmbientLight(0x101010);
//     this._scene.add(light);

//     const controls = new OrbitControls(this._camera, this._threejs.domElement);
//     controls.target.set(0, 20, 0);
//     controls.update();

//     const loader = new THREE.CubeTextureLoader();
//     const texture = loader.load([
//       "./resources/posx.jpg",
//       "./resources/negx.jpg",
//       "./resources/posy.jpg",
//       "./resources/negy.jpg",
//       "./resources/posz.jpg",
//       "./resources/negz.jpg",
//     ]);
//     this._scene.background = texture;

//     const plane = new THREE.Mesh(
//       new THREE.PlaneGeometry(100, 100, 10, 10),
//       new THREE.MeshStandardMaterial({
//         color: 0xffffff,
//       })
//     );
//     plane.castShadow = false;
//     plane.receiveShadow = true;
//     plane.rotation.x = -Math.PI / 2;
//     this._scene.add(plane);

//     const house = new THREE.Group();

//     const base = new THREE.Mesh(
//       new THREE.BoxGeometry(200, 150, 200),
//       new THREE.MeshStandardMaterial({ color: 0xbababa })
//     );
//     base.position.set(0, 0, 0);
//     house.add(base);

//     const roof = new THREE.Mesh(
//       new THREE.ConeGeometry(4, 9, 4),
//       new THREE.MeshStandardMaterial({ color: 0xaa5500 })
//     );
//     roof.position.set(0, 9, 0);
//     roof.rotation.y = Math.PI / 4;
//     // house.add(roof);

//     // const door = new THREE.Mesh(
//     //   new THREE.BoxGeometry(3, 4, 0.1),
//     //   new THREE.MeshStandardMaterial({ color: 0x8b4513 })
//     // );
//     // door.position.set(0, 0, 5);
//     // house.add(door);

//     // const window1 = new THREE.Mesh(
//     //   new THREE.BoxGeometry(2, 2, 0.1),
//     //   new THREE./* In the given code, `MeshStandardMaterial({ color: 0xadd8e6 })` is creating a
//     //   material for the window objects in the scene. */
//     //   MeshStandardMaterial({ color: 0xadd8e6 })
//     // );
//     // window1.position.set(5, 4, 5);
//     // house.add(window1);

//     // const window2 = new THREE.Mesh(
//     //   new THREE.BoxGeometry(2, 2, 0.1),
//     //   new THREE.MeshStandardMaterial({ color: 0xadd8e6 })
//     // );
//     // window2.position.set(-5, 4, 5);
//     // house.add(window2);

//     house.position.set(0, 0, 0);
//     this._scene.add(house);

//     this._RAF();
//   }

//   _OnWindowResize() {
//     this._camera.aspect = window.innerWidth / window.innerHeight;
//     this._camera.updateProjectionMatrix();
//     this._threejs.setSize(window.innerWidth, window.innerHeight);
//   }

//   _RAF() {
//     requestAnimationFrame(() => {
//       this._threejs.render(this._scene, this._camera);
//       this._RAF();
//     });
//   }
// }

// let _APP = null;

// window.addEventListener("DOMContentLoaded", () => {
//   _APP = new BasicWorldDemo();
// });
