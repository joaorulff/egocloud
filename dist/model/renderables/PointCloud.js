"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.PointCloud = void 0;
var THREE = __importStar(require("three"));
var DataUtils_1 = require("../../utils/DataUtils");
var Renderable_1 = require("./Renderable");
var PointCloud = (function (_super) {
    __extends(PointCloud, _super);
    function PointCloud(name, points, normals, colors, meta) {
        var _this = _super.call(this, name) || this;
        _this.name = name;
        _this.points = points;
        _this.normals = normals;
        _this.colors = colors;
        _this.meta = meta;
        _this.interactive = false;
        _this.extent = DataUtils_1.DataUtils.calculate_extents(points);
        return _this;
    }
    PointCloud.prototype.set_interactivity = function (interactive) {
        this.interactive = interactive;
    };
    PointCloud.prototype.get_renderables = function () {
        var _a = __read(this.get_buffer_positions(), 3), points = _a[0], colors = _a[1], normals = _a[2];
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
        pointCloudObject.name = this.name;
        return pointCloudObject;
    };
    PointCloud.prototype.get_buffer_positions = function () {
        return [this.points.flat(), this.normals.flat(), this.colors.flat()];
    };
    return PointCloud;
}(Renderable_1.Renderable));
exports.PointCloud = PointCloud;
