import { Line } from "src/model/interfaces/Line.interface";

import * as THREE from 'three';

export class Projector {

    public static project_stream_onto_pointcloud( lines: Line[], pointCloud: number[][] ): number[][] {
        
        // creating point cloud
        const pointgeometry = new THREE.BufferGeometry();
        if(pointCloud.length > 0) pointgeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( pointCloud.flat(), 3 ) );

        const pointmaterial = new THREE.PointsMaterial( { size: 0.015, vertexColors: true, sizeAttenuation: true, transparent: true } );        
        const pointCloudObject = new THREE.Points( pointgeometry, pointmaterial );

        // creating raycaster
        const raycaster = new THREE.Raycaster();
        raycaster.params.Points!.threshold = 0.02;

        const projection: number[][] = [];
        lines.forEach( (line: Line ) => {

            raycaster.set( 
                new THREE.Vector3( line.origin[0],      line.origin[1],         line.origin[2] ), 
                new THREE.Vector3( line.destination[0], line.destination[1],    line.destination[2] ).normalize() 
            );
                
            let intersection: any = [];
            do{

                raycaster.params.Points!.threshold += 0.01;
                intersection = raycaster.intersectObject( pointCloudObject );
                

            }while(intersection.length === 0);

            projection.push( intersection[0].point.toArray() )
            raycaster.params.Points!.threshold = 0.02;
            
        });

        return projection;

    }

}