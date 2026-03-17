# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies (including dev for Prisma)
COPY backend/package*.json ./
RUN npm ci --include=dev

# Copy source
COPY backend/ .

# Generate Prisma Client
RUN npx prisma generate

# Build (optional, we'll run with ts-node in production for simplicity)
# RUN npm run build

# Production stage (use same image for simplicity)
FROM node:20-alpine

WORKDIR /app

# Copy node_modules and built files from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/src ./src
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Ensure writable prisma directory for dev.db
RUN mkdir -p /app/prisma

ENV NODE_ENV=production
EXPOSE 3000

# Use ts-node to run TypeScript directly (avoid build step)
CMD ["node", "node_modules/ts-node/dist/bin.js", "src/index.ts"]