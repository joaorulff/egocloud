import * as THREE from 'three';
import { SceneManager } from '../SceneManager';
import { Dataset } from './Dataset';
import { Raycaster } from './raycaster/Raycaster';
export declare class Scene {
    callbacks: {
        [name: string]: any;
    };
    container: HTMLElement;
    camera: THREE.PerspectiveCamera;
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    rayCaster: Raycaster;
    private orbitControls;
    dataset: Dataset;
    sceneManager: SceneManager;
    constructor(containerRef: HTMLElement, callbacks: {
        [name: string]: any;
    });
    clear_scene(): void;
    show(dataset: Dataset): void;
    private initialize_camera;
    private initialize_renderer;
    private initialize_scene;
    private initialize_orbit_controls;
    private initialize_raycaster;
    private render;
}
