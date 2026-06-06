FROM node:18-alpine

WORKDIR /app

# Copy shared package
COPY packages/shared /app/packages/shared

# Copy service
COPY services/auth/package*.json ./
RUN npm install --production
COPY services/auth/ ./

EXPOSE 3001
CMD ["node", "src/server.js"]
