### Cash-Tracker by Gerard Mennella

# Summary
This application uses express and mongoDB to track a users budget. Funds can be added or subtracted and are stored using mongoDB. Changes made offline are stored using indexedDB and posted to the database on the next successful connection.

# Code Breakdown

## Server
This file contains the express server and connects it to mongoDB.

## Models
### Transaction
This file contains and exports the schema for a single budget item.

## Routes
### API
This file contains the routes with endpoints to POST or GET transactions.

## Public
### CSS/Icons
These folders contain the stylesheets and images.
### JS
#### IDB
This file contains the logic to save data to indexedDB while offline and send it through to mongoDB when connection is reestablished.
#### Index.js
This file contains all the logic for the main page functionality as well as a POST request to the database with a .catch that triggers the saveRecord() which stores it in indexed db if request fails.
### Index.html
This file contains the html for the application and imports all the necessary scripts.
### Service Worker
This file sets up the Service Worker declaring the files to be cached and adding event listeners for installation, activation, and fetch requests.
### Manifest
This file contains the applications metadata. Properties include the names, icons, colors, start_url, and display.

# Deployed Application
[View Deployed App on Heroku!](https://desolate-shore-04532.herokuapp.com/)