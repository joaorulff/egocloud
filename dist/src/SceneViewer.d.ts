import { Dataset } from './model/Dataset';
import { Scene } from './model/Scene';
export declare class SceneViewer {
    dataset: any;
    scene: Scene;
    constructor(containerElement: HTMLDivElement);
    render(dataset: Dataset): void;
}
