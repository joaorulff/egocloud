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
exports.SceneManager = void 0;
var THREE = require("three");
var SceneManager = (function () {
    function SceneManager(scene) {
        this.scene = scene;
    }
    SceneManager.prototype.add_dataset_to_scene = function (dataset) {
        this.add_point_cloud(dataset.worldPointCloud);
    };
    SceneManager.prototype.add_point_cloud = function (pointCloud, materialParams) {
        if (materialParams === void 0) { materialParams = {}; }
        var _a = __read(pointCloud.get_buffer_positions(), 3), points = _a[0], colors = _a[1], normals = _a[2];
        var pointgeometry = new THREE.BufferGeometry();
        if (points.length > 0)
            pointgeometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
        if (colors.length > 0)
            pointgeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        if (normals.length > 0)
            pointgeometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
        pointgeometry.computeBoundingBox();
        var pointmaterial = new THREE.PointsMaterial({ size: 0.015, vertexColors: true, sizeAttenuation: true, transparent: true });
        var pointCloudObject = new THREE.Points(pointgeometry, pointmaterial);
        pointCloudObject.name = pointCloud.name;
        this.scene.add(pointCloudObject);
        return pointCloudObject;
    };
    return SceneManager;
}());
exports.SceneManager = SceneManager;
