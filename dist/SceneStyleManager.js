"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneStyleManager = void 0;
var SceneStyleManager = (function () {
    function SceneStyleManager() {
    }
    SceneStyleManager.prototype.change_style = function (name, style, value, scene) {
        var object = scene.getObjectByName(name);
        if (style === 'opacity') {
            if ((object === null || object === void 0 ? void 0 : object.type) === 'Points') {
                this.change_pointcloud_opacity(object, value);
            }
            return;
        }
        if (style === 'size') {
            if ((object === null || object === void 0 ? void 0 : object.type) === 'Points') {
                this.change_pointcloud_size(object, value);
            }
            return;
        }
    };
    SceneStyleManager.prototype.change_pointcloud_size = function (object, value) {
        object.material.size = value;
    };
    SceneStyleManager.prototype.change_pointcloud_opacity = function (object, value) {
        object.material.opacity = value;
    };
    return SceneStyleManager;
}());
exports.SceneStyleManager = SceneStyleManager;
