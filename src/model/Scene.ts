// third-party
import * as THREE from 'three';

// three modules
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// model
import { SceneManager } from '../SceneManager';
import { Dataset } from './Dataset';



export class Scene {

    // container ref
    public container!: HTMLElement;

    // scene elements
    public camera!: THREE.PerspectiveCamera;
    public scene!: THREE.Scene;
    public renderer!: THREE.WebGLRenderer;

    // controls
    private orbitControls!: OrbitControls;

    // dataset
    public dataset!: Dataset;

    // manager
    public sceneManager: SceneManager;

    constructor( containerRef: HTMLElement ){

        // saving container ref
        this.container = containerRef;
        const [containerWidth, containerHeight] = [this.container.offsetWidth, this.container.offsetHeight];

        // initializing camera
        this.initialize_camera( containerWidth, containerHeight, [0,0,10] );

        // initializing scene
        this.initialize_scene();

        // initialize renderer
        this.initialize_renderer( containerWidth, containerHeight );

        // initialize controls
        this.initialize_orbit_controls();

        // initializing scene manager
        this.sceneManager = new SceneManager( this.scene );

    }

    public clear_scene(): void {

        while (this.scene.children.length){
            this.scene.remove(this.scene.children[0]);
        }  

    }

    public show( dataset: Dataset ) {

        // saving current dataset
        this.dataset = dataset;

        this.sceneManager.add_dataset_to_scene( this.dataset );

        this.render();

    }

    private initialize_camera( width: number, height: number, position: number[], near: number = 0.1, far: number = 100 ): void {

        // calculating camera params
        const aspectRatio: number = width/height;
        
        const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera( 75, aspectRatio, near, far );
        
        // camera position grows towards outside the screen
        camera.position.set( position[0], position[1], position[2] );

        // saving ref
        this.camera = camera;

    }

    private initialize_renderer( width: number, height: number ): void {

        const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( width, height );

        // appending renderer
        this.container.appendChild( renderer.domElement );

        // saving ref
        this.renderer = renderer;

    }

    private initialize_scene(): void {

        const scene: THREE.Scene = new THREE.Scene();
        scene.background = new THREE.Color( 'white' );
        scene.fog = new THREE.Fog( 0x050505, 2000, 3500 );

        // saving scene ref
        this.scene = scene;

    }

    private initialize_orbit_controls(): void {

        const controls: OrbitControls = new OrbitControls( this.camera, this.renderer.domElement );
        this.orbitControls = controls;

    }

    private render(): void {

        requestAnimationFrame( () => this.render() );

        // rendering
        this.renderer.render( this.scene, this.camera );

    }

}