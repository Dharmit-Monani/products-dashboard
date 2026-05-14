# ─── Stage 1: Build React app ────────────────────────────────
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first — cache optimization
COPY package*.json ./

# Install all dependencies (including dev — needed for vite build)
RUN npm install

# Copy source code
COPY . .

# Build React/Vite app for production
RUN npm run build

# ─── Stage 2: Serve with Nginx ───────────────────────────────
# Lightweight nginx image — final image has NO node or npm
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom nginx config
COPY nginx.conf /etc/nginx/conf.d/app.conf

# Copy built React app from builder stage into nginx serve folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx in foreground (required for Docker)
CMD ["nginx", "-g", "daemon off;"]
