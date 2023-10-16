"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoxelGrid = void 0;
var VoxelCell_1 = require("./VoxelCell");
var VoxelGrid = (function () {
    function VoxelGrid(xExtent, yExtent, zExtent) {
        this.xExtent = xExtent;
        this.yExtent = yExtent;
        this.zExtent = zExtent;
        this.cellSize = 0.025;
        this.voxelMap = {};
    }
    VoxelGrid.prototype.update_voxel_grid = function (pointCloudName, points) {
        var _this = this;
        if (this.xExtent.length == 0 || this.yExtent.length == 0 || this.zExtent.length == 0)
            throw new Error('Extents not initalized');
        points.forEach(function (point, index) {
            var xIndex = Math.floor((point[0] - _this.xExtent[0]) / _this.cellSize);
            var yIndex = Math.floor((point[1] - _this.yExtent[0]) / _this.cellSize);
            var zIndex = Math.floor((point[2] - _this.zExtent[0]) / _this.cellSize);
            var voxelIndex = "".concat(xIndex, "-").concat(yIndex, "-").concat(zIndex);
            if (!(voxelIndex in _this.voxelMap)) {
                _this.voxelMap[voxelIndex] = new VoxelCell_1.VoxelCell([_this.xExtent[0] + (xIndex * _this.cellSize), _this.xExtent[0] + ((xIndex + 1) * _this.cellSize)], [_this.yExtent[0] + (yIndex * _this.cellSize), _this.yExtent[0] + ((yIndex + 1) * _this.cellSize)], [_this.zExtent[0] + (zIndex * _this.cellSize), _this.zExtent[0] + ((zIndex + 1) * _this.cellSize)]);
            }
            _this.voxelMap[voxelIndex].index_new_point(pointCloudName, index);
        });
    };
    VoxelGrid.prototype.get_point_cloud_voxel_cells = function (pointCloudName) {
        var voxelCells = [];
        Object.values(this.voxelMap).forEach(function (voxelCell) {
            if (voxelCell.is_point_cloud_indexed(pointCloudName)) {
                voxelCells.push(voxelCell);
            }
        });
        return voxelCells;
    };
    return VoxelGrid;
}());
exports.VoxelGrid = VoxelGrid;