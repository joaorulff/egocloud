# Egocloud

Interactive 3D point cloud visualizer tailored to support the analysis of data collected by AR headsets such as the HoloLens2. Egocloud runs in the core of [ARGUS](https://github.com/).

## Paper

1. [ARGUS: Assistive visualization of human-AI collaboration for task guidance in augmented reality ](https://vida.engineering.nyu.edu/)


## Web

Egocloud is available through NPM:

### Installation

```npm install egocloud```

Egocloud can be added to your project as the following: 

### Basic usage

```javascript
const pc = new EgoCloud(containerElement);

// Creating dataset
const dataset: Dataset = new Dataset( { positions: positions, colors: colors, normals: [] } );

// Container Ref...
const mainDiv: HTMLDivElement = document.getElementById("main-div");

// Initializing EgoCloud
const egoCloud = new SceneViewer( mainDiv );
egoCloud.render( dataset );
```

### Development

The command below will run the development server.

```npm run dev```


## Jupyter

Egocloud is available in the format of a Python package, allowing developers to run it within Jupyter notebooks. Please, refer to [this link](https://github.com/joaorulff/egocloud/blob/main/jupyter/README.md) for installation and examples

### Installation

```pip install egocloud```

### Basic use

```python
from egocloud import Egocloud

...

egocloud = Egocloud()
inputData = { 
    'world': {
        'positions': pointcloud['xyz_world'], 
        'colors': pointcloud['colors'], 
        'normals': [] }
}
egocloud.visualize(inputData)
```

