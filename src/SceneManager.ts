// third party
import * as THREE from 'three';
import { Dataset } from './model/Dataset';

// model 
import { PointCloud } from "./model/renderables/PointCloud";

export class SceneManager {

    constructor( public scene: THREE.Scene ){}

    public add_dataset_to_scene( dataset: Dataset ){

        // adding world point cloud
        this.add_point_cloud( dataset.worldPointCloud );

    }
    
    private add_point_cloud( pointCloud: PointCloud, materialParams: any = {} ): THREE.Points {

        // getting raw data
        const [points, colors, normals] = pointCloud.get_buffer_positions();

        // loading buffers
        const pointgeometry = new THREE.BufferGeometry();
        if(points.length > 0) pointgeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( points, 3 ) );
        if(colors.length > 0) pointgeometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
        if(normals.length > 0) pointgeometry.setAttribute( 'normal', new THREE.Float32BufferAttribute( normals, 3 ) );
        pointgeometry.computeBoundingBox();

        const pointmaterial = new THREE.PointsMaterial( { size: 0.015, vertexColors: true, sizeAttenuation: true, transparent: true } );        
        const pointCloudObject = new THREE.Points( pointgeometry, pointmaterial );

        // adding to scene
        pointCloudObject.name = pointCloud.name;
        this.scene.add( pointCloudObject );
        
        return pointCloudObject;
    
    }

}