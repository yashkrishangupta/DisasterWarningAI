# React + Express Application

A full-stack web application built with React and Express.js, featuring a modern UI with Tailwind CSS and shadcn/ui components.

## Project Structure

```
├── client/           # React frontend application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utility libraries
│   │   └── pages/       # Page components
│   └── index.html
├── server/           # Express backend server
│   ├── index.js      # Main server entry point
│   ├── routes.js     # API routes
│   ├── storage.js    # Data storage layer
│   └── vite.js       # Vite development server setup
├── shared/           # Shared code between client and server
└── package.json      # Node.js dependencies
```

## Prerequisites

- Node.js 20.x or higher
- npm (comes with Node.js)

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the Application

### Current State

**Important**: After migration, the workflow is currently running a Flask wrapper that displays instructions. To run the actual Node.js/React application, you need to update the workflow configuration.

### Quick Setup

Run the helper script to see instructions:
```bash
./switch-to-node.sh
```

### Manual Configuration

Edit the `.replit` file and change the workflow configuration:

```toml
[[workflows.workflow.tasks]]
task = "shell.exec"
args = "NODE_ENV=development node server/index.js"
waitForPort = 5000
```

### Development Mode

The application runs on port 5000 by default.

**Running the Node.js server directly:**
```bash
NODE_ENV=development node server/index.js
```

The server will start and be available at `http://localhost:5000`

### Production Mode

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Configuration

### Environment Variables

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment mode (development/production)

### Workflow Configuration

**Important**: If you're running this on Replit, update your `.replit` file:

```toml
[[workflows.workflow]]
name = "Start application"
author = "agent"

[[workflows.workflow.tasks]]
task = "shell.exec"
args = "NODE_ENV=development node server/index.js"
waitForPort = 5000
```

## Technology Stack

### Frontend
- React 18
- Wouter (routing)
- TanStack Query (data fetching)
- Tailwind CSS (styling)
- shadcn/ui (UI components)
- Lucide React (icons)

### Backend
- Express.js (web framework)
- Vite (development server & bundler)

### Development Tools
- Vite plugins for Replit integration
- ESBuild (production bundling)

## Features

- Hot module replacement in development
- Server-side rendering ready
- Modern UI components
- Responsive design
- Toast notifications
- Form validation

## Development

The application uses Vite for fast development with hot module replacement. Changes to client code will automatically refresh in the browser.

### Adding New Routes

1. Create a new page component in `client/src/pages/`
2. Add the route in `client/src/App.jsx`
3. Add API endpoints in `server/routes.js`

### Styling

The project uses Tailwind CSS with a custom theme. Modify `tailwind.config.js` to customize colors, spacing, and other design tokens.

## Migration Notes

This project was migrated from TypeScript to JavaScript for simplicity. All `.ts` and `.tsx` files have been converted to `.js` and `.jsx` respectively.

## Troubleshooting

### Port Already in Use

If you see "EADDRINUSE" errors, ensure no other process is using port 5000:

```bash
pkill -f "node server/index.js"
```

### Module Not Found

Reinstall dependencies:

```bash
rm -rf node_modules package-lock.json
npm install
```

## License

MIT
