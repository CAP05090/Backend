# Instructions
## Problem statement:

    Create an Express app with user registration, login and logout functionality.

    Implement JSON Web Tokens (JWT) for user authentication.

    Implement JWT blacklisting to prevent the use of revoked tokens.

    Implement refresh tokens to improve the user experience by allowing them to stay logged in even after their access token expires.

    Use MongoDB to store user data and JWT blacklisted tokens.

    Use bcrypt to hash user passwords before storing them in the database.

    Use dotenv to manage environment variables.

## "dependencies":
    "bcrypt": "^5.1.1",
    "cookie-parser": "^1.4.6",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.0.4",
    "nodemon": "^3.0.2"