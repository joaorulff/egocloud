"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneManager = void 0;
var Highlights_1 = require("./model/highlights/Highlights");
var SceneManager = (function () {
    function SceneManager(scene, callbacks) {
        this.scene = scene;
        this.callbacks = callbacks;
        this.sceneHighlights = new Highlights_1.SceneHighlights();
    }
    SceneManager.prototype.highlight_object = function (objectType, position) {
        this.sceneHighlights.highlight_object(objectType, position, this.scene);
    };
    SceneManager.prototype.fire_callback = function (eventType, objectType, objectName, index, position) {
        if (eventType in this.callbacks) {
            var meta = this.dataset.get_object_meta(objectType, objectName, index);
            this.callbacks[eventType](index, objectName, position, meta);
        }
    };
    SceneManager.prototype.get_interactive_layers = function () {
        var e_1, _a;
        if (this.dataset) {
            var layers = [];
            try {
                for (var _b = __values(Object.entries(this.dataset.pointClouds)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
                    if (value.interactive) {
                        layers.push(value.name);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return layers;
        }
        return [];
    };
    SceneManager.prototype.hide_object = function (name, visibility) {
        var currentObject = this.scene.getObjectByName(name);
        if (currentObject) {
            currentObject.visible = visibility;
        }
    };
    SceneManager.prototype.set_dataset = function (dataset) {
        this.dataset = dataset;
    };
    SceneManager.prototype.update = function () {
        var e_2, _a, e_3, _b;
        var _this = this;
        if (this.dataset) {
            try {
                for (var _c = __values(Object.entries(this.dataset.pointClouds)), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var _e = __read(_d.value, 2), key = _e[0], value = _e[1];
                    var currentRenderables = value.get_renderables();
                    currentRenderables.forEach(function (renderable) {
                        _this.scene.add(renderable);
                    });
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
            try {
                for (var _f = __values(Object.entries(this.dataset.heatmaps)), _g = _f.next(); !_g.done; _g = _f.next()) {
                    var _h = __read(_g.value, 2), key = _h[0], value = _h[1];
                    var currentRenderables = value.get_renderables();
                    currentRenderables.forEach(function (renderable) {
                        _this.scene.add(renderable);
                    });
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
    };
    return SceneManager;
}());
exports.SceneManager = SceneManager;
