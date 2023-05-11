import { PointCloud } from '../PointCloud'

export class WorldPointCloud extends PointCloud {

    constructor( public name: string, public points: number[][], public normals: number[][], public colors: number[][] ){

        // initializing super class
        super(name, points, normals, colors);

    }
    
}