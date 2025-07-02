# Boading-app
A web app to help boarding members track, share, and settle expenses with ease.

visite deployed site on this URL: https://code-gdc.github.io/Boading-app/

## Environment Configuration

This project uses environment variables to configure API endpoints. Follow these steps to set up your environment:

### Development Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your development API URL:
   ```
   VITE_API_BASE_URL=http://localhost:8080/api
   NODE_ENV=development
   ```

### Production Setup

1. Copy the production example file:
   ```bash
   cp .env.production.example .env.production
   ```

2. Update the `.env.production` file with your production API URL:
   ```
   VITE_API_BASE_URL=https://your-production-api.com/api
   NODE_ENV=production
   ```

### Available Environment Variables

- `VITE_API_BASE_URL`: The base URL for your API server
- `NODE_ENV`: The environment mode (development/production)

**Note**: Environment files (`.env`, `.env.local`, etc.) are excluded from version control. Always use the `.example` files as templates.
