# Prosox Backend

A robust backend service built with Node.js and Express.js to manage product data and shopping cart functionality for an e-commerce or product-catalog application.

## Project Overview

* This project serves as the foundational API (Application Programming Interface) for a product-centric application. Its primary responsibilities include:

* Product Management: Providing endpoints to retrieve, add, update, and delete product information.

* Shopping Cart Logic: Handling the creation, modification, and retrieval of user shopping carts.

* Data Persistence: Storing product and cart information using local JSON files for simple, fast data access.

The backend is designed to be easily consumed by a separate frontend client (not included in this repository) to power a full-stack e-commerce experience.

## Methods and Technologies Used

 * Technology	Purpose

* JavaScript	The primary programming language for the entire application.

* Node.js	The runtime environment used to execute the JavaScript server-side code.

* Express.js	A minimal and flexible Node.js web application framework used to structure the API endpoints and middleware.

* Handlebars (HBS)	A simple templating language, suggesting that this backend may render some server-side views, likely for testing or basic product display.

## Architectural Methods

* The design of the repository employs several common architectural patterns for backend development:

* RESTful API Design: The server exposes various endpoints (routes) that follow Representational State Transfer (REST) principles, allowing clients to perform standard CRUD operations (Create, Read, Update, Delete) using standard HTTP methods (POST, GET, PUT/PATCH, DELETE).

* Modular Routing: The server.js file likely sets up the server, while the actual API routes and request handling logic are separated into the src folder (e.g., controllers or routers) for better organization.

* Local JSON Data Persistence: Data is stored in plain JSON files (products.json, carts.json, data.js) rather than a traditional database. This method is often used for:

 * Rapid prototyping.

 * Small-scale projects with minimal data volatility.
 * Learning/educational purposes to focus on routing logic without database overhead.
