# CPS630 Assignment 1: Multi-page Web Application

## Overview

We built a multi-page web application with Node.js and Express that allows users to manage and view information about a selection of major cities. The core idea of the application is to provide a meaningful way to store, update, and compare city data, all in one place. City data includes weather conditions, GDP, Population, and a brief description of the city. 

The home page allows users to view all cities in a structured card layout, remove cities, edit existing city information (GDP, Population), or even add new cities to the site by inputting everything needed. The weather page lets users see the weather conditions with animations. Finally, the compare page allows users to choose two cities and compare their population and GDPs, clear comparison is supported through side-by-side charts. The purpose of our app is to provide users with an organized and interactive way to view and manage city-based data in one place. While also allowing them to modify, compare, and visually explore differences between cities through charts and animations. 

In the future, the web app could be extended by connecting it to a database instead of storing data in memory. This could allow changes to persist permanently. It could be expanded to use a live weather API to display real-time weather conditions rather than static values. Many small features could be implemented, such as region filtering or user accounts with authentication. Overall, the project establishes a very strong foundation and has a lot of potential for further expansion.


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

* `GET /` => Home page
* `GET /weather` => Weather page
* `GET /charts` => Compare page

### REST API

* `GET /api/cities` => Returns the full list of cities (JSON), `200` code on success
* `GET /api/cities/title` => Returns a list of city titles (JSON), `200` code on success
* `GET /api/cities/title/:title` => Returns a single city by title (JSON), or `404` if not found
* `POST /api/cities` => Adds a new city (multipart form with `img` upload), returns `201` on success or `400` on validation errors
* `PATCH /api/cities/title/:title` => Updates an existing city by title, returns success code `200` or `404` if not found
* `DELETE /api/cities/title/:title` => Deletes an existing city by title, returns success code `200` or `404` if not found

## Reflection

Our submission includes the full Node/Express project matching the assignment required structure, with all source files, static assets, and package configuration. The web application supports multi-page routing, image uploads, adding, updating, and deleting cities, along with validation checks to prevent invalid or duplicate data entries. We also ensured that invalid requests, such as visiting an unknown route, are handled clearly instead of crashing the server. In addition to the code files, the submission includes our 60-second demo video and this README with an overview, documentation, and reflection

One of our biggest successes during this assignment was our coordination and using GitHub as a team to track progress and keep everyone's contributions conflict-free. Working with branches and merging changes allowed us to divide responsibilities while also staying organized on what was added next. This helped us avoid overwriting each other's work and made collaboration much smoother, which is especially impressive considering it was our first time working together. As for challenges, testing functionality across each web page while keeping everything consistent was more challenging than expected. We also spent time making sure the layout and styling looked good and consistent across the application. Overall, we are happy with how the final application came together. This assignment helped improve our understanding of Express, GitHub, and REST APIs.

