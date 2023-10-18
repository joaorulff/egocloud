import { Object3D } from "three";

export class SceneStyleManager {

    public change_style( name: string, style: string, value: number, scene: THREE.Scene ): void {

        const object: Object3D | undefined = scene.getObjectByName( name );

        if( style === 'opacity' ){
            if( object?.type === 'Points' ){
                this.change_pointcloud_opacity(<THREE.Points>object, value );
            }

            return;
        }

        if( style === 'size' ){
            if( object?.type === 'Points' ){
                this.change_pointcloud_size(<THREE.Points>object, value );
            }


            return;
        }
    }

    private change_pointcloud_size( object: THREE.Points, value: number ): void{
        (<THREE.PointsMaterial>object.material).size = value;
    }

    private change_pointcloud_opacity( object: THREE.Points, value: number ): void {
       (<THREE.PointsMaterial>object.material).opacity = value;
    }

}