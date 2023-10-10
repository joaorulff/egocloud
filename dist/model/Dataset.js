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
exports.Dataset = void 0;
var VoxelGrid_1 = require("./voxel/VoxelGrid");
var PointCloud_1 = require("./renderables/PointCloud");
var DataUtils_1 = require("../utils/DataUtils");
var VoxelCloud_1 = require("./renderables/VoxelCloud");
var d3 = __importStar(require("d3"));
var Dataset = (function () {
    function Dataset() {
        this.pointClouds = {};
        this.heatmaps = {};
    }
    Dataset.prototype.get_object_meta = function (type, name, index) {
        if (type === 'Points') {
            try {
                return this.pointClouds[name].meta[index];
            }
            catch (_a) {
                return {};
            }
        }
    };
    Dataset.prototype.add_point_cloud = function (name, points, normals, colors, meta, heatmap, interactive, grid) {
        if (meta === void 0) { meta = []; }
        if (heatmap === void 0) { heatmap = false; }
        if (interactive === void 0) { interactive = false; }
        if (grid === void 0) { grid = false; }
        if (grid) {
            var extents = DataUtils_1.DataUtils.calculate_extents(points);
            this.voxelGrid = new VoxelGrid_1.VoxelGrid(extents[0], extents[1], extents[2]);
        }
        var pointCloud = new PointCloud_1.PointCloud(name, points, normals, colors, meta);
        pointCloud.set_interactivity(interactive);
        this.pointClouds[name] = pointCloud;
        this.voxelGrid.update_voxel_grid(name, points);
    };
    Dataset.prototype.add_heatmap = function (name) {
        var cells = this.voxelGrid.get_point_cloud_voxel_cells(name);
        var cubes = [];
        var colors = [];
        var opacities = [];
        var max = -Infinity;
        cells.forEach(function (cell) {
            if (cell.get_point_cloud_size(name) > max) {
                max = cell.get_point_cloud_size(name);
            }
        });
        var colorScale = d3.scaleSequential()
            .domain([0, max])
            .interpolator(d3.interpolateBlues);
        cells.forEach(function (cell) {
            cubes.push(cell.get_voxel_cube());
            var color = d3.color(colorScale(cell.get_point_cloud_size(name)));
            var formatedColor = [color.r / 255, color.g / 255, color.b / 255];
            colors.push(formatedColor);
            opacities.push(0.5);
        });
        var heatmap = new VoxelCloud_1.VoxelCloud("".concat(name, "-heatmap"), cubes, colors, opacities);
        this.heatmaps["".concat(name, "-heatmap")] = heatmap;
    };
    return Dataset;
}());
exports.Dataset = Dataset;
