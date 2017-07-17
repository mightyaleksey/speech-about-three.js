/* eslint-disable */
(function (window) {
  'use strict';

  const scene = new THREE.Scene();

  Promise.all([
    utils.loadObject('models/2003eclipse.json'),
    utils.loadTexture('models/2003eclipse/eclipse2003-diffuse-purple.tga'),
    utils.loadTexture('models/2003eclipse/wheel-diffuse.tga'),
  ])
    .then(function (parts) {
      const obj = parts[0];
      const vehicleTexture = parts[1];
      const wheelTexture = parts[2];

      const textureMap = {
        '36EEA861-0957-4E78-B74F-E27057336CA0': vehicleTexture,
        'BE397DD1-6552-43B9-B2FA-835922E393FA': wheelTexture,
      };

      obj.traverse(function (child) {
        if (
          child.material &&
          child.material.map === null &&
          textureMap[child.material.uuid]
        ) {
          child.material.setValues({map: textureMap[child.material.uuid]});
        }
      });

      obj.scale.set(0.3, 0.3, 0.3);

      scene.add(obj);
      utils.render(animate);
    });

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 300);
  const renderer = new THREE.WebGLRenderer();
  const controls = new THREE.OrbitControls(camera, renderer.domElement);

  camera.position.set(0, 5, 20);
  renderer.setSize(window.innerWidth, window.innerHeight);

  controls.target.set(0, 5, 0);
  controls.update();

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
  scene.add(directionalLight);

  const light = new THREE.AmbientLight(0x404040); // soft white light
  scene.add(light);

  document.body.appendChild(renderer.domElement);

  function animate() {
    renderer.render(scene, camera);
  }

})(window);
