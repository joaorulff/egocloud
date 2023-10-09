import { VoxelGrid } from "./voxel/VoxelGrid";
import { PointCloud } from "./renderables/PointCloud";
import { DataUtils } from "../utils/DataUtils";
import { VoxelCube } from "./interfaces/VoxelCube.interface";
import { VoxelCloud } from "./renderables/VoxelCloud";
import { VoxelCell } from "./voxel/VoxelCell";
import * as d3 from 'd3';

export class Dataset {

    public voxelGrid!: VoxelGrid;

    // available point clouds
    public pointClouds: { [name: string]: PointCloud } = {};
    public heatmaps: { [name: string]: VoxelCloud } = {};

    // add lines

    constructor(){}

    public add_point_cloud( name: string, points: number[][], normals: number[][], colors: number[][], meta: any[] = [], heatmap: boolean = false, interactive: boolean = false ): void {

        // TODO: This is creating the voxel grid on the WORLD POINT CLOUD. But it should be adaptive!
        if( !this.voxelGrid && name === 'world' ){

            const extents: number[][] = DataUtils.calculate_extents( points );
            this.voxelGrid = new VoxelGrid(extents[0], extents[1], extents[2])
        
        }

        const pointCloud: PointCloud = new PointCloud( name, points, normals, colors );
        pointCloud.set_interactivity( interactive );

        // indexing
        this.pointClouds[name] = pointCloud; 
        this.voxelGrid.update_voxel_grid( name, points );

        if( heatmap ){
            this.add_heatmap( name );
        }

    }

    private add_heatmap( name: string ): void {

        const cells: VoxelCell[] = this.voxelGrid.get_point_cloud_voxel_cells( name );
    
        const cubes: VoxelCube[] = [];
        const colors: number[][] = [];
        const opacities: number[] = [];

        // getting extent
        let max: number = -Infinity;
        cells.forEach( (cell: VoxelCell) => {
            if( cell.get_point_cloud_size(name) > max ){
                max = cell.get_point_cloud_size(name);
            }
        })

        // creating color scale
        const colorScale: d3.ScaleSequential<any, any> = 
        d3.scaleSequential()
            .domain([0, max])
            .interpolator(d3.interpolateBlues);


        cells.forEach( (cell: VoxelCell) => {


            cubes.push( cell.get_voxel_cube() );
            
            const color: any = d3.color(colorScale( cell.get_point_cloud_size(name) ));
            const formatedColor: number[] = [ color.r/255, color.g/255, color.b/255 ];
            colors.push( formatedColor );
            
            opacities.push(0.5);

        })
        
        console.log(colors)
        const heatmap: VoxelCloud = new VoxelCloud( `${name}-heatmap`, cubes, colors, opacities );
        this.heatmaps[`${name}-heatmap`] = heatmap;
    }

}