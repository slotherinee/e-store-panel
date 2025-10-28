# Admin Panel Docker Configuration

## Overview

This directory contains Docker configuration for the React Admin panel application.

## Files

- `Dockerfile` - Multi-stage Docker configuration supporting both development and production builds
- `.dockerignore` - Files to exclude from Docker context
- `nginx.conf` - Nginx configuration for production deployment

## Usage

### Development Mode

The development configuration is already set up in `docker_n/docker-compose.yml`.

From the `docker_n` directory, run:

```bash
cd docker_n
docker-compose up admin
```

This will:

- Start the admin service on port 5173
- Mount the source code for hot-reloading
- Connect to the backend API at `http://node:3000`

### Production Build

To build the production image:

```bash
docker build -t admin-panel:production --target production .
```

To run the production container:

```bash
docker run -d -p 80:80 admin-panel:production
```

### Full Stack

To run the entire stack (backend + admin + database + redis):

```bash
cd docker_n
docker-compose up
```

## Ports

- **5173** - Development server (Vite)
- **80** - Production server (Nginx)

## Environment Variables

The admin panel can use environment variables prefixed with `VITE_`:

- `VITE_API_URL` - Backend API URL (default: http://node:3000)

## Notes

- The development build includes hot-reloading
- The production build is optimized and served via Nginx
- Node modules are stored in an anonymous volume to improve performance
