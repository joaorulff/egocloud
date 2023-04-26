import { SceneViewer } from './SceneViewer';
import { Dataset } from './model/Dataset';


fetch('./voxelized-pointcloud.json')
    .then((response) => response.json())
    .then((json) => {
        
        const positions = json.xyz_world
        const colors = json.colors;
        
        // Creating dataset
        const dataset: Dataset = new Dataset( { positions: positions, colors: colors, normals: [] } );

        // Testing...
        const mainDiv: HTMLDivElement = <HTMLDivElement>document.getElementById('main-div');
        const egoCloud = new SceneViewer( mainDiv );
        egoCloud.render( dataset );
    
    
    });


