"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoxelCell = void 0;
var VoxelCell = (function () {
    function VoxelCell(xExtent, yExtent, zExtent) {
        this.xExtent = xExtent;
        this.yExtent = yExtent;
        this.zExtent = zExtent;
        this.pointCloudIndices = {};
    }
    VoxelCell.prototype.get_voxel_cube = function () {
        var width = Math.abs(this.xExtent[1] - this.xExtent[0]);
        var height = Math.abs(this.yExtent[1] - this.yExtent[0]);
        var depth = Math.abs(this.zExtent[1] - this.zExtent[0]);
        var center = [
            (this.xExtent[1] + this.xExtent[0]) / 2,
            (this.yExtent[1] + this.yExtent[0]) / 2,
            (this.zExtent[1] + this.zExtent[0]) / 2,
        ];
        var cube = { width: width, height: height, depth: depth, center: center };
        return cube;
    };
    VoxelCell.prototype.is_point_cloud_indexed = function (pointCloudName) {
        return (pointCloudName in this.pointCloudIndices);
    };
    VoxelCell.prototype.index_new_point = function (pointCloudName, pointIndex) {
        if (!(pointCloudName in this.pointCloudIndices)) {
            this.pointCloudIndices[pointCloudName] = new Set();
        }
        this.pointCloudIndices[pointCloudName].add(pointIndex);
    };
    VoxelCell.prototype.get_point_cloud_size = function (name) {
        return this.pointCloudIndices[name].size;
    };
    return VoxelCell;
}());
exports.VoxelCell = VoxelCell;
