import { DataUtils } from '../../utils/DataUtils';

export abstract class PointCloud {

    public extent!: number[][];

    constructor( public name: string, public points: number[][], public normals: number[][], public colors: number[][] ){

        // calculating point extent
        // this.extent = DataUtils.calculate_extents( points );

    }

    // abstract methods
    // public abstract highlight( raycaster: Raycaster, dataset: Dataset, intersects: any[] ): number;
    // public abstract offlight(): void;
    // public abstract initialize_highlights(): void;
    // public abstract get_highlight_objects(): Object3D[];

    public get_buffer_positions(): [number[], number[], number[]] {
         
        return [ this.points.flat(), this.normals.flat(), this.colors.flat() ];
    
    }

}