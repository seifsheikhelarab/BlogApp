
# BlogApp

![Node.js](https://img.shields.io/badge/node.js-v16+-brightgreen)
![Last Commit](https://img.shields.io/github/last-commit/seifsheikhelarab/BlogApp)
BlogApp is a powerful and reliable blogging framework created with Node.js and Express. The libraries used in the application are directly tied to the goals of the project: to be modular, seamless, and fully functional.



## Screenshots
- Admin Panel
![Admin Panel](https://github.com/seifsheikhelarab/BlogApp/blob/main/screenshots/admin.jpeg?raw=true)


- Post Edit Page
![Post Edit](https://github.com/seifsheikhelarab/BlogApp/blob/main/screenshots/edit.jpeg?raw=true)

- Index
![Index](https://github.com/seifsheikhelarab/BlogApp/blob/main/screenshots/index.jpeg?raw=true)




## Features

- Admin Role: Admins can manage blog posts, including creation, editing, and deletion.
- Secure Login: User authentication with password hashing using `bcrypt` and session management.
- Post Creation, Editing, and Deletion: Seamless management of blog content with an intuitive interface.
- Dynamic Rendering: Posts and pages are rendered dynamically using `ejs`, with reusable layouts via `express-ejs-layouts`.
- Search Functionality: Find posts quickly using a built-in search system.
- Pagination: Efficiently navigate large volumes of posts with pagination for better user experience.
- MongoDB Integration: Blog data is stored and managed using `mongoose` with schema-based models.
- Method Override: Support for `PUT` and `DELETE` HTTP methods, enabling advanced RESTful operations.
- JWT Tokens: Secure access to restricted routes with `jsonwebtoken`.
- Environment Variables: Secure storage of sensitive information like database credentials using `dotenv`.
- Designed for seamless user experience on both desktop and mobile devices.


## Run Locally

Clone the project

```bash
  git clone https://github.com/seifsheikhelarab/BlogApp
```

Go to the project directory

```bash
  cd BlogApp
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGODB_URI`

`JWT_SECRET`

