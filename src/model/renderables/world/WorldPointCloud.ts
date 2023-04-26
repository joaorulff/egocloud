import { PointCloud } from '../PointCloud'

export class WorldPointCloud extends PointCloud {

    constructor( public name: string, public points: number[][], public colors: number[][], public normals: number[][] ){

        // initializing super class
        super(name, points, colors, normals, []);

    }
    
}