/* eslint-disable */
(function (window) {
  'use strict';

  const scene = new THREE.Scene();

  utils.loadObject('models/gta-spano-2010.json')
    .then(function (obj) {
      obj.scale.set(0.1, 0.1, 0.1);

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