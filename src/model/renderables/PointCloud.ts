// external
import * as THREE from 'three';


// import { DataUtils } from '../../utils/DataUtils';

// export abstract class PointCloud {

//     public extent!: number[][];

//     constructor( public name: string, public points: number[][], public normals: number[][], public colors: number[][] ){

//         // calculating point extent
//         // this.extent = DataUtils.calculate_extents( points );

//     }

//     // abstract methods
//     // public abstract highlight( raycaster: Raycaster, dataset: Dataset, intersects: any[] ): number;
//     // public abstract offlight(): void;
//     // public abstract initialize_highlights(): void;
//     // public abstract get_highlight_objects(): Object3D[];

//     public get_buffer_positions(): [number[], number[], number[]] {
         
//         return [ this.points.flat(), this.normals.flat(), this.colors.flat() ];
    
//     }

// }

import { DataUtils } from '../../utils/DataUtils';
import { Renderable } from './Renderable';

export class PointCloud extends Renderable {

    public extent!: number[][];

    constructor( public name: string, public points: number[][], public normals: number[][], public colors: number[][] ){

        super( name );

        // calculating point extent
        this.extent = DataUtils.calculate_extents( points );

    }

    public get_renderables(): THREE.Object3D[] {

        const [points, colors, normals] = this.get_buffer_positions();

        // loading buffers
        const pointgeometry = new THREE.BufferGeometry();
        if(points.length > 0) pointgeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( points, 3 ) );
        if(colors.length > 0) pointgeometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
        if(normals.length > 0) pointgeometry.setAttribute( 'normal', new THREE.Float32BufferAttribute( normals, 3 ) );
        pointgeometry.computeBoundingBox();

        const pointmaterial = new THREE.PointsMaterial( { size: 0.015, vertexColors: true, sizeAttenuation: true, transparent: true } );        
        const pointCloudObject = new THREE.Points( pointgeometry, pointmaterial );

        // adding to scene
        pointCloudObject.name = this.name;
        
        return [pointCloudObject];

    }

    public get_buffer_positions(): [number[], number[], number[]] {
         
        return [ this.points.flat(), this.normals.flat(), this.colors.flat() ];
    
    }


}