# Environment Variables Setup

This project uses environment variables to configure different aspects of the application. Here's how to set them up:

## Development Environment

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` with your development configuration:
   ```bash
   # API Configuration
   VITE_API_BASE_URL=http://localhost:8080/api
   
   # Environment
   NODE_ENV=development
   
   # Port Configuration
   APP_PORT=80
   DEV_PORT=3000
   ```

## Production Environment

1. Copy the production example file:
   ```bash
   cp .env.production.example .env.production
   ```

2. Edit `.env.production` with your production configuration:
   ```bash
   # API Configuration
   VITE_API_BASE_URL=https://your-production-api.com/api
   
   # Environment
   NODE_ENV=production
   
   # Port Configuration
   APP_PORT=80
   DEV_PORT=3000
   ```

## Docker Usage

### Development
```bash
# Use development environment
docker-compose --profile dev up
```

### Production
```bash
# Use production environment
docker-compose --env-file .env.production up
```

### Custom Environment File
```bash
# Use a custom environment file
docker-compose --env-file .env.custom up
```

## Environment Variables Reference

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:8080/api` | Yes |
| `NODE_ENV` | Environment mode | `development` | No |
| `APP_PORT` | Production app port | `80` | No |
| `DEV_PORT` | Development app port | `3000` | No |

## Security Notes

- Never commit `.env` or `.env.production` files to version control
- Use different API keys/secrets for different environments
- Keep production secrets secure and rotate them regularly
- Use environment-specific values for database URLs, API endpoints, etc.
