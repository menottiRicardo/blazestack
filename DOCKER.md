# Docker Setup for BlazeStack

This project includes Docker support for easy development and deployment.

## Architecture

The Docker setup includes:

- **Frontend**: React application served by Nginx (port 3000)
- **Backend**: Express.js API server (port 8080)
- **Database**: SQLite database with persistent storage

## Quick Start

### Prerequisites

- Docker
- Docker Compose
- Node.js (for local development)
- npm (package manager)

### Running the Application

1. **Build and start all services:**
   ```bash
   docker-compose up --build
   ```

2. **Start services in detached mode:**
   ```bash
   docker-compose up -d
   ```

3. **View logs:**
   ```bash
   # All services
   docker-compose logs -f

   # Specific service
   docker-compose logs -f backend
   docker-compose logs -f frontend
   ```

4. **Stop services:**
   ```bash
   docker-compose down
   ```

5. **Stop services and remove volumes (clears database):**
   ```bash
   docker-compose down -v
   ```

## Service Details

### Frontend
- **URL**: http://localhost:3000
- **Built with**: Vite + React + TailwindCSS
- **Served by**: Nginx
- **Environment**: Production build optimized for size and performance

### Backend
- **URL**: http://localhost:8080
- **Built with**: Express.js + better-sqlite3
- **Database**: SQLite with persistent storage
- **Environment**: Configurable via docker-compose.yml

### Database
- **Type**: SQLite
- **Storage**: Persistent Docker volume (`sqlite-data`)
- **Location**: `/app/data/database.sqlite` in backend container
- **Access**: Through backend API only

## Development

### Environment Variables

The following environment variables are configured in `docker-compose.yml`:

**Backend:**
- `NODE_ENV=production`
- `PORT=8080`
- `DATABASE_URL=file:/app/data/database.sqlite`

**Frontend:**
- `VITE_API_URL=http://localhost:8080`

### Database Management

The SQLite database is automatically created on first run. Data persists between container restarts via Docker volumes.

To reset the database:
```bash
docker-compose down -v
docker-compose up --build
```

### Building Individual Services

**Backend only:**
```bash
cd backend
docker build -t blazestack-backend .
```

### Local Development

For local development without Docker:

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Frontend only:**
```bash
cd frontend
docker build -t blazestack-frontend .
```

## Troubleshooting

### Port Conflicts
If you get port conflicts:
1. Check what's using the ports: `lsof -i :3000` or `lsof -i :8080`
2. Stop conflicting services or change ports in `docker-compose.yml`

### Database Issues
- Database files are stored in the `sqlite-data` volume
- To start fresh: `docker-compose down -v && docker-compose up --build`

### Build Issues
- Clear Docker cache: `docker system prune -a`
- Rebuild without cache: `docker-compose build --no-cache`

## Production Deployment

For production deployment, consider:

1. **Environment Variables**: Override in docker-compose.yml or use env files
2. **Reverse Proxy**: Use nginx or traefik in front of the services
3. **SSL**: Configure HTTPS termination
4. **Database Backups**: Regular SQLite database backups
5. **Resource Limits**: Add memory/CPU limits to docker-compose.yml

Example production overrides:
```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  backend:
    environment:
      - NODE_ENV=production
      - DATABASE_URL=file:/app/data/production.sqlite
  frontend:
    environment:
      - VITE_API_URL=https://your-api-domain.com
```

Run with: `docker-compose -f docker-compose.yml -f docker-compose.prod.yml up`
