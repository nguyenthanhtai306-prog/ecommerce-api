# Ecommerce API

RESTful API for an e-commerce system built with Node.js, Express.js, Prisma ORM, and PostgreSQL.

## Technologies
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- Docker and Docker Compose
- JWT Authentication
- bcryptjs

## Features
- User registration
- User login
- JWT authentication
- Protected user profile endpoint
- API health check
- PostgreSQL database running with Docker
- Docker Compose health checks

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check API status |
| GET | `/health` | Health check |
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Get authenticated user information |

## Run with Docker

1. Configure the environment variables in `.env`.
2. Start the containers:

```bash
docker compose up -d --build
```

3. Check container status:

```bash
docker compose ps
```

4. Test the health endpoint at `http://localhost:3000/health`.

## Security
Do not commit `.env` or expose database credentials and JWT secrets.
