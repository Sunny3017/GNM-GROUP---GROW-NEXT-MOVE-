# GNM REALTOR

A full-stack real estate web application.

## Project Structure

```
GNM REALTOR/
├── backend/      # Node.js + Express + MongoDB backend
└── frontend/     # React + Vite + Tailwind CSS frontend
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- ImageKit account (for image uploads)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory using `.env.example` as a template:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your credentials.

5. Start the backend server:
   - Development mode: `npm run dev`
   - Production mode: `npm start`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend dev server:
   ```bash
   npm run dev
   ```

4. To build for production:
   ```bash
   npm run build
   ```

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- ImageKit (for image storage)
- Multer (for file uploads)

### Frontend
- React 19
- Vite
- Tailwind CSS
- Framer Motion
- React Router DOM
- Axios
- Lucide React
