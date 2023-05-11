export class PanelManager {

    public mainContainer!: HTMLDivElement;
    public sceneContainer!: HTMLDivElement;
    public optionsContainer!: HTMLDivElement;

    constructor( public container: HTMLDivElement ){}

    public create_panels(): void {

        // creating main container
        this.mainContainer = this.create_main_container( this.container );
        this.sceneContainer = this.create_scene_container( this.mainContainer );
        this.optionsContainer = this.create_options_container( this.mainContainer );
    
    }

    private create_options_container( container: HTMLDivElement ): HTMLDivElement {

        const optionsDivContainer = document.createElement('div');
        const optionsDiv = document.createElement('div');

        // attributes
        optionsDivContainer.setAttribute( 'class', 'options-container' );
        optionsDiv.setAttribute( 'class', 'options-panel' );

        // styling
        optionsDivContainer.style.display = 'flex';
        optionsDivContainer.style.justifyContent = 'center';
        optionsDivContainer.style.alignItems = 'center';
        optionsDivContainer.style.width = '250px';
        optionsDivContainer.style.height = '100%';

        optionsDiv.style.width = '90%';
        optionsDiv.style.height = '95%';
        optionsDiv.style.backgroundColor = '#7F7F7D';
        optionsDiv.style.opacity = '0.9';
        optionsDiv.style.border = 'solid #5B5F62';
        optionsDiv.style.borderRadius = '10px';

        container.append( optionsDivContainer );
        optionsDivContainer.append( optionsDiv );

        return optionsDiv;


    }
    
    private create_scene_container( container: HTMLDivElement ): HTMLDivElement {

        const sceneContainer: HTMLDivElement = document.createElement('div');

        // attributes
        sceneContainer.setAttribute( 'class', 'sceve-container' );

        // styling
        sceneContainer.style.position = 'absolute'
        sceneContainer.style.top = '0px';
        sceneContainer.style.left = '0px';
        sceneContainer.style.width = '100%';
        sceneContainer.style.height = '100%';

        // appending
        container.append( sceneContainer );

        return sceneContainer;

    }

    private create_main_container( container: HTMLDivElement ): HTMLDivElement{

        const mainContainer = document.createElement('div');

        // attributes
        mainContainer.setAttribute( 'class', 'main-container' );

        // styling
        mainContainer.style.display = 'flex';
        mainContainer.style.position = 'relative'
        mainContainer.style.width = '100%';
        mainContainer.style.height = '100%';

        // appending
        container.append( mainContainer );

        return mainContainer;

    }

}