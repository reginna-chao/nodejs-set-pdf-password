# =======================================
# Node.js PDF Password Protection Tool
# =======================================

# Use Node.js 20 Alpine as base image for smaller size
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Install build dependencies for native modules (muhammara requires these)
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    libc6-compat

# Copy package files first for better Docker layer caching
COPY package.json yarn.lock* package-lock.json* ./

# Install dependencies
# Use yarn if yarn.lock exists, otherwise use npm
RUN if [ -f yarn.lock ]; then \
        yarn install --frozen-lockfile; \
    else \
        npm ci --only=production || npm install; \
    fi

# Copy application source code
COPY index.js ./

# Copy .env-example as reference (actual .env should be mounted at runtime)
COPY .env-example ./

# Create input and output directories
RUN mkdir -p /app/input /app/output

# Set ownership for non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

# Switch to non-root user for security
USER nodejs

# Default command to run the application
CMD ["node", "index.js"]
