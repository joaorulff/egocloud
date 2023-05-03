"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataUtils = void 0;
var DataUtils = (function () {
    function DataUtils() {
    }
    DataUtils.calculate_extents = function (points) {
        var xExtent = [Infinity, -Infinity];
        var yExtent = [Infinity, -Infinity];
        var zExtent = [Infinity, -Infinity];
        points.forEach(function (point) {
            xExtent[0] = Math.min(point[0], xExtent[0]);
            xExtent[1] = Math.max(point[0], xExtent[1]);
            yExtent[0] = Math.min(point[1], yExtent[0]);
            yExtent[1] = Math.max(point[1], yExtent[1]);
            zExtent[0] = Math.min(point[2], zExtent[0]);
            zExtent[1] = Math.max(point[2], zExtent[1]);
        });
        return [xExtent, yExtent, zExtent];
    };
    return DataUtils;
}());
exports.DataUtils = DataUtils;
