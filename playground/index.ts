import { SceneViewer } from '../src/SceneViewer';
import { Dataset } from '../src/model/Dataset';

import { Projector } from '../src/utils/Projector';

const main = async () => {
        
    let pointCloud: any = await fetch('./data/voxelized-pointcloud.json');
    pointCloud = await pointCloud.json();

    let eyes: any =  await fetch('./data/eye.json');
    eyes = await eyes.json();



    // if(coord[1] <= -0.39 || coord[1] >= -0.018){
    //     xyz.push(coord);
    //     colors.push(dataset.colors[index]);
    // }

    let positions: any = [];
    let colors: any = [];
    pointCloud.xyz_world.forEach( (coord: number[], index: number) => {
        if(coord[1] <= -0.35){
            positions.push( coord );
            colors.push( pointCloud.colors[index] );
        }   
    })
    // const positions = pointCloud.xyz_world
    // const colors = pointCloud.colors;

    // console.log(positions);
    // console.log(colors);

    let eyePositions: any = eyes.map( (element: any) => [element.GazeOrigin.x, element.GazeOrigin.y, (-1)*element.GazeOrigin.z] );
    let eyeTimestamps: any = eyes.map( (element: any) =>  parseInt( element.timestamp.split('-')[0] ) );


    const lineColors: number [][] = [];
    let eyeDirections: any = eyes.map( (element: any) => {

        lineColors.push( [0.5, 0.1, 0.3 ] );
        const obj = {   origin: [element.GazeOrigin.x, element.GazeOrigin.y, (-1)*element.GazeOrigin.z],
            destination: [
               element.GazeDirection.x,
                element.GazeDirection.y,
                (-1)*element.GazeDirection.z
            ]
        }

        return obj;
        
    });

    const projection: number[][] = Projector.project_stream_onto_pointcloud( eyeDirections, positions );

    const dataset: Dataset = new Dataset();
    dataset.add_point_cloud( 'world', positions, [], colors, [], false, true  );
    dataset.add_point_cloud( 'eye', eyePositions, [], [], eyeTimestamps, true, false );
    dataset.add_point_cloud( 'gaze', projection, [], [], eyeTimestamps, true, false );
    
    // Testing...
    const mainDiv: HTMLDivElement = <HTMLDivElement>document.getElementById('main-div');
    const egoCloud = new SceneViewer( mainDiv, { 'onHover': ( index: number, name: string, position: number[], meta: any ) => { 


        egoCloud.clear_highlights();
        egoCloud.highlight( 'point', position );
        egoCloud.highlight( 'point', projection[index] );
        egoCloud.highlight( 'line', {origin: position, destination: projection[index] });

    }});

    egoCloud.render( dataset );

}

main();


