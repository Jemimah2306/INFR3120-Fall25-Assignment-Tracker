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
## CSS Styling (Third-party libraries included)

1. **Bootstrap**  
   - Included via CDN: `https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css`  
   - Provides ready-made CSS components and layout utilities.

2. **Font Awesome**  
   - Included via CDN: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css`  
   - Provides icons for buttons, headers, and other UI elements.

3. **Custom CSS**  
   - Located in `public/css/mystyle.css`  
   - Used to customize colors, tables, buttons, and the overall look of the application to make it unique.

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
View live site: [Render Deployment](https://infr3120-fall25-assignment-tracker.onrender.com/)  

All project files are tracked and maintained using Git for version control.
.gitignore excludes any unnecessary or sensitive files. View repo: [GitHub Repository](https://github.com/Jemimah2306/INFR3120-Fall25-Assignment-Tracker)

## 🔐 Google OAuth – Important Note (School Email Login)
Google OAuth authentication works correctly with **personal Gmail accounts**.  
However, **school Google accounts** (e.g., `@ontariotechu.net`) **cannot be used** due to Google Workspace for Education restrictions.

### Why School Emails Do Not Work
School accounts are managed by an administrator who blocks third-party app logins.  
Attempting to log in with a school email may result in:

```
Error 400: admin_policy_enforced
```

### What Works
- Personal Gmail accounts  
- Non-school Google accounts  
- All OAuth flows (redirect, callback, session creation) work with personal accounts

### Assignment Submission Note
- The application is fully functional  
- Limitation on school accounts is due to university policy, not a code error  
- Expected and unavoidable without admin permission

## License

&copy; 2025 by Jemimah Adamu — All rights reserved.