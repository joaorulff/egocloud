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

    constructor( containerElement: HTMLDivElement ){

        // Creating scene
        this.scene = new Scene( containerElement );

    }

    render( dataset: Dataset ){

        this.scene.show( dataset );

    }

}