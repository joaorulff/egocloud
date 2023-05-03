"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene = void 0;
var THREE = require("three");
var OrbitControls_1 = require("three/examples/jsm/controls/OrbitControls");
var SceneManager_1 = require("../SceneManager");
var Scene = (function () {
    function Scene(containerRef) {
        this.container = containerRef;
        var _a = __read([this.container.offsetWidth, this.container.offsetHeight], 2), containerWidth = _a[0], containerHeight = _a[1];
        this.initialize_camera(containerWidth, containerHeight, [0, 0, 10]);
        this.initialize_scene();
        this.initialize_renderer(containerWidth, containerHeight);
        this.initialize_orbit_controls();
        this.sceneManager = new SceneManager_1.SceneManager(this.scene);
    }
    Scene.prototype.clear_scene = function () {
        while (this.scene.children.length) {
            this.scene.remove(this.scene.children[0]);
        }
    };
    Scene.prototype.show = function (dataset) {
        this.dataset = dataset;
        this.sceneManager.add_dataset_to_scene(this.dataset);
        this.render();
    };
    Scene.prototype.initialize_camera = function (width, height, position, near, far) {
        if (near === void 0) { near = 0.1; }
        if (far === void 0) { far = 100; }
        var aspectRatio = width / height;
        var camera = new THREE.PerspectiveCamera(75, aspectRatio, near, far);
        camera.position.set(position[0], position[1], position[2]);
        this.camera = camera;
    };
    Scene.prototype.initialize_renderer = function (width, height) {
        var renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);
        this.container.appendChild(renderer.domElement);
        this.renderer = renderer;
    };
    Scene.prototype.initialize_scene = function () {
        var scene = new THREE.Scene();
        scene.background = new THREE.Color('white');
        scene.fog = new THREE.Fog(0x050505, 2000, 3500);
        this.scene = scene;
    };
    Scene.prototype.initialize_orbit_controls = function () {
        var controls = new OrbitControls_1.OrbitControls(this.camera, this.renderer.domElement);
        this.orbitControls = controls;
    };
    Scene.prototype.render = function () {
        var _this = this;
        requestAnimationFrame(function () { return _this.render(); });
        this.renderer.render(this.scene, this.camera);
    };
    return Scene;
}());
exports.Scene = Scene;
