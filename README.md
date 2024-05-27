# Drawing Application

This Drawing application allows users to upload an image, draw shapes by clicking on the canvas, and export the drawings as images. Additionally, users can crop the drawn area and export the cropped image.

## Features

- **Image Upload**: Upload images in JPEG, PNG, SVG, or JPG formats.
- **Drawing**: Draw lines on the canvas by clicking to form a closed 2D geometry.
- **Complete Drawing**: Automatically close the shape by connecting the last point to the first point.
- **Export Drawing**: Export the canvas with the drawing as an image.
- **Crop and Export**: Crop the drawn area and export the cropped image.
- **Reset Drawing**: Clear the current drawing and start over.

## Installation
npm i
cd Drawing-Tool 
npm start

## Usage

##  Uploading an Image:
        Click the "Upload Image" button.
        Select an image file from your computer (JPEG, PNG, SVG, JPG formats supported).

## Drawing on the Canvas:
        Click on the canvas to start drawing points.
        Click to add more points. Lines will be drawn between the points.
        To close the shape, click near the starting point or click the "Complete" button.

## Resetting the Drawing:
        Click the "Reset" button to clear the canvas and remove all points.

## Exporting the Drawing:
        Click the "Export Drawing" button to save the current canvas with the drawing as an image.

## Cropping and Exporting:
        Complete the drawing to form a closed shape.
        Click the "Export Cropped Area" button to crop the area inside the shape and save it as an image.

## Components
UploadContainer
A styled component for the image upload section.

Canvas
The main component that contains the canvas element and handles drawing logic.
## State Variables

    points: An array of points representing the vertices of the drawn shape.
    isDrawing: A boolean indicating whether the user is currently drawing.
    imageSrc: The source URL of the uploaded image.
    errorMessage: A string for displaying error messages.

## Functions

    distance(point1, point2): Calculates the distance between two points.
    handleCanvasClick(event): Handles canvas click events for drawing points.
    handleCompleteClick(): Closes the shape by connecting the last point to the first point.
    handleExportClick(): Exports the current canvas with the drawing as an image.
    handleCropClick(): Crops the drawn area and exports it as an image.
    handleImageUpload(event): Handles image upload and sets the image source.