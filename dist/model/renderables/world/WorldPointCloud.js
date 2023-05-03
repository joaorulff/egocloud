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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldPointCloud = void 0;
var PointCloud_1 = require("../PointCloud");
var WorldPointCloud = (function (_super) {
    __extends(WorldPointCloud, _super);
    function WorldPointCloud(name, points, colors, normals) {
        var _this = _super.call(this, name, points, colors, normals, []) || this;
        _this.name = name;
        _this.points = points;
        _this.colors = colors;
        _this.normals = normals;
        return _this;
    }
    return WorldPointCloud;
}(PointCloud_1.PointCloud));
exports.WorldPointCloud = WorldPointCloud;
