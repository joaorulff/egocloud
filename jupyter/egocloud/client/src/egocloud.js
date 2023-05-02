import { SceneViewer } from "egocloud";
import { Dataset } from "egocloud";

export const render = (divName, data) => {

    const jupyterCellContainer = document.getElementById(`${divName.replace('#', '')}`);

    // cell dimensions
    const width = jupyterCellContainer.offsetWidth;
    const height = jupyterCellContainer.offsetHeight;

    const chartContainer = document.createElement('div');
    chartContainer.style.width = `${width}px`;
    chartContainer.style.height = `${500}px`;
    chartContainer.style.backgroundColor = 'red';

    // appending new element
    jupyterCellContainer.append( chartContainer );

    console.log( Object.keys(data) );

    // Creating dataset
    const dataset = new Dataset( data['world'] );

    // Testing...
    const egoCloud = new SceneViewer( chartContainer );
    egoCloud.render( dataset );
    
}