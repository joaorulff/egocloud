"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dataset = void 0;
var WorldPointCloud_1 = require("./renderables/world/WorldPointCloud");
var Dataset = (function () {
    function Dataset(rawWorldPointCloud) {
        this.streams = {};
        this.worldPointCloud = new WorldPointCloud_1.WorldPointCloud('world', rawWorldPointCloud.positions, rawWorldPointCloud.colors, rawWorldPointCloud.normals);
    }
    return Dataset;
}());
exports.Dataset = Dataset;
