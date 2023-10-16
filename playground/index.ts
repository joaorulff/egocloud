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
    let eyeTimestamps: any = eyes.map( (element: any) =>  parseInt( element.timestamp.split('-')[0] ) );

    const dataset: Dataset = new Dataset();
    dataset.add_point_cloud( 'world', positions, colors, [], [], false, false, true  );
    dataset.add_point_cloud( 'eye-position', eyePositions, [], [], eyeTimestamps, false, true );
    
    // Testing...
    const mainDiv: HTMLDivElement = <HTMLDivElement>document.getElementById('main-div');
    const egoCloud = new SceneViewer( mainDiv, { 'onHover': ( index: number, name: string, position: number[], meta: any ) => { 
        egoCloud.highlight_object( 'point', position );
    }});

    egoCloud.render( dataset );

    // let i = 0.01
    // setInterval( () => {
    //     egoCloud.set_style('world', 'size', i );
    //     i += 0.01;
    // }, 2000);

}

main();


