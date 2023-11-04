import { Dataset } from './model/Dataset';
import { Scene } from './model/Scene';
import { PanelManager } from './model/panels/PanelManager';
import { Line } from './model/interfaces/Line.interface';
export declare class SceneViewer {
    containerElement: HTMLDivElement;
    scene: Scene;
    panelManager: PanelManager;
    constructor(containerElement: HTMLDivElement, callbacks?: {
        [name: string]: any;
    });
    highlight(objectType: string, position: number[] | Line): void;
    clear_highlights(): void;
    hide(name: string, visible: boolean): void;
    set_style(name: string, style: string, value: number): void;
    get_scene_object_names(): {
        [type: string]: string[];
    };
    render(dataset: Dataset): void;
}
