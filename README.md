# Music Distribution Platform

A full-stack web application for managing music distribution, ISRC/UPC codes, and analytics.

## Project Structure

This repository contains both the frontend and backend code:

```
├── frontend/          # React frontend application
└── backend/          # Node.js/Express backend application
```

## Features

- Music Upload and Distribution
- ISRC/UPC Code Management
- Analytics Dashboard
- Marketing Tools
- User Profile Management
- Subscription Management

## Tech Stack

### Frontend
- React
- Redux Toolkit
- Tailwind CSS
- Vite
- React Router DOM

### Backend
- Node.js
- Express
- PostgreSQL
- Sequelize ORM
- JWT Authentication

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd music-distribution-platform
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Set up environment variables:
   - Copy `.env.example` to `.env` in both frontend and backend directories
   - Update the variables with your PostgreSQL configuration

5. Start the development servers:

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:8006`
The backend will be available at `http://localhost:3000`

## Development

- Frontend development server includes hot reloading
- Backend uses nodemon for automatic restarts
- ESLint and Prettier are configured for code consistency
- Sequelize migrations and seeds for database management

## Database Setup

1. Create PostgreSQL database:
```bash
createdb music_distribution
```

2. Run migrations:
```bash
cd backend
npx sequelize-cli db:migrate
```

3. (Optional) Seed initial data:
```bash
npx sequelize-cli db:seed:all
```

## Deployment

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Start the production server:
```bash
cd backend
npm start
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.