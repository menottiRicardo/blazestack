# BlazeStack

A modern full-stack web application built with React, Express.js, and MongoDB.

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite + TailwindCSS + TanStack Router
- **Backend**: Express.js 5 + TypeScript + MongoDB
- **Database**: MongoDB 7
- **Containerization**: Docker + Docker Compose

## Quick Start

### Using Docker Compose (Recommended)
```bash
docker-compose up --build
```

This will start:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8000  
- **MongoDB**: mongodb://localhost:27017

## Individual Container Setup

### Backend
```bash
cd backend
docker build -t blazestack-backend .
docker run -p 8000:8000 -e PORT=8000 -e MONGODB_URI=mongodb://localhost:27017/blazestack blazestack-backend
```

### Frontend
```bash
cd frontend
docker build -t blazestack-frontend .
docker run -p 3000:3000 blazestack-frontend
```

## Development

### Prerequisites
- Docker and Docker Compose
- Node.js 20+ (for local development)

### Environment Variables
The application uses the following environment variables (configured in docker-compose.yml):

**Backend:**
- `NODE_ENV=production`
- `PORT=8000`
- `MONGODB_URI=mongodb://mongodb:27017/blazestack`

**Frontend:**
- `VITE_API_URL=http://localhost:8000`

## Database

MongoDB is used for data persistence with:
- Automatic database creation on first run
- Persistent data storage via Docker volumes
- Database name: `blazestack`

To reset the database:
```bash
docker-compose down -v
docker-compose up --build
```

## Project Structure

```
blazestack/
├── frontend/          # React frontend application
├── backend/           # Express.js backend API
├── docker-compose.yml # Multi-container setup
└── README.md         # This file
```