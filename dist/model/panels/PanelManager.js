"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PanelManager = void 0;
var PanelManager = (function () {
    function PanelManager(container) {
        this.container = container;
    }
    PanelManager.prototype.create_panels = function () {
        this.mainContainer = this.create_main_container(this.container);
        this.sceneContainer = this.create_scene_container(this.mainContainer);
    };
    PanelManager.prototype.create_scene_container = function (container) {
        var sceneContainer = document.createElement('div');
        sceneContainer.setAttribute('class', 'scene-container');
        sceneContainer.style.position = 'absolute';
        sceneContainer.style.top = '0px';
        sceneContainer.style.left = '0px';
        sceneContainer.style.width = '100%';
        sceneContainer.style.height = '100%';
        container.append(sceneContainer);
        return sceneContainer;
    };
    PanelManager.prototype.create_main_container = function (container) {
        var mainContainer = document.createElement('div');
        mainContainer.setAttribute('class', 'main-container');
        mainContainer.style.display = 'flex';
        mainContainer.style.position = 'relative';
        mainContainer.style.width = '100%';
        mainContainer.style.height = '100%';
        container.append(mainContainer);
        return mainContainer;
    };
    return PanelManager;
}());
exports.PanelManager = PanelManager;
