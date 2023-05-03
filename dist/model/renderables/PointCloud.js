"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointCloud = void 0;
var DataUtils_1 = require("../../utils/DataUtils");
var PointCloud = (function () {
    function PointCloud(name, points, colors, normals, timestamps) {
        this.name = name;
        this.points = points;
        this.colors = colors;
        this.normals = normals;
        this.timestamps = timestamps;
        this.extent = DataUtils_1.DataUtils.calculate_extents(points);
    }
    PointCloud.prototype.get_buffer_positions = function () {
        return [this.points.flat(), this.colors.flat(), this.normals.flat()];
    };
    return PointCloud;
}());
exports.PointCloud = PointCloud;
