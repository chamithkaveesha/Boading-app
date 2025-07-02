# Use Node.js 20 Alpine as base image for smaller size
FROM node:20-alpine as build

# Accept build arguments
ARG VITE_API_BASE_URL
ARG NODE_ENV=production

# Set environment variables from build args
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
ENV NODE_ENV=${NODE_ENV}

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies (including dev dependencies needed for build)
# Use --no-optional to avoid optional dependency issues
# Set npm timeout and registry for better reliability
RUN npm config set fetch-timeout 600000 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm ci --include=dev --no-optional

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
