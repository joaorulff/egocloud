import * as THREE from 'three';
import { Scene } from 'three';
import { MousePosition } from '../interfaces/MousePosition.interface';
export declare class Raycaster {
    scene: Scene;
    private rayCaster;
    pointer: THREE.Vector2;
    pointerEvent: MouseEvent;
    constructor(scene: Scene);
    get_mouse_intersected_point(camera: THREE.PerspectiveCamera, activeLayers: string[]): {
        mousePosition: MousePosition;
        layerName: string | null;
        intersect: any[];
    };
    on_pointer_move(event: MouseEvent, canvasContainer: HTMLElement): void;
    set_scene_events(canvasContainer: HTMLElement): void;
}
