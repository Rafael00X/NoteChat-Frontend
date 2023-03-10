
# NoteChat - A Social Media Website

NoteChat is a lightweight social media application that lets you connect with your peers, share your stories and chat with them.

![p3](https://user-images.githubusercontent.com/79894157/203585810-e4195e56-7547-4ae0-9375-8cd14c09082d.PNG)

![p3](https://user-images.githubusercontent.com/79894157/203701960-1400a5da-18c5-487b-9df4-2c231bcd96a3.PNG)


## Table of content

* **Features**
* **Technologies**
* **Tools Required**
* **Installation Guide**
* **Links**

## Features

* Post your stories to your friends
* Like, comment and engage with other people's stories
* Chat with people in realtime

## Technologies

* **Frontend** - React, Bootstrap, HTML, CSS
* **Backend** - NodeJs, GraphQL, SocketIO
* **Database** - MongoDB

## Tools Required

The following are the tools and dependencies needed to locally run this project:

* [Node.js](`https://nodejs.org/en/`)
* [Git](`https://git-scm.com/downloads/`)
* [MongoDB Database](`https://www.mongodb.com/`)

## Installation Guide

To run the project locally follow these steps:

* Clone the two repos in your local machine
    ```
    git clone https://github.com/Rafael00X/NoteChat-Frontend.git
    git clone https://github.com/Rafael00X/NoteChat-Backend.git
    ```

* Go to the root directory of `NoteChat-Backend`, rename the `.env.example` file to `.env` and enter the database connection url.

* Then run the following commands:
    ```
    npm install
    node server.js
    ```

* Go to the root directory of `NoteChat-Frontend` and run the following commands:
    ```
    npm install
    npm start
    ```

* The application is now running on your local machine. You can visit it by going to the following link
    ```
    http://localhost:3000
    ```

## Links

* [NoteChat Backend](https://github.com/Rafael00X/NoteChat-Backend.git)