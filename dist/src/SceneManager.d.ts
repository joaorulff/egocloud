import * as THREE from 'three';
import { Dataset } from './model/Dataset';
export declare class SceneManager {
    scene: THREE.Scene;
    constructor(scene: THREE.Scene);
    add_dataset_to_scene(dataset: Dataset): void;
    private add_point_cloud;
}
