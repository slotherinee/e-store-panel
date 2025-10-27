# E-Store API

A complete e-commerce REST API built with Express, TypeScript, Prisma, and PostgreSQL.

## Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control (USER/ADMIN)
- **User Management**: User registration, login, profile management, and password changes
- **Product Management**: Full CRUD operations for products with search functionality
- **Shopping Cart**: Add, update, remove items with stock validation
- **Order Management**: Create orders from cart, view order history, cancel orders
- **Database**: PostgreSQL with Prisma ORM
- **Validation**: Request validation using Zod
- **Security**: Password hashing with bcrypt, JWT token authentication

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Validation**: Zod
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Environment**: Docker

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js (for local development)

### Installation

1. Clone the repository
2. Navigate to the docker directory:

```bash
cd docker_n
```

3. Start the Docker containers:

```bash
docker compose up -d
```

4. The API will be available at `http://localhost:3000`

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL=postgresql://pgsql:pgsql@pgsql:5432/pgsql?schema=public
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
PORT=3000
```

## API Endpoints

### Health Check

#### Check API Status

```http
GET /health
```

**Response:**

```json
{
  "status": "ok",
  "message": "E-Store API is running"
}
```

---

## Authentication Endpoints

Base URL: `/api/auth`

### Register a New User

```http
POST /api/auth/register
```

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response:** `201 Created`

```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER",
    "createdAt": "2025-10-27T00:00:00.000Z"
  },
  "token": "jwt_token_here"
}
```

### Login

```http
POST /api/auth/login
```

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:** `200 OK`

```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER",
    "createdAt": "2025-10-27T00:00:00.000Z"
  },
  "token": "jwt_token_here"
}
```

### Get User Profile

```http
GET /api/auth/profile
Authorization: Bearer {token}
```

**Response:** `200 OK`

```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "USER",
  "createdAt": "2025-10-27T00:00:00.000Z",
  "updatedAt": "2025-10-27T00:00:00.000Z"
}
```

---

## User Endpoints

Base URL: `/api/users`

**Note:** All user endpoints require authentication.

### Update User Profile

```http
PUT /api/users/profile
Authorization: Bearer {token}
```

**Request Body:**

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

**Response:** `200 OK`

```json
{
  "id": "uuid",
  "email": "jane@example.com",
  "name": "Jane Doe",
  "role": "USER",
  "createdAt": "2025-10-27T00:00:00.000Z",
  "updatedAt": "2025-10-27T00:00:00.000Z"
}
```

### Change Password

```http
POST /api/users/change-password
Authorization: Bearer {token}
```

**Request Body:**

```json
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword123"
}
```

**Response:** `200 OK`

```json
{
  "message": "Password changed successfully"
}
```

### Get All Users (Admin Only)

```http
GET /api/users
Authorization: Bearer {admin_token}
```

**Response:** `200 OK`

```json
[
  {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER",
    "createdAt": "2025-10-27T00:00:00.000Z",
    "updatedAt": "2025-10-27T00:00:00.000Z"
  }
]
```

### Get User by ID (Admin Only)

```http
GET /api/users/:id
Authorization: Bearer {admin_token}
```

**Response:** `200 OK`

```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "USER",
  "createdAt": "2025-10-27T00:00:00.000Z",
  "updatedAt": "2025-10-27T00:00:00.000Z"
}
```

### Delete User (Admin Only)

```http
DELETE /api/users/:id
Authorization: Bearer {admin_token}
```

**Response:** `200 OK`

```json
{
  "message": "User deleted successfully"
}
```

---

## Product Endpoints

Base URL: `/api/products`

### Get All Products

```http
GET /api/products
```

**Response:** `200 OK`

```json
[
  {
    "id": "uuid",
    "name": "Product Name",
    "description": "Product description",
    "price": 99.99,
    "stock": 100,
    "imageUrl": "https://example.com/image.jpg",
    "createdAt": "2025-10-27T00:00:00.000Z",
    "updatedAt": "2025-10-27T00:00:00.000Z"
  }
]
```

### Get Product by ID

```http
GET /api/products/:id
```

**Response:** `200 OK`

```json
{
  "id": "uuid",
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "stock": 100,
  "imageUrl": "https://example.com/image.jpg",
  "createdAt": "2025-10-27T00:00:00.000Z",
  "updatedAt": "2025-10-27T00:00:00.000Z"
}
```

### Search Products

```http
GET /api/products/search?q=search_term
```

**Response:** `200 OK`

```json
[
  {
    "id": "uuid",
    "name": "Product Name",
    "description": "Product description",
    "price": 99.99,
    "stock": 100,
    "imageUrl": "https://example.com/image.jpg",
    "createdAt": "2025-10-27T00:00:00.000Z",
    "updatedAt": "2025-10-27T00:00:00.000Z"
  }
]
```

### Create Product (Admin Only)

```http
POST /api/products
Authorization: Bearer {admin_token}
```

**Request Body:**

```json
{
  "name": "New Product",
  "description": "Product description",
  "price": 99.99,
  "stock": 100,
  "imageUrl": "https://example.com/image.jpg"
}
```

**Response:** `201 Created`

```json
{
  "id": "uuid",
  "name": "New Product",
  "description": "Product description",
  "price": 99.99,
  "stock": 100,
  "imageUrl": "https://example.com/image.jpg",
  "createdAt": "2025-10-27T00:00:00.000Z",
  "updatedAt": "2025-10-27T00:00:00.000Z"
}
```

### Update Product (Admin Only)

```http
PUT /api/products/:id
Authorization: Bearer {admin_token}
```

**Request Body:**

```json
{
  "name": "Updated Product Name",
  "price": 89.99,
  "stock": 150
}
```

**Response:** `200 OK`

```json
{
  "id": "uuid",
  "name": "Updated Product Name",
  "description": "Product description",
  "price": 89.99,
  "stock": 150,
  "imageUrl": "https://example.com/image.jpg",
  "createdAt": "2025-10-27T00:00:00.000Z",
  "updatedAt": "2025-10-27T00:00:00.000Z"
}
```

### Delete Product (Admin Only)

```http
DELETE /api/products/:id
Authorization: Bearer {admin_token}
```

**Response:** `200 OK`

```json
{
  "message": "Product deleted successfully"
}
```

---

## Cart Endpoints

Base URL: `/api/cart`

**Note:** All cart endpoints require authentication.

### Get User Cart

```http
GET /api/cart
Authorization: Bearer {token}
```

**Response:** `200 OK`

```json
{
  "id": "uuid",
  "userId": "uuid",
  "createdAt": "2025-10-27T00:00:00.000Z",
  "updatedAt": "2025-10-27T00:00:00.000Z",
  "items": [
    {
      "id": "uuid",
      "cartId": "uuid",
      "productId": "uuid",
      "quantity": 2,
      "createdAt": "2025-10-27T00:00:00.000Z",
      "updatedAt": "2025-10-27T00:00:00.000Z",
      "product": {
        "id": "uuid",
        "name": "Product Name",
        "price": 99.99,
        "stock": 100
      }
    }
  ]
}
```

### Add Item to Cart

```http
POST /api/cart/items
Authorization: Bearer {token}
```

**Request Body:**

```json
{
  "productId": "uuid",
  "quantity": 2
}
```

**Response:** `201 Created`

```json
{
  "id": "uuid",
  "cartId": "uuid",
  "productId": "uuid",
  "quantity": 2,
  "createdAt": "2025-10-27T00:00:00.000Z",
  "updatedAt": "2025-10-27T00:00:00.000Z",
  "product": {
    "id": "uuid",
    "name": "Product Name",
    "price": 99.99,
    "stock": 100
  }
}
```

### Update Cart Item

```http
PUT /api/cart/items/:itemId
Authorization: Bearer {token}
```

**Request Body:**

```json
{
  "quantity": 3
}
```

**Response:** `200 OK`

```json
{
  "id": "uuid",
  "cartId": "uuid",
  "productId": "uuid",
  "quantity": 3,
  "createdAt": "2025-10-27T00:00:00.000Z",
  "updatedAt": "2025-10-27T00:00:00.000Z",
  "product": {
    "id": "uuid",
    "name": "Product Name",
    "price": 99.99,
    "stock": 100
  }
}
```

### Remove Item from Cart

```http
DELETE /api/cart/items/:itemId
Authorization: Bearer {token}
```

**Response:** `200 OK`

```json
{
  "message": "Item removed from cart"
}
```

### Clear Cart

```http
DELETE /api/cart
Authorization: Bearer {token}
```

**Response:** `200 OK`

```json
{
  "message": "Cart cleared"
}
```

---

## Order Endpoints

Base URL: `/api/orders`

**Note:** All order endpoints require authentication.

### Create Order from Cart

```http
POST /api/orders
Authorization: Bearer {token}
```

**Response:** `201 Created`

```json
{
  "id": "uuid",
  "userId": "uuid",
  "total": 199.98,
  "status": "PENDING",
  "createdAt": "2025-10-27T00:00:00.000Z",
  "updatedAt": "2025-10-27T00:00:00.000Z",
  "items": [
    {
      "id": "uuid",
      "orderId": "uuid",
      "productId": "uuid",
      "quantity": 2,
      "price": 99.99,
      "createdAt": "2025-10-27T00:00:00.000Z",
      "product": {
        "id": "uuid",
        "name": "Product Name",
        "price": 99.99
      }
    }
  ]
}
```

### Get User Orders

```http
GET /api/orders
Authorization: Bearer {token}
```

**Response:** `200 OK`

```json
[
  {
    "id": "uuid",
    "userId": "uuid",
    "total": 199.98,
    "status": "PENDING",
    "createdAt": "2025-10-27T00:00:00.000Z",
    "updatedAt": "2025-10-27T00:00:00.000Z",
    "items": [
      {
        "id": "uuid",
        "orderId": "uuid",
        "productId": "uuid",
        "quantity": 2,
        "price": 99.99,
        "product": {
          "name": "Product Name"
        }
      }
    ]
  }
]
```

### Get Order by ID

```http
GET /api/orders/:id
Authorization: Bearer {token}
```

**Response:** `200 OK`

```json
{
  "id": "uuid",
  "userId": "uuid",
  "total": 199.98,
  "status": "PENDING",
  "createdAt": "2025-10-27T00:00:00.000Z",
  "updatedAt": "2025-10-27T00:00:00.000Z",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "items": [
    {
      "id": "uuid",
      "orderId": "uuid",
      "productId": "uuid",
      "quantity": 2,
      "price": 99.99,
      "product": {
        "name": "Product Name"
      }
    }
  ]
}
```

### Cancel Order

```http
POST /api/orders/:id/cancel
Authorization: Bearer {token}
```

**Response:** `200 OK`

```json
{
  "message": "Order cancelled successfully"
}
```

### Get All Orders (Admin Only)

```http
GET /api/orders/admin/all
Authorization: Bearer {admin_token}
```

**Response:** `200 OK`

```json
[
  {
    "id": "uuid",
    "userId": "uuid",
    "total": 199.98,
    "status": "PENDING",
    "createdAt": "2025-10-27T00:00:00.000Z",
    "updatedAt": "2025-10-27T00:00:00.000Z",
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe"
    },
    "items": [
      {
        "id": "uuid",
        "productId": "uuid",
        "quantity": 2,
        "price": 99.99,
        "product": {
          "name": "Product Name"
        }
      }
    ]
  }
]
```

### Update Order Status (Admin Only)

```http
PUT /api/orders/:id/status
Authorization: Bearer {admin_token}
```

**Request Body:**

```json
{
  "status": "PROCESSING"
}
```

**Valid statuses:** `PENDING`, `PROCESSING`, `COMPLETED`, `CANCELLED`

**Response:** `200 OK`

```json
{
  "id": "uuid",
  "userId": "uuid",
  "total": 199.98,
  "status": "PROCESSING",
  "createdAt": "2025-10-27T00:00:00.000Z",
  "updatedAt": "2025-10-27T00:00:00.000Z",
  "items": [...]
}
```

---

## Error Responses

The API returns standard HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid or missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

**Error Response Format:**

```json
{
  "error": "Error message here"
}
```

**Validation Error Format:**

```json
{
  "error": "Validation error",
  "details": [
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "undefined",
      "path": ["email"],
      "message": "Required"
    }
  ]
}
```

---

## Database Schema

### User

- `id` (UUID)
- `email` (String, unique)
- `password` (String, hashed)
- `name` (String)
- `role` (Enum: USER, ADMIN)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### Product

- `id` (UUID)
- `name` (String)
- `description` (String, optional)
- `price` (Float)
- `stock` (Int)
- `imageUrl` (String, optional)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### Cart

- `id` (UUID)
- `userId` (UUID, unique)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### CartItem

- `id` (UUID)
- `cartId` (UUID)
- `productId` (UUID)
- `quantity` (Int)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### Order

- `id` (UUID)
- `userId` (UUID)
- `total` (Float)
- `status` (Enum: PENDING, PROCESSING, COMPLETED, CANCELLED)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### OrderItem

- `id` (UUID)
- `orderId` (UUID)
- `productId` (UUID)
- `quantity` (Int)
- `price` (Float)
- `createdAt` (DateTime)

---

## Project Structure

```
src/
├── config/
│   └── database.ts          # Prisma client configuration
├── controllers/
│   ├── auth.controller.ts    # Authentication controllers
│   ├── cart.controller.ts    # Cart controllers
│   ├── order.controller.ts   # Order controllers
│   ├── product.controller.ts # Product controllers
│   └── user.controller.ts    # User controllers
├── middleware/
│   ├── auth.ts              # Authentication middleware
│   └── errorHandler.ts      # Error handling middleware
├── routes/
│   ├── auth.routes.ts       # Authentication routes
│   ├── cart.routes.ts       # Cart routes
│   ├── order.routes.ts      # Order routes
│   ├── product.routes.ts    # Product routes
│   └── user.routes.ts       # User routes
├── services/
│   ├── auth.service.ts      # Authentication business logic
│   ├── cart.service.ts      # Cart business logic
│   ├── order.service.ts     # Order business logic
│   ├── product.service.ts   # Product business logic
│   └── user.service.ts      # User business logic
├── utils/
│   ├── jwt.ts              # JWT utilities
│   └── password.ts         # Password hashing utilities
├── validators/
│   ├── auth.validator.ts    # Authentication validation schemas
│   ├── cart.validator.ts    # Cart validation schemas
│   ├── product.validator.ts # Product validation schemas
│   └── user.validator.ts    # User validation schemas
└── index.ts                # Application entry point
```

---

## Development

### Running Migrations

```bash
docker exec -it panel-node npx prisma migrate dev --name migration_name
```

### Generate Prisma Client

```bash
docker exec -it panel-node npx prisma generate
```

### Reset Database

```bash
docker exec -it panel-node npx prisma migrate reset --force
```

### View Database

```bash
docker exec -it panel-node npx prisma studio
```

---

## License

ISC

---

_This README was generated with AI assistance._
