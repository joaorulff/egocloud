import { SceneViewer } from '../src/SceneViewer';
import { Dataset } from '../src/model/Dataset';

const main = async () => {
        
    let pointCloud: any = await fetch('./data/voxelized-pointcloud.json');
    pointCloud = await pointCloud.json();

    let pointCloud2: any = await fetch('./data/voxelized-pointcloud-2.json');
    pointCloud2 = await pointCloud2.json();

    let eyes: any =  await fetch('./data/eye.json');
    eyes = await eyes.json();

    const positions = pointCloud.xyz_world
    const colors = pointCloud.colors;

    let eyePositions: any = eyes.map( (element: any) => [element.GazeOrigin.x, element.GazeOrigin.y, (-1)*element.GazeOrigin.z] );

    const dataset: Dataset = new Dataset();
    dataset.add_point_cloud( 'world', positions, colors, [], [], false  );
    dataset.add_point_cloud( 'eye-position', eyePositions, [], [], [], false, true );
    
    // Testing...
    const mainDiv: HTMLDivElement = <HTMLDivElement>document.getElementById('main-div');
    const egoCloud = new SceneViewer( mainDiv, { 'onHover': ( meta: any ) => { 
        
        console.log('TEST')

    }});


    let index = 0;
    setInterval( () => {

        if( index % 2 === 0 ){

            console.log('CHANGING');

            const positions1 = pointCloud2.xyz_world
            const colors1 = pointCloud2.colors;
    
            const dataset1: Dataset = new Dataset();
            dataset1.add_point_cloud( 'world', positions1, colors1, [], [], false  );
    
            egoCloud.render( dataset1 );


        } else {

            console.log('CHANGING');

            const positions2 = pointCloud.xyz_world
            const colors2 = pointCloud.colors;
    
            const dataset2: Dataset = new Dataset();
            dataset2.add_point_cloud( 'world', positions2, colors2, [], [], false  );
    
            egoCloud.render( dataset2 );

        }

       index++;


    }, 2000 );

    egoCloud.render( dataset );

}

main();


