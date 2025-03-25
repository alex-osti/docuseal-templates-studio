# Build stage
FROM node:18-alpine as builder
WORKDIR /app

# Install frontend dependencies
COPY package*.json ./
RUN npm ci

# Install MCP server dependencies
COPY mcp-server/package*.json ./mcp-server/
RUN cd mcp-server && npm ci

# Build frontend
COPY . .
RUN npm install -g vite && \
    npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app

# Install production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Install MCP server production dependencies
COPY mcp-server/package*.json ./mcp-server/
RUN cd mcp-server && npm ci --only=production

# Copy built files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/mcp-server ./mcp-server

# Security hardening
RUN apk add --no-cache dumb-init && \
    addgroup -S appgroup && \
    adduser -S appuser -G appgroup && \
    chown -R appuser:appgroup /app

USER appuser

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:3000 || exit 1

# Run both servers
CMD ["dumb-init", "sh", "-c", "cd mcp-server && node index.js & npm run preview"]
EXPOSE 3000 3002