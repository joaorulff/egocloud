export class SceneUtils {


    public calculate_projections( ): void {

    }


    // public calculate_point_cloud_intersection(origin: THREE.Vector3, direction: THREE.Vector3, pointCloud: PointCloud ): THREE.Vector3[] {

    //     this.projectionRaycaster.set( origin, direction );

    //     let intersections: any [] = []
    //     do{
    //         intersections = this.projectionRaycaster.intersectObject(this.scene.getObjectByName(pointCloud.name))
    //         this.projectionRaycaster.params.Points.threshold += 0.005;
    //     } while( intersections.length === 0 );
        
    //     // turning back to original threshold
    //     this.projectionRaycaster.params.Points.threshold = 0.03;

    //     return intersections.map( intersection => intersection.point );

    // }

}