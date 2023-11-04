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
exports.Projector = void 0;
var THREE = __importStar(require("three"));
var Projector = (function () {
    function Projector() {
    }
    Projector.project_stream_onto_pointcloud = function (lines, pointCloud) {
        var pointgeometry = new THREE.BufferGeometry();
        if (pointCloud.length > 0)
            pointgeometry.setAttribute('position', new THREE.Float32BufferAttribute(pointCloud.flat(), 3));
        var pointmaterial = new THREE.PointsMaterial({ size: 0.015, vertexColors: true, sizeAttenuation: true, transparent: true });
        var pointCloudObject = new THREE.Points(pointgeometry, pointmaterial);
        var raycaster = new THREE.Raycaster();
        raycaster.params.Points.threshold = 0.02;
        var projection = [];
        lines.forEach(function (line) {
            raycaster.set(new THREE.Vector3(line.origin[0], line.origin[1], line.origin[2]), new THREE.Vector3(line.destination[0], line.destination[1], line.destination[2]).normalize());
            var intersection = [];
            do {
                raycaster.params.Points.threshold += 0.01;
                intersection = raycaster.intersectObject(pointCloudObject);
            } while (intersection.length === 0);
            projection.push(intersection[0].point.toArray());
            raycaster.params.Points.threshold = 0.02;
        });
        return projection;
    };
    return Projector;
}());
exports.Projector = Projector;
