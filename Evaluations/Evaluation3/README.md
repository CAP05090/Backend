## Instructions

## Books Management App
    You have to build an Express application. There will be following API endpoints that you need to take care of. Keep in mind that you have to use MongoDB Atlas for this.

### POST /users/register
    1. This route will be responsible for registering a new user to the database.
    2. While registration you need to take care of the password as well it should not be stored as it is, keep track of it's safety by hashing it.
    3. Following should be the fields present in the user document:

    name ==> user name for registration
    email ==> email of the user
    pass ==> desired password
    city ==> user's location
    age ==> user's age

    4. Now while registration you have to check that password should contain all the following things, otherwise user cannot register, send appropriate response in this case.
    => At least one uppercase character
    => At least one number
    => At least a special character
    => The length of password should be at least 8 characters long 
    5. If a user already exist, a new user with same email cannot register, send appropriate response in this case.

### Responses:
    200: {"msg":"The new user has been registered", "registeredUser":<User details who just registered>}
    400: {"error":<error message should be sent>}

### POST /users/login
    This route is responsible for authenticating the user.
    Send email and pass to authenticate the user.

### Responses:
    200: {"msg":"Login successful!", "token":<A token has to be sent>, "refreshToken":<A refresh token has to be sent>}
    400: {"error":<error message should be sent>}
    1. JWT must be used for token generation.
    2. token should have a expiry of 2 minutes.
    3. refreshToken should have a expiry of 5 minutes.

### GET /users/logout
    This route is responsible for logging out the user.
    You can achieve this by blacklisting the token.
    This has to be done in the database that means there should be a separate collection where blacklisted tokens have to be kept.
    Schema and model you can design as per your convenience for this feature.

### Responses:
    200: {"msg":"User has been logged out"}
    400: {"error":<error message should be sent>}

### GET /refreshtoken
    A user should be able to generate a new token, in case previous one has expired.

### Responses:
    200: {"newToken":<New generated token>}
    400: {"error":<error message should be sent>}

### POST /books/add
    A user has to be authenticated to access this route.
    Following should be the fields present in the book document:
    title ==> book's title
    genre ==> book's genre
    author ==> book's author
    publishing_year ==> year in which book was published
### Responses:

    200: {"msg":"Book added", "addedBook": <Details of the book just added> }
    400: {"error":<error message should be sent>}

### GET /books
    A user has to be authenticated to access this route.

### Responses:
    200: All the books present in the database
    400: {"error":<error message should be sent>}

### PATCH /books/update/:id
    A user has to be authenticated to access this route.
    A user should be able to update any details of a book whose id has been passed as param

### Responses:
    200: {"msg":"Book has been updated"}
    400: {"error":<error message should be sent>}

### DELETE /books/delete/:id
    A user has to be authenticated to access this route.
    A user should be able to delete any book whose id has been passed as param

### Responses:
    200: {"msg":"Book has been deleted"}
    400: {"error":<error message should be sent>}

### Middleware
    auth: This is going to be responsible for authentication of the user.
    rateLimiter : This is going to be responsible for applying a limit on how many requests can be made on the books route in 10 minutes.
    Hint: You can check express-rate-limit library for this on npmjs.com

### Good Practices
    - You have to follow MVC structure.
        - model => will contain the schema & model that you are going to use.
        - routes => will contain the routes.
        - middlewares => will contain the middlewares that yo are going to use.
    - All the responses should be in JSON form even if they are errors, keep track of status codes as well
    - Use Environment variables to protect the vulnerable stuff.

#### Commit your code during the evaluation for every 15 minutes or so, whenever you are done with even a small functionality. Have a good commit message, If you don't commit around every ~15 minutes, you'll lose marks for this too.

### Dependency Used
    bcrypt
    dotenv
    express
    express-rate-limiter
    jsonwebtoken
    mongoose
    nodemon

### Structure
Evaluation3
    -middlewares
        -auth.middleware.js
        -limiter.middleware.js
    -models
        -blacklistModel.js
        -bookModel.js
        -userModel.js
    -nodemodules
    -routes
        -bookRoute.js
        -userRoute.js
    -.env
    -.gitignore
    -db.js
    -env.text
    -index.js
    - package-lock.json
    -package.json
    -README.md

