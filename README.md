# BlazeStack - Incident Management System

A modern full-stack incident management application built with React, Express.js, TypeScript, and MongoDB. Create, view, and manage safety incidents with image upload capabilities and real-time updates.

## 🚀 Quick Start

### Using Docker Compose (Recommended)
```bash
docker-compose up --build
```

### Local Development
```bash
# Terminal 1 - Backend
cd backend && npm install && npm run dev

# Terminal 2 - Frontend  
cd frontend && npm install && npm run dev

# Terminal 3 - MongoDB (if not using Docker)
mongod
```

**Access the application:**
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **MongoDB**: mongodb://localhost:27017

## 🏗️ Tech Stack & Architecture

**Frontend**: React 19 + TypeScript + TanStack Router/Query + shadcn/ui + Tailwind CSS  
**Backend**: Express.js 5 + TypeScript + Mongoose + Multer  
**Database**: MongoDB with Mongoose ODM  

**Architecture**: Traditional 3-tier SPA with REST API. Frontend uses TanStack Query for optimistic updates and caching, backend follows MVC pattern with Express routers, and MongoDB provides document-based persistence with file uploads stored on disk.

## 📋 Features

### ✅ What's Implemented
- **Create Incidents**: Form with title, description, type, location, and image upload
- **View Incidents**: Dashboard with paginated list in reverse chronological order
- **Delete Incidents**: Confirmation dialog with trash icon (appears on hover)
- **Image Upload**: Drag & drop file upload with preview and validation
- **Responsive Design**: Mobile-first UI with modern card layouts
- **Real-time Updates**: Optimistic UI updates with TanStack Query
- **Type Safety**: Full TypeScript coverage across frontend and backend
- **Error Handling**: Comprehensive validation and user feedback

### 🔧 Core Functionality
- **Incident Types**: Fire 🔥, Medical 🚑, Security 🚨, Other ⚠️
- **File Upload**: Images with type validation (JPEG, PNG, GIF, WebP)
- **Validation**: Zod schema validation on both client and server
- **CRUD Operations**: Complete REST API with proper HTTP status codes
- **State Management**: TanStack Query for server state, React hooks for local state

## 🤔 Tradeoffs & Assumptions

### Tradeoffs Made
- **File Storage**: Local disk storage vs cloud storage (simpler setup, not production-scalable)
- **Authentication**: No auth system implemented (focused on core CRUD functionality)
- **Real-time**: Optimistic updates vs WebSocket (simpler, good enough for MVP)
- **Validation**: Client + server validation vs server-only (better UX, some duplication)

### Assumptions
- **Single User**: No multi-user considerations or data isolation
- **Development Environment**: CORS disabled, permissive security headers
- **File Size**: No strict limits (configurable in multer middleware)
- **Browser Support**: Modern browsers with ES6+ and CSS Grid support

## 🚧 What's Done vs. Future Enhancements

### ✅ Current Implementation
- Full CRUD operations for incidents
- Image upload with preview
- Responsive dashboard with pagination
- Modern UI with animations and hover effects
- Type-safe API with validation
- Delete confirmation dialogs

### 🔮 Future Enhancements (with more time)
- **Authentication & Authorization**: User login, role-based access
- **Advanced Features**: 
  - Search and filtering incidents
  - Bulk operations
  - Incident status workflow (open/in-progress/closed)
  - Email notifications
- **Infrastructure**:
  - Cloud storage (S3) for images
  - API rate limiting
- **Analytics**: Dashboard with incident statistics and trends
- **Real-time Updates**: WebSocket for live notifications

## 🤖 AI Usage

AI was used for:
- **Code Generation**: Implementing CRUD operations, form validation schemas, and UI components
- **Problem Solving**: Debugging CORS issues, file upload configuration, and TypeScript errors  
- **Design Enhancement**: Improving card layouts, color schemes, and responsive design patterns

## 📁 Project Structure

```
blazestack/
├── frontend/                 # React TypeScript application
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── ui/          # shadcn/ui components
│   │   │   ├── IncidentCard.tsx
│   │   │   ├── IncidentForm.tsx
│   │   │   └── CreateIncidentModal.tsx
│   │   ├── routes/          # TanStack Router routes
│   │   ├── api/             # API client functions
│   │   ├── types/           # TypeScript interfaces
│   │   └── lib/             # Utilities and validation
├── backend/                  # Express.js TypeScript API
│   ├── src/
│   │   ├── api/             # Route handlers
│   │   ├── models/          # Mongoose models
│   │   ├── middleware/      # Express middleware
│   │   ├── interfaces/      # TypeScript interfaces
│   │   └── app.ts           # Express app configuration
├── uploads/                  # Uploaded images (auto-created)
├── docker-compose.yml        # Multi-container setup
└── README.md                # This file
```

## 🔧 API Endpoints

```
GET    /api/v1/incidents       # List incidents (paginated)
POST   /api/v1/incidents       # Create incident (with file upload)
GET    /api/v1/incidents/:id   # Get single incident
DELETE /api/v1/incidents/:id   # Delete incident
GET    /uploads/:filename      # Serve uploaded images
```

## 🎨 UI/UX Features

- **Modern Card Design**: Gradient backgrounds, hover effects, color-coded stripes
- **Visual Hierarchy**: Type icons, badges, and status indicators
- **Responsive Layout**: Mobile-first grid system
- **Interactive Elements**: Hover states, loading animations, toast notifications
- **Accessibility**: Keyboard navigation, ARIA labels, semantic HTML

## 🛠️ Development

### Prerequisites
- Node.js 20+
- MongoDB 7+
- Docker (optional)

### Environment Setup
```bash
# Backend (.env)
PORT=8000
MONGODB_URI=mongodb://localhost:27017/blazestack

# Frontend (built-in defaults)
API_BASE_URL=http://localhost:8000/api/v1
```

### Available Scripts
```bash
# Backend
npm run dev        # Start development server
npm run build      # Build TypeScript
npm run lint       # Run ESLint

# Frontend  
npm run dev        # Start Vite dev server
npm run build      # Build for production
npm run preview    # Preview production build
```

---

Built with ❤️ using modern web technologies and best practices.