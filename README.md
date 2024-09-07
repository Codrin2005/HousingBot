# HousingBot

## Description
This is a website which facilitates finding housing in the Netherlands by looking through the housing websites and informing its users if a listing which interests them. Each user can set a list of preferences regarding the location of the houses they are looking for.

## How it is made
We predominantly used JavaScript across our project. All bots are implemented using Selenium so that we do not depend on changes in each website's API documentation. The server implements the "Express" framework of Node.js to handle REST API requests from our static client. We split our server-side code into multiple nodes establishing an interface architecture that handles the data flow between the client, bots, and the mail service. We use .txt files to store user data on our server, and we implemented Stripe's API to facilitate payments through their third-party gateway services.

## Housing sites which are checked
1. Plaza
2. RoomPlaza
3. Huurwoningen
4. Kamernet (Coming soon)

## What is going to be developed


## How to run
1. open the project in IDE
2. run "npm install" in your terminal
3. run "npm install selenium-webdriver@latest" and "npm install chromedriver@latest"
4. for now, only the following can be run:
    - 4.1. individual bots can be run you can also
    - 4.2. to run the server, either run server.js or main.js
    - 4.3. main.js will also run the bot for Plaza every minute
    - 4.4. with the server running, you can open the client, input your email and preferences for the Plaza bot and press submit, which will send your data to the server and store them locally
    4.5. besides the Plaza bot 2 other bots can be run individually
    4.6. you can also run the mailService independently
