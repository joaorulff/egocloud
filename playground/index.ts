import { SceneViewer } from '../src/SceneViewer';
import { Dataset } from '../src/model/Dataset';


const main = async () => {
        
    let pointCloud: any = await fetch('./data/voxelized-pointcloud.json');
    pointCloud = await pointCloud.json();

    let eyes: any =  await fetch('./data/eye.json');
    eyes = await eyes.json();

    const positions = pointCloud.xyz_world
    const colors = pointCloud.colors;

    let eyePositions: any = eyes.map( (element: any) => [element.GazeOrigin.x, element.GazeOrigin.y, (-1)*element.GazeOrigin.z] );

    const dataset: Dataset = new Dataset( { positions: positions, colors: colors, normals: [] } );
    dataset.add_point_cloud( 'eye-position', eyePositions, [], [] );

    // Testing...
    const mainDiv: HTMLDivElement = <HTMLDivElement>document.getElementById('main-div');
    const egoCloud = new SceneViewer( mainDiv );
    egoCloud.render( dataset );


}

main();


