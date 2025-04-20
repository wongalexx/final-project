# Kanbas - Canvas Clone

## Table of Contents:

1. [Purpose](#purpose-and-project-overview)
2. [Features](#features)
3. [Usage](#usage)
4. [Installation](#installation)
5. [Contributors](#contributors)

## Purpose and Project Overview
Kanbas is a dynamic, full-stack web application that recreates the core features of Canvas, a widely used Learning Management System.
Built with usability in mind, Kanbas empowers instructors to create and manage courses, assignments, and quizzes with ease, while providing students with a seamless and interactive platform to stay organized, submit work, and track progress.

In this README, you'll find an overview of Kanbas' features, the technologies used, and step-by-step instructions for setting up and using the application.

## Features
<li>
  <b>
    Course Management: 
  </b>
  Easily create, view, update, and delete courses.
</li>
<li>
    <b>
    Module Organization: 
  </b>
  Structure course content into modules for streamlined navigation.
</li>
<li>
    <b>
    Assignment Management: 
  </b>
  Create, edit, and manage assignments.
</li>
<li>
    <b>
    Quiz Builder: 
  </b>
Create, edit, and publish quizzes for student access.
</li>
<li>
    <b>
    User Authentication: 
  </b>
  Secure login and registration for all users, allows user to stay logged in.
</li>
<li>
    <b>
    Profile Management: 
  </b>
  Allow users to update and customize their profile information.
</li>

## Usage
<li>
  Start by registering or signing in to access your dashboard.
</li>
<li>
  Set up your course content by adding modules, assignments, and quizzes
</li>
<li>
  Customize your user settings to reflect your preferences
</li>
<li>
  Navigate your teaching and learning tasks :)
</li>

## Demo
### User view
<details>
  <summary><strong>User can see assignments and take quizzes</strong></summary>
<!-- Row 1 -->
  <p align="center">
    <img src="https://github.com/user-attachments/assets/b9be4663-ca38-4337-b77b-d74bdcbbc921" width="400" />
    <img src="https://github.com/user-attachments/assets/ef7ccadd-b916-4827-a341-fee50cc7d0c1" width="400" />
  </p>
The dashboard and home menu display courses and their contents, but do not support editing, adding, or deleting courses and modules.
<!-- Row 2 -->
  <p align="center">
    <img src="https://github.com/user-attachments/assets/601c5752-1986-400c-a93b-308f7821d067" width="400" />
    <img src="https://github.com/user-attachments/assets/5af89978-7733-40ec-838d-bf6e5b0a8e12" width="400" />
  </p>
Students are able to view assigned quizzes and assignemnts.
<!-- Row 3 -->
  <p align="center">
    <img src="https://github.com/user-attachments/assets/ae010ccb-33c8-4152-b6b5-924ed8741b51" width="400" />
    <img src="https://github.com/user-attachments/assets/492cf530-8de1-4615-9e69-dc071d5e1a63" width="400" />
  </p>
Students can take quizzes, view their scores, and access their attempt history as usual.

</details>

<hr/>

### Faculty view
<details>
  <summary><strong>Faculty can create, edit, and preview assignments, modules, and quizzes</strong></summary>

<!-- Row 4 -->
<p align="center">
  <img src="https://github.com/user-attachments/assets/276a274e-fcba-470e-8240-00329e178346" width="400" />
  <img src="https://github.com/user-attachments/assets/3ec61068-a219-4076-9d81-74039a8908c4" width="400" />
</p>
The dashboard and home menu display courses and their contents, and support editing, adding, or deleting courses and modules for faculty.

<!-- Row 5 -->
<p align="center">
<img src="https://github.com/user-attachments/assets/e7ae0a11-dd9c-45a2-a954-f58066673aea" width="400" />
<img src="https://github.com/user-attachments/assets/64b314c3-d89f-42da-8890-4ceecadd012c" width="400" />
</p>
Faculty can create and edit assignments, quizzes, and the questions within each quiz.
<hr/>

  <details>
  <summary><strong>Both faculty, students, and TAs can see the people enrolled in the course and their relevant information</strong></summary>

<p align="center">
  <img src="https://github.com/user-attachments/assets/2d479d2f-5e3c-4007-a272-fd3a43dd44b8" width="400" />
  <img src="https://github.com/user-attachments/assets/1eab9f15-0eb4-422a-a9b8-eb8b1290c1f3" width="400" />
</p>
Users can view all individuals enrolled in a course along with their relevant details. They can also edit their profile and update their role as needed.
  </details>
</details>

<hr/>

## Installation
Install dependencies:
```
npm install
```

**Client Setup**  
Start the React app:

```bash
cd kanbas-react-web-app
npm run start
```
create a .env file in the client web-app:
```
NODE_ENV=development
NETLIFY_URL=http://localhost:4000
NODE_SERVER_DOMAIN=http://localhost:4000
SESSION_SECRET=super secret session phrase
MONGO_CONNECTION_STRING=mongodb://localhost:27017/kanbas
```
**Server Setup**  
```bash
cd kanbas-node-server-app
nodemon index.js
```
create a .env.local file in the server:
```
REACT_APP_REMOTE_SERVER=http://localhost:4000
```
### Access the web-app at http://localhost:4000

<hr/>

#### If MongoDB is already installed and running, you can skip this section. Otherwise, follow the steps below to set it up:
**Database Setup**  
Download mongoDB here: https://www.mongodb.com/try/download/community
You can create a data folder in your home directory as shown below.

```bash
# You can create a data folder in your home directory as shown below.
cd  ~
mkdir  data
----------------
# When you start MongoDB, you'll need to tell it where the data folder is with the dbpath option.
cd  ~
/Users/<INSERT USER NAME>/mongodb-macos-aarch64-8.0.3/bin/mongod --dbpath data
```
Next download Compass which should have come with the installation, if not install it here:
https://www.mongodb.com/try/download/compass 

When Compass comes up, confirm that the connection string `mongodb://127.0.0.1:27017` appears in the New Connection screen.
Then press Connect to connect to MongoDB.
<hr/>

## Contributors
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/al3xand3rw0ng">
        <img src="https://github.com/al3xand3rw0ng.png" width="50" />
      </a><br/>
      <sub><strong>Alex Wong</strong></sub>
    </td>
    <td align="center">
      <a href="https://github.com/haderie">
        <img src="https://github.com/haderie.png" width="50" />
      </a><br/>
      <sub><strong>Hareg Aderie</strong></sub>
    </td>
    <td align="center">
      <a href="https://github.com/yenndang">
        <img src="https://github.com/yenndang.png" width="50" />
      </a><br/>
      <sub><strong>Yen Dang</strong></sub>
    </td>
  </tr>
</table>

The contributors to this project are all undergraduate students at Northeastern University, enrolled in CS4550 - Web Development. Each member worked individually on the core components of the application and collaborated on building the Quizzes page, ensuring that it supported all necessary features and distinct views for students, faculty, and administrators.

This course emphasized full-stack development using modern web technologies and best practices. It introduced students to the foundations of HTML5 and CSS3 for content layout and styling, followed by responsive design with libraries like Bootstrap. The frontend development progressed into JavaScript, before shifting toward component-based single-page applications using React.js, the industry-standard framework.

To manage complex application state, we learned and implemented Redux. On the backend, we developed RESTful APIs using Node.js and used MongoDB for data storage. Through this project, we gained hands-on experience building scalable, interactive web applications from end to end, culminating in the creation of Kanbas, a functional clone of Canvas.

### Reflection
Kanbas was our first time working on a full-stack project, and it was an invaluable learning experience. We had to integrate both front-end and back-end technologies, which pushed us to understand how they interact in a real-world application. From setting up the React front-end and managing state with Redux to creating the Node.js server and connecting it to MongoDB, we gained hands-on experience with the full development stack.

One of the challenges we faced was learning how to structure the back-end while ensuring smooth communication between the front-end and back-end. Debugging issues across both layers often required us to step back and think about the data flow and application setup. Additionally, balancing the user experience with functionality was a key focus, ensuring the platform was both intuitive and efficient for users.



