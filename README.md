# Blockchain Node Management API Documentation

## Base URL

`/api`

## Authentication

Most endpoints require authentication using a JWT token. Include the token in the `x-auth-token` header of your requests.

## Endpoints

### Authentication

## Register User

- **URL:** `/auth/register`
  
- **Method:** `POST`
  
- **Description:** Register a new user
  
- **Request Body:**
  
  ```json copy  
   { "name": "string", "email": "string", "password": "string", "role": "provider" | "admin" | "consumer" }
  ```
  
- **Response:**
  
  - **Status Code:** 200 OK
    
  - **Body:**
    
    ```json copy  
     { "token": "string" }
    ```
    
- **Error Responses:**
  
  - 400 Bad Request: User already exists
  - 500 Internal Server Error: Server error

## Login User

- **URL:** `/auth/login`
  
- **Method:** `POST`
  
- **Description:** Authenticate a user and get a token
  
- **Request Body:**
  
  ```json copy  
   { "email": "string", "password": "string" }
  ```
  
- **Response:**
  
  - **Status Code:** 200 OK
    
  - **Body:**
    
    ```json copy  
     { "token": "string" }
    ```
    
- **Error Responses:**
  
  - 400 Bad Request: Invalid credentials
  - 500 Internal Server Error: Server error

### Provider Endpoints

## Store Machine

- **URL:** `/provider/machines`
  
- **Method:** `POST`
  
- **Description:** Add a new machine
  
- **Authentication:** Required (Provider role)
  
- **Request Body:**
  
  ```json copy  
   { "name": "string", "cpu": "string", "ram": "string", "storage": "string" }
  ```
  
- **Response:**
  
  - **Status Code:** 200 OK
  - **Body:** Machine object
- **Error Responses:**
  
  - 401 Unauthorized: No token or invalid token
  - 403 Forbidden: User is not a provider
  - 500 Internal Server Error: Server error

## Get Machines

- **URL:** `/provider/machines`
- **Method:** `GET`
- **Description:** Get all machines for the authenticated provider
- **Authentication:** Required (Provider role)
- **Response:**
  - **Status Code:** 200 OK
  - **Body:** Array of machine objects
- **Error Responses:**
  - 401 Unauthorized: No token or invalid token
  - 403 Forbidden: User is not a provider
  - 500 Internal Server Error: Server error

## Update Machine

- **URL:** `/provider/machines/:id`
  
- **Method:** `PUT`
  
- **Description:** Update a specific machine
  
- **Authentication:** Required (Provider role)
  
- **Request Body:**
  
  ```json copy  
   { "name": "string", "cpu": "string", "ram": "string", "storage": "string" }
  ```
  
- **Response:**
  
  - **Status Code:** 200 OK
  - **Body:** Updated machine object
- **Error Responses:**
  
  - 401 Unauthorized: No token, invalid token, or not the owner of the machine
  - 403 Forbidden: User is not a provider
  - 404 Not Found: Machine not found
  - 500 Internal Server Error: Server error

## Delete Machine

- **URL:** `/provider/machines/:id`
  
- **Method:** `DELETE`
  
- **Description:** Delete a specific machine
  
- **Authentication:** Required (Provider role)
  
- **Response:**
  
  - **Status Code:** 200 OK
    
  - **Body:**
    
    ```json copy  
     { "msg": "Machine removed" }
    ```
    
- **Error Responses:**
  
  - 401 Unauthorized: No token, invalid token, or not the owner of the machine
  - 403 Forbidden: User is not a provider
  - 404 Not Found: Machine not found
  - 500 Internal Server Error: Server error

### Admin Endpoints

## Store Node

- **URL:** `/admin/nodes`
  
- **Method:** `POST`
  
- **Description:** Add a new node type
  
- **Authentication:** Required (Admin role)
  
- **Request Body:**
  
  ```json copy  
   { "name": "string", "type": "string", "requiredCpu": "string", "requiredRam": "string", "requiredStorage": "string" }
  ```
  
- **Response:**
  
  - **Status Code:** 200 OK
  - **Body:** Node object
- **Error Responses:**
  
  - 401 Unauthorized: No token or invalid token
  - 403 Forbidden: User is not an admin
  - 500 Internal Server Error: Server error

## Get Nodes

- **URL:** `/admin/nodes`
- **Method:** `GET`
- **Description:** Get all node types
- **Authentication:** Required (Admin role)
- **Response:**
  - **Status Code:** 200 OK
  - **Body:** Array of node objects
- **Error Responses:**
  - 401 Unauthorized: No token or invalid token
  - 403 Forbidden: User is not an admin
  - 500 Internal Server Error: Server error

## Update Node

- **URL:** `/admin/nodes/:id`
  
- **Method:** `PUT`
  
- **Description:** Update a specific node type
  
- **Authentication:** Required (Admin role)
  
- **Request Body:**
  
  ```json copy  
   { "name": "string", "type": "string", "requiredCpu": "string", "requiredRam": "string", "requiredStorage": "string" }
  ```
  
- **Response:**
  
  - **Status Code:** 200 OK
  - **Body:** Updated node object
- **Error Responses:**
  
  - 401 Unauthorized: No token or invalid token
  - 403 Forbidden: User is not an admin
  - 404 Not Found: Node not found
  - 500 Internal Server Error: Server error

## Delete Node

