// model
import { Dataset } from './model/Dataset';
import { Scene } from './model/Scene';

export class SceneViewer {

    /*
    *
    *
    * 
    * 
    */

    public dataset!: any;
    public scene!: Scene;

    constructor( /* containerElement: HTMLDivElement*/ ){

        // Creating scene
        // this.scene = new Scene( containerElement );

        console.log('Creating Scene Viewer....');

    }

    render( dataset: Dataset ){

        // this.scene.show( dataset );

        console.log('Rendering dataset into Scene');

    }

}