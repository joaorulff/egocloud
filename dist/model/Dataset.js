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
exports.Dataset = void 0;
var VoxelGrid_1 = require("./voxel/VoxelGrid");
var PointCloud_1 = require("./renderables/PointCloud");
var DataUtils_1 = require("../utils/DataUtils");
var VoxelCloud_1 = require("./renderables/VoxelCloud");
var d3 = __importStar(require("d3"));
var LineSet_1 = require("./renderables/LineSet");
var Dataset = (function () {
    function Dataset() {
        this.pointClouds = {};
        this.heatmaps = {};
        this.lineSets = {};
        this.boundingBoxes = {};
    }
    Dataset.prototype.get_object_meta = function (type, name, index) {
        if (type === 'Points') {
        }
        try {
            return this.pointClouds[name].meta[index];
        }
        catch (_a) {
            return {};
        }
    };
    Dataset.prototype.get_available_objects = function () {
        var objects = {
            'pointClouds': Object.values(this.pointClouds).map(function (object) { return object.id; }),
            'heatmaps': Object.values(this.heatmaps).map(function (object) { return object.id; }),
            'lineSets': Object.values(this.lineSets).map(function (object) { return object.id; }),
            'boundingBoxes': Object.values(this.boundingBoxes).map(function (object) { return object.name; }),
        };
        return objects;
    };
    Dataset.prototype.add_point_cloud = function (name, points, normals, colors, meta, interactive, grid) {
        if (meta === void 0) { meta = []; }
        if (interactive === void 0) { interactive = false; }
        if (grid === void 0) { grid = false; }
        if (grid) {
            var extents = DataUtils_1.DataUtils.calculate_extents(points);
            this.voxelGrid = new VoxelGrid_1.VoxelGrid(extents[0], extents[1], extents[2]);
        }
        var pointCloud = new PointCloud_1.PointCloud(name, points, colors, normals, meta);
        pointCloud.set_interactivity(interactive);
        this.pointClouds[name] = pointCloud;
        this.voxelGrid.update_voxel_grid(name, points);
    };
    Dataset.prototype.add_line_set = function (name, lines, colors, meta) {
        var lineSet = new LineSet_1.LineSet(name, lines, colors, meta);
        this.lineSets[name] = lineSet;
    };
    Dataset.prototype.add_heatmap = function (name, color) {
        var cells = this.voxelGrid.get_point_cloud_voxel_cells(name);
        if (cells.length === 0)
            return;
        var cubes = [];
        var colors = [];
        var opacities = [];
        var _a = __read([-Infinity, +Infinity], 2), max = _a[0], min = _a[1];
        cells.forEach(function (cell) {
            if (cell.get_point_cloud_size(name) > max) {
                max = cell.get_point_cloud_size(name);
            }
            if (cell.get_point_cloud_size(name) < min) {
                min = cell.get_point_cloud_size(name);
            }
        });
        var opacityScale = d3.scaleLinear()
            .domain([min, max])
            .range([0.2, 0.7]);
        cells.forEach(function (cell) {
            cubes.push(cell.get_voxel_cube());
            colors.push(color);
            opacities.push(opacityScale(cell.get_point_cloud_size(name)));
        });
        var heatmap = new VoxelCloud_1.VoxelCloud("".concat(name, "-heatmap"), cubes, colors, opacities);
        this.heatmaps["".concat(name, "-heatmap")] = heatmap;
    };
    return Dataset;
}());
exports.Dataset = Dataset;