- **URL:** `/admin/nodes/:id`
  
- **Method:** `DELETE`
  
- **Description:** Delete a specific node type
  
- **Authentication:** Required (Admin role)
  
- **Response:**
  
  - **Status Code:** 200 OK
    
  - **Body:**
    
    ```json copy  
     { "msg": "Node removed" }
    ```
    
- **Error Responses:**
  
  - 401 Unauthorized: No token or invalid token
  - 403 Forbidden: User is not an admin
  - 404 Not Found: Node not found
  - 500 Internal Server Error: Server error

### Consumer Endpoints

## Deploy Node

- **URL:** `/consumer/deploy`
  
- **Method:** `POST`
  
- **Description:** Deploy a node on a suitable machine
  
- **Authentication:** Required (Consumer role)
  
- **Request Body:**
  
  ```json copy  
   { "nodeId": "string" }
  ```
  
- **Response:**
  
  - **Status Code:** 200 OK
  - **Body:** Deployed node object
- **Error Responses:**
  
  - 400 Bad Request: No suitable machine found for deployment
  - 401 Unauthorized: No token or invalid token
  - 403 Forbidden: User is not a consumer
  - 404 Not Found: Node not found
  - 500 Internal Server Error: Server error

## Get Deployed Nodes

- **URL:** `/consumer/deployed-nodes`
- **Method:** `GET`
- **Description:** Get all deployed nodes for the authenticated consumer
- **Authentication:** Required (Consumer role)
- **Response:**
  - **Status Code:** 200 OK
  - **Body:** Array of deployed node objects with populated node and machine information
- **Error Responses:**
  - 401 Unauthorized: No token or invalid token
  - 403 Forbidden: User is not a consumer
  - 500 Internal Server Error: Server error

## Delete Deployed Node

- **URL:** `/consumer/deployed-nodes/:id`
  
- **Method:** `DELETE`
  
- **Description:** Remove a specific deployed node
  
- **Authentication:** Required (Consumer role)
  
- **Response:**
  
  - **Status Code:** 200 OK
    
  - **Body:**

    ```json copy    
     { "msg": "Deployed node removed" }
    ```
    
- **Error Responses:**
  
  - 401 Unauthorized: No token, invalid token, or not the owner of the deployed node
  - 403 Forbidden: User is not a consumer
  - 404 Not Found: Deployed node not found
  - 500 Internal Server Error: Server error


# Blockchain Node Management API Features

1. User Management
  - User registration with role-based access control (Provider, Admin, Consumer)
  - User authentication using JWT tokens
  - Secure password hashing using bcrypt
2. Machine Management (for Providers)
  - Add new machines with specifications (CPU, RAM, Storage)
  - Retrieve all machines owned by a provider
  - Update machine specifications
  - Delete machines
3. Node Type Management (for Admins)
  - Create new blockchain node types with resource requirements
  - Retrieve all node types
  - Update node type specifications
  - Delete node types
4. Node Deployment (for Consumers)
  - Deploy blockchain nodes on suitable machines
  - Automated matching of node requirements to available machines
  - Retrieve all deployed nodes for a consumer
  - Remove deployed nodes
5. Role-Based Access Control
  - Middleware for authenticating users
  - Middleware for authorizing users based on their role
6. Database Integration
  - MongoDB integration using Mongoose ODM
  - Defined schemas for Users, Machines, Nodes, and Deployed Nodes
7. Error Handling
  - Consistent error responses across all endpoints
  - Proper HTTP status codes for different error scenarios
8. Security Features
  - JWT for secure authentication
  - Password hashing for user security
  - Environment variables for sensitive information
  - Rate limiting to prevent abuse and ensure fair usage
9. Scalability and Performance
  - Asynchronous operations using async/await
  - Efficient database queries
10. API Documentation
  - Comprehensive documentation of all endpoints
  - Clear request/response formats for each endpoint
11. Deployment Ready
  - Configurable port and database connection
  - Easy to deploy on local and cloud environments
12. Development Tools
  - Nodemon for automatic server restart during development
13. Extensibility
  - Modular structure allowing easy addition of new features
  - Separation of routes, controllers, and models for maintainability
14. Rate Limiting
  - Prevents API abuse by limiting the number of requests a user can make in a given time frame
  - Enhances API stability and ensures fair usage among all clients
  - Configurable limits for different endpoints or user roles


# Deployment Instructions for Blockchain Node Management API

## Local Deployment

### Prerequisites

- Node.js (v14 or later)
- npm (usually comes with Node.js)
- MongoDB (v4.4 or later)

### Steps

1. Clone the repository
  
  ```bash
    git clone https://github.com/theBatman07/Blockchain-Node-Management-API.git 
    cd Blockchain-Node-Management-API
  ```
  
2. Install dependencies
  
  ```bash
    npm install
  ```
  
3. Set up environment variables
  Create a `.env` file in the root directory with the following content:
  
  ```bash
    PORT=5000 
    MONGO_URI="" 
    JWT_SECRET=your_jwt_secret_here
  ```

  Replace `your_jwt_secret_here` with a secure random string.

  Or convert `.env.txt` to `.env`
  
4. Start MongoDB
  Ensure MongoDB is running on your local machine.
  
5. Run the application
  
  ```bash
    npm run dev
  ```
  
  The API should now be running on `http://localhost:5000`.