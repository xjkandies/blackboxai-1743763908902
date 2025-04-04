# Music Distribution Platform Frontend

A modern web application for managing music distribution, ISRC/UPC codes, and analytics.

## Features

- Music Upload and Distribution
- ISRC/UPC Code Management
- Analytics Dashboard
- Marketing Tools
- User Profile Management
- Subscription Management

## Tech Stack

- React
- Redux Toolkit
- Tailwind CSS
- Vite
- React Router DOM
- React Hook Form
- Axios

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd music-distribution-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:8006`

### Building for Production

```bash
npm run build
# or
yarn build
```

## Project Structure

```
src/
├── assets/         # Static assets
├── components/     # Reusable components
│   ├── common/     # Common UI components
│   └── auth/       # Authentication components
├── layouts/        # Layout components
├── pages/          # Page components
├── store/          # Redux store and slices
├── utils/          # Utility functions
└── styles/         # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
