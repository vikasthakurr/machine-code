FROM node:18-alpine

WORKDIR /app

COPY packages/shared /app/packages/shared

COPY services/notifications/package*.json ./
RUN npm install --production
COPY services/notifications/ ./

EXPOSE 3005
CMD ["node", "src/server.js"]
