# Assignment Tracker

## Description
The Assignment Tracker is a web-based application that allows users to **create, view, edit, delete, search, and sort assignments/tasks**.  
It is built with **Node.js**, **Express**, **MongoDB**, and **EJS**, with data stored persistently in MongoDB.

---

## Features
- Add new assignments with title, description, due date, and status  
- View a list of all assignments  
- Edit or delete assignments  
- Search assignments by title or description  
- Sort assignments by title, due date, or status  
- Data is stored persistently in MongoDB

---

## Technologies Used
- **Node.js** – Backend runtime  
- **Express** – Server framework  
- **MongoDB** – Database for storing assignments  
- **Mongoose** – ODM for MongoDB  
- **EJS** – Template engine for rendering pages  
- **Nodemon** – For automatic server reload during development  

---

## Installation

1. **Install dependencies**
   ```bash
   npm install

2. **Create a .env file with your MongoDB connection string:**
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database>

2. **Start the server**
nodemon server.js

## Usage
**Open your browser and go to:**
<http://localhost:3000/tasks/list>

- Add a new assignment: /tasks/add
- Edit an assignment: /tasks/edit/:id
- Delete an assignment: Use the delete button on the list page
- Search assignments: Use the search bar
- Sort assignments: Use the sorting options

## Project Structure
```
Assignment 3 Web
MEAN/
├── controllers/
│   └── taskController.js
├── models/
│   └── Task.js
├── node_modules/
├── public/
│   ├── css/
│   │   ├── app.css 
|   ├── images/
│   │   ├── logo.png 
│   └── script/
│       ├── app.js
│       
├── routes/
│   └── tasks.js
├── views/
│   ├── tasks/
│   │   ├── list.ejs
│   │   ├── add.ejs
│   │   └── edit.ejs
│   └── partials/
│   |   ├── header.ejs
│   |   └── footer.ejs
|   | error.ejs
|   └── index.ejs
|
|   app.js
|   package-lock.json
|   package.json
└── server.js

```

## Deployment

This site is deployed using Render (or your chosen cloud host) to demonstrate cloud hosting and version control best practices.
View live site: [Render Deployment](https://assignment2-expressportfolio.onrender.com)  

All project files are tracked and maintained using Git for version control.
.gitignore excludes any unnecessary or sensitive files. View repo: [GitHub Repository](https://github.com/Jemimah2306/INFR3120-Fall25-Assignment-Tracker)

## License

&copy; 2025 by Jemimah Adamu — All rights reserved.