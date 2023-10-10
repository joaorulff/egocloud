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
exports.Raycaster = void 0;
var THREE = __importStar(require("three"));
var Raycaster = (function () {
    function Raycaster(scene) {
        this.scene = scene;
        this.pointer = new THREE.Vector2();
        this.rayCaster = new THREE.Raycaster();
        this.rayCaster.params.Points.threshold = 0.015;
    }
    Raycaster.prototype.get_mouse_intersected_point = function (camera, activeLayers) {
        this.rayCaster.setFromCamera(this.pointer, camera);
        for (var layerIndex = 0; layerIndex < activeLayers.length; layerIndex++) {
            var layerName = activeLayers[layerIndex];
            var sceneObject = this.scene.getObjectByName(layerName);
            if (!sceneObject || !sceneObject.visible)
                continue;
            var intersects = sceneObject ? this.rayCaster.intersectObjects([sceneObject], false) : [];
            if (intersects.length > 0 && this.pointerEvent) {
                return {
                    mousePosition: { top: this.pointerEvent.offsetY, left: this.pointerEvent.offsetX },
                    layerName: layerName,
                    intersect: intersects
                };
            }
        }
        ;
        return { mousePosition: { top: 0, left: 0 }, layerName: null, intersect: [] };
    };
    Raycaster.prototype.on_pointer_move = function (event, canvasContainer) {
        this.pointerEvent = event;
        var rect = canvasContainer.getBoundingClientRect();
        this.pointer.x = ((event.clientX - rect.left) / (rect.right - rect.left)) * 2 - 1;
        this.pointer.y = -((event.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;
    };
    Raycaster.prototype.set_scene_events = function (canvasContainer) {
        var _this = this;
        canvasContainer.addEventListener('pointermove', function (event) { _this.on_pointer_move(event, canvasContainer); });
    };
    return Raycaster;
}());
exports.Raycaster = Raycaster;
