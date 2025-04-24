# Full-Stack Blogging Application

A modern blogging platform where users can register, authenticate, and manage their own posts. Built with a Node.js/Express/MongoDB backend and a Vue.js/Vite frontend.


---

## Overview

This application enables users to:

- Register and log in  
- Create, read, update, and delete their own blog posts (CRUD)  
- Navigate seamlessly through the app with a single-page experience  

---

## Core Features

- **Post Management**  
  - Create, edit, and delete blog posts  
- **User Dashboard**  
  - View a list of your own posts, with quick links to edit or delete  
- **Routing & Navigation**  
  - Client-side routing powered by Vue Router  

---

## Tech Stack

- **Backend**  
  - Node.js  
  - Express  
  - MongoDB  
  - Mongoose ODM  
- **Frontend**  
  - Vue.js 3  
  - Vite  
  - Vue Router  
- **API Testing**  
  - Thunder Client  
- **Version Control**  
  - Git & GitHub  

---

## Backend Architecture
/server
 ├─ /controllers     # Request handlers for auth & posts
 ├─ /models          # Mongoose schemas (User, Post)
 ├─ /routes          # Express routers (auth.js, posts.js)
 ├─ /middleware      ???
 ├─ /config          # DB
 └─ app.js        # Entry point (Express setup)
