# Timeline Map Dashboard

Welcome to the **Timeline Map Dashboard**, a React-based web application that visualizes temperature data on an interactive map. Users can draw polygons to define spatial regions, adjust a timeline slider to view hourly data, and apply color-coded displays based on user-defined temperature thresholds. This project was developed as part of a task submission and includes partial implementation due to time constraints.

## Setup and Run Instructions

To set up and run this application on your local machine, follow these steps carefully:

1. **Prerequisites**:

   - Ensure you have **Node.js** installed, higher version recommended

2. **Clone the Repository**:
   - Clone this repository to your local machine
     Navigate to the project directory: cd timeline-map-dashboard
3. Install Dependencies:
   Run the following command to install all required packages: npm install
4. Start the Development Server:
   Launch the application with: npm start

## APIs and Credentials

This application uses the Open-Meteo API to fetch hourly temperature data based on user-drawn polygon locations. The API is publicly available and does not require API keys or credentials. You can access it directly at api.open-meteo.com or the archive endpoint archive-api.open-meteo.com.
No Credentials Needed: Since Open-Meteo is free and public, no registration or API key is required. Simply use the endpoint with latitude, longitude, and date parameters as shown.

If you wish to explore additional data sources or APIs requiring credentials (e.g., for bonus features), you would need to:

Sign up on the respective API provider’s website (e.g., OpenWeatherMap).
Obtain an API key from their dashboard.
Store the key in a .env file (e.g., REACT_APP_API_KEY=your_key_here) and access it via process.env.REACT_APP_API_KEY in your code.
Ensure the .env file is added to .gitignore to prevent committing it.

## Summary of Libraries Used

This project relies on the following libraries:

React: 18.3.1 - The core JavaScript library for building user interfaces.
TypeScript: For type safety and enhanced development experience.
react-leaflet: 4.2.1 - A React wrapper for Leaflet, used for the interactive map.
leaflet: The underlying mapping library for rendering maps and polygons.
leaflet-draw: Adds polygon drawing capabilities to the map.
axios: A promise-based HTTP client for making API requests to Open-Meteo.
react-slider: 2.0.6 - Provides the timeline slider for selecting hours.
Context API: Built-in React feature for state management across components.

## Remarks on Design and Development

Core Functionality: The dashboard features a Leaflet map where users can draw polygons (3-12 points) to define regions. Temperature data is fetched from the Open-Meteo API based on the polygon’s centroid and the selected hour from the slider.

Timeline Slider: Currently supports a single day (0-23 hours) due to time constraints. The task required a 30-day window (15 days before and after August 04, 2025), but this feature is incomplete.

Color Coding: Polygons are colored based on user-defined thresholds (e.g., red < 10°C, blue 10-25°C, green > 25°C), updated manually via a button.

Limitations: Automatic updates for existing polygons, dual-ended range slider, and full 30-day timeline support are not implemented. The Open-Meteo API endpoint used is https://api.open-meteo.com/v1/forecast instead of the required archive-api due to initial setup.

Deployment: The app is deployed on Netlify, accessible via the provided URL. Instructions above allow local testing and building.

Future Improvements: Adding range mode to the slider, switching to the archive API, and enabling automatic polygon updates would enhance the app.
