"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var THREE = __importStar(require("three"));
var Highlights_1 = require("./model/highlights/Highlights");
var SceneStyleManager_1 = require("./SceneStyleManager");
var SceneManager = (function () {
    function SceneManager(scene, callbacks) {
        this.scene = scene;
        this.callbacks = callbacks;
        this.latestCallbackIndex = 0;
        this.sceneHighlights = new Highlights_1.SceneHighlights();
        this.sceneStyleManager = new SceneStyleManager_1.SceneStyleManager();
    }
    SceneManager.prototype.highlight_object = function (objectType, position) {
        this.sceneHighlights.highlight_object(objectType, position, this.scene);
    };
    SceneManager.prototype.clear_highlights = function () {
        this.sceneHighlights.clear_current_highlight(this.scene);
    };
    SceneManager.prototype.fire_callback = function (eventType, objectType, objectName, index, position) {
        if (eventType in this.callbacks) {
            if (this.latestCallbackIndex !== index) {
                this.latestCallbackIndex = index;
                var meta = this.dataset.get_object_meta(objectType, objectName, index);
                this.callbacks[eventType](index, objectName, position, meta);
            }
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
    SceneManager.prototype.set_style = function (name, style, value) {
        this.sceneStyleManager.change_style(name, style, value, this.scene);
    };
    SceneManager.prototype.set_dataset = function (dataset) {
        this.dataset = dataset;
    };
    SceneManager.prototype.update = function () {
        var e_2, _a, e_3, _b, e_4, _c;
        if (this.dataset) {
            try {
                for (var _d = __values(Object.entries(this.dataset.pointClouds)), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var _f = __read(_e.value, 2), key = _f[0], value = _f[1];
                    var currentRenderable = value.get_renderables();
                    this.scene.add(currentRenderable);
                    var box = new THREE.BoxHelper(currentRenderable, '#000000');
                    box.name = "".concat(key, "-boundingbox");
                    this.dataset.boundingBoxes["".concat(key, "-boundingbox")] = box;
                    this.scene.add(box);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                }
                finally { if (e_2) throw e_2.error; }
            }
            try {
                for (var _g = __values(Object.entries(this.dataset.lineSets)), _h = _g.next(); !_h.done; _h = _g.next()) {
                    var _j = __read(_h.value, 2), key = _j[0], value = _j[1];
                    var currentRenderable = value.get_renderables();
                    this.scene.add(currentRenderable);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
                }
                finally { if (e_3) throw e_3.error; }
            }
            try {
                for (var _k = __values(Object.entries(this.dataset.heatmaps)), _l = _k.next(); !_l.done; _l = _k.next()) {
                    var _m = __read(_l.value, 2), key = _m[0], value = _m[1];
                    var currentRenderable = value.get_renderables();
                    this.scene.add(currentRenderable);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_l && !_l.done && (_c = _k.return)) _c.call(_k);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
    };
    return SceneManager;
}());
exports.SceneManager = SceneManager;
