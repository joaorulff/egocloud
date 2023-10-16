"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneViewer = void 0;
var Scene_1 = require("./model/Scene");
var PanelManager_1 = require("./model/panels/PanelManager");
var SceneViewer = (function () {
    function SceneViewer(containerElement, callbacks) {
        if (callbacks === void 0) { callbacks = {}; }
        this.containerElement = containerElement;
        this.panelManager = new PanelManager_1.PanelManager(this.containerElement);
        this.panelManager.create_panels();
        this.scene = new Scene_1.Scene(this.panelManager.sceneContainer, callbacks);
    }
    SceneViewer.prototype.highlight_object = function (objectType, position) {
        this.scene.sceneManager.highlight_object(objectType, position);
    };
    SceneViewer.prototype.hide = function (name, visible) {
        this.scene.sceneManager.hide_object(name, visible);
    };
    SceneViewer.prototype.render = function (dataset) {
        this.scene.clear_scene();
        this.scene.show(dataset);
    };
    return SceneViewer;
}());
exports.SceneViewer = SceneViewer;