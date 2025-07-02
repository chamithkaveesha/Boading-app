#!/bin/bash

# Build and Push Docker Image to Docker Hub
# Usage: ./build-and-push.sh [your-dockerhub-username] [tag-version] [api-base-url]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default values
DOCKER_USERNAME=${1:-""}
TAG_VERSION=${2:-"latest"}
API_BASE_URL=${3:-"https://your-production-api.com/api"}

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker username is provided
if [ -z "$DOCKER_USERNAME" ]; then
    print_error "Docker Hub username is required!"
    echo "Usage: ./build-and-push.sh [your-dockerhub-username] [tag-version] [api-base-url]"
    echo "Example: ./build-and-push.sh myusername v1.0.0 https://api.myapp.com/api"
    exit 1
fi

# Derived variables
IMAGE_NAME="boarding-app"
FULL_IMAGE_NAME="$DOCKER_USERNAME/$IMAGE_NAME"

print_status "Building Docker image..."
print_status "Docker Username: $DOCKER_USERNAME"
print_status "Image Name: $IMAGE_NAME"
print_status "Tag Version: $TAG_VERSION"
print_status "API Base URL: $API_BASE_URL"

# Build the Docker image
print_status "Building image: $FULL_IMAGE_NAME:$TAG_VERSION"
docker build \
    --build-arg VITE_API_BASE_URL="$API_BASE_URL" \
    --build-arg NODE_ENV=production \
    -t "$FULL_IMAGE_NAME:$TAG_VERSION" \
    -t "$FULL_IMAGE_NAME:latest" \
    -f Dockerfile \
    .

if [ $? -eq 0 ]; then
    print_status "✅ Docker image built successfully!"
else
    print_error "❌ Docker build failed!"
    exit 1
fi

# Check if user is logged in to Docker Hub
print_status "Checking Docker Hub authentication..."
if ! docker info | grep -q "Username"; then
    print_warning "Not logged in to Docker Hub. Please log in:"
    docker login
fi

# Push the image to Docker Hub
print_status "Pushing image to Docker Hub..."
docker push "$FULL_IMAGE_NAME:$TAG_VERSION"
docker push "$FULL_IMAGE_NAME:latest"

if [ $? -eq 0 ]; then
    print_status "✅ Docker image pushed successfully!"
    print_status "🐳 Your image is now available at: docker pull $FULL_IMAGE_NAME:$TAG_VERSION"
    print_status "🐳 Latest version: docker pull $FULL_IMAGE_NAME:latest"
else
    print_error "❌ Docker push failed!"
    exit 1
fi

# Show image info
print_status "📋 Image Information:"
docker images | grep "$FULL_IMAGE_NAME"

print_status "🎉 Done! Your Docker image has been published to Docker Hub."
print_status "You can now deploy it using:"
echo "docker run -p 80:80 $FULL_IMAGE_NAME:$TAG_VERSION"
