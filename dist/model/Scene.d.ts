import * as THREE from 'three';
import { SceneManager } from '../SceneManager';
import { Dataset } from './Dataset';
export declare class Scene {
    container: HTMLElement;
    camera: THREE.PerspectiveCamera;
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    private orbitControls;
    dataset: Dataset;
    sceneManager: SceneManager;
    constructor(containerRef: HTMLElement);
    clear_scene(): void;
    show(dataset: Dataset): void;
    private initialize_camera;
    private initialize_renderer;
    private initialize_scene;
    private initialize_orbit_controls;
    private render;
}
