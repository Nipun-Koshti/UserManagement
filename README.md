# User Management Application

A full-stack web application for user management with a Node.js/Express backend and a frontend built with modern web technologies.

## Project Overview

Fourty 4 is a comprehensive user management system featuring:
- RESTful API for user operations (CRUD)
- MongoDB database integration
- Comprehensive error handling with async middleware
- CORS support for cross-origin requests
- Modular architecture with separation of concerns

---

## Project Structure

```
Fourty 4/
├── Backend/
│   ├── index.js                 # Main application entry point
│   ├── package.json             # Backend dependencies and scripts
│   ├── controller/
│   │   └── user.controller.js   # User business logic handlers
│   ├── Routes/
│   │   ├── routes.js            # Main API routes aggregator
│   │   └── user.routes.js       # User-specific route definitions
│   ├── Model/
│   │   └── user.model.js        # MongoDB user schema
│   ├── utils/
│   │   └── asyncHandeler.js     # Async error handling middleware
│   └── db/
│       └── connection.js        # MongoDB connection configuration
└── Frontend/
    └── (React/Vite application)
```

---

## Backend Setup

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local or cloud instance)
- **npm** or **yarn** package manager

### Installation

1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the Backend directory with the following variables:
   ```env
   PORT=4000
   MONGO_URI=mongodb://localhost:27017
   ```

   - `PORT`: Server port (default: 4000)
   - `MONGO_URI`: MongoDB connection string

### Running the Application

**Development mode** (with auto-restart on file changes):
```bash
npm run dev
```

**Production mode**:
```bash
node index.js
```

The server will start listening on `http://localhost:4000`

---

## API Endpoints

### Base URL
```
http://localhost:4000/api/user
```

### Endpoints

#### 1. Create User
- **Method**: `POST`
- **Endpoint**: `/create`
- **Body**: JSON object with user data
- **Response**: Created user object with success status
- **Status Code**: 201 (Created)

Example request:
```json
POST /api/user/create
{
  "name": "John Doe",
  "email": "john@example.com",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "zip": "10001",
    "geo": {
      "lat": 40.7128,
      "lng": -74.0060
    }
  }
}
```

#### 2. Get All Users
- **Method**: `GET`
- **Endpoint**: `/list`
- **Response**: Array of all users
- **Status Code**: 200 (OK)

Example request:
```
GET /api/user/list
```

#### 3. Get User by ID
- **Method**: `GET`
- **Endpoint**: `/profile/:id`
- **URL Parameters**: `id` (MongoDB ObjectID)
- **Response**: User object matching the ID
- **Status Code**: 200 (OK) or 404 (Not Found)

Example request:
```
GET /api/user/profile/507f1f77bcf86cd799439011
```

#### 4. Update User
- **Method**: `PUT`
- **Endpoint**: `/update/:id`
- **URL Parameters**: `id` (MongoDB ObjectID)
- **Body**: JSON object with fields to update
- **Response**: Updated user object
- **Status Code**: 200 (OK)

Example request:
```json
PUT /api/user/update/507f1f77bcf86cd799439011
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

#### 5. Delete User
- **Method**: `DELETE`
- **Endpoint**: `/delete/:id`
- **URL Parameters**: `id` (MongoDB ObjectID)
- **Response**: Success message and deleted user data
- **Status Code**: 200 (OK)

Example request:
```
DELETE /api/user/delete/507f1f77bcf86cd799439011
```

---

## Technology Stack

### Backend
- **Framework**: Express.js 5.1.0
- **Runtime**: Node.js
- **Database**: MongoDB 8.20.0
- **ORM**: Mongoose
- **CORS**: Cross-Origin Resource Sharing support
- **Environment**: dotenv for configuration management
- **Development**: Nodemon for auto-reload

### Dependencies
```json
{
  "cors": "^2.8.5",
  "dotenv": "^17.2.3",
  "express": "^5.1.0",
  "mongoose": "^8.20.0",
  "nodemon": "^3.1.11"
}
```

---

## Architecture & Design Patterns

### 1. Modular Structure
- **Controllers**: Business logic separated from routes
- **Routes**: Clean endpoint organization
- **Models**: Data schema definitions with Mongoose
- **Utils**: Reusable middleware and helpers

### 2. Error Handling
- **Async Handler**: Wrapper function `asyncHandler` catches and passes errors to Express error handler
- Prevents unhandled promise rejections
- Centralized error management

```javascript
// Example usage
const userCreate = asyncHandler(async(req,res)=>{
  const user = await User.create(req.body);
  res.status(201).json({ success: true, data: user });
})
```

### 3. Request Validation
- MongoDB ObjectID validation using Mongoose `isValidObjectId()`
- Returns 400 (Bad Request) for invalid IDs
- Returns 404 (Not Found) if user doesn't exist

---

## Database Schema

### User Model

```javascript
{
  name: String,
  email: String,
  address: {
    street: String (required),
    city: String (required),
    zip: String (required),
    geo: {
      lat: Number (required),
      lng: Number (required)
    }
  }
}
```

---

## Configuration

### Environment Variables

Create a `.env` file in the Backend directory:

```env
# Server Configuration
PORT=4000

# Database Configuration
MONGO_URI=mongodb://localhost:27017

# For MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net
```

The database name is hardcoded as `fourtyfour` in the connection file.

---

## Response Format

All API responses follow a consistent JSON format:

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { /* user object or array */ }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## Common Issues & Troubleshooting

| Issue | Solution |
|-------|----------|
| **Port 4000 already in use** | Change PORT in .env or kill the process using the port |
| **MongoDB connection failed** | Verify MONGO_URI is correct and MongoDB service is running |
| **CORS errors** | Verify frontend is making requests to correct API endpoint |
| **Invalid user ID format** | Ensure ID is a valid MongoDB ObjectID (24-character hex string) |
| **404 on user routes** | Verify route path has leading slash (e.g., `/profile/:id`) |

---

## Development Workflow

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment**:
   ```bash
   # Create .env with MONGO_URI and PORT
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Make API requests**:
   - Use Postman, Insomnia, or curl to test endpoints
   - Start with `GET /api/user/list` to verify connection

---

## Future Enhancements

- [ ] User authentication (JWT)
- [ ] Request validation middleware
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Rate limiting
- [ ] Pagination for user list endpoint
- [ ] Search and filter functionality
- [ ] File upload support
- [ ] Unit and integration tests
- [ ] Logging system
- [ ] Email notifications

---

## License

ISC

---

## Support

For issues or questions, please refer to the code comments or create an issue in the repository.
