"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneViewer = void 0;
var Scene_1 = require("./model/Scene");
var SceneViewer = (function () {
    function SceneViewer(containerElement) {
        this.scene = new Scene_1.Scene(containerElement);
    }
    SceneViewer.prototype.render = function (dataset) {
        this.scene.show(dataset);
    };
    return SceneViewer;
}());
exports.SceneViewer = SceneViewer;
