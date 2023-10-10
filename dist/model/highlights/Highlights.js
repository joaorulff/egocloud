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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneHighlights = void 0;
var THREE = __importStar(require("three"));
var SceneHighlights = (function () {
    function SceneHighlights() {
        this.points = [];
        this.lines = [];
        this.currentHighlights = [];
    }
    SceneHighlights.prototype.highlight_object = function (objectType, position, scene) {
        this.currentHighlights.forEach(function (object) {
            scene.remove(object);
        });
        if (objectType === 'point') {
            this.highlight_sphere(objectType, position, scene);
            return;
        }
    };
    SceneHighlights.prototype.clear_current_highlight = function () { };
    SceneHighlights.prototype.highlight_sphere = function (objectType, position, scene) {
        var sphereColor = new THREE.Color(0.5, 0.5, 0.5);
        var sphereGeometry = new THREE.SphereGeometry(0.025, 15, 15);
        var sphereMaterial = new THREE.MeshBasicMaterial({ color: sphereColor });
        var pointVector = new THREE.Vector3(position[0], position[1], position[2]);
        var sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphereMesh.position.copy(pointVector);
        this.currentHighlights.push(sphereMesh);
        scene.add(sphereMesh);
    };
    SceneHighlights.prototype.highlight_line = function () { };
    return SceneHighlights;
}());
exports.SceneHighlights = SceneHighlights;
