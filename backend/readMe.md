# Steps
# Day 1
1. Creating Server
2. Connecting to Database
3. Creating Router
4. In controller, Creating the function for the Register user
5. In model, installing bcryptjs and hashing the password
6. Learnt the user if UserSchema.pre()
7. Created the TaskSchema in models
8. Working with JWT
    a. JWT configuration in the config
    b. Helper function in the Utils

9. Next goal is to compare the hashing password with the normal password, so worked on models

10. Current situation: Users can login and get token
    What we need: Protect routes so only logged-in users can access them
    Example: Only logged-in users should create notes
    How it works:

    User sends request with token in header
    Middleware checks if token is valid
    If valid, allow access
    If invalid, block access

11. Current situation: Auth middleware created but not used yet
    What we'll do: Create protected route to test it
    Test route: Get current user profile (only if logged in)
    Next step: Add profile route

12. create Task Controller for handling newTask
13. We need to setup route for the new controller taskController.js

14. Current situation: Can create notes but can't view them
    What we need: Get all notes for logged-in user
    Next step: Add getNotes controller

15. Adding features of GetAllTask, GetTaskById

16. 

# Note
1. In mongoose, while using hashing, we can't use arrow function , because this donot work with mongoose. so we use normal function 
2. 


# Login Worlflow
Login flow:

Get email and password from request
Find user by email
Check if user exists
Compare password
If correct, generate token
Send token in response

# HTTP Server
403 :- Unauthorized Access

