# EgoCloud (Jupyter Notebook)

## Installation (pip)

TBA

## Installation (source)

1. Clone the repository: ```git clone git@github.com:joaorulff/egocloud.git```
2. Navigate to the jupyter folder within the project folder ``` cd jupyter ```
3. Install egocloud ```pip install -e .```

## Running on Jupyter notebook

In the following example, we use the data provided [in this link](https://drive.google.com/file/d/1RySptgmU7Dv_N-2aBnnVK9vI5V75EZPQ/view?usp=sharing). Inside your jupyter notebook, run the code below:

```python
from egocloud import Egocloud

## loading the point cloud raw file
pointcloud = None
with open('.pointcloud.json', 'r') as f:
    pointcloud = json.load(f)

egoCloud = Egocloud()
egoCloud.visualize( pointcloud )
```