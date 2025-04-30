//Auth Routes
POST /api/auth/register – Register a user

POST /api/auth/login – Login a user

POST /api/auth/logout – Logout

//Task Routes (Protected)
GET /api/tasks/ – Get all tasks

GET /api/tasks/:id – Get a task by ID

POST /api/tasks/ – Create a new task

PUT /api/tasks/:id – Update a task

DELETE /api/tasks/:id – Delete a task

//Analytics Routes
GET /api/tasks/analytics/priority

GET /api/tasks/analytics/completion

GET /api/tasks/analytics/upcoming

Use Authorization: Bearer <token> in headers for protected routes.