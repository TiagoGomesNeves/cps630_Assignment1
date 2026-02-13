# CPS630 Assignment 1: Multi-page Web Application

## Overview

aaaaaaa

## Documentation

### Setup and Run
1. Install dependencies:

   ```bash
   npm install
   ```
2. Start the server:

   ```bash
   node server.js
   ```

   Or using nodemon (if available):

   ```bash
   npm run dev
   ```
3. Open the app in a browser:

   * Home: `http://localhost:8080/`
   * Weather: `http://localhost:8080/weather`
   * Compare: `http://localhost:8080/charts`

### How to Use

* **Home Page**

  * View all cities as cards
  * Click the **edit** icon to update an existing city’s weather, temperature, population, GDP, and description
  * Click the **delete** icon to remove a city
  * Click the **+** button to add a new city (including an image upload)

* **Weather Page**

  * Select a city from the dropdown
  * The page displays the city image and shows a weather-themed visual (sun, rain, snow, clouds, or wind)

* **Compare Page**

  * Select two cities from the dropdowns
  * View side-by-side population and GDP values
  * View charts comparing both cities on the same scale

## API Routes

### Pages

* `GET /` → Home page
* `GET /weather` → Weather page
* `GET /charts` → Compare page

### REST API

* `GET /api/cities` → Returns the full list of cities (JSON)
* `GET /api/cities/title` → Returns a list of city titles (JSON)
* `GET /api/cities/title/:title` → Returns a single city by title (JSON), or `404` if not found
* `POST /api/cities` → Adds a new city (multipart form with `img` upload), returns `201` on success or `400` on validation errors
* `PATCH /api/cities/title/:title` → Updates an existing city by title, returns success code or `404` if not found
* `DELETE /api/cities/title/:title` → Deletes an existing city by title, returns success code or `404` if not found

## Reflection

aaaaaaaaaaa