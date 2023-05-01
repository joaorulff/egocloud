# native
import os
import glob

## third-party
from notebookjs import execute_js

class Egocloud:

    def __init__(self) -> None:

        ## loading vis lib
        self.vislib = None
        # vis_path = "./client/dist/egocloud.js"
        # with open(vis_path, "r") as f:
        #     self.vislib = f.read()
        #     print(self.vislib)
        
    def visualize(self):

        # Plotting the Radial Bar Chart
        execute_js(
            library_list=[self.vislib],
            main_function="egocloud.render")



