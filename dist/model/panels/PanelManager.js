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
    PanelManager.prototype.update_options_container = function (streams) {
        var _this = this;
        streams.forEach(function (name) {
            var currentDiv = document.createElement('div');
            currentDiv.style.width = '100%';
            currentDiv.style.height = '70px';
            currentDiv.style.backgroundColor = 'blue';
            _this.optionsContainer.append(currentDiv);
        });
    };
    PanelManager.prototype.create_options_container = function (container) {
        var optionsDivContainer = document.createElement('div');
        var optionsDiv = document.createElement('div');
        optionsDivContainer.setAttribute('class', 'options-container');
        optionsDiv.setAttribute('class', 'options-panel');
        optionsDivContainer.style.display = 'flex';
        optionsDivContainer.style.justifyContent = 'center';
        optionsDivContainer.style.alignItems = 'center';
        optionsDivContainer.style.width = '450px';
        optionsDivContainer.style.height = '100%';
        optionsDiv.style.display = 'flex';
        optionsDiv.style.flexDirection = 'vertical';
        optionsDiv.style.width = '90%';
        optionsDiv.style.height = '95%';
        optionsDiv.style.backgroundColor = '#7F7F7D';
        optionsDiv.style.opacity = '0.9';
        optionsDiv.style.border = 'solid #5B5F62';
        optionsDiv.style.borderRadius = '10px';
        container.append(optionsDivContainer);
        optionsDivContainer.append(optionsDiv);
        return optionsDiv;
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
