import { VoxelGrid } from "./voxel/VoxelGrid";
import { PointCloud } from "./renderables/PointCloud";
import { DataUtils } from "../utils/DataUtils";
import { VoxelCube } from "./interfaces/VoxelCube.interface";
import { VoxelCloud } from "./renderables/VoxelCloud";
import { VoxelCell } from "./voxel/VoxelCell";
import * as d3 from 'd3';
import { LineSet } from "./renderables/LineSet";
import { Line } from "./interfaces/Line.interface";
import { Renderable } from "./renderables/Renderable";

export class Dataset {

    public voxelGrid!: VoxelGrid;

    // available sets
    public pointClouds: { [name: string]: PointCloud } = {};
    public heatmaps: { [name: string]: VoxelCloud } = {};
    public lineSets: { [name: string]: LineSet } = {};

    // TODO: refactor these bounding boxes. It should have its own class under renderables folder
    public boundingBoxes: { [name: string]: THREE.Object3D } = {}

    constructor(){}

    public get_object_meta( type: string, name: string, index: number ): any {

        if( type === 'Points' ){
            } try {
                return this.pointClouds[name].meta[index];
            } catch {
                return {};
            }       
    }

    public get_available_objects():  { [type: string]: string[] } {

        const objects: { [type: string]: string[] } = {
            'pointClouds': Object.values( this.pointClouds ).map( (object: Renderable) => object.id ),
            'heatmaps': Object.values( this.heatmaps ).map( (object: Renderable) => object.id ),
            'lineSets': Object.values( this.lineSets ).map( (object: Renderable) => object.id ),
            'boundingBoxes': Object.values( this.boundingBoxes ).map( (object: THREE.Object3D) => object.name ),
        } 

        return objects

    }

    public add_point_cloud( 
        name: string, 
        points: number[][], 
        normals: number[][], 
        colors: number[][], 
        meta: any[] = [],  
        interactive: boolean = false, 
        grid: boolean = false ): void {

        if( grid ){
            const extents: number[][] = DataUtils.calculate_extents( points );
            this.voxelGrid = new VoxelGrid(extents[0], extents[1], extents[2]);
        }

        const pointCloud: PointCloud = new PointCloud( name, points, colors, normals, meta );
        pointCloud.set_interactivity( interactive );

        // indexing
        this.pointClouds[name] = pointCloud; 
        this.voxelGrid.update_voxel_grid( name, points );

    }

    public add_line_set( name: string, lines: Line[], colors: number[][], meta: any[] ){

        const lineSet: LineSet = new LineSet( name, lines, colors, meta );
        this.lineSets[name] = lineSet;

    }

    public add_heatmap( name: string, color: number[] ): void {

        const cells: VoxelCell[] = this.voxelGrid.get_point_cloud_voxel_cells( name );

        // if the point cloud is not indexed
        if( cells.length === 0 ) return;

        const cubes: VoxelCube[] = [];
        const colors: number[][] = [];
        const opacities: number[] = [];

        // getting extent
        let [max, min] = [-Infinity, +Infinity];
        cells.forEach( (cell: VoxelCell) => {
            if( cell.get_point_cloud_size(name) > max ){
                max = cell.get_point_cloud_size(name);
            }
            if( cell.get_point_cloud_size(name) < min ){
                min = cell.get_point_cloud_size(name)
            }
        })

        const opacityScale: d3.ScaleLinear<any, any> = d3.scaleLinear()
            .domain([min, max])
            .range([0.2,0.7]);

        cells.forEach( (cell: VoxelCell) => {
            cubes.push( cell.get_voxel_cube() );
            colors.push( color );            
            opacities.push( opacityScale( cell.get_point_cloud_size(name) ) );
        });
        
        const heatmap: VoxelCloud = new VoxelCloud( `${name}-heatmap`, cubes, colors, opacities );
        this.heatmaps[`${name}-heatmap`] = heatmap;

    }


}