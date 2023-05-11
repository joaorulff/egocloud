import { PointCloud } from "../PointCloud";

export class StreamPointCloud extends PointCloud {

    constructor( public name: string, public points: number[][], public normals: number[][], public colors: number[][] ){

        super(name, points, normals, colors);

    }
    
}