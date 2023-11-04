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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineSet = void 0;
var Renderable_1 = require("./Renderable");
var THREE = __importStar(require("three"));
var LineSet = (function (_super) {
    __extends(LineSet, _super);
    function LineSet(name, lines, colors, meta) {
        var _this = _super.call(this, name) || this;
        _this.name = name;
        _this.lines = lines;
        _this.colors = colors;
        _this.meta = meta;
        return _this;
    }
    LineSet.prototype.get_renderables = function () {
        var group = new THREE.Group();
        group.name = this.name;
        for (var i = 0; i < this.lines.length; i++) {
            var origin_1 = new THREE.Vector3(this.lines[i].origin[0], this.lines[i].origin[1], this.lines[i].origin[2]);
            var destination = new THREE.Vector3(this.lines[i].destination[0], this.lines[i].destination[1], this.lines[i].destination[2]);
            var lineColor = new THREE.Color(this.colors[i][0], this.colors[i][1], this.colors[i][2]);
            var lineMaterial = new THREE.LineBasicMaterial({ color: lineColor, linewidth: 2, transparent: true, opacity: 0.5 });
            var lineGeometry = new THREE.BufferGeometry().setFromPoints([origin_1, destination]);
            var line = new THREE.Line(lineGeometry, lineMaterial);
            group.add(line);
        }
        return group;
    };
    return LineSet;
}(Renderable_1.Renderable));
exports.LineSet = LineSet;
