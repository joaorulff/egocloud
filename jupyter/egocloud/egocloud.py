# native
import os
import glob

## third-party
from notebookjs import execute_js

class Egocloud:

    def __init__(self) -> None:

        ## loading vis lib
        self.vislib = None
        
        ## vis lib path
        visLibRelPath = "./client/dist/egocloud.js"
        visLibAbsPath = f'{os.path.dirname(os.path.abspath(__file__))}/{visLibRelPath}'

        with open(visLibAbsPath, "r") as f:
            self.vislib = f.read()
        
    def visualize(self, data):

        execute_js(
            data_dict=data,
            library_list=[self.vislib],
            main_function="egocloud.render")