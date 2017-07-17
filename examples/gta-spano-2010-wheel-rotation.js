/* eslint-disable */
(function (window) {
  'use strict';

  const scene = new THREE.Scene();
  const frontPivot = new THREE.Group();

  utils.loadObject('models/gta-spano-2010.json')
    .then(function (obj) {
      scene.add(obj);
      utils.render(animate);

      return obj;
    })
    .then(function (obj) {
      const tyreFrontLeft = obj.getObjectByName('tyre_front_left');
      const tyreFrontRight = obj.getObjectByName('tyre_front_right');

      const bb = new THREE.Box3().setFromObject(tyreFrontLeft);
      const c = bb.getCenter();

      tyreFrontLeft.geometry.translate(0, -c.y, -c.z);
      tyreFrontRight.geometry.translate(0, -c.y, -c.z);
      frontPivot.position.set(0, c.y, c.z);

      frontPivot.add(tyreFrontLeft);
      frontPivot.add(tyreFrontRight);
      scene.add(frontPivot);
    })
    .catch(er => console.error(er));

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 300);
  const renderer = new THREE.WebGLRenderer();
  const controls = new THREE.OrbitControls(camera, renderer.domElement);

  camera.position.set(0, 50, 200);
  renderer.setSize(window.innerWidth, window.innerHeight);

  controls.target.set(0, 50, 0);
  controls.update();

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(-100, 200, 200);
  scene.add(directionalLight);

  const light = new THREE.AmbientLight(0x404040); // soft white light
  scene.add(light);

  document.body.appendChild(renderer.domElement);

  function animate() {
    frontPivot.rotateX(0.1);

    renderer.render(scene, camera);
  }

})(window);
