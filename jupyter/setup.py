from setuptools import setup, find_packages

with open("README.md", "r") as fh:
    long_description = fh.read()

setup(
    name="egocloud",
    version="0.0.1",
    author="Joao Rulff & Claudio Silva",
    author_email="jlrulffs@nyu.edu",
    description="egocloud. A tool to debug human actions and model outputs in 3D environments",
    long_description=long_description,
    long_description_content_type='text/markdown',
    url='https://github.com/joaorulff/egocloud/tree/main/jupyter',
    packages=find_packages(exclude=['node_modules']),
    include_package_data=True,
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: BSD License",
        "Operating System :: OS Independent",
    ],
    python_requires='>=3.9',
    install_requires=[
        'notebookjs',
    ]
)