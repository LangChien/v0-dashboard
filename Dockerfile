# Stage 1: Build Next.js app
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code (thanks to .dockerignore, node_modules and .env* are skipped)
COPY . .

# Build Next.js app
RUN npm run build

# Stage 2: Run production server
FROM node:22-alpine AS production

WORKDIR /app

# Copy only necessary files from builder stage
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
RUN npm install --only=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./
EXPOSE 3000

CMD ["npm", "start"]
