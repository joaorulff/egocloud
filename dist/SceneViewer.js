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
    SceneViewer.prototype.highlight = function (objectType, position) {
        this.scene.sceneManager.highlight_object(objectType, position);
    };
    SceneViewer.prototype.clear_highlights = function () {
        this.scene.sceneManager.clear_highlights();
    };
    SceneViewer.prototype.hide = function (name, visible) {
        this.scene.sceneManager.hide_object(name, visible);
    };
    SceneViewer.prototype.set_style = function (name, style, value) {
        this.scene.sceneManager.set_style(name, style, value);
    };
    SceneViewer.prototype.get_scene_object_names = function () {
        return this.scene.sceneManager.dataset.get_available_objects();
    };
    SceneViewer.prototype.render = function (dataset) {
        this.scene.clear_scene();
        this.scene.show(dataset);
    };
    return SceneViewer;
}());
exports.SceneViewer = SceneViewer;
