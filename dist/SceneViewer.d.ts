import { Dataset } from './model/Dataset';
import { Scene } from './model/Scene';
import { PanelManager } from './model/panels/PanelManager';
export declare class SceneViewer {
    containerElement: HTMLDivElement;
    dataset: any;
    scene: Scene;
    panelManager: PanelManager;
    constructor(containerElement: HTMLDivElement, callbacks?: {
        [name: string]: any;
    });
    highlight_object(objectType: string, position: number[] | number[][]): void;
    hide(name: string, visible: boolean): void;
    set_style(name: string, style: string, value: number): void;
    render(dataset: Dataset): void;
}
