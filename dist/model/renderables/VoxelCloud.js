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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoxelCloud = void 0;
var Renderable_1 = require("./Renderable");
var THREE = __importStar(require("three"));
var VoxelCloud = (function (_super) {
    __extends(VoxelCloud, _super);
    function VoxelCloud(name, cubes, colors, opacities) {
        var _this = _super.call(this, name) || this;
        _this.name = name;
        _this.cubes = cubes;
        _this.colors = colors;
        _this.opacities = opacities;
        return _this;
    }
    VoxelCloud.prototype.get_renderables = function () {
        var _this = this;
        var group = new THREE.Group();
        group.name = this.name;
        var geometry = new THREE.BoxGeometry(this.cubes[0].width, this.cubes[0].height, this.cubes[0].depth);
        this.cubes.forEach(function (cube, index) {
            var color = new THREE.Color(_this.colors[index][0], _this.colors[index][1], _this.colors[index][2]);
            var material = new THREE.MeshBasicMaterial({ color: color, opacity: _this.opacities[index], transparent: true });
            var object = new THREE.Mesh(geometry, material);
            object.position.x = cube.center[0];
            object.position.y = cube.center[1];
            object.position.z = cube.center[2];
            group.add(object);
        });
        return group;
    };
    return VoxelCloud;
}(Renderable_1.Renderable));
exports.VoxelCloud = VoxelCloud;
