import * as THREE from 'three';
import { Dataset } from './model/Dataset';
import { SceneHighlights } from './model/highlights/Highlights';
import { SceneStyleManager } from './SceneStyleManager';
export declare class SceneManager {
    scene: THREE.Scene;
    callbacks: {
        [name: string]: any;
    };
    dataset: Dataset;
    sceneHighlights: SceneHighlights;
    sceneStyleManager: SceneStyleManager;
    constructor(scene: THREE.Scene, callbacks: {
        [name: string]: any;
    });
    highlight_object(objectType: string, position: number[] | number[][]): void;
    fire_callback(eventType: 'onHover' | 'onClick', objectType: string, objectName: string, index: number, position: number[]): void;
    get_interactive_layers(): string[];
    hide_object(name: string, visibility: boolean): void;
    set_style(name: string, style: string, value: number): void;
    set_dataset(dataset: Dataset): void;
    update(): void;
}
