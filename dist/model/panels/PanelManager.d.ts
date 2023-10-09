export declare class PanelManager {
    container: HTMLDivElement;
    mainContainer: HTMLDivElement;
    sceneContainer: HTMLDivElement;
    optionsContainer: HTMLDivElement;
    constructor(container: HTMLDivElement);
    create_panels(): void;
    update_options_container(streams: string[]): void;
    private create_options_container;
    private create_scene_container;
    private create_main_container;
}
