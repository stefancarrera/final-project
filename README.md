# Five by Five Sketch

A web application for people who want to doodle! 

## About the project

A simple web drawing app that allows the user to doodle with different colors in a square and save their drawings for others to see and download. 
[5 by 5 Sketch]( https://five-by-five-sketch.herokuapp.com/)

## Technologies Used
-	React.js
-	Node.js
-	Express.js
-	Babel
-	PostgreSQL
-	Pgweb 
-	JavaScript ES6
-	CSS3
-	Canvas API

## Features
-	User can draw on the canvas with the brush tool
-	User can erase using the eraser tool
-	User can change the width of the tools
-	User can change the color of the brush tool
-	User can fill the entire canvas with one color using the paint bucket tool
-	User can undo a stroke or paint bucket fill
-	User can clear the canvas
-	User can save their drawing to the gallery
-	User can see saved drawings in the gallery
-	User can download their drawings

![5by5Sketch-drawing-tools](https://user-images.githubusercontent.com/53131688/128783319-fe879376-d65a-4baf-9661-4caef3ef5c02.gif)

![5by5Sketch-save-gallery](https://user-images.githubusercontent.com/53131688/128783357-8e9cff16-b934-4414-acd2-7fe629c64894.gif)

## Stretch Features
-	More brush options
-	Different canvas sizes

## System Requirements
-	Node.js

## Getting Started
1. Clone the repository.

    ```shell
    git clone https://github.com/stefancarrera/five-by-five-sketch.git
    cd five-by-five-sketch
    ```

1. Install all dependencies with NPM.

    ```shell
    npm install
    ```

1. Import the example database to PostgreSQL.

    ```shell
    npm run db:import
    ```

1. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

    ```shell
    npm run dev
    ```

