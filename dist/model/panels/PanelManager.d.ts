export declare class PanelManager {
    container: HTMLDivElement;
    mainContainer: HTMLDivElement;
    sceneContainer: HTMLDivElement;
    optionsContainer: HTMLDivElement;
    constructor(container: HTMLDivElement);
    create_panels(): void;
    private create_scene_container;
    private create_main_container;
}
