import React, { useEffect } from "react";import { services } from "../constants/services";
import * as THREE from "three";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

let scene,
  renderer,
  camera,
  mesh,
  geometry,
  lights = [];

var wireframe = true,
  material;

var createIndexedPlaneGeometry = function (width, length) {
  var geom = new THREE.BufferGeometry();
  var vertices = [];
  var indices = [];
  var uvs = [];
  var width1 = width + 1;
  var length1 = length + 1;
  for (var i = 0; i < width1; i++) {
    for (var j = 0; j < length1; j++) {
      vertices.push(i / width, 0, j / length);
      uvs.push(i / width, j / length);
    }
  }

  for (var i = 0; i < width; i++) {
    for (var j = 0; j < length; j++) {
      var a = i * length1 + j;
      var b = i * length1 + j + 1;
      var c = (i + 1) * length1 + j;
      var d = (i + 1) * length1 + j + 1;

      indices.push(a, c, b);
      indices.push(b, c, d);
    }
  }

  var positions = new Float32Array(vertices);
  var index = new Uint32Array(indices);
  uvs = new Float32Array(uvs);

  geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geom.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geom.setIndex(new THREE.BufferAttribute(index, 1));
  console.log(geom);
  return geom;
};

var main = function (geom, radius) {
  var pos = geom.attributes.position.array;
  var uvs = geom.attributes.uv.array;

  var pi = Math.PI;

  for (var i = 0, u = 0, v = 1; i < pos.length; i += 3, u += 2, v += 2) {
    pos[i] = radius * Math.sin(uvs[u] * pi) * Math.cos(uvs[v] * 2 * pi);
    pos[i + 1] = radius * Math.sin(uvs[u] * pi) * Math.sin(uvs[v] * 2 * pi);
    pos[i + 2] = radius * Math.cos(uvs[u] * pi);
  }

  geom.setAttribute("base_position", geom.attributes.position.clone());
  geom.computeVertexNormals();
};

const initScene = function () {
  scene = new THREE.Scene();
  // Renderer
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
  });
  renderer.setClearColor(0xffffff, 1.0);
  renderer.autoClearColor = false;
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("canvas").appendChild(renderer.domElement);

  // My Light
  lights[0] = new THREE.PointLight(0x353535, 1, 0);
  lights[0].position.set(0, 400, 400);

  scene.add(lights[0]);

  // My Camera
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 350);
};

function rotateObject(object, degreeX = 0, degreeY = 0, degreeZ = 0) {
  degreeX = (degreeX * Math.PI) / 180;
  degreeY = (degreeY * Math.PI) / 180;
  degreeZ = (degreeZ * Math.PI) / 180;

  object.rotateX(degreeX);
  object.rotateY(degreeY);
  object.rotateZ(degreeZ);
}

var init = function () {
  initScene();
  mesh = new THREE.Object3D();
  mesh.scale.set(100, 100, 100);
  rotateObject(mesh, -90, -45, -180);

  geometry = createIndexedPlaneGeometry(100, 150);
  main(geometry, 1);

  material = new THREE.MeshStandardMaterial({
    color: 0x123524,
    emissive: 0x353535,
    metalness: 0.5,
    wireframe: wireframe,
  });

  mesh.add(new THREE.Mesh(geometry, material));

  scene.add(mesh);

  animate();
};

window.onmousemove = function (e) {};

var time = 0;
var modifyGeometry = function () {
  var pos = geometry.attributes.position.array;
  var base_pos = geometry.attributes.base_position.array;

  var uvs = geometry.attributes.uv.array;

  for (var i = 0, j = 0; i < pos.length; i += 3, j += 2) {
    var scale = 0.01 * Math.cos(uvs[j] * 7 + time * 0.01);
    scale += 0.05 * Math.cos(uvs[j + 1] * 9 + time * 0.05);

    for (var k = 2; k < 6; k += 2) {
      scale += 0.05 * k * Math.cos(uvs[j] * 9 * k + (k + time * 0.05));
      scale += 0.05 * k * Math.cos(uvs[j + 1] * 7 * k + (k + time * 0.05));
    }

    scale *= scale * 0.7 * Math.sin(time * 0.04 + uvs[j] * 4);

    pos[i] = base_pos[i] * (1 + scale);
    pos[i + 1] = base_pos[i + 1] * (1 + scale);
    pos[i + 2] = base_pos[i + 2] * (1 + scale);
  }

  geometry.attributes.position.needsUpdate = true;
  geometry.computeVertexNormals();
};

var animate = function () {
  time++;
  scene.requestFrame = requestAnimationFrame(animate);
  modifyGeometry();

  renderer.render(scene, camera);
};

var update = function () {};

const Services = () => {
  useEffect(() => {
    const container = document.getElementById("canvas");
    if (container.innerHTML !== "") {
      return;
    }
    init();
  }, []);

  return (
    <div className="mx-auto pt-10" id="services">
      <div className="flex flex-col items-center justify-center">
        <p className="m-5 font-['AvenirNextBold'] font-light uppercase">
          Our Services
        </p>
        <h1 className="leading-80 tracking[-0.1875] mt-8 font-['AvenirNextBold'] text-4xl font-bold md:text-5xl">
          What We Do
        </h1>
        <div className="w-full">
          <div className="relative">
            <div className="relative flex items-center justify-start">
              <div
                id="canvas"
                className="service-canvas absolute top-0 z-20 hidden md:block"
              />
            </div>
          </div>
          <div className="hidden md:block container grid grid-cols-3 p-5 text-center md:gap-y-24 md:p-20">
            <div className="card col-span-3 md:col-span-1">
              <div className="service-card">{services[0].name}</div>
              {services[0].services.map((item, index) => (
                <p key={index} className="service-card-item  ">
                  {item}
                </p>
              ))}
            </div>
            <div></div>
            <div className="card col-span-3 md:col-span-1">
              <div className="service-card">{services[1].name}</div>
              {services[1].services.map((item, index) => (
                <p key={index} className="service-card-item">
                  {item}
                </p>
              ))}
            </div>
            <div />
            <div className="pt-30 col-span-3 md:col-span-1 xl:pt-52">
              <div className="service-card">{services[2].name}</div>
              {services[2].services.map((item, index) => (
                <p key={index} className="service-card-item">
                  {item}
                </p>
              ))}
            </div>
          </div>
          <Carousel className = "pt-20" showStatus={false}>
              {services.map((service, index) => {
                return (
                  <div className="card col-span-3">
                    <div className="service-card">{service.name}</div>
                    {service.services.map((item, index) => (
                      <p key={index} className="service-card-item  ">
                        {item}
                      </p>
                    ))}
                  </div>
                );
              })}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Services;
