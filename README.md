# Project Name: WhiteBoard Apps
This project is a Full Stack (MERN) web application for managing drawings. It consists of a front-end interface built with React and a back-end server built with Node.js and Express. Drawings data  are stored in a MongoDB database to provide persistence.

## Overview
The  application allows users to:
- View a list of drawings with their titles, descriptions, and elements.
- Add new drawings
- Delete drawings.
- User  Can Draw lines, shapes, and add text annotations on the whiteboard. 

The application is responsive and works well on both desktop and mobile devices.

## [Live Website : Link](https://whiteboardrezoanul.netlify.app/)

## [Post Man Documentation: Link](https://documenter.getpostman.com/view/30665703/2sAXjRXqTd)

## Technology use Backend
- Node js
- Express js
- Mongoose
- MongoDB
- typescript
- Zod (validation)
- eslint ( code formatting and quality checking )
- prettier (maintain code structure)

##  Installation:
to set up and run projects locally
- download this repository
- npm install
- npm run build
- npm run start: dev

## Technology use  FrontEnd
- typescript
- React
- Canvas
- tailwindcss

## Installation:
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Run the project using `npm run dev`.



   
 ## API Endpoints

### `GET /drawings`

Retrieve a list of all drawings.

**Response:**
- 200 OK: Returns an array of drawing objects.

### `GET /drawings/:id`

Retrieve a specific drawing by its ID.

**Parameters:**
- `id` (string): The ID of the drawing to retrieve.

**Response:**
- 200 OK: Returns the drawing object if found.
- 404 Not Found: If the drawing with the specified ID does not exist.

### `POST /drawings`

Create a new drawing.

**Request Body:**
- `title` (string): The title of the drawing.
- `description` (string): The description of the drawing.
- `elements` (array): An array of objects describing the drawing elements. Each element includes:
type (string): The type of the element (e.g., 'line', 'shape', 'text').
coordinates (array): An array of numbers specifying the position and size of the element.

**Response:**
- 201 Created: Returns the created  drawing object.
- 400 Bad Request: If the request body is invalid.

### `PUT /drawings/:id`

Update an existing  drawing  by its ID.

**Parameters:**
- `id` (string): The ID of the drawing  to update.

**Request Body:**
- `title` (string): The new title of the drawing.
- `description` (string): The new description of the drawing.
- `elements` (array): An array of objects describing the drawing elements. Each element includes:
type (string): The type of the element (e.g., 'line', 'shape', 'text').
coordinates (array): An array of numbers specifying the position and size of the element.


**Response:**
- 200 OK: Returns the updated drawing  object.
- 400 Bad Request: If the request body is invalid.
- 404 Not Found: If the drawing  with the specified ID does not exist.

### `DELETE /drawings/:id`

Delete a drawing by its ID.

**Parameters:**
- `id` (string): The ID of the drawing to delete.

**Response:**
- 200 OK: Returns a message indicating the drawing  was deleted successfully.
- 404 Not Found: If the drawing  with the specified ID does not exist.


  ## Contact

For any information, please reach out to:

- Email: rezoanulhasan96@gmail.com
- Phone: +088 01734639066

Feel free to explore the website and enjoy your experience with  the WhiteBoard Apps
