"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var THREE = __importStar(require("three"));
var OrbitControls_1 = require("three/examples/jsm/controls/OrbitControls");
var SceneManager_1 = require("../SceneManager");
var Raycaster_1 = require("./raycaster/Raycaster");
var Scene = (function () {
    function Scene(containerRef, callbacks) {
        this.callbacks = callbacks;
        this.container = containerRef;
        var _a = __read([this.container.offsetWidth, this.container.offsetHeight], 2), containerWidth = _a[0], containerHeight = _a[1];
        this.initialize_camera(containerWidth, containerHeight, [0, 0, 10]);
        this.initialize_scene();
        this.initialize_renderer(containerWidth, containerHeight);
        this.initialize_orbit_controls();
        this.initialize_raycaster();
        this.sceneManager = new SceneManager_1.SceneManager(this.scene, this.callbacks);
    }
    Scene.prototype.clear_scene = function () {
        while (this.scene.children.length) {
            this.scene.remove(this.scene.children[0]);
        }
    };
    Scene.prototype.show = function (dataset) {
        this.sceneManager.set_dataset(dataset);
        this.sceneManager.update();
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
    Scene.prototype.initialize_raycaster = function () {
        this.rayCaster = new Raycaster_1.Raycaster(this.scene);
        this.rayCaster.set_scene_events(this.container);
    };
    Scene.prototype.render = function () {
        var _this = this;
        requestAnimationFrame(function () { return _this.render(); });
        this.orbitControls.update();
        var intersection = this.rayCaster.get_mouse_intersected_point(this.camera, this.sceneManager.get_interactive_layers());
        if (intersection.layerName) {
            this.sceneManager.fire_callback('onHover', intersection.intersect[0].object.type, intersection.intersect[0].object.name, intersection.intersect[0].index, intersection.intersect[0].point.toArray());
        }
        else {
            this.sceneManager.fire_callback('onHover', '', '', -1, []);
        }
        this.renderer.render(this.scene, this.camera);
    };
    return Scene;
}());
exports.Scene = Scene;
