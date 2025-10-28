# Admin Panel Authentication

## Overview

The admin panel now requires authentication and only allows users with **ADMIN** role to access.

## Features

- ✅ Login with email and password
- ✅ JWT token-based authentication
- ✅ Admin role verification (both on login and on every request)
- ✅ Automatic token refresh on API calls
- ✅ Secure logout functionality
- ✅ Beautiful custom login page

## Default Admin Credentials

After running the seed script, you can login with:

```
Email: admin@example.com
Password: password123
```

## How It Works

### 1. Login Flow

1. User enters credentials on the login page
2. System sends POST request to `/api/auth/login`
3. Backend validates credentials and checks if user role is `ADMIN`
4. If valid, backend returns user data and JWT token
5. Token is stored in localStorage
6. User is redirected to the admin dashboard

### 2. Authorization Flow

- Every API request includes `Authorization: Bearer <token>` header
- Backend validates the token and checks permissions
- If token is invalid or expired, user is logged out automatically

### 3. Role Checking

- Only users with `role: "ADMIN"` can access the admin panel
- Role is verified:
  - On login
  - On every page navigation (checkAuth)
  - On every API request (via JWT)

## API Endpoints

### POST `/api/auth/login`

Login endpoint for admin users.

**Request:**

```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

**Response (Success):**

```json
{
  "user": {
    "id": "uuid",
    "email": "admin@example.com",
    "name": "Admin User",
    "role": "ADMIN",
    "createdAt": "2025-10-28T..."
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (Non-Admin):**

```json
{
  "error": "Access denied: Admin privileges required"
}
```

### GET `/api/auth/profile`

Get current user profile (requires authentication).

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
  "id": "uuid",
  "email": "admin@example.com",
  "name": "Admin User",
  "role": "ADMIN",
  "createdAt": "2025-10-28T...",
  "updatedAt": "2025-10-28T..."
}
```

## Files Structure

```
admin/src/
├── App.tsx              # Main app with authProvider
├── authProvider.ts      # Authentication logic
├── dataProvider.ts      # API client with token injection
├── LoginPage.tsx        # Custom login page
└── Layout.tsx          # Admin layout
```

## Security Features

1. **Token Storage**: JWT tokens stored in localStorage
2. **Automatic Logout**: On 401/403 responses
3. **Role Verification**: Double-checked on frontend and backend
4. **Protected Routes**: All admin routes require authentication
5. **Token Expiration**: Tokens expire after 7 days (configurable)

## Testing Non-Admin Users

Try logging in with a regular user (should be rejected):

```
Email: john.doe@example.com
Password: password123
```

You should see an error: "Access denied: Admin privileges required"

## Creating Additional Admin Users

You can create admin users via the seed script or manually:

```typescript
// In your seed script
await prisma.user.create({
  data: {
    email: "newadmin@example.com",
    password: await bcrypt.hash("password", 10),
    name: "New Admin",
    role: Role.ADMIN, // Important!
  },
});
```

## Troubleshooting

### "Invalid credentials" error

- Check email and password are correct
- Verify user exists in database

### "Access denied: Admin privileges required"

- User exists but role is not ADMIN
- Update user role in database

### Token expired

- Tokens expire after 7 days
- Simply login again

### CORS issues

- Make sure backend CORS is configured properly
- Check that `exposedHeaders` includes required headers
